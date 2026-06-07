const LEVELS = [
  { rank: 'iniciante',  minXp: 0,    maxXp: 200,      color: '#6b7194' },
  { rank: 'aprendiz',  minXp: 200,  maxXp: 500,      color: '#1fcb8a' },
  { rank: 'júnior',    minXp: 500,  maxXp: 1200,     color: '#38bdf8' },
  { rank: 'pleno',     minXp: 1200, maxXp: 2500,     color: '#f59e0b' },
  { rank: 'sênior',    minXp: 2500, maxXp: 5000,     color: '#fb923c' },
  { rank: 'master',    minXp: 5000, maxXp: Infinity,  color: '#a78bfa' },
];

const ACHIEVEMENTS_DEF = {
  first_topic:      { id: 'first_topic',      title: 'Primeiro Passo',     desc: 'Concluiu o primeiro tópico',              icon: '🎯', xp: 10  },
  first_exercise:   { id: 'first_exercise',   title: 'Praticante',         desc: 'Completou o primeiro exercício',          icon: '💪', xp: 10  },
  first_challenge:  { id: 'first_challenge',  title: 'Desafiador',         desc: 'Completou o primeiro desafio',            icon: '🏆', xp: 50  },
  first_note:       { id: 'first_note',       title: 'Anotador',           desc: 'Criou a primeira anotação',               icon: '📝', xp: 15  },
  first_review:     { id: 'first_review',     title: 'Revisor',            desc: 'Completou a primeira revisão espaçada',   icon: '🔄', xp: 20  },
  streak_3:         { id: 'streak_3',         title: 'Consistência',       desc: '3 dias seguidos estudando',               icon: '🔥', xp: 20  },
  streak_7:         { id: 'streak_7',         title: 'Semana Dedicada',    desc: '7 dias seguidos estudando',               icon: '🔥', xp: 50  },
  streak_30:        { id: 'streak_30',        title: 'Mês Implacável',     desc: '30 dias seguidos estudando',              icon: '💎', xp: 200 },
  topics_5:         { id: 'topics_5',         title: 'Acelerando',         desc: 'Concluiu 5 tópicos',                      icon: '🚀', xp: 30  },
  topics_20:        { id: 'topics_20',        title: 'Comprometido',       desc: 'Concluiu 20 tópicos',                     icon: '⭐', xp: 100 },
  topics_50:        { id: 'topics_50',        title: 'Dedicado',           desc: 'Concluiu 50 tópicos',                     icon: '🌟', xp: 250 },
  exercises_5:      { id: 'exercises_5',      title: 'Praticando Muito',   desc: 'Completou 5 exercícios',                  icon: '💯', xp: 40  },
  trilha_complete:  { id: 'trilha_complete',  title: 'Trilha Completa',    desc: 'Completou uma trilha inteira',            icon: '🎖️', xp: 150 },
  two_hours:        { id: 'two_hours',        title: 'Maratonista',        desc: 'Estudou mais de 2h em um único dia',      icon: '⏰', xp: 75  },
};

function _today() {
  return new Date().toISOString().split('T')[0];
}

function _getLevelInfo(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) return LEVELS[i];
  }
  return LEVELS[0];
}

function _defaultMeta() {
  return {
    version: '2.0',
    createdAt: Date.now(),
    lastStudied: null,
    totalTimeSpent: 0,
    level: { xp: 0, rank: 'iniciante', nextRankAt: 200, color: '#6b7194' },
    streak: { count: 0, lastDate: null, longestStreak: 0 }
  };
}

function _defaultTopicState() {
  return {
    done: false,
    contentRead: false,
    exercisesDone: [],
    challengesDone: [],
    checklistItems: [],
    notes: '',
    doubts: '',
    observations: '',
    startedAt: null,
    completedAt: null,
    lastStudied: null,
    timeSpent: 0,
    review: { nextDate: null, interval: 0, ease: 2.5, count: 0 }
  };
}

function _defaultGoals() {
  return {
    weekly:  { target: 5,  type: 'topics', startDate: _today() },
    monthly: { target: 20, type: 'topics', startDate: _today() }
  };
}

const Store = (function () {
  const _state = {
    meta:         null,
    topics:       {},
    history:      [],
    goals:        null,
    achievements: [],
    reviews:      []
  };

  // ─── Migration from old v1 keys ────────────────────────────────
  function _migrateLegacy() {
    const allNs = [['jr', typeof JR_DATA !== 'undefined' ? JR_DATA : []], ['ads', typeof ADS_DATA !== 'undefined' ? ADS_DATA : []]];
    allNs.forEach(([ns, data]) => {
      data.forEach(trilha => {
        trilha.modulos.forEach((mod, mi) => {
          mod.topicos.forEach((_, ti) => {
            const oldKey = 'rdx_' + ns + '__' + trilha.id + '_' + mi + '_' + ti;
            const newKey = 'rdx_v2_topic_' + ns + '__' + trilha.id + '__' + mi + '__' + ti;
            if (localStorage.getItem(oldKey) === '1' && !localStorage.getItem(newKey)) {
              const st = _defaultTopicState();
              st.done = true;
              st.completedAt = Date.now();
              localStorage.setItem(newKey, JSON.stringify(st));
              localStorage.removeItem(oldKey);
            }
          });
        });
      });
    });
  }

  // ─── Public API ─────────────────────────────────────────────────
  return {
    load() {
      _state.meta         = JSON.parse(localStorage.getItem('rdx_v2_meta')         || 'null') ?? _defaultMeta();
      _state.history      = JSON.parse(localStorage.getItem('rdx_v2_history')      || '[]');
      _state.goals        = JSON.parse(localStorage.getItem('rdx_v2_goals')        || 'null') ?? _defaultGoals();
      _state.achievements = JSON.parse(localStorage.getItem('rdx_v2_achievements') || '[]');
      _state.reviews      = JSON.parse(localStorage.getItem('rdx_v2_reviews')      || '[]');
      if (_state.meta.version !== '2.0') _migrateLegacy();
    },

    getMeta()   { return _state.meta; },
    getGoals()  { return _state.goals; },
    getHistory(){ return _state.history; },
    getAchievements() { return _state.achievements; },
    getReviews()      { return _state.reviews; },
    getLevelsDef()    { return LEVELS; },
    getAchievementsDef() { return ACHIEVEMENTS_DEF; },

    saveMeta()    { localStorage.setItem('rdx_v2_meta',         JSON.stringify(_state.meta));    if (typeof Sync !== 'undefined') Sync.schedule(); },
    saveGoals(g)  { _state.goals = g; localStorage.setItem('rdx_v2_goals', JSON.stringify(g)); if (typeof Sync !== 'undefined') Sync.schedule(); },
    saveHistory() { localStorage.setItem('rdx_v2_history',      JSON.stringify(_state.history)); if (typeof Sync !== 'undefined') Sync.schedule(); },
    saveReviews() { localStorage.setItem('rdx_v2_reviews',      JSON.stringify(_state.reviews)); if (typeof Sync !== 'undefined') Sync.schedule(); },

    getTopic(key) {
      if (!_state.topics[key]) {
        const raw = localStorage.getItem('rdx_v2_topic_' + key);
        _state.topics[key] = raw ? JSON.parse(raw) : _defaultTopicState();
      }
      return _state.topics[key];
    },

    saveTopic(key, data) {
      _state.topics[key] = data;
      localStorage.setItem('rdx_v2_topic_' + key, JSON.stringify(data));
      if (typeof Sync !== 'undefined') Sync.schedule();
    },

    topicKey(ns, trilhaId, mi, ti) {
      return ns + '__' + trilhaId + '__' + mi + '__' + ti;
    },

    // ─── XP & Level ──────────────────────────────────────────────
    addXP(amount) {
      _state.meta.level.xp += amount;
      const info = _getLevelInfo(_state.meta.level.xp);
      const prevRank = _state.meta.level.rank;
      _state.meta.level.rank     = info.rank;
      _state.meta.level.color    = info.color;
      _state.meta.level.nextRankAt = info.maxXp === Infinity ? null : info.maxXp;
      this.saveMeta();
      if (info.rank !== prevRank) {
        Events.emit('level:up', { rank: info.rank, color: info.color });
      }
    },

    // ─── Streak ──────────────────────────────────────────────────
    updateStreak() {
      const today = _today();
      const last  = _state.meta.streak.lastDate;
      if (last === today) return;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      _state.meta.streak.count = (last === yesterday) ? _state.meta.streak.count + 1 : 1;
      _state.meta.streak.lastDate = today;
      _state.meta.streak.longestStreak = Math.max(
        _state.meta.streak.longestStreak,
        _state.meta.streak.count
      );
      _state.meta.lastStudied = Date.now();
      this.saveMeta();

      const s = _state.meta.streak.count;
      if (s === 3)  this.unlockAchievement('streak_3');
      if (s === 7)  this.unlockAchievement('streak_7');
      if (s === 30) this.unlockAchievement('streak_30');
      Events.emit('streak:updated', _state.meta.streak);
    },

    addTimeSpent(seconds) {
      _state.meta.totalTimeSpent += seconds;
      this.saveMeta();
    },

    // ─── Achievements ─────────────────────────────────────────────
    unlockAchievement(id) {
      if (_state.achievements.find(a => a.id === id)) return;
      const def = ACHIEVEMENTS_DEF[id];
      if (!def) return;
      _state.achievements.push({ id, unlockedAt: Date.now() });
      localStorage.setItem('rdx_v2_achievements', JSON.stringify(_state.achievements));
      if (typeof Sync !== 'undefined') Sync.schedule();
      this.addXP(def.xp);
      Events.emit('achievement:unlocked', def);
    },

    checkTopicAchievements() {
      const all = this.getAllTopics();
      const done = all.filter(t => t.done).length;
      if (done >= 1)  this.unlockAchievement('first_topic');
      if (done >= 5)  this.unlockAchievement('topics_5');
      if (done >= 20) this.unlockAchievement('topics_20');
      if (done >= 50) this.unlockAchievement('topics_50');
    },

    checkExerciseAchievements() {
      const all  = this.getAllTopics();
      const exDone = all.reduce((s, t) => s + (t.exercisesDone || []).length + (t.challengesDone || []).length, 0);
      if (exDone >= 1) this.unlockAchievement('first_exercise');
      if (exDone >= 5) this.unlockAchievement('exercises_5');
      const chalDone = all.reduce((s, t) => s + (t.challengesDone || []).length, 0);
      if (chalDone >= 1) this.unlockAchievement('first_challenge');
    },

    // ─── History ─────────────────────────────────────────────────
    addHistory(session) {
      _state.history.unshift({ ...session, date: _today(), ts: Date.now() });
      if (_state.history.length > 365) _state.history = _state.history.slice(0, 365);
      this.saveHistory();
    },

    getTodayTime() {
      const today = _today();
      return _state.history
        .filter(h => h.date === today)
        .reduce((s, h) => s + (h.duration || 0), 0);
    },

    getWeekDays() {
      const result = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
        result[d] = 0;
      }
      _state.history.forEach(h => {
        if (result[h.date] !== undefined) result[h.date] += (h.duration || 0);
      });
      return result;
    },

    getHeatmap(days = 91) {
      const result = {};
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000).toISOString().split('T')[0];
        result[d] = 0;
      }
      _state.history.forEach(h => {
        if (result[h.date] !== undefined) result[h.date] += (h.duration || 0);
      });
      return result;
    },

    // ─── Reviews (Spaced Repetition SM-2 simplified) ─────────────
    scheduleReview(key) {
      const existing = _state.reviews.find(r => r.key === key);
      if (existing) return;
      const next = new Date(Date.now() + 86400000).toISOString().split('T')[0];
      _state.reviews.push({ key, nextDate: next, interval: 1, ease: 2.5, count: 0 });
      this.saveReviews();
    },

    completeReview(key, rating) {
      const r = _state.reviews.find(r => r.key === key);
      if (!r) return;
      const easeMap   = { dificil: -0.2, medio: 0, facil: 0.15 };
      const factor    = { dificil: 1.2,  medio: r.ease, facil: r.ease * 1.3 };
      r.ease     = Math.max(1.3, r.ease + easeMap[rating]);
      r.interval = r.count === 0 ? 1 : r.count === 1 ? 3 : Math.round(r.interval * factor[rating]);
      if (rating === 'dificil') r.interval = 1;
      r.count++;
      const next = new Date(Date.now() + r.interval * 86400000);
      r.nextDate = next.toISOString().split('T')[0];
      this.saveReviews();
      this.addXP(15);
      this.unlockAchievement('first_review');
    },

    getDueReviews() {
      const today = _today();
      return _state.reviews.filter(r => r.nextDate <= today);
    },

    // ─── Global topic helpers ─────────────────────────────────────
    getAllTopics() {
      const result = [];
      const datasets = [];
      if (typeof JR_DATA  !== 'undefined') datasets.push(['jr',  JR_DATA]);
      if (typeof ADS_DATA !== 'undefined') datasets.push(['ads', ADS_DATA]);
      datasets.forEach(([ns, data]) => {
        data.forEach(trilha => {
          trilha.modulos.forEach((mod, mi) => {
            mod.topicos.forEach((topico, ti) => {
              const key   = this.topicKey(ns, trilha.id, mi, ti);
              const state = this.getTopic(key);
              result.push({ key, ns, trilha, mod, modIdx: mi, topico, topicoIdx: ti, ...state });
            });
          });
        });
      });
      return result;
    },

    countDone(ns, data) {
      return data.reduce((a, t) =>
        a + t.modulos.reduce((b, mod, mi) =>
          b + mod.topicos.filter((_, ti) => {
            const key = this.topicKey(ns, t.id, mi, ti);
            return this.getTopic(key).done;
          }).length, 0), 0);
    },

    countTotal(data) {
      return data.reduce((a, t) => a + t.modulos.reduce((b, m) => b + m.topicos.length, 0), 0);
    },

    countDoneTrilha(ns, trilha) {
      return trilha.modulos.reduce((a, mod, mi) =>
        a + mod.topicos.filter((_, ti) => {
          const key = this.topicKey(ns, trilha.id, mi, ti);
          return this.getTopic(key).done;
        }).length, 0);
    },

    getLastStudied() {
      const all   = this.getAllTopics();
      const recents = all.filter(t => t.lastStudied).sort((a, b) => b.lastStudied - a.lastStudied);
      return recents[0] || null;
    },

    getWeeklyProgress() {
      const goals  = this.getGoals();
      const today  = new Date();
      const monday = new Date(today);
      monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
      const startStr = monday.toISOString().split('T')[0];
      const all    = this.getAllTopics();
      const count  = all.filter(t => {
        if (!t.completedAt) return false;
        const d = new Date(t.completedAt).toISOString().split('T')[0];
        return d >= startStr;
      }).length;
      return { done: count, target: goals.weekly.target };
    },

    getMonthlyProgress() {
      const goals = this.getGoals();
      const startStr = new Date().toISOString().slice(0, 7) + '-01';
      const all   = this.getAllTopics();
      const count = all.filter(t => {
        if (!t.completedAt) return false;
        const d = new Date(t.completedAt).toISOString().split('T')[0];
        return d >= startStr;
      }).length;
      return { done: count, target: goals.monthly.target };
    }
  };
})();
