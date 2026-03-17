/* ============================================
   animations.js
   Animações de scroll reveal usando
   Intersection Observer API.
   ============================================ */

const Animations = (() => {

	/* --- Configura o observer para elementos com classe .reveal --- */
	function initScrollReveal() {
		const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

		if (revealElements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('active');
						observer.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -40px 0px',
			}
		);

		revealElements.forEach((el) => observer.observe(el));
	}

	/* --- Efeito de typing no subtítulo do hero --- */
	function initTypingEffect() {
		const typingEl = document.getElementById('typing-text');
		if (!typingEl) return;

		const phrases = [
			'Desenvolvedor C# & .NET',
			'Estudante de ADS — IFTM',
			'Apaixonado por tecnologia',
		];

		let phraseIndex = 0;
		let charIndex = 0;
		let isDeleting = false;

		function type() {
			const current = phrases[phraseIndex];

			if (isDeleting) {
				typingEl.textContent = current.substring(0, charIndex - 1);
				charIndex--;
			} else {
				typingEl.textContent = current.substring(0, charIndex + 1);
				charIndex++;
			}

			let speed = isDeleting ? 40 : 80;

			if (!isDeleting && charIndex === current.length) {
				speed = 2000; // Pausa no final da frase
				isDeleting = true;
			} else if (isDeleting && charIndex === 0) {
				isDeleting = false;
				phraseIndex = (phraseIndex + 1) % phrases.length;
				speed = 500;
			}

			setTimeout(type, speed);
		}

		type();
	}

	/* --- Inicializa todas as animações --- */
	function init() {
		initScrollReveal();
		initTypingEffect();
	}

	return { init };
})();
