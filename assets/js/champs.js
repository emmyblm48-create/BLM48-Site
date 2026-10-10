/* =========================================================
   BLM48 — Champ of the Month data (from the Membership app)
   Shared by the Home page (hero + Champ grid) and champ.html.
   ========================================================= */
(function () {
  // Same public anon key the Membership app (blm48-membership.vercel.app) ships client-side.
  // Every table behind it is RLS-locked with zero policies - the anon key can only call
  // read-only RPCs like this one, never touch a table directly.
  var SUPABASE_URL = 'https://rqhwzbrcgnpxtuaeoxml.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxaHd6YnJjZ25weHR1YWVveG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUyMjczNjAsImV4cCI6MjEwMDgwMzM2MH0.J0iiUikxLoJKZ5SF9KSz86yf2LU89z8NdPb9rEB89Gw';
  var APP_URL = 'https://blm48-membership.vercel.app';

  // One request per page, however many sections ask for it. Newest month first.
  var champsPromise = null;
  function fetchChamps() {
    if (!champsPromise) {
      champsPromise = fetch(SUPABASE_URL + '/rest/v1/rpc/get_champ_of_the_month', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Content-Type': 'application/json'
        },
        body: '{}'
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          return (json && json.status === 'success' && Array.isArray(json.data))
            ? json.data.filter(function (c) { return (c.groupName || 'BLM48') === 'BLM48'; })
            : [];
        })
        .catch(function () { return []; });
    }
    return champsPromise;
  }

  // The champ's special-thanks post in the Membership app, or the ranking page if none.
  function postHref(champ) {
    return champ && champ.postId
      ? APP_URL + '/postdetail?id=' + encodeURIComponent(champ.postId)
      : APP_URL + '/champranking';
  }

  window.BLM48Champs = { fetch: fetchChamps, postHref: postHref, rankingHref: APP_URL + '/champranking' };
})();
