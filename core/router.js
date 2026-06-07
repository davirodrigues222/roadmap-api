const Router = (function () {
  const _views   = {};
  let   _current = null;
  let   _params  = {};

  function _parseHash(hash) {
    const clean = hash.replace(/^#\/?/, '') || 'dashboard';
    const parts = clean.split('/');
    return { view: parts[0], segments: parts.slice(1) };
  }

  return {
    register(name, renderFn) {
      _views[name] = renderFn;
    },

    navigate(view, params = {}) {
      if (!_views[view]) { console.warn('View não registrada:', view); return; }
      _current = view;
      _params  = params;

      const seg = Object.values(params).join('/');
      window.location.hash = seg ? `${view}/${seg}` : view;

      document.getElementById('main-content').scrollTop = 0;
      _views[view](params);
      Sidebar.setActive(view);
    },

    current() { return _current; },
    params()  { return _params;  },

    init() {
      const { view, segments } = _parseHash(window.location.hash);
      const params = {};
      if (view === 'topic' && segments.length >= 4) {
        params.ns        = segments[0];
        params.trilhaId  = segments[1];
        params.moduloIdx = parseInt(segments[2]);
        params.topicoIdx = parseInt(segments[3]);
      } else if (view === 'roadmap' && segments.length >= 1) {
        params.ns = segments[0];
      } else if (view === 'exercises' && segments.length >= 1) {
        params.filter = segments[0];
      }

      _current = view;
      _params  = params;
      _views[view] ? _views[view](params) : _views['dashboard']({});
      Sidebar.setActive(_current);

      window.addEventListener('hashchange', () => {
        const parsed = _parseHash(window.location.hash);
        if (parsed.view === _current) return;
        this.navigate(parsed.view, {});
      });
    }
  };
})();
