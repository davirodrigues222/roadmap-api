const ReviewsView = (function () {
  let _current = null;
  let _queue   = [];
  let _done    = 0;

  function _findTopic(key) {
    const datasets = [['jr', JR_DATA], ['ads', ADS_DATA]];
    for (const [ns, data] of datasets) {
      for (const trilha of data) {
        for (let mi = 0; mi < trilha.modulos.length; mi++) {
          const mod = trilha.modulos[mi];
          for (let ti = 0; ti < mod.topicos.length; ti++) {
            const k = Store.topicKey(ns, trilha.id, mi, ti);
            if (k === key) return { ns, trilha, mod, mi, topico: mod.topicos[ti], ti };
          }
        }
      }
    }
    return null;
  }

  function _topicTitle(t) { return typeof t === 'object' ? t.title : t; }

  function _reviewCard(rev) {
    const found = _findTopic(rev.key);
    if (!found) return '';
    const { ns, trilha, mod, mi, ti } = found;
    const title = _topicTitle(found.topico);
    const diff  = Math.floor((new Date() - new Date(rev.nextDate + 'T00:00:00')) / 86400000);
    const badge = diff === 0 ? 'hoje' : diff < 0 ? `em ${Math.abs(diff)} dia${Math.abs(diff)>1?'s':''}` : `${diff} dia${diff>1?'s':''} atrasado`;
    const cls   = diff >= 0 ? 'due' : 'future';
    return `<div class="rev-card ${cls}">
      <div class="rev-card-header">
        <div>
          <span class="rev-card-title">${title}</span>
          <span class="rev-card-mod">${trilha.label} › ${mod.name}</span>
        </div>
        <span class="rev-badge ${cls}">${badge}</span>
      </div>
      <div class="rev-card-meta">
        <span>intervalo atual: ${rev.interval} dia${rev.interval>1?'s':''}</span>
        <span>revisões: ${rev.count}</span>
      </div>
      <div class="rev-card-actions">
        <button class="btn-primary" onclick="ReviewsView.startSession('${rev.key}')">Revisar agora →</button>
        <button class="btn-ghost btn-sm" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${mi},topicoIdx:${ti}})">ver tópico</button>
      </div>
    </div>`;
  }

  function _sessionHTML() {
    const found = _findTopic(_current);
    if (!found) return '';
    const { ns, trilha, mod, mi, ti } = found;
    const topico = found.topico;
    const title  = _topicTitle(topico);
    const data   = typeof topico === 'object' ? topico : null;

    const resumo = data && data.conteudo ? data.conteudo.resumo : 'Revise mentalmente o que você sabe sobre este tópico.';
    const conceitos = data && data.conteudo && data.conteudo.conceitos
      ? `<ul class="topic-list">${data.conteudo.conceitos.map(c => `<li>${c}</li>`).join('')}</ul>`
      : '';

    return `<div class="review-session">
      <div class="rev-session-header">
        <div>
          <span class="rev-session-prog">${_done + 1} de ${_done + _queue.length}</span>
          <h2 class="rev-session-title">${title}</h2>
          <span class="rev-session-mod">${trilha.label} › ${mod.name}</span>
        </div>
        <button class="btn-ghost" onclick="ReviewsView.exitSession()">sair</button>
      </div>

      <div class="rev-session-content">
        <h3>Resumo</h3>
        <p>${resumo}</p>
        ${conceitos ? `<h3 style="margin-top:1rem">Conceitos</h3>${conceitos}` : ''}

        <div class="rev-content-link">
          <button class="btn-ghost btn-sm" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${mi},topicoIdx:${ti}})">
            Ver conteúdo completo ↗
          </button>
        </div>
      </div>

      <div class="rev-rating">
        <p class="rev-rating-label">Como foi a lembrança deste conteúdo?</p>
        <div class="rev-rating-btns">
          <button class="rev-rate dificil" onclick="ReviewsView.rate('dificil')">😰 Difícil</button>
          <button class="rev-rate medio"   onclick="ReviewsView.rate('medio')">😐 Médio</button>
          <button class="rev-rate facil"   onclick="ReviewsView.rate('facil')">😊 Fácil</button>
        </div>
        <p class="rev-rating-hint">Sua avaliação ajusta o próximo prazo de revisão automaticamente.</p>
      </div>
    </div>`;
  }

  return {
    render() {
      const due      = Store.getDueReviews();
      const allRevs  = Store.getReviews();
      const upcoming = allRevs.filter(r => r.nextDate > new Date().toISOString().split('T')[0]).slice(0, 8);

      document.getElementById('main-content').innerHTML = `
        <div class="view-reviews">
          <div class="page-header">
            <h1>Revisão Espaçada</h1>
            <p>Sistema SM-2 — revise no momento certo para máxima retenção</p>
          </div>

          ${due.length ? `
          <div class="stats-grid" style="margin-bottom:1.5rem">
            <div class="stat-card highlight">
              <span class="stat-num">${due.length}</span>
              <span class="stat-label">para revisar hoje</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${allRevs.length}</span>
              <span class="stat-label">total agendadas</span>
            </div>
          </div>

          <div class="rev-section-header">
            <h2 class="section-title">Para hoje</h2>
            <button class="btn-primary" onclick="ReviewsView.startAll()">Iniciar sessão de revisão →</button>
          </div>
          <div class="rev-list">${due.map(_reviewCard).join('')}</div>` : `
          <div class="rev-empty">
            <div class="rev-empty-icon">🎉</div>
            <p>Nenhuma revisão pendente para hoje!</p>
            <p class="rev-empty-sub">Continue estudando novos tópicos — revisões serão agendadas automaticamente.</p>
          </div>`}

          ${upcoming.length ? `
          <h2 class="section-title" style="margin-top:2rem">Próximas revisões</h2>
          <div class="rev-upcoming">
            ${upcoming.map(r => {
              const found = _findTopic(r.key);
              if (!found) return '';
              const title = _topicTitle(found.topico);
              return `<div class="rev-upcoming-item">
                <span class="rev-upcoming-date">${r.nextDate}</span>
                <span class="rev-upcoming-title">${title}</span>
              </div>`;
            }).join('')}
          </div>` : ''}
        </div>`;
    },

    startAll() {
      _queue   = [...Store.getDueReviews()];
      _done    = 0;
      _current = _queue.shift()?.key || null;
      if (_current) this._renderSession();
    },

    startSession(key) {
      _queue   = Store.getDueReviews().filter(r => r.key !== key);
      _done    = 0;
      _current = key;
      this._renderSession();
    },

    _renderSession() {
      if (!_current) { this.render(); return; }
      document.getElementById('main-content').innerHTML = _sessionHTML();
    },

    rate(rating) {
      if (!_current) return;
      Store.completeReview(_current, rating);
      _done++;
      _current = _queue.shift()?.key || null;
      Sidebar.refresh();
      if (_current) {
        this._renderSession();
      } else {
        document.getElementById('main-content').innerHTML = `
          <div class="view-reviews">
            <div class="rev-empty">
              <div class="rev-empty-icon">🏆</div>
              <p>Sessão de revisão concluída!</p>
              <p class="rev-empty-sub">Você revisou ${_done} tópico${_done>1?'s':''} hoje.</p>
              <button class="btn-primary" style="margin-top:1rem" onclick="Router.navigate('dashboard',{})">Voltar ao Dashboard →</button>
            </div>
          </div>`;
      }
    },

    exitSession() {
      _current = null;
      _queue   = [];
      this.render();
    }
  };
})();
