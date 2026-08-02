/* Meteors — randomized shooting-star streaks layered above the starfield.
   Port of the Aceternity UI "Meteors" effect to vanilla DOM/CSS (no React/Tailwind in this project). */

export function initMeteors(container, count = 20) {
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const m = document.createElement('span');
    m.className = 'meteor';
    m.style.left = Math.floor(Math.random() * 800 - 400) + 'px';
    m.style.animationDelay = (Math.random() * 0.6 + 0.2).toFixed(2) + 's';
    m.style.animationDuration = Math.floor(Math.random() * 8 + 2) + 's';
    frag.appendChild(m);
  }
  container.appendChild(frag);
}
