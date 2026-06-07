const Events = (function () {
  const _listeners = {};

  return {
    on(event, handler) {
      if (!_listeners[event]) _listeners[event] = [];
      _listeners[event].push(handler);
    },
    off(event, handler) {
      if (!_listeners[event]) return;
      _listeners[event] = _listeners[event].filter(h => h !== handler);
    },
    emit(event, data) {
      if (!_listeners[event]) return;
      _listeners[event].forEach(h => h(data));
    }
  };
})();
