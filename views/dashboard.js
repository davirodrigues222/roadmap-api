const DashboardView = (function () {
  function _fmtTime(s) {
    if (s < 60)   return s + 's';
    if (s < 3600) return Math.floor(s / 60) + 'min';
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60);
    return h + 'h' + (m > 0 ? ' ' + m + 'min' : '');
  }

  function _greeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  function _heatmapHTML() {
    const data = Store.getHeatmap(91);
    const entries = Object.entries(data);
    const max = Math.max(...Object.values(data), 1);
    const cells = entries.map(([d, t]) => {
      const level = t === 0 ? 0 : Math.ceil((t / max) * 4);
      return `<div class="hm-cell level-${level}" title="${d}: ${_fmtTime(t)}"></div>`;
    }).join('');
    return `<div class="heatmap">${cells}</div>`;
  }

  function _recentAchievements() {
    const all  = Store.getAchievements();
    const defs = Store.getAchievementsDef();
    const recent = all.slice(-3).reverse();
    if (!recent.length) return '<p class="empty-msg">Nenhuma conquista ainda. Continue estudando!</p>';
    return recent.map(a => {
      const d = defs[a.id];
      if (!d) return '';
      const date = new Date(a.unlockedAt);
      const diff = Math.floor((Date.now() - a.unlockedAt) / 86400000);
      const when = diff === 0 ? 'hoje' : diff === 1 ? 'ontem' : `há ${diff} dias`;
      return `<div class="ach-card"><span class="ach-icon">${d.icon}</span><div class="ach-info"><span class="ach-name">${d.title}</span><span class="ach-when">${when}</span></div></div>`;
    }).join('');
  }

  function _nextTopicCard() {
    const last = Store.getLastStudied();
    if (last) {
      const { ns, trilha, mod, modIdx, topicoIdx } = last;
      return `<div class="next-card" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${modIdx},topicoIdx:${topicoIdx}})">
        <div class="next-card-icon">📚</div>
        <div class="next-card-info">
          <span class="next-card-mod">${mod.name}</span>
          <span class="next-card-topic">${typeof last.topico === 'object' ? last.topico.title : last.topico}</span>
        </div>
        <span class="next-card-arrow">→</span>
      </div>`;
    }
    const all = Store.getAllTopics();
    const first = all.find(t => !t.done);
    if (!first) return '<p class="empty-msg">Todos os tópicos concluídos! 🎉</p>';
    return `<div class="next-card" onclick="Router.navigate('topic',{ns:'${first.ns}',trilhaId:'${first.trilha.id}',moduloIdx:${first.modIdx},topicoIdx:${first.topicoIdx}})">
      <div class="next-card-icon">📚</div>
      <div class="next-card-info">
        <span class="next-card-mod">${first.mod.name}</span>
        <span class="next-card-topic">${typeof first.topico === 'object' ? first.topico.title : first.topico}</span>
      </div>
      <span class="next-card-arrow">→</span>
    </div>`;
  }

  function _reviewCards() {
    const due = Store.getDueReviews();
    if (!due.length) return '<p class="empty-msg">Nenhuma revisão pendente. 🎉</p>';
    const all = Store.getAllTopics();
    return due.slice(0, 4).map(r => {
      const found = all.find(t => t.key === r.key);
      if (!found) return '';
      const label = typeof found.topico === 'object' ? found.topico.title : found.topico;
      return `<div class="rev-chip" onclick="Router.navigate('reviews',{})">
        <span class="rev-chip-icon">🔄</span>
        <span class="rev-chip-label">${label}</span>
      </div>`;
    }).join('');
  }

  function _weeklyGoalBar() {
    const { done, target } = Store.getWeeklyProgress();
    const pct = Math.min(100, Math.round((done / target) * 100));
    const { done: mDone, target: mTarget } = Store.getMonthlyProgress();
    const mPct = Math.min(100, Math.round((mDone / mTarget) * 100));
    return `
      <div class="goal-item">
        <div class="goal-row"><span class="goal-label">Meta semanal</span><span class="goal-num">${done}/${target}</span></div>
        <div class="goal-track"><div class="goal-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="goal-item" style="margin-top:10px">
        <div class="goal-row"><span class="goal-label">Meta mensal</span><span class="goal-num">${mDone}/${mTarget}</span></div>
        <div class="goal-track"><div class="goal-fill" style="width:${mPct}%"></div></div>
      </div>`;
  }

  function _overallProgress() {
    const jrTotal   = Store.countTotal(JR_DATA);
    const jrDone    = Store.countDone('jr', JR_DATA);
    const adsTotal  = Store.countTotal(ADS_DATA);
    const adsDone   = Store.countDone('ads', ADS_DATA);
    const jrPct  = jrTotal  ? Math.round((jrDone  / jrTotal)  * 100) : 0;
    const adsPct = adsTotal ? Math.round((adsDone / adsTotal) * 100) : 0;
    return `
      <div class="prog-row"><span class="prog-label">🗺️ Jornada Dev Júnior</span><span class="prog-pct green">${jrPct}%</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:${jrPct}%;background:linear-gradient(90deg,#0e7a52,#1fcb8a)"></div></div>
      <div class="prog-row" style="margin-top:10px"><span class="prog-label">🎓 Estudos ADS</span><span class="prog-pct blue">${adsPct}%</span></div>
      <div class="prog-track"><div class="prog-fill" style="width:${adsPct}%;background:linear-gradient(90deg,#0369a1,#38bdf8)"></div></div>`;
  }

  return {
    render() {
      const meta      = Store.getMeta();
      const streak    = meta.streak;
      const todayTime = Store.getTodayTime();
      const totalTime = meta.totalTimeSpent;
      const dueCount  = Store.getDueReviews().length;

      document.getElementById('main-content').innerHTML = `
        <div class="view-dashboard">
          <div class="dash-header">
            <div>
              <h1 class="dash-greeting">${_greeting()}, Davi 👋</h1>
              <p class="dash-sub">Continue de onde parou e mantenha o ritmo.</p>
            </div>
            <div class="dash-streak-badge">
              <span class="streak-fire">🔥</span>
              <span class="streak-count">${streak.count}</span>
              <span class="streak-label">dias</span>
            </div>
          </div>

          <div class="dash-cards">
            <div class="dash-card accent-green">
              <span class="dc-icon">⭐</span>
              <span class="dc-val">${meta.level.xp}</span>
              <span class="dc-lbl">XP total</span>
            </div>
            <div class="dash-card">
              <span class="dc-icon">🏅</span>
              <span class="dc-val" style="color:${meta.level.color}">${meta.level.rank}</span>
              <span class="dc-lbl">nível atual</span>
            </div>
            <div class="dash-card">
              <span class="dc-icon">⏱️</span>
              <span class="dc-val">${_fmtTime(todayTime)}</span>
              <span class="dc-lbl">estudado hoje</span>
            </div>
            <div class="dash-card ${dueCount > 0 ? 'accent-yellow' : ''}">
              <span class="dc-icon">🔄</span>
              <span class="dc-val">${dueCount}</span>
              <span class="dc-lbl">revisões pendentes</span>
            </div>
          </div>

          <div class="dash-grid">
            <div class="dash-section">
              <h2 class="section-title">Continuar estudando</h2>
              ${_nextTopicCard()}
            </div>

            <div class="dash-section">
              <h2 class="section-title">Revisões de hoje</h2>
              <div class="rev-chips">${_reviewCards()}</div>
              ${dueCount > 0 ? `<button class="btn-primary" onclick="Router.navigate('reviews',{})">Ver todas as revisões →</button>` : ''}
            </div>

            <div class="dash-section">
              <h2 class="section-title">Progresso geral</h2>
              ${_overallProgress()}
            </div>

            <div class="dash-section">
              <div class="section-title-row">
                <h2 class="section-title">Metas</h2>
                <button class="btn-link" onclick="DashboardView.openGoals()">editar</button>
              </div>
              ${_weeklyGoalBar()}
            </div>

            <div class="dash-section dash-full">
              <h2 class="section-title">Atividade (últimos 91 dias)</h2>
              ${_heatmapHTML()}
            </div>

            <div class="dash-section">
              <h2 class="section-title">Conquistas recentes</h2>
              <div class="ach-list">${_recentAchievements()}</div>
              <button class="btn-link" onclick="Router.navigate('stats',{})">ver estatísticas →</button>
            </div>

            <div class="dash-section">
              <h2 class="section-title">Tempo total de estudo</h2>
              <div class="time-big">${_fmtTime(totalTime)}</div>
              <div class="time-sub">streak máximo: ${streak.longestStreak} dias</div>
            </div>
          </div>
        </div>

        <!-- Modal metas -->
        <div id="goals-modal" class="modal hidden">
          <div class="modal-box">
            <h3 class="modal-title">Editar metas</h3>
            <label class="modal-label">Meta semanal (tópicos)</label>
            <input id="goal-weekly" type="number" min="1" max="50" class="modal-input" value="${Store.getGoals().weekly.target}">
            <label class="modal-label">Meta mensal (tópicos)</label>
            <input id="goal-monthly" type="number" min="1" max="200" class="modal-input" value="${Store.getGoals().monthly.target}">
            <div class="modal-actions">
              <button class="btn-secondary" onclick="DashboardView.closeGoals()">Cancelar</button>
              <button class="btn-primary" onclick="DashboardView.saveGoals()">Salvar</button>
            </div>
          </div>
        </div>`;
    },

    openGoals() {
      document.getElementById('goals-modal').classList.remove('hidden');
    },
    closeGoals() {
      document.getElementById('goals-modal').classList.add('hidden');
    },
    saveGoals() {
      const w = parseInt(document.getElementById('goal-weekly').value)  || 5;
      const m = parseInt(document.getElementById('goal-monthly').value) || 20;
      const g = Store.getGoals();
      g.weekly.target  = w;
      g.monthly.target = m;
      Store.saveGoals(g);
      this.closeGoals();
      this.render();
    }
  };
})();
