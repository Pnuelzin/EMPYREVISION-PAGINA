document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Header Scroll Effect ---
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            // header.style.background = 'rgba(5, 5, 5, 0.95)'; // Removed to keep glass effect
        } else {
            header.style.padding = '20px 0';
            // header.style.background = 'rgba(10, 10, 10, 0.8)'; // Removed to keep glass effect
        }
    });

    // --- FAQ Accordion ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');

            // Toggle current item
            item.classList.toggle('active');

            // Animate height
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = 0;
            }

            // Close other items (optional, but good for UX)
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== header) {
                    const otherItem = otherHeader.parentElement;
                    const otherBody = otherItem.querySelector('.accordion-body');
                    otherItem.classList.remove('active');
                    otherBody.style.maxHeight = 0;
                }
            });
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Scroll Offset for Fixed Header ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

});
