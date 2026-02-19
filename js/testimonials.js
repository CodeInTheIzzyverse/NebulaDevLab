export function initTestimonials() {
	const leftArrow = document.getElementById("leftArrow");
	const rightArrow = document.getElementById("rightArrow");
	const container = document.querySelector(".testimonials_container");
	const cards = document.querySelectorAll(".testimonial_card");
	const progressContainer = document.querySelector(".testimonials_progress");

	let currentIndex = 0;
	const totalCards = cards.length;
	const autoChangeInterval = 5000; // 5 segundos
	let autoChangeTimer;

	/**
	 * Crear dinámicamente los botones de progreso
	 */
	function createProgressButtons() {
		progressContainer.innerHTML = '';
		for (let i = 0; i < totalCards; i++) {
			const btn = document.createElement('button');
			if (i === 0) btn.classList.add('active');
			btn.addEventListener('click', () => goToCard(i));
			progressContainer.appendChild(btn);
		}
	}

	/**
	 * Ir a una card específica
	 */
	function goToCard(index) {
		currentIndex = index;
		updateCarousel();
		updateProgressButtons();
		resetAutoChangeTimer();
	}

	/**
	 * Actualizar la posición del carrousel
	 */
	function updateCarousel() {
		const offset = -currentIndex * 100;
		container.style.transform = `translateX(${offset}%)`;
	}

	/**
	 * Actualizar los botones de progreso (clase active)
	 */
	function updateProgressButtons() {
		const allButtons = progressContainer.querySelectorAll('button');
		allButtons.forEach((btn, idx) => {
			btn.classList.toggle('active', idx === currentIndex);
		});
	}

	/**
	 * Ir a la siguiente card
	 */
	function nextCard() {
		currentIndex = (currentIndex + 1) % totalCards;
		updateCarousel();
		updateProgressButtons();
		resetAutoChangeTimer();
	}

	/**
	 * Ir a la card anterior
	 */
	function prevCard() {
		currentIndex = (currentIndex - 1 + totalCards) % totalCards;
		updateCarousel();
		updateProgressButtons();
		resetAutoChangeTimer();
	}

	/**
	 * Resetear el temporizador de auto-cambio
	 */
	function resetAutoChangeTimer() {
		clearInterval(autoChangeTimer);
		startAutoChange();
	}

	/**
	 * Iniciar el cambio automático de cards
	 */
	function startAutoChange() {
		autoChangeTimer = setInterval(() => {
			nextCard();
		}, autoChangeInterval);
	}

	// Event listeners para las flechas
	leftArrow.addEventListener("click", prevCard);
	rightArrow.addEventListener("click", nextCard);

	// Crear botones de progreso
	createProgressButtons();

	// Iniciar el auto-cambio
	startAutoChange();
}
