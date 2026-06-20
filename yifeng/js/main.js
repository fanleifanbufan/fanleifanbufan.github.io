// ============================
// main.js — 奕峰 · 专业情感导师 · 个人网站
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. Hero Canvas — warm particle animation
    // ============================
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = 0, mouseY = 0;
        let animFrameId;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = -(Math.random() * 0.4 + 0.1);
                this.opacity = Math.random() * 0.4 + 0.1;
                this.pulse = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.005;
                this.life = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulse += this.pulseSpeed;
                this.opacity += (Math.sin(this.pulse) * 0.001);
                this.opacity = Math.max(0.05, Math.min(0.5, this.opacity));

                if (this.y < -10 || this.x < -10 || this.x > canvas.width + 10) {
                    this.reset();
                    this.y = canvas.height + 10;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
                ctx.fill();

                if (this.size > 1.5) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity * 0.08})`;
                    ctx.fill();
                }
            }
        }

        function initParticles() {
            const count = Math.min(Math.floor(canvas.width * 0.04), 100);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        let mouseParticles = [];
        let lastMouseTime = 0;

        function spawnMouseParticle(x, y) {
            const p = new Particle();
            p.x = x;
            p.y = y;
            p.size = Math.random() * 2 + 1;
            p.speedX = (Math.random() - 0.5) * 0.8;
            p.speedY = (Math.random() - 0.5) * 0.8 - 0.5;
            p.opacity = 0.3;
            mouseParticles.push(p);
            if (mouseParticles.length > 20) mouseParticles.shift();
        }

        canvas.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            const now = Date.now();
            if (now - lastMouseTime > 60) {
                spawnMouseParticle(mouseX, mouseY);
                lastMouseTime = now;
            }
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            mouseParticles.forEach((p, i) => {
                p.update();
                p.draw();
                p.opacity -= 0.003;
                if (p.opacity <= 0) {
                    mouseParticles.splice(i, 1);
                }
            });

            animFrameId = requestAnimationFrame(animate);
        }

        resizeCanvas();
        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // ============================
    // 2. Navbar scroll effect
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
    // 3. Active nav link tracking
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
    // 4. Smooth scroll for nav links
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
    // 5. Mobile menu toggle
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
    // 6. Scroll reveal animations
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
    // 7. Stats counter animation
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
                element.textContent = Math.floor(current).toLocaleString();
            } else {
                element.textContent = Math.floor(current);
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
    // 8. Current year for footer
    // ============================
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // ============================
    // 9. Button smooth scroll
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

    console.log('奕峰 · 个人网站已加载');
});
