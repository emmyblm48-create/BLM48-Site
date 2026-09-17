/* =========================================================
   BLM48 — Google Sheet data helpers (News / Schedule / Discography)
   Fetches JSON from the BLM48 Information Apps Script Web App.
   Replace the URL below with your deployed Web App URL.
   ========================================================= */
window.BLM48_DATA_URL = 'https://script.google.com/macros/s/AKfycbyKX1fncf8dJuPWadPk9w-4t0pPnkNPZlFDvUqllC1aJwbqQ4vVdepMcU6fjbTIOHqz/exec';

/* Sheets baked into the code below (HeroBanner / LinkBanners / Discography / Movie) —
   these no longer hit the Apps Script endpoint. Profile, News and Schedule still fetch live.
   To update, re-copy the tab's data from the "BLM48 Information" Google Sheet. */
window.BLM48_STATIC_SHEETS = {
  HeroBanner: [
    {"image":"https://lh3.googleusercontent.com/d/1AKP0H6417zPUssTVn6AaHLgt60X_Bnyg=s1000","title":"","subtitle":"","link":"https://youtu.be/1Vwg1iQUDtc?si=jq78uvQLabZ6j44V","ggDrive":"https://drive.google.com/file/d/1AKP0H6417zPUssTVn6AaHLgt60X_Bnyg/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1XkSXhvxj12xs0btO96uDimqYf1f45VF6=s1000","title":"","subtitle":"","link":"https://www.instagram.com/p/DdV4O3NifhY/?img_index=2","ggDrive":"https://drive.google.com/file/d/1XkSXhvxj12xs0btO96uDimqYf1f45VF6/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1zPOQVsaMgRF63c36CCL-I1WomBkgCblD=s1000","title":"","subtitle":"","link":"https://blm48-app.vercel.app/shop","ggDrive":"https://drive.google.com/file/d/1zPOQVsaMgRF63c36CCL-I1WomBkgCblD/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1WgxPsPXAP8fv1nLfjWi9Vae6O9R1EL3G=s1000","title":"","subtitle":"","link":"https://www.instagram.com/p/Dc8DpKHPilN/","ggDrive":"https://drive.google.com/file/d/1WgxPsPXAP8fv1nLfjWi9Vae6O9R1EL3G/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1erM8L7Ja1P-ATcwooLVHWACPJJnPmakS=s1000","title":"","subtitle":"","link":"https://youtu.be/bhbjo1UWOwU?si=Pihx6x4k6V4KHDbQ","ggDrive":"https://drive.google.com/file/d/1erM8L7Ja1P-ATcwooLVHWACPJJnPmakS/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1UfiAb17cBmh0ArobQ29aqRnn6NCRXPQi=s1000","title":"","subtitle":"","link":"https://blm48-app.vercel.app/","ggDrive":"https://drive.google.com/file/d/1UfiAb17cBmh0ArobQ29aqRnn6NCRXPQi/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1rezOvfDM4d-2EJfX5j2AWPyuUlT2kE5X=s1000","title":"","subtitle":"","link":"https://blm48-app.vercel.app/","ggDrive":"https://drive.google.com/file/d/1rezOvfDM4d-2EJfX5j2AWPyuUlT2kE5X/view?usp=drive_link"}
  ],
  LinkBanners: [
    {"image":"https://lh3.googleusercontent.com/d/1CjxVjPiX4dRvYJOSxdRuW0t9bRRnYuLM=s1000","link":"https://blm48-app.vercel.app/","title":"","ggDrive":"https://drive.google.com/file/d/1CjxVjPiX4dRvYJOSxdRuW0t9bRRnYuLM/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1NMgPrz7lKM1GICLBpHS2v4ji3LGrjOex=s1000","link":"https://www.youtube.com/@blm48official","title":"","ggDrive":"https://drive.google.com/file/d/1NMgPrz7lKM1GICLBpHS2v4ji3LGrjOex/view?usp=drive_link"},
    {"image":"https://lh3.googleusercontent.com/d/1-fTdfoXaYSZCqRgzxQ0Dvl6P3RsrFEvd=s1000","link":"https://www.instagram.com/blm48thecampus/","title":"","ggDrive":"https://drive.google.com/file/d/1-fTdfoXaYSZCqRgzxQ0Dvl6P3RsrFEvd/view?usp=drive_link"}
  ],
  Discography: [
    {"category":"single","kicker":"5TH GEN DEBUT","kickerStyle":"outline","date":"2026-09-05","title":"New Ship","coverImage":"https://lh3.googleusercontent.com/d/1NlFzsvfhexq2-XqMkcbC9QjyX_zdFEv-=s1000","link":"https://youtube.com/playlist?list=PLY9AR7rXs7VQ&si=QQ1a_wG3OcdBcRjA"},
    {"category":"single","kicker":"Single","kickerStyle":"outline","date":"2026-08-10","title":"Sustainable","coverImage":"https://lh3.googleusercontent.com/d/1E1Usx32Bov92lz6_1BbfMqUcA7YwOivz=s1000","link":"https://www.youtube.com/playlist?list=PLPfz4Gco5l40"},
    {"category":"single","kicker":"Digital","kickerStyle":"outline","date":"2026-04-25","title":"Sustainable","coverImage":"https://lh3.googleusercontent.com/d/1Nd5WMn3yZdREl6I_vtdS7JJnYWiC3eYs=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-Bj8Cdm_Tdy9_KtZpkT0Za7&si=LsDw_w8oVdvdsnY4"},
    {"category":"special","kicker":"Special Single","kickerStyle":"gold","date":"2026-04-04","title":"Celebration","coverImage":"https://lh3.googleusercontent.com/d/1f95utx33yfxcFUsr_OlTSt0pZllO-CSi=s1000","link":"https://youtu.be/TAPlWWZMGFQ?si=o_5w0Sq6Yw3QEyaO"},
    {"category":"single","kicker":"9th Single","kickerStyle":"outline","date":"2026-01-31","title":"BINGO!","coverImage":"https://lh3.googleusercontent.com/d/1qXtFoBEr2DdfPDZGiF53ZW_PNytLPBSw=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-DaI6E3Q9uJp4vSXAXBbNaV&si=6-dMx-XkgoavIsl0"},
    {"category":"single","kicker":"Digital","kickerStyle":"outline","date":"2026-01-31","title":"BINGO!","coverImage":"https://lh3.googleusercontent.com/d/1OqH7oOp6AWAVKTNnP2hXDKkfk7o6t9FO=s1000","link":"https://www.youtube.com/watch?v=QaxSjLIxcSE"},
    {"category":"special","kicker":"Special Single","kickerStyle":"gold","date":"2025-12-20","title":"Sasameyuki Regret - ความในใจที่มี Regret","coverImage":"https://lh3.googleusercontent.com/d/1eBeiupo0dGwXd3ramURgVG57LNYtGgxu=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-CltU6zPLvMI53A1Ur_ChF2&si=PsTn_xwrTG34Kaxd"},
    {"category":"special","kicker":"Special Album","kickerStyle":"gold","date":"2025-12-30","title":"Rhythm:You","coverImage":"https://lh3.googleusercontent.com/d/1OdLLWspqoQ4LI6UAXJ4NOkRotcAvdF6S=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-BTerMvI4G1Yj6sNOt7GQwI"},
    {"category":"concert","kicker":"Concert","kickerStyle":"live","date":"2025-11-22","title":"BLM48 Ride The Rhythm Concert [Type B]","coverImage":"https://lh3.googleusercontent.com/d/1LmBiiH9S-466htE4d9qRhYPxs-nQ3U8T=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-BwecC4mVSgOh3SVQY2IGRl"},
    {"category":"concert","kicker":"Concert","kickerStyle":"live","date":"2025-11-22","title":"BLM48 Ride The Rhythm Concert [Type A]","coverImage":"https://lh3.googleusercontent.com/d/1tyq5l8AWA9pkZV2I-t10v57s5VBnEwYJ=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-CfuYmAZur9IgHlCrWTHmXL"},
    {"category":"special","kicker":"Digital","kickerStyle":"gold","date":"2025-11-08","title":"Koisuru Fortune Cookie - คุกกี้เสี่ยงทาย","coverImage":"https://lh3.googleusercontent.com/d/1Bf8DmSlqsGaTMuk_16Ab_-fKL0iw_3xM=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-Cdk1yYitKdlBsI3dng4Rbd&si=YUheBu6GNSzjO10A"},
    {"category":"single","kicker":"4th Gen Debut","kickerStyle":"outline","date":"2025-08-31","title":"Mirai to wa?","coverImage":"https://lh3.googleusercontent.com/d/1ZLoplK_Ms8AkXVTKm8-hG0xFJCHTn5JM=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-BiFp6L0R_Z5ci89ZlqqF5O"},
    {"category":"single","kicker":"8th Single","kickerStyle":"outline","date":"2025-07-07","title":"Flying Get","coverImage":"https://lh3.googleusercontent.com/d/1KTbGFcQkzhzSk_7R66W3zY7DBqDGoJGg=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-AOfi_LFwlyAxMpja6cxzI9"},
    {"category":"album","kicker":"2nd Album","kickerStyle":"gold","date":"2025-03-08","title":"Green Flash","coverImage":"https://lh3.googleusercontent.com/d/1cCYa9MnogcjQkM5cF4LPj1U-vJh-vks_=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-CGvqE4gDAht1qQoBLj0ZKw"},
    {"category":"single","kicker":"7th Single","kickerStyle":"outline","date":"2025-02-01","title":"Koitsun Jatta - หมดใจ...แล้วไง","coverImage":"https://lh3.googleusercontent.com/d/1HyE8KYT_e5BZ-zRno4PZS-fw52a5McpU=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-AvAey0zmU3R0KwLGnOV5ZJ"},
    {"category":"single","kicker":"6th Single","kickerStyle":"outline","date":"2024-12-07","title":"BLM FESTIVAL","coverImage":"https://lh3.googleusercontent.com/d/1-gg0QhiWv6ObRpNLRDXGdAQ8ONCUgFy8=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-DkAwE7R7NxPkl6WDSAMqro"},
    {"category":"special","kicker":"Special Single","kickerStyle":"gold","date":"2024-11-10","title":"Nemo Hamo Rumor","coverImage":"https://lh3.googleusercontent.com/d/1NlkfRX0Jrb1mAikNHmdjbJ92gcl2ZmFX=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-CP_hUiP62h4PvBeuYH36B_"},
    {"category":"special","kicker":"Special Single","kickerStyle":"gold","date":"2024-10-05","title":"Teacher Teacher","coverImage":"https://lh3.googleusercontent.com/d/1o-7aJ0carNdLxifksRcQuulnNSW3Gm37=s1000","link":"https://youtu.be/vrDjBguTDt4?si=-apAF7n-KjB0QveC"},
    {"category":"single","kicker":"5th Single","kickerStyle":"outline","date":"2024-08-25","title":"LOVE TRIP","coverImage":"https://lh3.googleusercontent.com/d/1kHmpWZ2Imt7l6_qGpoE79gQVw1th3bJm=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-Aq0LvzgM-6BZnP69fn2XI3&si=m3vJKQe-Bvl8-53i"},
    {"category":"single","kicker":"3rd Gen Debut","kickerStyle":"outline","date":"2024-07-21","title":"REBORN","coverImage":"https://lh3.googleusercontent.com/d/1CLavdcU9cPvgVNe_DKHyaqa-8Znpf_Kl=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-APmr_ypIufWLvOYdTR9BfK&si=nMYoi5ryDIvwwKJ4"},
    {"category":"single","kicker":"Original Single","kickerStyle":"outline","date":"2024-06-29","title":"POISNED - พิษรัก","coverImage":"https://lh3.googleusercontent.com/d/1VjmYz6vylTf3eDXg_-cM-N_XMw3d1y67=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-Aq0eRfo5iZ61NM93QCLXFz&si=F10rMJGmZtBGku8x"},
    {"category":"single","kicker":"4th Single","kickerStyle":"outline","date":"2024-03-22","title":"Heavy Rotation","coverImage":"https://lh3.googleusercontent.com/d/1i_L8D2Fy4EqpsA6TOvbyfrvJEy1ItKXg=s1000","link":"https://youtube.com/playlist?list=PLIZN3HRIc9-A8QqBKxfIwTeGYjUlclFBn&si=XRmHPxqSDSMExSP6"},
    {"category":"special","kicker":"Special Single","kickerStyle":"gold","date":"2024-02-05","title":"Make Noise","coverImage":"https://lh3.googleusercontent.com/d/1vpQHw0mmk72Swc064LHkKES3l21Tc2lo=s1000","link":"https://youtu.be/CNxk4OvAM-U?si=rz2CfEn47T4r9s-e"},
    {"category":"album","kicker":"1st Album","kickerStyle":"gold","date":"2023-12-02","title":"Warota People - หัวเราะเซ่","coverImage":"https://lh3.googleusercontent.com/d/17fX9Sv3bJQSGZ_Wb3v30W0cjghjAzuLS=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-CyMhOCv0deg6lyccsne5sK"},
    {"category":"single","kicker":"2nd Gen Debut","kickerStyle":"outline","date":"2023-09-30","title":"Tsugi no Season - ฤดูใหม่","coverImage":"https://lh3.googleusercontent.com/d/1JiKRUX1_uR1K5eiP93rSoyPEADcKwerQ=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-DasEzp34K0-SiWf-m0cFTP"},
    {"category":"single","kicker":"3rd Single","kickerStyle":"outline","date":"2023-09-02","title":"Sayonara Crawl","coverImage":"https://lh3.googleusercontent.com/d/1myJZL5Qggh34uOX1n4tziVYBypQZCvNs=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-DH7Yp9Xi_bAdMOAXbUVHpk"},
    {"category":"single","kicker":"2nd Single","kickerStyle":"outline","date":"2023-06-01","title":"Maeshika Mukanee - สุดเส้นทาง","coverImage":"https://lh3.googleusercontent.com/d/1-bwbRuedxPp6tFjbkqv_0D1rZWhGDQ8d=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-DXwouyhTLzU6efqGXy_T3i"},
    {"category":"single","kicker":"1st Single","kickerStyle":"outline","date":"2023-03-14","title":"ดีอะ - D.AAA","coverImage":"https://lh3.googleusercontent.com/d/1Y4osXIzBhSAAt2IVsn_9GNRmHR7HN3uN=s1000","link":"https://www.youtube.com/playlist?list=PLIZN3HRIc9-AVOTfFixnfvl83Bcw3R-Hg"}
  ],
  Movie: [
    {"date":"2026-09-05","note":"5th gen debut song","title":"「NEW SHIP」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/17_oA1gsb5v8B3OdnAqhy_RWaGrrYh-QK=s1000","link":"https://youtu.be/z8E1PEdRCac?si=qQOS7Hhnu_T71vVJ"},
    {"date":"2026-08-16","note":"pre-3rd album","title":"「Suki-ish」 Promotional Video","thumbnail":"https://lh3.googleusercontent.com/d/1cVLuEr53ofCWXbE-A97t0bZ5MFDWHv__=s1000","link":"https://youtu.be/euoIySADf2c?si=6PD3GYd202Ye6phA"},
    {"date":"2026-08-10","note":"10th single C/W","title":"「Kimi wa Motto Dekiru」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/1APdcxbFMY2NVg73HxvGiwx6DvLiapGSo=s1000","link":"https://youtu.be/EDNEaF8ujLw?si=JjJXlUBE0gGliwJC"},
    {"date":"2026-06-25","note":"Special Song","title":"「Nagiichi」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/1yx9L-d9mNZlxuVJ-RMH93sLW0OtYY5mK=s1000","link":"https://youtu.be/bhbjo1UWOwU?si=bwjqCKaWuNP1g5tU"},
    {"date":"2026-06-20","note":"10th single C/W","title":"「Dakishimecha Ikenai - กอดเธอไม่ได้หรอก」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/12oY6a47NtLHsAyqsavAPUw6TSPbYYwRa=s1000","link":"https://youtu.be/f9t5C4K3Wk0?si=pq9u-E0zRNnhRW7H"},
    {"date":"2026-04-25","note":"10th single","title":"「Sustainable」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/1WXp1ZbzQ8ib1gb3imrDGQ7KjnFJZUaOO=s1000","link":"https://youtu.be/1Vwg1iQUDtc?si=MhOKdpthQEuVebdK"},
    {"date":"2026-02-14","note":"BLM48 3rd Generation Special Single","title":"「Celebration」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/11zU0OJFxJ9WFzqQvfrqPJrCUUyG-KJZJ=s1000","link":"https://youtu.be/TAPlWWZMGFQ?si=__iqu3sD3ys8ORsh"},
    {"date":"2025-11-10","note":"9th single C/W","title":"「Sekai no Hito e - ถึงบรรเลง..ถ้อยเพลงของเรา」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/1wD34e9W6bHHuf9SJ_qBf6I_4e-c_oLen=s1000","link":"https://youtu.be/tqFr0QPgqR0?si=Tbdpd6Qz27KNgbXu"},
    {"date":"2025-08-01","note":"9th single C/W","title":"「Eien Pressure - ผูกพันนิรันดร์」 Music Video","thumbnail":"https://lh3.googleusercontent.com/d/1-GMwAgsjKBORWgEHNKPUyecvDRo1w-Gc=s1000","link":"https://youtu.be/-rhmBTZoZk0?si=sPfBNaZs5arpLAnn"}
  ]
};

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

  function cacheGet(key) {
    try {
      var raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function cacheSet(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
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
    if (window.BLM48_STATIC_SHEETS && Object.prototype.hasOwnProperty.call(window.BLM48_STATIC_SHEETS, sheetName)) {
      return window.BLM48_STATIC_SHEETS[sheetName];
    }
    if (!window.BLM48_DATA_URL || window.BLM48_DATA_URL.indexOf('PASTE_YOUR') === 0) {
      throw new Error('BLM48_DATA_URL is not configured yet');
    }
    var cacheKey = 'blm48_cache_sheet_' + sheetName;
    var cached = cacheGet(cacheKey);
    if (cached) return cached;

    var url = window.BLM48_DATA_URL + '?sheet=' + encodeURIComponent(sheetName);
    var res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load sheet: ' + sheetName);
    var data = await res.json();
    var rows = Array.isArray(data) ? data : [];
    cacheSet(cacheKey, rows);
    return rows;
  }

  async function fetchMembers() {
    if (!window.BLM48_DATA_URL || window.BLM48_DATA_URL.indexOf('PASTE_YOUR') === 0) {
      throw new Error('BLM48_DATA_URL is not configured yet');
    }
    var cacheKey = 'blm48_cache_members';
    var cached = cacheGet(cacheKey);
    if (cached) return cached;

    var res = await fetch(window.BLM48_DATA_URL);
    if (!res.ok) throw new Error('Failed to load members');
    var data = await res.json();
    var rows = Array.isArray(data) ? data : [];
    cacheSet(cacheKey, rows);
    return rows;
  }

  window.BLM48Data = {
    fetchSheet: fetchSheet,
    fetchMembers: fetchMembers,
    tagClass: tagClass,
    styleClass: styleClass,
    driveImg: driveImg,
    fmtDate: fmtDate
  };
})();
