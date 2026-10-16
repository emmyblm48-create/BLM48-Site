/* =========================================================
   BLM48 — Shared Header / Footer Injection & Interactions
   Header: a small logo (top-left) and a two-line menu button
   (top-right) that opens a full-screen yellow menu.
   Footer: grey band with two boxed links + copyright; on Home it
   also shows the social circles, logo and the page's .footer-slot.
   ========================================================= */
(function () {
  var LOGO_SRC = 'https://lh3.googleusercontent.com/d/12PFpDx6bOmQpf_UMhhh6ltZwvOAkVyvW=s1000';

  var NAV_LINKS = [
    { href: 'home', page: 'home', label: 'Home' },
    { href: 'news', page: 'news', label: 'News' },
    { href: 'schedule', page: 'schedule', label: 'Schedule' },
    { href: 'profile', page: 'profile', label: 'Profile' },
    { href: 'discography', page: 'discography', label: 'Discography' },
    { href: 'about', page: 'about', label: 'About BLM48' },
    { href: 'cafe', page: 'cafe', label: 'Cafe' },
    { href: 'token', page: 'token', label: 'Token' },
    { href: 'https://blm48-membership.vercel.app/', page: '', label: 'Membership' },
    { href: 'https://blm48-membership.vercel.app/shop', page: '', label: 'Official Shop' }
  ];

  function currentPage() {
    // Links are clean URLs (/news, not /news.html); the site root and index redirect to /home.
    var name = window.location.pathname.split('/').pop().replace('.html', '');
    if (name === 'discography-detail') return 'discography';
    return (name === '' || name === 'index') ? 'home' : name;
  }

  var SOCIAL_LINKS = [
    { href: 'https://www.facebook.com/Blm48official', label: 'Facebook', icon: '<i class="fab fa-facebook-f"></i>' },
    { href: 'https://x.com/BLM48_OFFICIAL', label: 'X', icon: '<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' },
    { href: 'https://www.youtube.com/@blm48official', label: 'YouTube', icon: '<i class="fab fa-youtube"></i>' },
    { href: 'https://www.tiktok.com/@blm48_official', label: 'TikTok', icon: '<i class="fab fa-tiktok"></i>' },
    { href: 'https://www.instagram.com/blm48.official', label: 'Instagram', icon: '<i class="fab fa-instagram"></i>' }
  ];

  function navLinksHTML() {
    // --i orders the staggered fade-in when the menu opens (see site.css .drawer).
    return NAV_LINKS.map(function (l, i) {
      var ext = /^https?:/.test(l.href) ? ' target="_blank" rel="noopener"' : '';
      return '<a href="' + l.href + '" data-page="' + l.page + '" style="--i:' + (i + 1) + '"' + ext + '>' + l.label + '</a>';
    }).join('');
  }

  function socialIconsHTML(cls) {
    return SOCIAL_LINKS.map(function (s) {
      return '<a href="' + s.href + '" target="_blank" rel="noopener"' + (cls ? ' class="' + cls + '"' : '') + ' aria-label="' + s.label + '">' + s.icon + '</a>';
    }).join('');
  }

  function injectHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;

    mount.innerHTML =
      '<header class="site-header">' +
        '<a href="home" class="site-logo" aria-label="BLM48 Home">' +
          '<span class="wordmark" role="img" aria-label="BLM48"></span>' +
        '</a>' +
        '<button type="button" class="drawer-btn" id="navHamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobileNavPanel">' +
          '<span></span><span></span>' +
        '</button>' +
      '</header>' +
      '<div class="drawer" id="mobileNavPanel" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<button type="button" class="drawer-close" id="mobileNavClose" aria-label="Close menu"></button>' +
        '<a href="home" class="drawer-logo">' +
          '<span class="wordmark drawer-logo-word" role="img" aria-label="BLM48"></span>' +
          '<small>Official Site</small>' +
        '</a>' +
        '<div class="drawer-inner">' +
          '<nav class="drawer-links" aria-label="Main navigation">' + navLinksHTML() + '</nav>' +
          '<div class="drawer-sns" style="--i:' + (NAV_LINKS.length + 1) + '">' + socialIconsHTML('') + '</div>' +
          '<div class="drawer-bnr" id="drawerBnr"></div>' +
        '</div>' +
      '</div>';

    markActiveLinks();
    wireHeaderEvents();
    setupHeaderScroll();
  }

  function injectFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;

    // A page can put extra footer content (banners) inside the mount as
    // <div class="footer-slot">; it is moved in under the logo (Home only).
    var slot = mount.querySelector('.footer-slot');

    mount.innerHTML =
      '<footer class="site-foot">' +
        '<div class="foot-inner">' +
          '<div class="foot-sns">' + socialIconsHTML('social-btn-icon') + '</div>' +
          '<div class="foot-logo"><img src="' + LOGO_SRC + '" alt="BLM48"></div>' +
          '<div class="foot-slot" id="footSlot"></div>' +
          '<div class="foot-links">' +
            '<a href="https://blm48-membership.vercel.app/" target="_blank" rel="noopener">BLM48 Membership</a>' +
            '<a href="about">About BLM48</a>' +
          '</div>' +
          '<div class="foot-company">BLM48</div>' +
        '</div>' +
        '<div class="foot-copy">&copy; 2026 BLM48, Inc. All Rights Reserved.</div>' +
      '</footer>' +
      '<button type="button" class="page-top-btn" id="pageTopBtn" aria-label="Page top"><i class="fas fa-arrow-up" aria-hidden="true"></i></button>';

    if (slot) document.getElementById('footSlot').appendChild(slot);

    var topBtn = document.getElementById('pageTopBtn');
    topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    function toggleTop() { topBtn.classList.toggle('show', window.scrollY > 600); }
    toggleTop();
    window.addEventListener('scroll', toggleTop, { passive: true });
  }

  function markActiveLinks() {
    var page = currentPage();
    document.querySelectorAll('.drawer-links a').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });
  }

  // The menu's small banner column reuses the LinkBanners list (sheet-data.js),
  // filled the first time the menu opens since that script loads later.
  function fillDrawerBanners() {
    var box = document.getElementById('drawerBnr');
    var rows = window.BLM48_STATIC_SHEETS && window.BLM48_STATIC_SHEETS.LinkBanners;
    if (!box || box.childElementCount || !rows) return;
    box.innerHTML = rows.slice(0, 3).map(function (r, i) {
      return '<a href="' + (r.link || '#') + '" target="_blank" rel="noopener" style="--i:' + (NAV_LINKS.length + 2 + i) + '"><img src="' + r.image + '" alt="' + (r.title || 'BLM48') + '" loading="lazy"></a>';
    }).join('');
  }

  function closeMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var hamburger = document.getElementById('navHamburger');
    if (panel) panel.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  function openMobileMenu() {
    var panel = document.getElementById('mobileNavPanel');
    var hamburger = document.getElementById('navHamburger');
    fillDrawerBanners();
    if (panel) panel.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function wireHeaderEvents() {
    var hamburger = document.getElementById('navHamburger');
    var closeBtn = document.getElementById('mobileNavClose');
    var panel = document.getElementById('mobileNavPanel');

    if (hamburger) hamburger.addEventListener('click', openMobileMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (panel) {
      panel.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMobileMenu);
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // A soft white backing once the page scrolls, so the fixed logo/menu stay
  // readable over content. On Home the small logo stays hidden over the hero.
  function setupHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var isHome = document.body.classList.contains('home-page');

    function update() {
      var overHero = isHome && window.scrollY < window.innerHeight * 0.85;
      header.classList.toggle('is-scrolled', window.scrollY > 10 && !overHero);
      header.classList.toggle('is-hero', overHero);
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  // Scroll-reveal: any element with class="reveal" (see site.css) fades/lifts
  // in once it enters the viewport, then is left alone. Pages render most of
  // their content asynchronously after a fetch, often well after this script
  // has already run, so a MutationObserver (not a one-time querySelectorAll)
  // is what catches those elements as they're inserted.
  function setupRevealAnimations() {
    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0 && rect.left < window.innerWidth && rect.right > 0;
    }

    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;

    // Content here mostly arrives async (a fetch resolving seconds after
    // this script ran), so a freshly-inserted element is very often already
    // sitting in the viewport the instant it appears - checked directly
    // rather than waiting on IntersectionObserver to catch up, since that
    // can lag well behind a DOM insertion.
    function revealOrWatch(el) {
      if (isInViewport(el)) {
        el.classList.add('is-visible');
      } else if (io) {
        io.observe(el);
      }
    }

    function observeWithin(root) {
      root.querySelectorAll('.reveal:not(.is-visible)').forEach(revealOrWatch);
    }

    observeWithin(document);

    var mo = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        m.addedNodes.forEach(function (node) {
          if (node.nodeType !== 1) return;
          if (node.classList && node.classList.contains('reveal')) revealOrWatch(node);
          if (node.querySelectorAll) observeWithin(node);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Backstop for scroll-triggered reveals in case IntersectionObserver is
    // throttled or unavailable - cheap, rAF-debounced, and only ever looks
    // at elements not yet revealed.
    var scrollCheckQueued = false;
    function scheduleScrollCheck() {
      if (scrollCheckQueued) return;
      scrollCheckQueued = true;
      requestAnimationFrame(function () {
        scrollCheckQueued = false;
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
          if (isInViewport(el)) el.classList.add('is-visible');
        });
      });
    }
    window.addEventListener('scroll', scheduleScrollCheck, { passive: true });
    window.addEventListener('resize', scheduleScrollCheck, { passive: true });
  }

  // Header can be injected immediately (its placeholder is right after <body>).
  injectHeader();

  // Footer placeholder sits at the end of <body>; inject once DOM is ready.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }

  setupRevealAnimations();
})();
