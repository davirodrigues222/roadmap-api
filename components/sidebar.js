const Sidebar = (function () {
  const NAV = [
    { view: 'dashboard', icon: '🏠', label: 'Dashboard' },
    { view: 'roadmap',   icon: '🗺️', label: 'Roadmap',  param: 'jr' },
    { view: 'exercises', icon: '💪', label: 'Exercícios' },
    { view: 'reviews',   icon: '🔄', label: 'Revisões',  badge: true },
    { view: 'notes',     icon: '📝', label: 'Anotações' },
    { view: 'stats',     icon: '📊', label: 'Estatísticas' },
    { view: 'projects',  icon: '🚀', label: 'Projetos' },
  ];

  function _dueBadge() {
    const n = Store.getDueReviews().length;
    return n > 0 ? `<span class="nav-badge">${n}</span>` : '';
  }

  function _buildXPBar() {
    const meta  = Store.getMeta();
    const xp    = meta.level.xp;
    const next  = meta.level.nextRankAt;
    const prev  = Store.getLevelsDef().find(l => l.rank === meta.level.rank)?.minXp ?? 0;
    const range = (next ?? xp + 1) - prev;
    const pct   = next ? Math.round(((xp - prev) / range) * 100) : 100;
    return `
      <div class="sb-level">
        <div class="sb-level-row">
          <span class="sb-rank" style="color:${meta.level.color}">${meta.level.rank}</span>
          <span class="sb-xp">${xp} XP</span>
        </div>
        <div class="sb-xp-track">
          <div class="sb-xp-fill" style="width:${pct}%;background:${meta.level.color}"></div>
        </div>
      </div>`;
  }

  function _buildStreak() {
    const s = Store.getMeta().streak;
    return `<div class="sb-streak"><span class="sb-streak-fire">🔥</span><span class="sb-streak-num">${s.count}</span><span class="sb-streak-lbl">dias</span></div>`;
  }

  return {
    render() {
      const sidebar = document.getElementById('sidebar');
      if (!sidebar) return;
      sidebar.innerHTML = `
        <div class="sb-top">
          <div class="sb-brand">DevPath</div>
          ${_buildStreak()}
        </div>
        <nav class="sb-nav">
          ${NAV.map(n => `
            <button class="sb-item" data-view="${n.view}" data-param="${n.param || ''}"
              onclick="Sidebar.go('${n.view}','${n.param || ''}')">
              <span class="sb-icon">${n.icon}</span>
              <span class="sb-label">${n.label}</span>
              ${n.badge ? _dueBadge() : ''}
            </button>`).join('')}
        </nav>
        <div class="sb-bottom">
          ${_buildXPBar()}
          <div id="sync-status" class="sb-sync"></div>
        </div>`;
    },

    go(view, param) {
      if (view === 'roadmap') Router.navigate('roadmap', { ns: param || 'jr' });
      else Router.navigate(view, {});
    },

    setActive(view) {
      document.querySelectorAll('.sb-item').forEach(el => {
        el.classList.toggle('active', el.dataset.view === view);
      });
    },

    refresh() { this.render(); }
  };
})();
