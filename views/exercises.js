const ExercisesView = (function () {
  let _filter = 'all';

  function _allExercises() {
    const result = [];
    const datasets = [['jr', JR_DATA], ['ads', ADS_DATA]];
    datasets.forEach(([ns, data]) => {
      data.forEach(trilha => {
        trilha.modulos.forEach((mod, mi) => {
          mod.topicos.forEach((topico, ti) => {
            if (typeof topico !== 'object' || !topico.exercicios) return;
            const key   = Store.topicKey(ns, trilha.id, mi, ti);
            const state = Store.getTopic(key);
            const done  = [...(state.exercisesDone || []), ...(state.challengesDone || [])];
            const push  = (ex, nivel, xp) => result.push({ ex, nivel, xp, key, ns, trilha, mod, mi, ti, topico, state, done: done.includes(ex.id) });
            (topico.exercicios.fixacao      || []).forEach(e => push(e, 'fixação',        10));
            (topico.exercicios.intermediario || []).forEach(e => push(e, 'intermediário', 20));
            (topico.exercicios.desafio       || []).forEach(e => push(e, 'desafio',       50));
          });
        });
      });
    });
    return result;
  }

  function _levelCls(nivel) {
    return nivel === 'desafio' ? 'challenge' : nivel === 'intermediário' ? 'inter' : 'basic';
  }

  function _renderCards(list) {
    if (!list.length) return '<p class="empty-msg">Nenhum exercício encontrado.</p>';
    return list.map(item => {
      const { ex, nivel, xp, key, ns, trilha, mi, ti, done } = item;
      return `<div class="ex-list-card ${done ? 'done' : ''}">
        <div class="ex-list-header">
          <div class="ex-list-meta">
            <span class="ex-level ${_levelCls(nivel)}">${nivel}</span>
            <span class="ex-list-topic">${item.topico.title} · ${item.mod.name}</span>
          </div>
          <div class="ex-list-right">
            ${done ? '<span class="ex-done-mark">✓ feito</span>' : `<span class="ex-xp">+${xp} XP</span>`}
          </div>
        </div>
        <p class="ex-enunciado">${ex.enunciado}</p>
        <button class="btn-ghost btn-sm" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${mi},topicoIdx:${ti}})">
          Ir para o tópico →
        </button>
      </div>`;
    }).join('');
  }

  return {
    render(params = {}) {
      _filter = params.filter || 'all';
      const all     = _allExercises();
      const total   = all.length;
      const done    = all.filter(e => e.done).length;
      const pending = all.filter(e => !e.done);

      document.getElementById('main-content').innerHTML = `
        <div class="view-exercises">
          <div class="page-header">
            <h1>Exercícios</h1>
            <p>Pratique os conceitos de cada tópico</p>
          </div>

          <div class="stats-grid" style="margin-bottom:1.5rem">
            <div class="stat-card highlight">
              <span class="stat-num">${done}/${total}</span>
              <span class="stat-label">feitos</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${all.filter(e => e.nivel==='fixação' && e.done).length}</span>
              <span class="stat-label">fixação ✓</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${all.filter(e => e.nivel==='intermediário' && e.done).length}</span>
              <span class="stat-label">interm. ✓</span>
            </div>
            <div class="stat-card">
              <span class="stat-num">${all.filter(e => e.nivel==='desafio' && e.done).length}</span>
              <span class="stat-label">desafios ✓</span>
            </div>
          </div>

          <div class="filter-row">
            ${[['all','todos'],['fixação','fixação'],['intermediário','intermediário'],['desafio','desafio'],['pendente','pendentes']].map(([f,l]) =>
              `<button class="filter-btn ${_filter===f?'active':''}" onclick="ExercisesView.setFilter('${f}')">${l}</button>`
            ).join('')}
          </div>

          <div id="ex-list">
            ${_renderCards(this._filtered(all, _filter, pending))}
          </div>
        </div>`;
    },

    _filtered(all, filter, pending) {
      if (filter === 'all')         return all;
      if (filter === 'pendente')    return pending;
      return all.filter(e => e.nivel === filter);
    },

    setFilter(f) {
      _filter = f;
      const all  = _allExercises();
      const pend = all.filter(e => !e.done);
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.filter-btn').forEach(b => {
        if (b.textContent.trim() === (f === 'all' ? 'todos' : f === 'pendente' ? 'pendentes' : f)) b.classList.add('active');
      });
      document.getElementById('ex-list').innerHTML = _renderCards(this._filtered(all, f, pend));
    }
  };
})();
