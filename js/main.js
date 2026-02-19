/* LOADER */
const loader = document.querySelector(".loader");

function setLoader(loader) {
	loader.innerHTML = `
		<div class="loader_container">
			<div class="loader_circles">
				<div class="loader_circle1"></div>
				<div class="loader_circle2"></div>
			</div>
			<h3 class="loader_name">NEBULA DEV</h3>
			<div class="loader_dots">
				<div class="loader_dot1"></div>
				<div class="loader_dot2"></div>
				<div class="loader_dot3"></div>
				<div class="loader_dot4"></div>
			</div>
		</div>
	`;

	loader.classList.add('loading');
}

setLoader(loader);

setTimeout(() => {
	loader.innerHTML = "";
	loader.classList.remove('loading');
}, 1000);

const dotPositions = [0, 1.25, 2.5, 3.75]; // rem
const dots = [
	document.querySelector(".loader_dot1"),
	document.querySelector(".loader_dot2"),
	document.querySelector(".loader_dot3"),
	document.querySelector(".loader_dot4"),
];
const dotColors = [
	"#810591",
	getComputedStyle(document.documentElement)
		.getPropertyValue("--secondary-light")
		.trim() || "#b388ff",
	"#560591",
	getComputedStyle(document.documentElement)
		.getPropertyValue("--primary-light")
		.trim() || "#a7ffeb",
];

let offset = 0;
function updateDots() {
	for (let i = 0; i < 4; i++) {
		let pos = (i + offset) % 4;
		if (pos < 3) {
			dots[i].style.left = `${dotPositions[pos]}rem`;
			dots[i].style.opacity = "1";
		} else {
			dots[i].style.left = `${dotPositions[3]}rem`;
			dots[i].style.opacity = "0";
		}
		dots[i].style.background = dotColors[pos];
	}
	offset = (offset + 1) % 4;
}
setInterval(updateDots, 700);
updateDots();

/* CAHNGE LANGUAGE */
import { setLanguage } from "./language.js";

const metaLang = document.querySelector("html");
const langButton = document.getElementById("lang_btn");
const langText = document.getElementById("lang_text");

async function fetchLanguage(lang) {
	const actualLang = langText.textContent;
	const otherLang = actualLang == "es" ? "en" : "es";

	try {
		const response = await fetch(`locales/${lang}.json`);
		const json = await response.json();

		metaLang.lang = actualLang;
		langText.textContent = otherLang;
		setLanguage(json);
	} catch {
		console.log("Error");
	}
}

/* DARK/LIGHT MODE */
import { setLightMode, setDarkMode } from "./theme.js";

const modeBtn = document.getElementById("mode_btn");

modeBtn.addEventListener("click", () => {
	if (modeBtn.dataset.theme == "dark-mode") {
		setDarkMode();
		modeBtn.dataset.theme = "light-mode";
		modeBtn.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path fill="#fff" d="M9.165 14.836Q8 13.67 8 12t1.165-2.835T12 8t2.836 1.165T16 12t-1.164 2.836T12 16t-2.835-1.164M2 12.5q-.213 0-.357-.143T1.5 12t.143-.357T2 11.5h2.5q.214 0 .357.143T5 12t-.143.357t-.357.143zm17.5 0q-.213 0-.357-.143T19 12t.143-.357t.357-.143H22q.214 0 .357.143T22.5 12t-.143.357T22 12.5zm-7.857-7.643Q11.5 4.713 11.5 4.5V2q0-.213.143-.357T12 1.5t.357.143T12.5 2v2.5q0 .214-.143.357T12 5t-.357-.143m0 17.5Q11.5 22.214 11.5 22v-2.5q0-.213.143-.357T12 19t.357.143t.143.357V22q0 .214-.143.357T12 22.5t-.357-.143M6.362 7.03l-1.44-1.396q-.147-.14-.144-.344t.143-.37q.166-.165.36-.165t.354.165L7.05 6.342q.16.166.16.354q0 .189-.16.354q-.14.166-.332.153t-.356-.172m12.004 12.048l-1.416-1.421q-.16-.166-.16-.357t.16-.351q.14-.165.332-.153t.356.172l1.44 1.397q.147.14.144.344t-.143.369q-.166.165-.36.165t-.354-.165M16.95 7.05q-.165-.14-.153-.332t.172-.356l1.397-1.44q.14-.147.344-.144t.369.143q.165.166.165.36t-.165.354L17.658 7.05q-.166.16-.354.16t-.354-.16M4.921 19.079q-.165-.166-.165-.36t.165-.354l1.421-1.415q.166-.16.357-.16q.192 0 .351.16q.146.14.134.332t-.153.356l-1.397 1.44q-.159.166-.353.163q-.195-.002-.36-.162" />
		</svg>
		`;
	} else if (modeBtn.dataset.theme == "light-mode") {
		setLightMode();
		modeBtn.dataset.theme = "dark-mode";
		modeBtn.innerHTML = `
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path fill="#fff" d="M12.058 20q-3.334 0-5.667-2.333T4.058 12q0-3.039 1.98-5.27t4.904-2.634q.081 0 .159.006t.153.017q-.506.706-.801 1.57T10.158 7.5q0 2.667 1.866 4.533t4.534 1.867q.951 0 1.813-.295t1.548-.801q.012.075.017.153t.006.159q-.384 2.923-2.615 4.903T12.057 20" />
		</svg>
		`;
	}
});

if (modeBtn.dataset.theme == "light-mode") {
	setDarkMode();
	modeBtn.dataset.theme = "light-mode";
	modeBtn.innerHTML = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
		<path fill="#fff" d="M9.165 14.836Q8 13.67 8 12t1.165-2.835T12 8t2.836 1.165T16 12t-1.164 2.836T12 16t-2.835-1.164M2 12.5q-.213 0-.357-.143T1.5 12t.143-.357T2 11.5h2.5q.214 0 .357.143T5 12t-.143.357t-.357.143zm17.5 0q-.213 0-.357-.143T19 12t.143-.357t.357-.143H22q.214 0 .357.143T22.5 12t-.143.357T22 12.5zm-7.857-7.643Q11.5 4.713 11.5 4.5V2q0-.213.143-.357T12 1.5t.357.143T12.5 2v2.5q0 .214-.143.357T12 5t-.357-.143m0 17.5Q11.5 22.214 11.5 22v-2.5q0-.213.143-.357T12 19t.357.143t.143.357V22q0 .214-.143.357T12 22.5t-.357-.143M6.362 7.03l-1.44-1.396q-.147-.14-.144-.344t.143-.37q.166-.165.36-.165t.354.165L7.05 6.342q.16.166.16.354q0 .189-.16.354q-.14.166-.332.153t-.356-.172m12.004 12.048l-1.416-1.421q-.16-.166-.16-.357t.16-.351q.14-.165.332-.153t.356.172l1.44 1.397q.147.14.144.344t-.143.369q-.166.165-.36.165t-.354-.165M16.95 7.05q-.165-.14-.153-.332t.172-.356l1.397-1.44q.14-.147.344-.144t.369.143q.165.166.165.36t-.165.354L17.658 7.05q-.166.16-.354.16t-.354-.16M4.921 19.079q-.165-.166-.165-.36t.165-.354l1.421-1.415q.166-.16.357-.16q.192 0 .351.16q.146.14.134.332t-.153.356l-1.397 1.44q-.159.166-.353.163q-.195-.002-.36-.162" />
	</svg>
	`;
}

/* HAMBURGER MENU */
const hamburguerBtn = document.getElementById("hamburger-btn");
const nav = document.getElementById("header_nav");

hamburguerBtn.addEventListener("click", () => {
	nav.classList.toggle("active");
});

const navLinks = nav.querySelectorAll("a");

navLinks.forEach((link) => {
	link.addEventListener("click", () => {
		nav.classList.remove("active");
	});
});

/* MENU ACTIVE ITEMS */
const links = document.querySelectorAll(".navbar_link");
const footerLinks = document.querySelectorAll(".footer_navItem");

const headerLogo = document.querySelector(".header_logo");
headerLogo.addEventListener("click", () => {
	links.forEach((link) => link.classList.remove("active"));
	footerLinks.forEach((link) => link.classList.remove("active"));
});

function setupNavActiveSync(headerLinks, footerLinks) {
	function activateLink(clickedLink, groupA, groupB) {
		groupA.forEach((link) => {
			if (link === clickedLink) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});
		groupB.forEach((link) => {
			if (link.textContent === clickedLink.textContent) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});
	}

	headerLinks.forEach((link) => {
		link.addEventListener("click", () =>
			activateLink(link, headerLinks, footerLinks),
		);
	});
	footerLinks.forEach((link) => {
		link.addEventListener("click", () =>
			activateLink(link, footerLinks, headerLinks),
		);
	});
}

setupNavActiveSync(links, footerLinks);

/* SCROLL */
const upBtn = document.getElementById("upBtn");

upBtn.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

/* MODALS */

/* TESTIMONIALS CARROUSEL */
import { initTestimonials } from "./testimonials.js";

/* SERVICES CARDS */
import { servicesCards } from "./services.js";

/* PROJECTS CARDS */
import { projectsCards } from "./projects.js";

/* FAQ */
const faqItems = document.querySelectorAll(".faq_item");

faqItems.forEach((item) => {
	const question = item.querySelector("summary");
	const btn = question.querySelector(".faq_marker");

	question.addEventListener("click", () => {
		btn.classList.toggle("open");

		if (btn.classList.contains("open")) {
			faqItems.forEach((otherItem) => {
				if (otherItem !== item) {
					const otherBtn = otherItem.querySelector(".faq_marker");
					otherBtn.classList.remove("open");
					otherItem.open = false;
				}
			});
		}
	});
});

/* CONTACT */
import { submitForm, updateContactFormErrors } from "./contact.js";

const form = document.getElementById("contact_form");

form.addEventListener("submit", (e) => {
	const formData = new FormData(form);
	submitForm(langText.textContent, formData, e);
});

/* ANIMATIONS AND STYLE*/

// Hero Stars
function createStars() {
	const numberOfStars = 100;
	const container = document.querySelector(".stars");
	for (let i = 0; i < numberOfStars; i++) {
		const star = document.createElement("div");
		star.classList.add("star");
		star.style.position = "absolute";
		star.style.backgroundColor = "#fff";
		star.style.borderRadius = "50%";
		star.style.opacity = Math.random();
		star.style.zIndex = "-1";

		const size = Math.random() * 3 + 1;
		star.style.width = `${size}px`;
		star.style.height = `${size}px`;
		star.style.left = `${Math.random() * 100}vw`;
		star.style.top = `${Math.random() * 100}vh`;
		star.style.animationDuration = `${Math.random() * 2 + 1}s`;

		container.appendChild(star);
	}
}

createStars();

/* LISTENERS */
langButton.addEventListener("click", () => {
	const newLang = langText.textContent;
	fetchLanguage(newLang, langText);
	servicesCards(newLang);
	projectsCards(newLang);
	updateContactFormErrors(newLang);
});

fetchLanguage("en");
servicesCards("en");
projectsCards("en");
initTestimonials();
