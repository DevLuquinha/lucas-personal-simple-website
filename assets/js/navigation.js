/* ============================================
   navigation.js
   Controla o comportamento da navbar:
   - Efeito glass ao scrollar
   - Tracking de seção ativa
   - Menu mobile (hamburger)
   - Scroll suave para âncoras
   ============================================ */

const Navigation = (() => {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /* --- Efeito glass na navbar ao scrollar --- */
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        updateActiveLink();
    }

    /* --- Destaca o link da seção visível --- */
    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* --- Toggle do menu mobile --- */
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('open');

        const icon = mobileMenuBtn.querySelector('svg');
        if (mobileMenu.classList.contains('open')) {
            icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18L18 6M6 6l12 12"/>
      `;
        } else {
            icon.innerHTML = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
      `;
        }
    }

    /* --- Fecha o menu mobile ao clicar em um link --- */
    function closeMobileOnClick() {
        mobileMenu.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"/>
    `;
    }

    /* --- Inicializa os event listeners --- */
    function init() {
        window.addEventListener('scroll', handleScroll, { passive: true });
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Fecha menu mobile ao clicar em qualquer link
        document.querySelectorAll('#mobile-menu a').forEach((link) => {
            link.addEventListener('click', closeMobileOnClick);
        });

        // Estado inicial
        handleScroll();
    }

    return { init };
})();
