/* =========================================================
   BLM48 — Google Sheet data helpers (News / Schedule / Discography)
   Fetches JSON from the BLM48 Information Apps Script Web App.
   Replace the URL below with your deployed Web App URL.
   ========================================================= */
window.BLM48_DATA_URL = 'https://script.google.com/macros/s/AKfycbyKX1fncf8dJuPWadPk9w-4t0pPnkNPZlFDvUqllC1aJwbqQ4vVdepMcU6fjbTIOHqz/exec';

(function () {
  var TAG_KICKER_CLASS = {
    release: 'kicker-gold',
    event: 'kicker-outline',
    media: 'kicker-outline',
    live: 'kicker-live'
  };

  var STYLE_KICKER_CLASS = {
    gold: 'kicker-gold',
    outline: 'kicker-outline',
    live: 'kicker-live',
    dark: 'kicker-dark'
  };

  function tagClass(tag) {
    var key = String(tag || '').trim().toLowerCase();
    return TAG_KICKER_CLASS[key] || 'kicker-outline';
  }

  function styleClass(style) {
    var key = String(style || '').trim().toLowerCase();
    return STYLE_KICKER_CLASS[key] || 'kicker-outline';
  }

  function driveImg(url, fallback) {
    fallback = fallback || 'https://via.placeholder.com/600x600?text=BLM48';
    if (!url) return fallback;
    if (url.indexOf('drive.google.com') !== -1) {
      var m = url.match(/[-\w]{25,}/);
      return m ? 'https://lh3.googleusercontent.com/u/0/d/' + m[0] : url;
    }
    return url;
  }

  function fmtDate(value) {
    var d = value instanceof Date ? value : new Date(value);
    if (isNaN(d)) {
      return { weekday: '', short: '', full: String(value || ''), time: 0 };
    }
    return {
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      short: d.getDate() + ' ' + d.toLocaleDateString('en-US', { month: 'short' }) + ' ' + String(d.getFullYear()).slice(-2),
      full: d.toLocaleDateString('en-CA').replace(/-/g, '.'),
      time: d.getTime()
    };
  }

  async function fetchSheet(sheetName) {
    if (!window.BLM48_DATA_URL || window.BLM48_DATA_URL.indexOf('PASTE_YOUR') === 0) {
      throw new Error('BLM48_DATA_URL is not configured yet');
    }
    var url = window.BLM48_DATA_URL + '?sheet=' + encodeURIComponent(sheetName);
    var res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load sheet: ' + sheetName);
    var data = await res.json();
    return Array.isArray(data) ? data : [];
  }

  window.BLM48Data = {
    fetchSheet: fetchSheet,
    tagClass: tagClass,
    styleClass: styleClass,
    driveImg: driveImg,
    fmtDate: fmtDate
  };
})();
