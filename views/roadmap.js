const RoadmapView = (function () {
  let _ns     = 'jr';
  let _filter = 'all';

  function _data()    { return _ns === 'jr' ? JR_DATA : ADS_DATA; }
  function _nsLabel() { return _ns === 'jr' ? 'Jornada Dev Júnior' : 'Estudos ADS — 3º semestre'; }

  function _filterButtons() {
    const filters = _ns === 'jr'
      ? [['all','todas'],['base','base'],['fundamentos','fundamentos'],['frontend','frontend'],['backend','backend']]
      : [['all','todas'],['estrutura-dados','estrutura de dados'],['web-react','web/react'],['mysql','MySQL'],['java','Java'],['arquitetura','arquitetura'],['bootcamp','bootcamp'],['vendy','Vendy+']];
    return filters.map(([id, label]) =>
      `<button class="filter-btn ${_filter === id ? 'active' : ''} ${_ns === 'ads' ? 'ads-filter' : ''}" onclick="RoadmapView.setFilter('${id}')">${label}</button>`
    ).join('');
  }

  function _topicTitle(t) {
    return typeof t === 'object' ? t.title : t;
  }

  function _renderTrilhas() {
    const data = _data();
    return data.filter(t => _filter === 'all' || t.id === _filter).map((trilha, idx) => {
      const td  = Store.countDoneTrilha(_ns, trilha);
      const tt  = trilha.modulos.reduce((a, m) => a + m.topicos.length, 0);
      const pct = tt > 0 ? Math.round((td / tt) * 100) : 0;

      const modulosHTML = trilha.modulos.map((mod, mi) => {
        const doneMod = mod.topicos.filter((_, ti) => {
          return Store.getTopic(Store.topicKey(_ns, trilha.id, mi, ti)).done;
        }).length;

        const topicosHTML = mod.topicos.map((t, ti) => {
          const key   = Store.topicKey(_ns, trilha.id, mi, ti);
          const state = Store.getTopic(key);
          const title = _topicTitle(t);
          const statusIcon = state.done ? '✓' : state.contentRead ? '◐' : '';
          return `<div class="topico-item">
            <div class="topico-check ${state.done ? 'done' : ''}" id="rchk_${key}"
              onclick="RoadmapView.toggleDone('${key}','${_ns}')">
              ${statusIcon}
            </div>
            <span class="topico-label ${state.done ? 'done' : ''}"
              onclick="Router.navigate('topic',{ns:'${_ns}',trilhaId:'${trilha.id}',moduloIdx:${mi},topicoIdx:${ti}})"
              style="cursor:pointer">${title}</span>
            ${state.notes ? '<span class="topico-has-note" title="Tem anotação">📝</span>' : ''}
          </div>`;
        }).join('');

        const modId = _ns + '__' + trilha.id + '__mod' + mi;
        return `<div class="modulo">
          <div class="modulo-header" onclick="RoadmapView.toggleMod('${modId}')">
            <span class="mod-chevron" id="mchev_${modId}">▶</span>
            <span class="modulo-name">${mod.name}</span>
            <span class="modulo-count">${doneMod}/${mod.topicos.length}</span>
          </div>
          <div class="topicos-list" id="tlist_${modId}">${topicosHTML}</div>
        </div>`;
      }).join('');

      const trilhaId = _ns + '__' + trilha.id;
      return `<div class="trilha" data-id="${trilha.id}" style="animation-delay:${idx * 0.05}s">
        <div class="trilha-header" onclick="RoadmapView.toggleTrilha('${trilhaId}')">
          <div class="trilha-dot" style="background:${trilha.color}"></div>
          <span class="trilha-title">${trilha.label}</span>
          <span class="trilha-badge" id="bdg_${trilhaId}">${td}/${tt}</span>
          <span class="trilha-pct" id="pce_${trilhaId}">${pct}%</span>
          <span class="chevron open" id="tchev_${trilhaId}">▾</span>
        </div>
        <div class="trilha-mini-bar">
          <div class="trilha-mini-bar-fill" id="mb_${trilhaId}" style="background:${trilha.color};width:${pct}%"></div>
        </div>
        <div class="trilha-body open" id="tbody_${trilhaId}">${modulosHTML}</div>
      </div>`;
    }).join('');
  }

  function _updateStats() {
    const data  = _data();
    const total = Store.countTotal(data);
    const done  = Store.countDone(_ns, data);
    const pct   = total > 0 ? Math.round((done / total) * 100) : 0;

    const pctEl = document.getElementById('rm-pct');
    const feitoEl = document.getElementById('rm-feito');
    const faltaEl = document.getElementById('rm-falta');
    const totalEl = document.getElementById('rm-total');
    const barEl   = document.getElementById('rm-bar');
    const mainPctEl = document.getElementById('rm-main-pct');
    if (pctEl)    pctEl.textContent    = pct + '%';
    if (feitoEl)  feitoEl.textContent  = done;
    if (faltaEl)  faltaEl.textContent  = total - done;
    if (totalEl)  totalEl.textContent  = total;
    if (barEl)    barEl.style.width    = pct + '%';
    if (mainPctEl) mainPctEl.textContent = pct + '%';

    data.forEach(trilha => {
      const td  = Store.countDoneTrilha(_ns, trilha);
      const tt  = trilha.modulos.reduce((a, m) => a + m.topicos.length, 0);
      const p   = tt > 0 ? Math.round((td / tt) * 100) : 0;
      const tid = _ns + '__' + trilha.id;
      const bar = document.getElementById('mb_' + tid);
      const bdg = document.getElementById('bdg_' + tid);
      const pce = document.getElementById('pce_' + tid);
      if (bar) bar.style.width   = p + '%';
      if (bdg) bdg.textContent   = td + '/' + tt;
      if (pce) pce.textContent   = p + '%';
    });
  }

  return {
    render(params = {}) {
      _ns     = params.ns || 'jr';
      _filter = 'all';
      const isAds  = _ns === 'ads';
      const data   = _data();
      const total  = Store.countTotal(data);
      const done   = Store.countDone(_ns, data);
      const pct    = total > 0 ? Math.round((done / total) * 100) : 0;
      const accent = isAds ? 'blue' : 'green';

      document.getElementById('main-content').innerHTML = `
        <div class="view-roadmap">
          <header class="rm-header">
            <div class="rm-header-left">
              <div class="header-tag ${isAds ? 'ads-tag' : ''}">roadmap ativo</div>
              <h1>${_nsLabel()}</h1>
              <p>Clique em qualquer tópico para estudar em profundidade.</p>
            </div>
            <div class="rm-header-right">
              <div class="rm-tab-switcher">
                <button class="rm-tab ${_ns==='jr'?'active':''}" onclick="Router.navigate('roadmap',{ns:'jr'})">🗺️ Junior</button>
                <button class="rm-tab ${_ns==='ads'?'active':''}" onclick="Router.navigate('roadmap',{ns:'ads'})">🎓 ADS</button>
              </div>
              <button class="reset-btn" onclick="RoadmapView.resetSection()">↺ resetar</button>
            </div>
          </header>

          <div class="stats-grid">
            <div class="stat-card highlight${isAds?'-ads':''}">
              <span class="stat-num" id="rm-pct">${pct}%</span>
              <span class="stat-label">progresso</span>
            </div>
            <div class="stat-card">
              <span class="stat-num" id="rm-feito">${done}</span>
              <span class="stat-label">concluídos</span>
            </div>
            <div class="stat-card">
              <span class="stat-num" id="rm-falta">${total - done}</span>
              <span class="stat-label">restantes</span>
            </div>
            <div class="stat-card">
              <span class="stat-num" id="rm-total">${total}</span>
              <span class="stat-label">total</span>
            </div>
          </div>

          <div class="progress-wrap">
            <div class="progress-meta">
              <span class="progress-label">progresso geral</span>
              <span class="progress-pct ${isAds?'ads-pct-text':''}" id="rm-main-pct">${pct}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill ${isAds?'ads-fill':''}" id="rm-bar" style="width:${pct}%"></div>
            </div>
          </div>

          <div class="filter-row">${_filterButtons()}</div>

          <div class="trilhas-container" id="rm-container">
            ${_renderTrilhas()}
          </div>
        </div>`;
    },

    setFilter(f) {
      _filter = f;
      document.getElementById('rm-container').innerHTML = _renderTrilhas();
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.toggle('active', b.textContent.trim().toLowerCase() === (f === 'all' ? 'todas' : f));
      });
    },

    toggleTrilha(id) {
      const body = document.getElementById('tbody_' + id);
      const chev = document.getElementById('tchev_' + id);
      if (body) body.classList.toggle('open');
      if (chev) chev.classList.toggle('open');
    },

    toggleMod(id) {
      const list = document.getElementById('tlist_' + id);
      const chev = document.getElementById('mchev_' + id);
      if (list) list.classList.toggle('open');
      if (chev) chev.classList.toggle('open');
    },

    toggleDone(key, ns) {
      const state = Store.getTopic(key);
      state.done = !state.done;
      if (state.done) {
        state.completedAt = Date.now();
        Store.addXP(20);
        Store.scheduleReview(key);
        Store.checkTopicAchievements();
        Store.updateStreak();
      } else {
        state.completedAt = null;
      }
      Store.saveTopic(key, state);
      const el = document.getElementById('rchk_' + key);
      if (el) {
        el.classList.toggle('done', state.done);
        el.textContent = state.done ? '✓' : '';
      }
      _updateStats();
      Sidebar.refresh();
    },

    resetSection() {
      const label = _ns === 'jr' ? 'Jornada Dev Júnior' : 'Estudos ADS';
      if (!confirm('Resetar todo o progresso de "' + label + '"?')) return;
      const data = _data();
      data.forEach(trilha => {
        trilha.modulos.forEach((mod, mi) => {
          mod.topicos.forEach((_, ti) => {
            const key = Store.topicKey(_ns, trilha.id, mi, ti);
            const fresh = {};
            Store.saveTopic(key, fresh);
          });
        });
      });
      this.render({ ns: _ns });
    }
  };
})();
