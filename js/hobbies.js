const funToggle = document.getElementById('fun-toggle');
const funReveal = document.getElementById('fun-reveal');

if (funToggle && funReveal) {
  funToggle.addEventListener('click', () => {
    const isHidden = funReveal.hasAttribute('hidden');
    if (isHidden) {
      funReveal.removeAttribute('hidden');
      funToggle.textContent = 'hide ↑';
      funToggle.setAttribute('aria-expanded', 'true');
    } else {
      funReveal.setAttribute('hidden', '');
      funToggle.textContent = 'things i love →';
      funToggle.setAttribute('aria-expanded', 'false');
    }
  });
}
