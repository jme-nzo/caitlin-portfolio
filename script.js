(() => {
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('.nav__menu');
  const toggleLabel = toggle.querySelector('.visually-hidden');
  const links = [...document.querySelectorAll('.nav__link')];
  const sections = [...document.querySelectorAll('main .section')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

  // In-page links scroll to their section without adding "#about" etc. to the address
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      target.setAttribute('tabindex', '-1');      // move keyboard focus to the section too
      target.focus({ preventScroll: true });
    });
  });

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

  // Same on-screen speed whatever the screen size (px per second); a little quicker on phones
  const setMarqueeSpeed = () => {
    const pxPerSecond = window.innerWidth < 768 ? 40 : 42;
    track.style.animationDuration = `${track.scrollWidth / 2 / pxPerSecond}s`;
  };
  setMarqueeSpeed();
  window.addEventListener('load', setMarqueeSpeed);
  window.addEventListener('resize', setMarqueeSpeed);

  /* ---------- Project videos: autoplay (muted) while on screen, with a sound toggle ---------- */
  const videos = [...document.querySelectorAll('.project__video')];
  const ICON_MUTED = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M17 9l5 6M22 9l-5 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  const ICON_SOUND = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  const setSound = (video, on) => {
    video.muted = !on;
    const btn = video.parentElement.querySelector('.sound-btn');
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', `${on ? 'Mute' : 'Unmute'} ${video.getAttribute('aria-label')}`);
    btn.innerHTML = on ? ICON_SOUND : ICON_MUTED;
  };

  videos.forEach((video) => {
    video.muted = true; // muted is required for autoplay on every browser
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'sound-btn';
    video.after(btn);
    setSound(video, false);

    btn.addEventListener('click', () => {
      const turnOn = video.muted;
      if (turnOn) videos.forEach((v) => v !== video && setSound(v, false)); // only one video with sound at a time
      setSound(video, turnOn);
      if (video.paused) video.play().catch(() => {});
    });

    // Tapping the video itself pauses / resumes it
    video.addEventListener('click', () => (video.paused ? video.play().catch(() => {}) : video.pause()));
  });

  // Only videos on screen play, so 15 videos never download or run at once
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting && !reduceMotion.matches) {
        target.preload = 'auto';
        target.play().catch(() => {});
      } else if (!isIntersecting) {
        target.pause();
      }
    });
  }, { threshold: 0.6 });
  videos.forEach((v) => videoObserver.observe(v));

  /* ---------- Project rows (mobile): faint arrows show which way there's more to swipe ---------- */
  document.querySelectorAll('.projects-scroller').forEach((scroller) => {
    const list = scroller.querySelector('.projects');
    const prev = scroller.querySelector('.swipe-hint--prev');
    const next = scroller.querySelector('.swipe-hint--next');
    const update = () => {
      const max = list.scrollWidth - list.clientWidth;
      prev.classList.toggle('is-visible', list.scrollLeft > 8);
      next.classList.toggle('is-visible', list.scrollLeft < max - 8);
    };
    list.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
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
