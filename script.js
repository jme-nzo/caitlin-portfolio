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

  /* ---------- Navbar takes on the colours of the section beneath it ---------- */
  const header = document.querySelector('.site-header');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const navVars = ['--bg', '--ink', '--line', '--accent'];
  let navSection = null;

  const updateNavTheme = () => {
    const y = header.offsetHeight / 2;
    const section = sections.find((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= y && r.bottom > y;
    }) || sections[0];
    if (section === navSection) return;
    navSection = section;
    const styles = getComputedStyle(section);
    navVars.forEach((v) => header.style.setProperty(v, styles.getPropertyValue(v).trim()));
    themeColor.content = styles.getPropertyValue('--bg').trim();
  };

  window.addEventListener('scroll', updateNavTheme, { passive: true });
  window.addEventListener('resize', updateNavTheme);
  updateNavTheme();

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
