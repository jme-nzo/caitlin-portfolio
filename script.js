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
  }, { rootMargin: '-50% 0px -50% 0px' }); // active = whichever section crosses the middle of the screen
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

  /* ---------- Project sliders (mobile): arrow buttons scroll one video at a time ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.project-group').forEach((group) => {
    const list = group.querySelector('.projects');
    const [prev, next] = group.querySelectorAll('.slider-btn');

    const step = () => {
      const card = list.querySelector('.project');
      return card.offsetWidth + parseFloat(getComputedStyle(list).columnGap || 0);
    };
    const update = () => {
      const max = list.scrollWidth - list.clientWidth - 2;
      prev.disabled = list.scrollLeft <= 2;
      next.disabled = list.scrollLeft >= max;
    };

    [prev, next].forEach((btn) => btn.addEventListener('click', () => {
      list.scrollBy({ left: step() * Number(btn.dataset.dir), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }));
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* ---------- TEMP: Palette switcher (remove once a palette is chosen) ---------- */
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const paletteButtons = document.querySelectorAll('[data-set-palette]');
  const applyPalette = (p) => {
    document.documentElement.dataset.palette = p;
    paletteButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setPalette === p)));
    themeColor.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
    const url = new URL(location.href);
    url.searchParams.set('palette', p);
    history.replaceState(null, '', url);
  };
  paletteButtons.forEach((b) => b.addEventListener('click', () => applyPalette(b.dataset.setPalette)));
  applyPalette(document.documentElement.dataset.palette || '1');

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
