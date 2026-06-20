// ============================
// main.js — 樊磊 · 个人简历网站
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. Navbar scroll effect
    // ============================
    const navbar = document.getElementById('navbar');
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScrollY = scrollY;
    }, { passive: true });

    // ============================
    // 2. Active nav link tracking
    // ============================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    // ============================
    // 3. Smooth scroll for nav links
    // ============================
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            document.getElementById('navLinks')?.classList.remove('open');
        });
    });

    // ============================
    // 4. Mobile menu toggle
    // ============================
    const mobileToggle = document.getElementById('mobileToggle');
    const navList = document.getElementById('navLinks');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!navList.contains(e.target) && !mobileToggle.contains(e.target)) {
                navList.classList.remove('open');
            }
        });
    }

    // ============================
    // 5. Scroll reveal animations
    // ============================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    entry.target.style.transitionDelay = delay + 'ms';
                }
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================
    // 6. Stats counter animation
    // ============================
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => statsObserver.observe(el));

    function animateCounter(element, target) {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        function tick() {
            step++;
            current = Math.min(increment * step, target);
            if (target >= 1000) {
                element.textContent = Math.min(Math.round(current), target).toLocaleString();
            } else {
                element.textContent = Math.min(Math.round(current), target);
            }
            if (step < steps) {
                const eased = 1 - Math.pow(1 - (step / steps), 3);
                const delay = 16 + (1 - eased) * 16;
                setTimeout(tick, delay);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        tick();
    }

    // ============================
    // 7. Current year for footer
    // ============================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ============================
    // 8. Button smooth scroll
    // ============================
    document.querySelectorAll('.btn[href^="#"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const href = btn.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    console.log('樊磊 · 个人网站已加载');
});
