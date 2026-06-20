document.addEventListener('DOMContentLoaded', () => {
    // Hero Canvas
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 0.5;
                this.speedY = -(Math.random() * 0.3 + 0.1);
                this.opacity = Math.random() * 0.3 + 0.1;
                this.pulse = Math.random() * Math.PI * 2;
            }
            update() {
                this.y += this.speedY;
                this.pulse += 0.015;
                this.opacity += Math.sin(this.pulse) * 0.002;
                this.opacity = Math.max(0.05, Math.min(0.4, this.opacity));
                if (this.y < -10) { this.reset(); this.y = canvas.height + 10; }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(201, 169, 110, ${this.opacity})`;
                ctx.fill();
            }
        }
        function init() {
            const count = Math.min(Math.floor(canvas.width * 0.03), 60);
            particles = Array.from({length: count}, () => new Particle());
        }
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        resize(); init(); animate();
        window.addEventListener('resize', () => { resize(); init(); });
    }

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) t.scrollIntoView({ behavior: 'smooth' });
        });
    });
});