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
    // --- Contact Form Modal Logic ---
    const modal = document.getElementById('contact-modal');
    const openFormBtns = document.querySelectorAll('.open-form-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const contactForm = document.getElementById('contact-form');
    const planInput = document.getElementById('selected-plan');
    const extraField = document.getElementById('extra-field');

    openFormBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            planInput.value = plan;
            
            // Show extra field if Personalized
            if (plan === 'Personalizado') {
                extraField.style.display = 'block';
                document.getElementById('needs').required = true;
            } else {
                extraField.style.display = 'none';
                document.getElementById('needs').required = false;
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Stop scroll
        });
    });

    const closeForm = () => {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scroll
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeForm);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeForm();
        }
    });

    // --- Form Submission (WhatsApp Integration) ---
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const plan = planInput.value;
            const needs = document.getElementById('needs').value;
            
            // Format message for WhatsApp
            let message = `Olá, meu nome é ${name}.%0A%0A`;
            message += `Estou interessado no *Plano ${plan}*.%0A%0A`;
            message += `*Detalhes do Contato:*%0A`;
            message += `- Email: ${email}%0A`;
            message += `- Telefone: ${phone}%0A`;
            
            if (plan === 'Personalizado' && needs) {
                message += `%0A*Minhas Necessidades:*%0A${needs}`;
            }
            
            const whatsappUrl = `https://api.whatsapp.com/send?phone=5584986800555&text=${message}`;
            
            // Redirect to WhatsApp
            window.open(whatsappUrl, '_blank');
            closeForm();
            contactForm.reset();
        });
    }

});
