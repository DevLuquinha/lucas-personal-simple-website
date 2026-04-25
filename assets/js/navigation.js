/* ============================================
   navigation.js
   Controlles the behavior of the navbar:
   - Glass effect on scroll
   - Active section tracking
   ============================================ */
const Navigation = (() => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    /* --- Glass effect on navbar when scrolling --- */
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        updateActiveLink();
    }

    /* --- Highlight the link of the visible section --- */
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

    /* --- Init the events --- */
    function init() {
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial state
        handleScroll();
    }

    return { init };
})();
