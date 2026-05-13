// =========================================================
// @redroot97 - shared site script
// =========================================================

// Set current year in footer
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// Subtle parallax for hero grid bg
(function () {
    const grid = document.querySelector('.hero-grid-bg');
    if (!grid) return;
    let raf;
    document.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            grid.style.transform = `translate(${x}px, ${y}px)`;
            raf = null;
        });
    });
})();

// Random glitch trigger for hero and page titles
(function () {
    const glitches = document.querySelectorAll('.hero-title .glitch, .page-title .glitch');
    if (!glitches.length) return;
    setInterval(() => {
        if (Math.random() < 0.3) {
            glitches.forEach(el => {
                el.style.animation = 'none';
                void el.offsetWidth;
                el.style.animation = '';
            });
        }
    }, 6000);
})();

// Konami easter egg (because of course)
(function () {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let idx = 0;
    document.addEventListener('keydown', (e) => {
        if (e.key === seq[idx]) {
            idx++;
            if (idx === seq.length) {
                document.body.style.transition = 'filter 0.4s';
                document.body.style.filter = 'invert(1) hue-rotate(180deg)';
                setTimeout(() => { document.body.style.filter = ''; }, 1600);
                idx = 0;
            }
        } else {
            idx = 0;
        }
    });
})();
