/* ── Carousel ─────────────────────────────────────────── */
const track  = document.getElementById('track');
const slides = track.querySelectorAll('.carousel-slide');
const dotsEl = document.getElementById('dots');
let current  = 0;

// Build dots
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `Go to slide ${i + 1}`);
  d.onclick = () => goTo(i);
  dotsEl.appendChild(d);
});

function goTo(idx) {
  current = (idx + slides.length) % slides.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  dotsEl.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function moveCarousel(dir) { goTo(current + dir); }

// Auto-advance every 5 s
setInterval(() => moveCarousel(1), 5000);

/* ── Scroll Reveal ────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
