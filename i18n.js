/* =========================================================
   BLM48 — Language Dictionary & Apply Helper
   Supported: th (default), en, ja
   ========================================================= */
(function (window) {
  var STORAGE_KEY = 'blm48_lang';
  var DEFAULT_LANG = 'en';

  var translations = {
    th: {
      nav_home: "หน้าแรก",
      nav_about: "เกี่ยวกับเรา",
      nav_profile: "โปรไฟล์สมาชิก",
      nav_theater: "โรงละคร",
      nav_discography: "ผลงานเพลง",
      nav_membership: "สมาชิกเมมเบอร์ชิพ",
      nav_news: "ข่าวสาร",
      nav_schedule: "ตารางกิจกรรม",
      badge_release: "วางจำหน่าย",

      footer_privacy: "นโยบายความเป็นส่วนตัว",
      footer_terms: "ข้อกำหนดการใช้งาน",
      footer_contact: "ติดต่อเรา",
      footer_rights: "สงวนลิขสิทธิ์ทุกประการ",
      footer_pagetop: "กลับด้านบน",
      ticker_label: "ตารางกิจกรรมวันนี้",

      today_label: "วันนี้ของ BLM48",
      schedule_top: "ดูตารางกิจกรรมทั้งหมด",
      badge_media: "สื่อ",
      badge_live: "ไลฟ์",
      badge_event: "อีเวนต์",
      birthday_label: "วันเกิดประจำเดือน",
      birthday_empty: "เดือนนี้ไม่มีเมมเบอร์วันเกิด",
      news_title: "ข่าวสาร",
      schedule_title: "ตารางกิจกรรม",
      more_label: "ดูเพิ่มเติม",
      video_title: "วิดีโอ",
      video_tag: "ช่องยูทูปทางการ BLM48",
      group_title: "เครือข่าย AKB48 Group",
      members_title: "สมาชิก",
      members_cta: "ดูสมาชิกทั้งหมด",

      about_header: "เกี่ยวกับเรา",
      about_p1: "BLM48 คือกลุ่มคัฟเวอร์ไอดอลชายและหญิงของเครือข่าย AKB48Group",
      about_p2: "BLM48 (Blooming48) คือกลุ่มไอดอลเสมือนจริงที่คัฟเวอร์เพลงจากศิลปินในเครือ AKB48 Group โดยถ่ายทอดเสน่ห์และจิตวิญญาณของบทเพลง 48Group ผ่านแพลตฟอร์มเสมือนจริงอย่าง ZEPETO",
      about_p3: "คำว่า “Blooming” สื่อถึงการเติบโต พัฒนาการ และช่วงเวลาที่ความฝันเริ่มเบ่งบาน BLM48 จึงเป็นพื้นที่สร้างสรรค์ที่สมาชิกได้เรียนรู้ แสดงออกถึงตัวตน และเติบโตไปพร้อมกับเหล่าแฟนคลับ",
      about_p4: "กลุ่มมุ่งเน้นการแสดงคัฟเวอร์ที่ให้เกียรติต้นฉบับ พร้อมนำเสนอในสไตล์ที่สดใหม่ เข้าถึงง่าย และทันสมัย ด้วยการเชื่อมโยงวัฒนธรรมไอดอลญี่ปุ่นเข้ากับชุมชนดิจิทัล BLM48 มุ่งมั่นส่งต่อพลังบวก ความฝัน และรอยยิ้มสู่ผู้ชมทุกที่",
      about_slogan: "BLM48 – ที่ซึ่งไอดอลเบ่งบานในโลกเสมือนจริง",

      profile_header: "โปรไฟล์สมาชิก",
      tab_all: "ทั้งหมด",
      tab_bloom: "ทีม Bloom",
      tab_trainee: "เด็กฝึกหัด",
      loading_text: "กำลังโหลดข้อมูล BLM48...",
      back_btn: "ย้อนกลับ",
      btn_profile: "โปรไฟล์",
      label_generation: "รุ่น",
      label_team: "ทีม",
      label_birthday: "วันเกิด",
      label_oshimark: "โอชิมาร์ค",
      label_province: "จังหวัด",
      label_bloodtype: "กรุ๊ปเลือด",
      label_mbti: "MBTI",
      label_like: "สิ่งที่ชอบ",
      label_hobby: "งานอดิเรก",

      theater_header: "โรงละคร",
      pos_shihainin: "ผู้จัดการ",
      pos_vice_shihainin: "รองผู้จัดการ",
      team_bloom_label: "ทีม Bloom",
      trainee_label: "เด็กฝึกหัด",
      captain_badge: "กัปตันทีม Bloom",

      disco_header: "ผลงานเพลง",
      filter_all: "ทั้งหมด",
      filter_single: "ซิงเกิล",
      filter_album: "อัลบั้ม",
      filter_special: "พิเศษ",
      filter_concert: "คอนเสิร์ต",
      watch_mv: "ชม MV"
    },

    en: {
      nav_home: "HOME",
      nav_about: "ABOUT BLM48?",
      nav_profile: "PROFILE",
      nav_theater: "THEATER",
      nav_discography: "DISCOGRAPHY",
      nav_membership: "BLM48 MEMBERSHIP",
      nav_news: "NEWS",
      nav_schedule: "SCHEDULE",
      badge_release: "RELEASE",

      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_contact: "Contact Us",
      footer_rights: "All Rights Reserved.",
      footer_pagetop: "PAGE TOP",
      ticker_label: "TODAY'S SCHEDULE",

      today_label: "TODAY'S BLM48",
      schedule_top: "SCHEDULE TOP",
      badge_media: "MEDIA",
      badge_live: "LIVE",
      badge_event: "EVENT",
      birthday_label: "BIRTHDAY THIS MONTH",
      birthday_empty: "No birthdays this month",
      news_title: "NEWS",
      schedule_title: "SCHEDULE",
      more_label: "MORE",
      video_title: "VIDEO",
      video_tag: "BLM48 Official Channel",
      group_title: "AKB48 Group",
      members_title: "MEMBERS",
      members_cta: "SEE ALL MEMBERS",

      about_header: "ABOUT",
      about_p1: "BLM48 is The Male & Female Cover Group of AKB48Group.",
      about_p2: "BLM48 (Blooming48) is a virtual idol cover group inspired by the AKB48 Group, bringing the charm and spirit of 48Group songs to life through the virtual platform ZEPETO.",
      about_p3: "The word “Blooming” represents growth, development, and the moment when dreams begin to blossom. BLM48 serves as a creative space where members can learn, express themselves, and grow together alongside their fans.",
      about_p4: "The group focuses on delivering cover performances that respect the original works, while presenting them in a fresh, accessible, and modern style. By connecting Japanese idol culture with a digital community, BLM48 aims to share positive energy, dreams, and smiles with audiences everywhere.",
      about_slogan: "BLM48 – Where idols bloom in the virtual world.",

      profile_header: "PROFILE",
      tab_all: "ALL",
      tab_bloom: "Team Bloom",
      tab_trainee: "Trainee",
      loading_text: "LOADING BLM48...",
      back_btn: "BACK",
      btn_profile: "PROFILE",
      label_generation: "Generation",
      label_team: "Team",
      label_birthday: "Birthday",
      label_oshimark: "Oshimark",
      label_province: "Province",
      label_bloodtype: "Blood Type",
      label_mbti: "MBTI",
      label_like: "Like",
      label_hobby: "Hobby",

      theater_header: "THEATER",
      pos_shihainin: "Shihainin",
      pos_vice_shihainin: "Vice Shihainin",
      team_bloom_label: "Team Bloom",
      trainee_label: "Trainee",
      captain_badge: "Captain Team Bloom",

      disco_header: "DISCOGRAPHY",
      filter_all: "ALL",
      filter_single: "SINGLE",
      filter_album: "ALBUM",
      filter_special: "SPECIAL",
      filter_concert: "CONCERT",
      watch_mv: "WATCH MV"
    },

    ja: {
      nav_home: "ホーム",
      nav_about: "概要",
      nav_profile: "メンバー",
      nav_theater: "劇場",
      nav_discography: "ディスコグラフィー",
      nav_membership: "BLM48 MEMBERSHIP",   
      nav_news: "ニュース",
      nav_schedule: "スケジュール",
      badge_release: "リリース",

      footer_privacy: "プライバシーポリシー",
      footer_terms: "利用規約",
      footer_contact: "お問い合わせ",
      footer_rights: "無断複写・転載を禁じます。",
      footer_pagetop: "ページトップ",
      ticker_label: "本日のスケジュール",

      today_label: "本日のBLM48",
      schedule_top: "スケジュール一覧",
      badge_media: "メディア",
      badge_live: "ライブ",
      badge_event: "イベント",
      birthday_label: "今月の誕生日",
      birthday_empty: "今月誕生日のメンバーはいません",
      news_title: "ニュース",
      schedule_title: "スケジュール",
      more_label: "もっと見る",
      video_title: "ビデオ",
      video_tag: "BLM48公式チャンネル",
      group_title: "AKB48グループ",
      members_title: "メンバー",
      members_cta: "メンバー一覧を見る",

      about_header: "概要",
      about_p1: "BLM48は、AKB48グループの男女混合カバーグループです。",
      about_p2: "BLM48(Blooming48)はAKB48グループにインスパイアされたバーチャルアイドルカバーグループで、バーチャルプラットフォーム「ZEPETO」を通じて48グループ楽曲の魅力と精神を届けています。",
      about_p3: "「Blooming(ブルーミング)」という言葉は、成長と発展、そして夢が花開く瞬間を表しています。BLM48はメンバーが学び、自分を表現し、ファンと共に成長していく創造的な場所です。",
      about_p4: "グループはオリジナル作品へのリスペクトを大切にしながら、新鮮で親しみやすく、モダンなスタイルでカバーパフォーマンスを届けることに注力しています。日本のアイドル文化とデジタルコミュニティをつなぐことで、BLM48は前向きなエネルギーと夢、そして笑顔を世界中の観客と分かち合うことを目指しています。",
      about_slogan: "BLM48 – アイドルがバーチャルの世界で花開く場所。",

      profile_header: "メンバープロフィール",
      tab_all: "すべて",
      tab_bloom: "チームBloom",
      tab_trainee: "研究生",
      loading_text: "読み込み中...",
      back_btn: "戻る",
      btn_profile: "プロフィール",
      label_generation: "期生",
      label_team: "チーム",
      label_birthday: "誕生日",
      label_oshimark: "推しマーク",
      label_province: "出身",
      label_bloodtype: "血液型",
      label_mbti: "MBTI",
      label_like: "好きなもの",
      label_hobby: "趣味",

      theater_header: "劇場",
      pos_shihainin: "支配人",
      pos_vice_shihainin: "副支配人",
      team_bloom_label: "チームBLOOM",
      trainee_label: "研究生",
      captain_badge: "キャプテン",

      disco_header: "ディスコグラフィー",
      filter_all: "すべて",
      filter_single: "シングル",
      filter_album: "アルバム",
      filter_special: "スペシャル",
      filter_concert: "コンサート",
      watch_mv: "MVを見る"
    }
  };

  function getLang() {
    try {
      var saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && translations[saved]) return saved;
    } catch (e) {}
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  function t(key, lang) {
    lang = lang || getLang();
    var dict = translations[lang] || translations[DEFAULT_LANG];
    return dict[key] || translations[DEFAULT_LANG][key] || key;
  }

  function applyLang(lang) {
    if (!translations[lang]) lang = DEFAULT_LANG;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder'), lang));
    });

    document.dispatchEvent(new CustomEvent('blm48:langchange', { detail: { lang: lang } }));
  }

  window.BLM48_I18N = {
    translations: translations,
    getLang: getLang,
    setLang: setLang,
    applyLang: applyLang,
    t: t
  };
})(window);
