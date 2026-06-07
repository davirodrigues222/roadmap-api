const StatsView = (function () {
  function _fmtTime(s) {
    if (!s || s < 60) return (s || 0) + 's';
    if (s < 3600) return Math.floor(s / 60) + 'min';
    return Math.floor(s / 3600) + 'h ' + Math.floor((s % 3600) / 60) + 'min';
  }

  function _barChart(data, maxVal) {
    return data.map(([label, val]) => {
      const pct = maxVal > 0 ? Math.round((val / maxVal) * 100) : 0;
      return `<div class="bar-row">
        <span class="bar-label">${label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        <span class="bar-val">${val}</span>
      </div>`;
    }).join('');
  }

  function _weekChart() {
    const week = Store.getWeekDays();
    const days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
    const entries = Object.entries(week);
    const max = Math.max(...Object.values(week), 1);
    return entries.map(([date, secs]) => {
      const h   = Math.round(secs / 3600 * 10) / 10;
      const pct = Math.round((secs / max) * 100);
      const d   = new Date(date + 'T12:00:00').getDay();
      return `<div class="week-bar-col">
        <div class="week-bar-track">
          <div class="week-bar-fill" style="height:${pct}%" title="${_fmtTime(secs)}"></div>
        </div>
        <span class="week-bar-label">${days[d]}</span>
      </div>`;
    }).join('');
  }

  function _achievementsGrid() {
    const unlocked = Store.getAchievements();
    const defs     = Store.getAchievementsDef();
    const unlockedIds = unlocked.map(a => a.id);
    return Object.values(defs).map(d => {
      const isUnlocked = unlockedIds.includes(d.id);
      const ua = unlocked.find(a => a.id === d.id);
      const date = ua ? new Date(ua.unlockedAt).toLocaleDateString('pt-BR') : '';
      return `<div class="ach-grid-item ${isUnlocked ? 'unlocked' : 'locked'}">
        <span class="ach-grid-icon">${isUnlocked ? d.icon : '🔒'}</span>
        <span class="ach-grid-name">${d.title}</span>
        <span class="ach-grid-desc">${isUnlocked ? date : d.desc}</span>
      </div>`;
    }).join('');
  }

  return {
    render() {
      const meta   = Store.getMeta();
      const levels = Store.getLevelsDef();
      const xp     = meta.level.xp;
      const lv     = levels.find(l => l.rank === meta.level.rank) || levels[0];
      const nextLv = levels[levels.indexOf(lv) + 1];
      const xpInLevel = xp - lv.minXp;
      const xpRange   = nextLv ? nextLv.minXp - lv.minXp : 1;
      const xpPct     = nextLv ? Math.round((xpInLevel / xpRange) * 100) : 100;

      const jrDone  = Store.countDone('jr', JR_DATA);
      const jrTotal = Store.countTotal(JR_DATA);
      const adsDone  = Store.countDone('ads', ADS_DATA);
      const adsTotal = Store.countTotal(ADS_DATA);

      const allTopics    = Store.getAllTopics();
      const totalDone    = allTopics.filter(t => t.done).length;
      const totalExDone  = allTopics.reduce((s, t) => s + (t.exercisesDone || []).length, 0);
      const totalChalDone= allTopics.reduce((s, t) => s + (t.challengesDone || []).length, 0);
      const withNotes    = allTopics.filter(t => t.notes || t.doubts).length;

      const trilhaStats = JR_DATA.map(t => {
        const done  = Store.countDoneTrilha('jr', t);
        const total = t.modulos.reduce((a, m) => a + m.topicos.length, 0);
        return [t.label, done, total, t.color];
      });

      document.getElementById('main-content').innerHTML = `
        <div class="view-stats">
          <div class="page-header">
            <h1>Estatísticas</h1>
            <p>Seu progresso completo de aprendizado</p>
          </div>

          <!-- XP e Nível -->
          <div class="stats-section">
            <h2 class="section-title">Nível e XP</h2>
            <div class="level-display">
              <div class="level-badge" style="border-color:${meta.level.color};color:${meta.level.color}">
                ${meta.level.rank}
              </div>
              <div class="level-progress">
                <div class="level-prog-row">
                  <span>${xp} XP</span>
                  ${nextLv ? `<span>→ ${nextLv.minXp} XP (${nextLv.rank})</span>` : '<span>nível máximo!</span>'}
                </div>
                <div class="level-track"><div class="level-fill" style="width:${xpPct}%;background:${meta.level.color}"></div></div>
                <div class="level-pct">${xpPct}% para o próximo nível</div>
              </div>
            </div>
          </div>

          <!-- Resumo geral -->
          <div class="stats-grid">
            <div class="stat-card highlight">
              <span class="stat-num">${totalDone}</span>
              <span class="stat-label">tópicos concluídos</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${totalExDone}</span>
              <span class="stat-label">exercícios feitos</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${totalChalDone}</span>
              <span class="stat-label">desafios feitos</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${withNotes}</span>
              <span class="stat-label">tópicos anotados</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${_fmtTime(meta.totalTimeSpent)}</span>
              <span class="stat-label">tempo total</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${meta.streak.longestStreak}</span>
              <span class="stat-label">maior streak</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${Store.getAchievements().length}</span>
              <span class="stat-label">conquistas</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${Store.getReviews().length}</span>
              <span class="stat-label">revisões agendadas</span>
            </div>
          </div>

          <!-- Atividade semanal -->
          <div class="stats-section">
            <h2 class="section-title">Atividade desta semana</h2>
            <div class="week-chart">${_weekChart()}</div>
          </div>

          <!-- Progresso por trilha JR -->
          <div class="stats-section">
            <h2 class="section-title">Progresso — Jornada Dev Júnior</h2>
            ${trilhaStats.map(([label, done, total, color]) => {
              const pct = total ? Math.round((done / total) * 100) : 0;
              return `<div class="tri-stat-row">
                <span class="tri-stat-label">${label}</span>
                <div class="tri-stat-track"><div class="tri-stat-fill" style="width:${pct}%;background:${color}"></div></div>
                <span class="tri-stat-num">${done}/${total}</span>
              </div>`;
            }).join('')}
          </div>

          <!-- Progresso geral -->
          <div class="stats-section">
            <h2 class="section-title">Visão consolidada</h2>
            <div class="consolidated-row">
              <span>Jornada Dev Júnior</span>
              <div class="cons-track"><div class="cons-fill green" style="width:${jrTotal ? Math.round(jrDone/jrTotal*100) : 0}%"></div></div>
              <span>${jrDone}/${jrTotal}</span>
            </div>
            <div class="consolidated-row" style="margin-top:10px">
              <span>Estudos ADS</span>
              <div class="cons-track"><div class="cons-fill blue" style="width:${adsTotal ? Math.round(adsDone/adsTotal*100) : 0}%"></div></div>
              <span>${adsDone}/${adsTotal}</span>
            </div>
          </div>

          <!-- Conquistas -->
          <div class="stats-section">
            <h2 class="section-title">Todas as conquistas</h2>
            <div class="ach-grid">${_achievementsGrid()}</div>
          </div>
        </div>`;
    }
  };
})();
