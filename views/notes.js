const NotesView = (function () {
  let _search = '';

  function _allNotes() {
    const result = [];
    const datasets = [['jr', JR_DATA], ['ads', ADS_DATA]];
    datasets.forEach(([ns, data]) => {
      data.forEach(trilha => {
        trilha.modulos.forEach((mod, mi) => {
          mod.topicos.forEach((topico, ti) => {
            const key   = Store.topicKey(ns, trilha.id, mi, ti);
            const state = Store.getTopic(key);
            const title = typeof topico === 'object' ? topico.title : topico;
            if (state.notes || state.doubts || state.observations) {
              result.push({ key, ns, trilha, mod, mi, ti, title, state });
            }
          });
        });
      });
    });
    return result.sort((a, b) => (b.state.lastStudied || 0) - (a.state.lastStudied || 0));
  }

  function _noteCard(item) {
    const { ns, trilha, mi, ti, title, state } = item;
    const date = state.lastStudied
      ? new Date(state.lastStudied).toLocaleDateString('pt-BR', { day:'2-digit', month:'2-digit' })
      : '';
    return `<div class="note-card" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${mi},topicoIdx:${ti}})">
      <div class="note-card-header">
        <div>
          <span class="note-card-title">${title}</span>
          <span class="note-card-mod">${trilha.label} › ${item.mod.name}</span>
        </div>
        <span class="note-card-date">${date}</span>
      </div>
      ${state.notes ? `<div class="note-block"><span class="note-type">📝</span><p>${state.notes.slice(0, 150)}${state.notes.length > 150 ? '…' : ''}</p></div>` : ''}
      ${state.doubts ? `<div class="note-block doubt"><span class="note-type">❓</span><p>${state.doubts.slice(0, 100)}${state.doubts.length > 100 ? '…' : ''}</p></div>` : ''}
      ${state.observations ? `<div class="note-block obs"><span class="note-type">👁</span><p>${state.observations.slice(0, 100)}${state.observations.length > 100 ? '…' : ''}</p></div>` : ''}
    </div>`;
  }

  return {
    render() {
      const all = _allNotes();
      document.getElementById('main-content').innerHTML = `
        <div class="view-notes">
          <div class="page-header">
            <h1>Anotações</h1>
            <p>${all.length} tópico${all.length !== 1 ? 's' : ''} com anotações</p>
          </div>

          <div class="notes-search-wrap">
            <input class="notes-search" type="text" placeholder="Buscar nas anotações..." oninput="NotesView.search(this.value)" value="${_search}">
          </div>

          <div id="notes-list">
            ${all.length
              ? all.filter(n =>
                  !_search ||
                  n.title.toLowerCase().includes(_search.toLowerCase()) ||
                  (n.state.notes || '').toLowerCase().includes(_search.toLowerCase()) ||
                  (n.state.doubts || '').toLowerCase().includes(_search.toLowerCase())
                ).map(_noteCard).join('') || '<p class="empty-msg">Nenhuma anotação corresponde à busca.</p>'
              : '<p class="empty-msg">Nenhuma anotação ainda. Comece a estudar e anote suas dúvidas e insights!</p>'
            }
          </div>
        </div>`;
    },

    search(q) {
      _search = q;
      const all     = _allNotes();
      const filtered = all.filter(n =>
        !q ||
        n.title.toLowerCase().includes(q.toLowerCase()) ||
        (n.state.notes || '').toLowerCase().includes(q.toLowerCase()) ||
        (n.state.doubts || '').toLowerCase().includes(q.toLowerCase())
      );
      document.getElementById('notes-list').innerHTML = filtered.length
        ? filtered.map(_noteCard).join('')
        : '<p class="empty-msg">Nenhuma anotação corresponde à busca.</p>';
    }
  };
})();
