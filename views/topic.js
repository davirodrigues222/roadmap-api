const TopicView = (function () {
  let _ctx    = {};  // { ns, trilha, mod, modIdx, topico, topicoIdx, key }
  let _tab    = 'conteudo';
  let _saveTimer = null;

  function _resolveCtx(params) {
    const { ns, trilhaId, moduloIdx, topicoIdx } = params;
    const data   = ns === 'jr' ? JR_DATA : ADS_DATA;
    const trilha = data.find(t => t.id === trilhaId);
    if (!trilha) return null;
    const mod    = trilha.modulos[moduloIdx];
    if (!mod)    return null;
    const topico = mod.topicos[topicoIdx];
    if (!topico) return null;
    const key    = Store.topicKey(ns, trilhaId, moduloIdx, topicoIdx);
    return { ns, trilha, mod, modIdx: moduloIdx, topico, topicoIdx, key };
  }

  function _topicTitle(t) { return typeof t === 'object' ? t.title : t; }
  function _topicData(t)  { return typeof t === 'object' ? t : null; }

  function _breadcrumb() {
    const { ns, trilha, mod } = _ctx;
    const nsLabel = ns === 'jr' ? 'Junior' : 'ADS';
    return `<nav class="breadcrumb">
      <span class="bc-link" onclick="Router.navigate('roadmap',{ns:'${ns}'})">🗺️ ${nsLabel}</span>
      <span class="bc-sep">›</span>
      <span class="bc-link" onclick="Router.navigate('roadmap',{ns:'${ns}'})">${trilha.label}</span>
      <span class="bc-sep">›</span>
      <span class="bc-current">${mod.name}</span>
    </nav>`;
  }

  function _statusBadge(state) {
    if (state.done)        return '<span class="status-badge done">✓ Concluído</span>';
    if (state.contentRead) return '<span class="status-badge reading">◐ Em andamento</span>';
    return '<span class="status-badge new">○ Não iniciado</span>';
  }

  function _tabBar() {
    const tabs = [
      { id: 'conteudo',   label: '📖 Conteúdo' },
      { id: 'exercicios', label: '💪 Exercícios' },
      { id: 'anotacoes',  label: '📝 Anotações' },
      { id: 'checklist',  label: '✅ Checklist' },
    ];
    return `<div class="topic-tabs">
      ${tabs.map(t => `<button class="topic-tab ${_tab === t.id ? 'active' : ''}" onclick="TopicView.switchTab('${t.id}')">${t.label}</button>`).join('')}
    </div>`;
  }

  // ─── Tab: Conteúdo ───────────────────────────────────────────
  function _renderConteudo(data) {
    if (!data || !data.conteudo) {
      return `<div class="topic-content-empty">
        <p>Este tópico ainda não tem conteúdo detalhado.</p>
        <p>Marque como concluído no roadmap quando terminar de estudar.</p>
      </div>`;
    }
    const c = data.conteudo;
    const exemploHTML = (c.exemplos || []).map(ex => `
      <div class="example-block">
        <div class="example-title">${ex.titulo}</div>
        <pre class="code-block lang-${ex.linguagem || 'text'}"><code>${ex.codigo.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</code></pre>
      </div>`).join('');

    const linksHTML = (c.links || []).map(l =>
      `<a class="ext-link" href="${l.url}" target="_blank" rel="noopener">↗ ${l.titulo}</a>`
    ).join('');

    return `
      <section class="topic-section">
        <h3 class="topic-section-title">Resumo</h3>
        <p class="topic-resumo">${c.resumo || ''}</p>
      </section>

      ${(c.conceitos || []).length ? `
      <section class="topic-section">
        <h3 class="topic-section-title">Conceitos fundamentais</h3>
        <ul class="topic-list">
          ${c.conceitos.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>` : ''}

      ${c.explicacao ? `
      <section class="topic-section">
        <h3 class="topic-section-title">Explicação detalhada</h3>
        <p class="topic-explicacao">${c.explicacao}</p>
      </section>` : ''}

      ${exemploHTML ? `
      <section class="topic-section">
        <h3 class="topic-section-title">Exemplos práticos</h3>
        ${exemploHTML}
      </section>` : ''}

      ${(c.errosComuns || []).length ? `
      <section class="topic-section warn-section">
        <h3 class="topic-section-title">⚠ Erros comuns</h3>
        <ul class="topic-list warn-list">
          ${c.errosComuns.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>` : ''}

      ${(c.dicas || []).length ? `
      <section class="topic-section tip-section">
        <h3 class="topic-section-title">💡 Dicas</h3>
        <ul class="topic-list tip-list">
          ${c.dicas.map(i => `<li>${i}</li>`).join('')}
        </ul>
      </section>` : ''}

      ${linksHTML ? `
      <section class="topic-section">
        <h3 class="topic-section-title">🔗 Materiais complementares</h3>
        <div class="links-grid">${linksHTML}</div>
      </section>` : ''}

      ${(c.projetosRelacionados || []).length ? `
      <section class="topic-section">
        <h3 class="topic-section-title">🚀 Projetos relacionados</h3>
        <ul class="topic-list project-list">
          ${c.projetosRelacionados.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </section>` : ''}`;
  }

  // ─── Tab: Exercícios ─────────────────────────────────────────
  function _renderExercicios(data, state) {
    if (!data || !data.exercicios) {
      return '<p class="empty-msg">Nenhum exercício cadastrado para este tópico ainda.</p>';
    }
    const ex  = data.exercicios;
    const all = [
      ...(ex.fixacao      || []).map(e => ({ ...e, tipo_nivel: 'fixação',        xp: 10 })),
      ...(ex.intermediario || []).map(e => ({ ...e, tipo_nivel: 'intermediário', xp: 20 })),
      ...(ex.desafio       || []).map(e => ({ ...e, tipo_nivel: 'desafio',       xp: 50 })),
    ];
    if (!all.length) return '<p class="empty-msg">Nenhum exercício cadastrado para este tópico ainda.</p>';

    const done = [...(state.exercisesDone || []), ...(state.challengesDone || [])];
    return all.map((e, idx) => {
      const isDone  = done.includes(e.id);
      const levelCls = e.tipo_nivel === 'desafio' ? 'challenge' : e.tipo_nivel === 'intermediário' ? 'inter' : 'basic';
      return `<div class="exercise-card ${isDone ? 'done' : ''}" id="excard_${e.id}">
        <div class="ex-header">
          <span class="ex-level ${levelCls}">${e.tipo_nivel}</span>
          <span class="ex-xp">+${e.xp} XP</span>
          ${isDone ? '<span class="ex-done-mark">✓ feito</span>' : ''}
        </div>
        <p class="ex-enunciado">${e.enunciado}</p>
        ${e.dica ? `<div class="ex-dica"><span>💡</span> ${e.dica}</div>` : ''}
        ${e.tipo === 'codigo' ? `
          <div class="ex-code-area">
            <div class="ex-code-lang">${e.linguagem || 'código'}</div>
            <textarea class="ex-code-input" id="exinput_${e.id}" placeholder="Escreva sua solução aqui...">${e.templateInicial || ''}</textarea>
          </div>` : `
          <textarea class="ex-text-input" id="exinput_${e.id}" placeholder="Escreva sua resposta aqui..."></textarea>`}
        ${e.gabarito ? `
          <div class="ex-gabarito hidden" id="gabarito_${e.id}">
            <div class="ex-gab-label">Referência:</div>
            <div class="ex-gab-text">${e.gabarito}</div>
          </div>
          <button class="btn-ghost" onclick="TopicView.showGabarito('${e.id}')">ver gabarito</button>` : ''}
        ${!isDone ? `<button class="btn-primary ex-done-btn" onclick="TopicView.markExercise('${e.id}','${e.tipo_nivel}')">Marcar como feito · +${e.xp} XP</button>` : ''}
      </div>`;
    }).join('');
  }

  // ─── Tab: Anotações ──────────────────────────────────────────
  function _renderAnotacoes(state) {
    return `
      <div class="notes-section">
        <label class="notes-label">📝 Minhas anotações</label>
        <textarea class="notes-area" id="nt-notes" placeholder="Escreva suas anotações sobre este tópico..." oninput="TopicView.autoSave()">${state.notes || ''}</textarea>
      </div>
      <div class="notes-section">
        <label class="notes-label">❓ Dúvidas</label>
        <textarea class="notes-area" id="nt-doubts" placeholder="O que você ainda não entendeu bem?" oninput="TopicView.autoSave()">${state.doubts || ''}</textarea>
      </div>
      <div class="notes-section">
        <label class="notes-label">👁 Observações</label>
        <textarea class="notes-area" id="nt-obs" placeholder="Conexões com outros tópicos, insights..." oninput="TopicView.autoSave()">${state.observations || ''}</textarea>
      </div>
      <div class="notes-saved-indicator" id="notes-saved"></div>`;
  }

  // ─── Tab: Checklist ──────────────────────────────────────────
  function _renderChecklist(data, state) {
    const items = data && data.checklist ? data.checklist : [];
    if (!items.length) return '<p class="empty-msg">Nenhum checklist para este tópico.</p>';
    const checked = state.checklistItems || [];
    const doneCount = checked.filter(Boolean).length;
    const pct = Math.round((doneCount / items.length) * 100);
    return `
      <div class="checklist-header">
        <span class="cl-progress">${doneCount}/${items.length} itens concluídos</span>
        <div class="cl-bar-track"><div class="cl-bar-fill" style="width:${pct}%"></div></div>
      </div>
      <div class="checklist-items">
        ${items.map((item, i) => `
          <div class="cl-item ${checked[i] ? 'done' : ''}" onclick="TopicView.toggleChecklist(${i})">
            <div class="cl-check ${checked[i] ? 'done' : ''}">${checked[i] ? '✓' : ''}</div>
            <span>${item}</span>
          </div>`).join('')}
      </div>`;
  }

  function _renderTabContent() {
    const data  = _topicData(_ctx.topico);
    const state = Store.getTopic(_ctx.key);
    switch (_tab) {
      case 'conteudo':   return _renderConteudo(data);
      case 'exercicios': return _renderExercicios(data, state);
      case 'anotacoes':  return _renderAnotacoes(state);
      case 'checklist':  return _renderChecklist(data, state);
      default:           return _renderConteudo(data);
    }
  }

  function _navButtons() {
    const { ns, trilha, modIdx, topicoIdx } = _ctx;
    const mod  = trilha.modulos[modIdx];
    const prev = topicoIdx > 0
      ? { modIdx, topicoIdx: topicoIdx - 1 }
      : modIdx > 0
        ? { modIdx: modIdx - 1, topicoIdx: trilha.modulos[modIdx - 1].topicos.length - 1 }
        : null;
    const next = topicoIdx < mod.topicos.length - 1
      ? { modIdx, topicoIdx: topicoIdx + 1 }
      : modIdx < trilha.modulos.length - 1
        ? { modIdx: modIdx + 1, topicoIdx: 0 }
        : null;
    const prevBtn = prev
      ? `<button class="nav-btn" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${prev.modIdx},topicoIdx:${prev.topicoIdx}})">← anterior</button>`
      : '<span></span>';
    const nextBtn = next
      ? `<button class="nav-btn primary" onclick="Router.navigate('topic',{ns:'${ns}',trilhaId:'${trilha.id}',moduloIdx:${next.modIdx},topicoIdx:${next.topicoIdx}})">próximo →</button>`
      : '<span></span>';
    return `<div class="topic-nav-btns">${prevBtn}${nextBtn}</div>`;
  }

  return {
    render(params = {}) {
      if (Timer.isRunning()) Timer.stop();
      const ctx = _resolveCtx(params);
      if (!ctx) { Router.navigate('roadmap', { ns: params.ns || 'jr' }); return; }
      _ctx = ctx;
      _tab = 'conteudo';

      const state = Store.getTopic(_ctx.key);
      const title = _topicTitle(_ctx.topico);
      const data  = _topicData(_ctx.topico);

      if (!state.startedAt) {
        state.startedAt = Date.now();
        Store.saveTopic(_ctx.key, state);
      }

      document.getElementById('main-content').innerHTML = `
        <div class="view-topic">
          ${_breadcrumb()}

          <div class="topic-hero" style="border-left-color:${_ctx.trilha.color}">
            <div class="topic-hero-left">
              <div class="topic-meta-row">
                ${data && data.difficulty ? `<span class="topic-diff diff-${data.difficulty}">${data.difficulty}</span>` : ''}
                ${data && data.estimatedMinutes ? `<span class="topic-time">⏱ ${data.estimatedMinutes} min</span>` : ''}
              </div>
              <h1 class="topic-title">${title}</h1>
              <div class="topic-status-row">
                ${_statusBadge(state)}
                <button class="timer-start-btn" onclick="TopicView.startStudy()">▶ Iniciar sessão</button>
              </div>
            </div>
            <div class="topic-hero-actions">
              ${!state.done
                ? `<button class="btn-complete" onclick="TopicView.markDone()">✓ Marcar como concluído</button>`
                : `<button class="btn-uncomplete" onclick="TopicView.markDone()">↩ Desmarcar</button>`}
            </div>
          </div>

          ${_tabBar()}

          <div class="topic-tab-content" id="tab-content">
            ${_renderTabContent()}
          </div>

          ${_navButtons()}
        </div>`;

      if (!state.contentRead && _tab === 'conteudo') {
        state.contentRead = true;
        Store.saveTopic(_ctx.key, state);
      }
    },

    switchTab(tab) {
      _tab = tab;
      document.querySelectorAll('.topic-tab').forEach(el => {
        el.classList.toggle('active', el.textContent.toLowerCase().includes(tab.split('/')[0].slice(0, 5)));
      });
      document.querySelectorAll('.topic-tab').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.topic-tab').forEach((el, i) => {
        const tabs = ['conteudo','exercicios','anotacoes','checklist'];
        if (tabs[i] === tab) el.classList.add('active');
      });
      document.getElementById('tab-content').innerHTML = _renderTabContent();
    },

    startStudy() {
      Timer.start(_ctx.key);
    },

    markDone() {
      const state = Store.getTopic(_ctx.key);
      state.done = !state.done;
      if (state.done) {
        state.completedAt = Date.now();
        Store.addXP(20);
        Store.scheduleReview(_ctx.key);
        Store.checkTopicAchievements();
        Store.updateStreak();
        Store.unlockAchievement('first_topic');
      } else {
        state.completedAt = null;
      }
      Store.saveTopic(_ctx.key, state);
      Sidebar.refresh();
      this.render({ ns: _ctx.ns, trilhaId: _ctx.trilha.id, moduloIdx: _ctx.modIdx, topicoIdx: _ctx.topicoIdx });
    },

    showGabarito(id) {
      const el = document.getElementById('gabarito_' + id);
      if (el) el.classList.toggle('hidden');
    },

    markExercise(exId, nivel) {
      const state = Store.getTopic(_ctx.key);
      const arr = nivel === 'desafio' ? 'challengesDone' : 'exercisesDone';
      if (!state[arr].includes(exId)) {
        state[arr].push(exId);
        const xp = nivel === 'desafio' ? 50 : nivel === 'intermediário' ? 20 : 10;
        Store.addXP(xp);
        Store.saveTopic(_ctx.key, state);
        Store.checkExerciseAchievements();
        Sidebar.refresh();
        const card = document.getElementById('excard_' + exId);
        if (card) {
          card.classList.add('done');
          const btn = card.querySelector('.ex-done-btn');
          if (btn) btn.remove();
          const hdr = card.querySelector('.ex-header');
          if (hdr) hdr.insertAdjacentHTML('beforeend', '<span class="ex-done-mark">✓ feito</span>');
        }
      }
    },

    toggleChecklist(i) {
      const state = Store.getTopic(_ctx.key);
      if (!state.checklistItems) state.checklistItems = [];
      state.checklistItems[i] = !state.checklistItems[i];
      Store.saveTopic(_ctx.key, state);
      const data  = _topicData(_ctx.topico);
      const items = data && data.checklist ? data.checklist : [];
      const done  = state.checklistItems.filter(Boolean).length;
      const pct   = items.length ? Math.round((done / items.length) * 100) : 0;
      const bar   = document.querySelector('.cl-bar-fill');
      const prog  = document.querySelector('.cl-progress');
      if (bar)  bar.style.width = pct + '%';
      if (prog) prog.textContent = done + '/' + items.length + ' itens concluídos';
      const el = document.querySelectorAll('.cl-item')[i];
      if (el) {
        el.classList.toggle('done', state.checklistItems[i]);
        const chk = el.querySelector('.cl-check');
        if (chk) {
          chk.classList.toggle('done', state.checklistItems[i]);
          chk.textContent = state.checklistItems[i] ? '✓' : '';
        }
      }
    },

    autoSave() {
      clearTimeout(_saveTimer);
      const indicator = document.getElementById('notes-saved');
      if (indicator) indicator.textContent = 'salvando...';
      _saveTimer = setTimeout(() => {
        const state = Store.getTopic(_ctx.key);
        const nt = document.getElementById('nt-notes');
        const dt = document.getElementById('nt-doubts');
        const ob = document.getElementById('nt-obs');
        if (nt) state.notes        = nt.value;
        if (dt) state.doubts       = dt.value;
        if (ob) state.observations = ob.value;
        const hadNote = !state._hadNote && (state.notes || state.doubts || state.observations);
        Store.saveTopic(_ctx.key, state);
        if (hadNote) { state._hadNote = true; Store.unlockAchievement('first_note'); }
        if (indicator) indicator.textContent = '✓ salvo';
        setTimeout(() => { if (indicator) indicator.textContent = ''; }, 2000);
      }, 800);
    }
  };
})();
