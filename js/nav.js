// Highlight the nav link for whichever section is currently in view.
(function () {
  const links = Array.from(document.querySelectorAll('nav ul a[data-section]'));
  const byId = Object.fromEntries(links.map(a => [a.dataset.section, a]));
  const sections = links
    .map(a => document.getElementById(a.dataset.section))
    .filter(Boolean);

  function setActive(id) {
    links.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  }

  const observer = new IntersectionObserver((entries) => {
    // pick the most visible section that's intersecting
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) setActive(visible[0].target.id);
  }, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] });

  sections.forEach(s => observer.observe(s));

  // default to first section on load
  if (sections[0]) setActive(sections[0].id);
})();
