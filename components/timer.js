const Timer = (function () {
  let _seconds  = 0;
  let _interval = null;
  let _topicKey = null;
  let _widget   = null;

  function _fmt(s) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
      : `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }

  function _tick() {
    _seconds++;
    const el = document.getElementById('timer-display');
    if (el) el.textContent = _fmt(_seconds);
    if (_seconds % 30 === 0 && _topicKey) _autosave();
  }

  function _autosave() {
    if (!_topicKey) return;
    const state = Store.getTopic(_topicKey);
    state.timeSpent = (state.timeSpent || 0) + 30;
    state.lastStudied = Date.now();
    Store.saveTopic(_topicKey, state);
  }

  function _buildWidget() {
    const w = document.createElement('div');
    w.id = 'timer-widget';
    w.className = 'timer-widget';
    w.innerHTML = `
      <div class="timer-dot"></div>
      <span id="timer-display">00:00</span>
      <button class="timer-stop" onclick="Timer.stop()" title="Parar sessão">■</button>`;
    document.body.appendChild(w);
    return w;
  }

  return {
    start(topicKey) {
      if (_interval) this.stop();
      _topicKey = topicKey;
      _seconds  = 0;
      _widget   = _buildWidget();
      setTimeout(() => _widget.classList.add('visible'), 50);
      _interval = setInterval(_tick, 1000);
      Store.updateStreak();
    },

    stop() {
      if (!_interval) return;
      clearInterval(_interval);
      _interval = null;

      if (_topicKey && _seconds > 5) {
        const state = Store.getTopic(_topicKey);
        state.timeSpent   = (state.timeSpent || 0) + _seconds;
        state.lastStudied = Date.now();
        Store.saveTopic(_topicKey, state);
        Store.addHistory({ duration: _seconds, topicKey: _topicKey });
        Store.addTimeSpent(_seconds);

        const todayTime = Store.getTodayTime();
        if (todayTime >= 7200) Store.unlockAchievement('two_hours');
      }

      if (_widget) {
        _widget.classList.remove('visible');
        setTimeout(() => { if (_widget) { _widget.remove(); _widget = null; } }, 400);
      }
      _topicKey = null;
      _seconds  = 0;
      Sidebar.refresh();
    },

    getSeconds() { return _seconds; },
    isRunning()  { return _interval !== null; }
  };
})();
