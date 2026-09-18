/* =========================================================
   BLM48 — Shared Header / Footer Injection & Interactions
   ========================================================= */
(function () {
  var NAV_LINKS = [
    { href: 'index.html', page: 'index', label: 'Home' },
    { href: 'news.html', page: 'news', label: 'News' },
    { href: 'schedule.html', page: 'schedule', label: 'Schedule' },
    { href: 'profile.html', page: 'profile', label: 'Profile' },
    { href: 'discography.html', page: 'discography', label: 'Discography' },
    { href: 'shop.html', page: 'shop', label: 'Shop' },
    { href: 'about.html', page: 'about', label: 'About' }
  ];

  function currentPage() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var name = path.replace('.html', '');
    return name === '' ? 'index' : name;
  }

  var SOCIAL_LINKS = [
    { href: 'https://www.facebook.com/Blm48official', label: 'Facebook', icon: '<i class="fab fa-facebook-f"></i>' },
    { href: 'https://x.com/BLM48_OFFICIAL', label: 'X', icon: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { href: 'https://www.youtube.com/@blm48official', label: 'YouTube', icon: '<i class="fab fa-youtube"></i>' },
    { href: 'https://www.tiktok.com/@blm48_official', label: 'TikTok', icon: '<i class="fab fa-tiktok"></i>' },
    { href: 'https://www.instagram.com/blm48.official', label: 'Instagram', icon: '<i class="fab fa-instagram"></i>' }
  ];

  function navLinksHTML(linkClass) {
    return NAV_LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="' + linkClass + '" data-page="' + l.page + '">' + l.label + '</a>';
    }).join('');
  }

  function socialIconsHTML(extraClass) {
    var cls = 'social-btn-icon' + (extraClass ? ' ' + extraClass : '');
    return SOCIAL_LINKS.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener" class="' + cls + '" aria-label="' + s.label + '">' + s.icon + '</a>';
    }).join('');
  }

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<header class="site-header">' +
        '<div class="site-header-inner">' +
          '<a href="index.html" class="site-logo">' +
            '<img class="logo-img" src="https://lh3.googleusercontent.com/d/12PFpDx6bOmQpf_UMhhh6ltZwvOAkVyvW=s1000" alt="BLM48">' +
            '<span class="logo-sub">Official Site</span>' +
          '</a>' +
          '<nav class="site-nav" aria-label="Main navigation">' + navLinksHTML('') + '</nav>' +
          '<div class="header-actions">' +
            '<a href="https://blm48-membership.vercel.app/" class="header-cta">Membership</a>' +
            '<button type="button" class="nav-hamburger" id="navHamburger" aria-label="Open menu" aria-expanded="false">' +
              '<span class="nav-hamburger-bars"><span></span><span></span><span></span></span>' +
              '<span class="nav-hamburger-label">Menu</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</header>' +
      '<div class="mobile-nav-backdrop" id="mobileNavBackdrop"></div>' +
      '<aside class="mobile-nav-panel" id="mobileNavPanel">' +
        '<button type="button" class="mobile-nav-close" id="mobileNavClose" aria-label="Close menu"><i class="fas fa-xmark" aria-hidden="true"></i></button>' +
        '<nav class="mobile-nav-links" aria-label="Mobile navigation">' + navLinksHTML('') + '</nav>' +
        '<div class="mobile-nav-social">' + socialIconsHTML() + '</div>' +
        '<a href="https://blm48-membership.vercel.app/" class="mobile-nav-cta">Membership</a>' +
      '</aside>';

    markActiveLinks();
    wireHeaderEvents();
    setupHeaderScroll();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    mount.innerHTML =
      '<footer class="ske-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-social-row">' + socialIconsHTML() + '</div>' +
          '<div class="footer-emblem">' +
            '<img src="https://lh3.googleusercontent.com/d/12PFpDx6bOmQpf_UMhhh6ltZwvOAkVyvW=s1000" alt="BLM48">' +
          '</div>' +
          '<div class="footer-link-grid">' +
            '<a class="footer-link-box" href="news.html">News</a>' +
            '<a class="footer-link-box" href="schedule.html">Schedule</a>' +
            '<a class="footer-link-box" href="profile.html">Profile</a>' +
            '<a class="footer-link-box" href="discography.html">Discography</a>' +
          '</div>' +
          '<div class="footer-link-grid footer-link-grid-secondary">' +
            '<a class="footer-link-box" href="shop.html">Shop</a>' +
            '<a class="footer-link-box" href="about.html">About BLM48</a>' +
            '<a class="footer-link-box" href="https://blm48-membership.vercel.app/" target="_blank" rel="noopener">Membership</a>' +
          '</div>' +
          '<div class="footer-brand-name">BLM48</div>' +
          '<div class="footer-bottom-row">' +
            '<div class="copyright-text">&copy; 2026 BLM48, Inc. All Rights Reserved.</div>' +
            '<button type="button" class="page-top-btn" id="pageTopBtn">' +
              '<span>Page Top</span><i class="fas fa-arrow-up" aria-hidden="true"></i>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</footer>';

    var topBtn = document.getElementById('pageTopBtn');
    if (topBtn) {
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.site-nav a, .mobile-nav-links a').forEach(function (a) {
      if (a.getAttribute('data-page') === page) {
        a.classList.add('active');
      }
    });
  }

  function closeMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var hamburger = document.getElementById('navHamburger');
    if (panel) panel.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var hamburger = document.getElementById('navHamburger');
    if (panel) panel.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function wireHeaderEvents() {
    var hamburger = document.getElementById('navHamburger');
    var closeBtn = document.getElementById('mobileNavClose');
    var backdrop = document.getElementById('mobileNavBackdrop');
    var panel = document.getElementById('mobileNavPanel');

    if (hamburger) hamburger.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
    if (panel) {
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // On desktop, start with a compact bar (logo + menu button only); once the
  // page scrolls past the hero, swap in the full inline nav links.
  function setupHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var threshold = 60;

    function update() {
      header.classList.toggle('nav-top', window.scrollY <= threshold);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  // Footer placeholder sits at the end of <body>; inject once DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
