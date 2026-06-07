const Achievements = (function () {
  function _showToast(def) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'achievement-toast';
    el.innerHTML = `
      <div class="ach-toast-icon">${def.icon}</div>
      <div class="ach-toast-body">
        <div class="ach-toast-title">Conquista desbloqueada!</div>
        <div class="ach-toast-name">${def.title}</div>
        <div class="ach-toast-desc">${def.desc}</div>
        <div class="ach-toast-xp">+${def.xp} XP</div>
      </div>`;
    container.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 50);
    setTimeout(() => {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 400);
    }, 4000);
  }

  function _showLevelUp(data) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'achievement-toast level-up-toast';
    el.innerHTML = `
      <div class="ach-toast-icon">⬆️</div>
      <div class="ach-toast-body">
        <div class="ach-toast-title">Subiu de nível!</div>
        <div class="ach-toast-name" style="color:${data.color}">${data.rank}</div>
        <div class="ach-toast-desc">Continue assim!</div>
      </div>`;
    container.appendChild(el);
    setTimeout(() => el.classList.add('visible'), 50);
    setTimeout(() => {
      el.classList.remove('visible');
      setTimeout(() => el.remove(), 400);
    }, 5000);
  }

  return {
    init() {
      Events.on('achievement:unlocked', def => {
        _showToast(def);
        Sidebar.refresh();
      });
      Events.on('level:up', data => {
        _showLevelUp(data);
        Sidebar.refresh();
      });
    }
  };
})();
