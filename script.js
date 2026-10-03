(() => {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const toggleLabel = toggle.querySelector('.visually-hidden');
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = [...document.querySelectorAll('main .section')];

  /* ---------- Mobile menu ---------- */
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggleLabel.textContent = open ? 'Close menu' : 'Open menu';
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  links.forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Highlight the nav link for the section in view ---------- */
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        if (active) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { threshold: 0.55 });
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Fade sections' content in as they snap into view ---------- */
  const revealTargets = document.querySelectorAll('.section > .container, .brands');
  revealTargets.forEach((el) => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- Brand carousel: duplicate the list for a seamless infinite loop ---------- */
  const track = document.querySelector('.marquee__track');
  [...track.children].forEach((item) => {
    const clone = item.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Pause control (WCAG 2.2.2: moving content must be pausable)
  const marquee = document.querySelector('.marquee');
  const pauseBtn = document.querySelector('.brands__pause');
  pauseBtn.addEventListener('click', () => {
    const paused = marquee.classList.toggle('is-paused');
    pauseBtn.setAttribute('aria-pressed', String(paused));
    pauseBtn.textContent = paused ? 'Play' : 'Pause';
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
