const Sync = (function () {
  let _apiUrl = null;
  let _timer  = null;
  let _ready  = false;

  function _allRdxKeys() {
    const snap = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('rdx_')) snap[k] = localStorage.getItem(k);
    }
    return snap;
  }

  function _setStatus(s) {
    const el = document.getElementById('sync-status');
    if (!el) return;
    if      (s === 'syncing') { el.textContent = '↑ sincronizando...'; el.className = 'sb-sync syncing'; }
    else if (s === 'ok')      { el.textContent = '✓ salvo na nuvem';   el.className = 'sb-sync ok'; }
    else if (s === 'error')   { el.textContent = '⚠ sem conexão';      el.className = 'sb-sync error'; }
    else                      { el.textContent = '';                    el.className = 'sb-sync'; }
  }

  async function _push() {
    if (!_apiUrl || !_ready) return;
    _setStatus('syncing');
    try {
      const res = await fetch(_apiUrl + '/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: _allRdxKeys() })
      });
      _setStatus(res.ok ? 'ok' : 'error');
    } catch {
      _setStatus('error');
    }
    setTimeout(() => _setStatus('idle'), 3000);
  }

  return {
    async init(apiUrl) {
      if (!apiUrl || apiUrl.includes('YOUR_')) return;
      _apiUrl = apiUrl;
      try {
        const res = await fetch(apiUrl + '/progress');
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        if (data && Object.keys(data).length > 0) {
          Object.entries(data).forEach(([k, v]) => localStorage.setItem(k, v));
          Store.load();
        }
        _ready = true;
      } catch (e) {
        console.warn('[Sync] init falhou:', e.message);
      }
    },

    schedule() {
      if (!_ready) return;
      clearTimeout(_timer);
      _timer = setTimeout(_push, 3000);
    },

    pushNow() { _push(); }
  };
})();
