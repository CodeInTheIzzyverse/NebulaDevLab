const nameError = document.getElementById("name_error");
const emailError = document.getElementById("email_error");
const subjectError = document.getElementById("subject_error");
const messageError = document.getElementById("message_error");
const generalError = document.getElementById("general_error");

window.contactFormErrorState = {
	name: null,
	email: null,
	subject: null,
	message: null,
	general: null,
	lang: "en",
};

export function submitForm(lang, formData, e) {
	e.preventDefault();
	const name = formData.get("name");
	const email = formData.get("email");
	const subject = formData.get("subject");
	const message = formData.get("message");
	// Guarda los datos en localStorage
	localStorage.setItem("contactFormData", JSON.stringify({ name, email, subject, message }));
	validateForm(name, email, subject, message, lang == "en" ? "es" : "en");
}

function showError(errorElement, message) {
	errorElement.textContent = message;
	errorElement.style.display = "block";
}

function validateField({
	value,
	required,
	minLength,
	maxLength,
	pattern,
	errorKeys,
	errorElement,
	lang,
	fieldName,
}) {
	if (required && !value) {
		showError(errorElement, errorMsg(lang, "incomplete", fieldName));
		return { type: "incomplete", key: fieldName };
	}
	if (minLength && value && value.length < minLength) {
		showError(errorElement, errorMsg(lang, "lenght", errorKeys.short));
		return { type: "lenght", key: errorKeys.short };
	}
	if (maxLength && value && value.length > maxLength) {
		showError(errorElement, errorMsg(lang, "lenght", errorKeys.long));
		return { type: "lenght", key: errorKeys.long };
	}
	if (pattern && value && !pattern.test(value)) {
		showError(errorElement, errorMsg(lang, "format", errorKeys.format));
		return { type: "format", key: errorKeys.format };
	}
	errorElement.style.display = "none";
	return null;
}

function validateForm(name, email, subject, message, lang) {
	const nameErrorState = validateField({
		value: name,
		required: true,
		minLength: 3,
		maxLength: 100,
		errorKeys: { short: "name_short", long: "name_long" },
		errorElement: nameError,
		lang,
		fieldName: "name",
	});
	const emailErrorState = validateField({
		value: email,
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		errorKeys: { format: "email" },
		errorElement: emailError,
		lang,
		fieldName: "email",
	});
	const subjectErrorState = validateField({
		value: subject,
		required: true,
		maxLength: 100,
		errorKeys: { long: "subject_long" },
		errorElement: subjectError,
		lang,
		fieldName: "subject",
	});
	const messageErrorState = validateField({
		value: message,
		required: true,
		minLength: 5,
		errorKeys: { short: "message_short" },
		errorElement: messageError,
		lang,
		fieldName: "message",
	});

	let generalErrorState = null;
	if (!name || !email || !subject || !message) {
		showError(generalError, errorMsg(lang, "incomplete", "general"));
		generalErrorState = { type: "incomplete", key: "general" };
	} else if (
		nameErrorState ||
		emailErrorState ||
		subjectErrorState ||
		messageErrorState
	) {
		showError(generalError, errorMsg(lang, "format", "general"));
		generalErrorState = { type: "format", key: "general" };
	} else {
		generalError.style.display = "none";
	}

	window.contactFormErrorState = {
		name: nameErrorState,
		email: emailErrorState,
		subject: subjectErrorState,
		message: messageErrorState,
		general: generalErrorState,
		lang: lang,
	};

	if (
		!nameErrorState &&
		!emailErrorState &&
		!subjectErrorState &&
		!messageErrorState
	) {
		sendForm({ name, email, subject, message });
	}
}

export function updateContactFormErrors(newLang) {
	const state = window.contactFormErrorState;
	if (!state) return;
	function updateError(element, errState) {
		if (errState) {
			showError(element, errorMsg(newLang, errState.type, errState.key));
		} else {
			element.style.display = "none";
		}
	}
	updateError(nameError, state.name, "name");
	updateError(emailError, state.email, "email");
	updateError(subjectError, state.subject, "subject");
	updateError(messageError, state.message, "message");
	updateError(generalError, state.general, "general");
	window.contactFormErrorState.lang = newLang;
}

function errorMsg(lang, type, error) {
	const messages = {
		en: {
			incomplete: {
				name: "Name is required.",
				email: "Email is required.",
				subject: "Subject is required.",
				message: "Message is required.",
				general: "Please fill out all fields.",
			},
			lenght: {
				name_long: "Name cannot exceed 100 characters.",
				name_short: "Name must be at least 3 characters.",
				subject_long: "Subject cannot exceed 100 characters.",
				message_short: "Message must be at least 5 characters.",
			},
			format: {
				email: "Please enter a valid email address.",
				general: "Please fix the errors in the form.",
			},
		},
		es: {
			incomplete: {
				name: "El nombre es obligatorio.",
				email: "El correo electrónico es obligatorio.",
				subject: "El asunto es obligatorio.",
				message: "El mensaje es obligatorio.",
				general: "Por favor, complete todos los campos.",
			},
			lenght: {
				name_long: "El nombre no puede exceder los 100 caracteres.",
				name_short: "El nombre debe tener al menos 3 caracteres.",
				subject_long: "El asunto no puede exceder los 100 caracteres.",
				message_short: "El mensaje debe tener al menos 5 caracteres.",
			},
			format: {
				email: "Por favor, ingrese una dirección de correo electrónico válida.",
				general: "Por favor, corrija los errores en el formulario.",
			},
		},
	};
	return messages[lang][type][error];
}

let mailtoPendingReset = false;

function sendForm(data) {
	const { name, email, subject, message } = data;
	const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
	const mailtoLink = `mailto:dev.izzyverse@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	window.location.href = mailtoLink;
	mailtoPendingReset = true;
	localStorage.removeItem("contactFormData");
}

window.addEventListener("focus", () => {
	if (mailtoPendingReset) {
		const form = document.getElementById("contact_form");
		if (form) form.reset();
		mailtoPendingReset = false;
	}
});

window.addEventListener("DOMContentLoaded", () => {
	const saved = localStorage.getItem("contactFormData");
	let form = document.getElementById("contact_form");
	if (saved && form) {
		const isEmpty = ["name", "email", "subject", "message"].every(
			(field) => !form.elements[field] || form.elements[field].value === ""
		);
		if (isEmpty) {
			try {
				const { name, email, subject, message } = JSON.parse(saved);
				if (form.elements["name"]) form.elements["name"].value = name || "";
				if (form.elements["email"]) form.elements["email"].value = email || "";
				if (form.elements["subject"]) form.elements["subject"].value = subject || "";
				if (form.elements["message"]) form.elements["message"].value = message || "";
			} catch {}
		}
	}
});
