document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio script loaded successfully.');

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }

    // Typing Effect
    const textElement = document.querySelector('.lead');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 20); // Speed of typing
            }
        }

        // Start typing after initial fade in
        setTimeout(typeWriter, 1000);
    }

    // Smooth scroll for anchor links (if not using CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Fade-up elements
    document.querySelectorAll('section, .brutalist-title-wrapper, .project-card, .timeline-item').forEach(el => {
        el.classList.add('hidden-section');
        observer.observe(el);
    });

    // Staggered animation for hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards ${index * 0.15}s`;
    });

    // Global Mouse Tracking Spotlight
    document.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    // Card Glow Effect (Mouse tracking relative to card)
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Scroll Effects (Scroll Progress Indicator & Parallax Blobs)
    const scrollProgress = document.querySelector('.scroll-progress');
    const parallaxBlobs = document.querySelectorAll('.parallax-blob');

    function handleScrollEffects() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // 1. Update Scroll Progress Bar
        if (scrollProgress && docHeight > 0) {
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        }

        // 2. Parallax Scrolling for Blobs
        parallaxBlobs.forEach(blob => {
            const speed = parseFloat(blob.getAttribute('data-speed')) || 0.1;
            const yOffset = scrollTop * speed;
            blob.style.transform = `translate3d(0, ${yOffset}px, 0)`;
        });
    }

    // Bind scroll listener with requestAnimationFrame for performance optimization
    let tick = false;
    window.addEventListener('scroll', () => {
        if (!tick) {
            window.requestAnimationFrame(() => {
                handleScrollEffects();
                tick = false;
            });
            tick = true;
        }
    });

    // Run once on load to initialize correct positioning
    handleScrollEffects();

    // Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent!';
            btn.style.backgroundColor = '#00ff66'; // Emerald
            btn.style.color = '#080b10';

            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 3000);

            console.log('Form submitted successfully');
        });
    }
});
