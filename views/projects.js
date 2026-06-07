const ProjectsView = (function () {
  const PROJECTS = [
    {
      title: 'To-Do List com localStorage',
      desc: 'Lista de tarefas com criação, edição, exclusão e persistência. Filtre por status (pendente/concluído).',
      tags: ['HTML','CSS','JavaScript','localStorage'],
      level: 'básico', color: '#1fcb8a',
      skills: ['DOM manipulation','eventos','localStorage','CRUD'],
      steps: ['Criar o HTML da interface','Implementar adicionar tarefa','Implementar marcar como feita','Implementar excluir','Salvar no localStorage','Adicionar filtros'],
      ns: 'jr', trilhaId: 'frontend'
    },
    {
      title: 'Calculadora',
      desc: 'Calculadora completa com operações básicas, histórico de cálculos e teclado numérico funcional.',
      tags: ['HTML','CSS','JavaScript'],
      level: 'básico', color: '#1fcb8a',
      skills: ['eventos de teclado','lógica matemática','manipulação de estado'],
      steps: ['Montar a grade da calculadora','Capturar cliques nos botões','Implementar as operações','Adicionar suporte a teclado','Exibir histórico'],
      ns: 'jr', trilhaId: 'frontend'
    },
    {
      title: 'Clone do GitHub Profile',
      desc: 'Consuma a API pública do GitHub e exiba o perfil de um usuário com repositórios, seguidores e bio.',
      tags: ['HTML','CSS','JavaScript','fetch','API REST'],
      level: 'intermediário', color: '#38bdf8',
      skills: ['fetch API','async/await','renderização dinâmica','tratamento de erros'],
      steps: ['Criar formulário de busca','Fazer requisição à API','Renderizar dados do usuário','Listar repositórios','Tratar erros (usuário não encontrado)'],
      ns: 'jr', trilhaId: 'frontend'
    },
    {
      title: 'CRUD de Produtos com JSON',
      desc: 'Sistema completo de gerenciamento de produtos. Crie, edite e exclua itens, com dados persistidos em JSON local.',
      tags: ['HTML','CSS','JavaScript','localStorage'],
      level: 'intermediário', color: '#38bdf8',
      skills: ['CRUD completo','formulários','validação','pesquisa/filtros'],
      steps: ['Modelar o objeto Produto','Criar formulário de cadastro','Listar produtos em tabela','Implementar edição inline','Implementar exclusão com confirmação','Adicionar busca por nome'],
      ns: 'jr', trilhaId: 'backend'
    },
    {
      title: 'Quiz Interativo',
      desc: 'Quiz de programação com timer por questão, pontuação, ranking local e categorias de perguntas.',
      tags: ['HTML','CSS','JavaScript'],
      level: 'intermediário', color: '#38bdf8',
      skills: ['lógica de jogo','timer com setInterval','localStorage','gerenciamento de estado'],
      steps: ['Criar banco de perguntas','Implementar fluxo de questões','Adicionar timer','Calcular pontuação','Salvar ranking','Tela de resultado'],
      ns: 'jr', trilhaId: 'frontend'
    },
    {
      title: 'Tabela Hash do Zero',
      desc: 'Implemente uma tabela hash com encadeamento e sondagem linear em JavaScript. Inclua insert, search e delete.',
      tags: ['JavaScript','Estruturas de Dados','Algoritmos'],
      level: 'avançado', color: '#f59e0b',
      skills: ['função hash','resolução de colisões','complexidade de tempo','OOP'],
      steps: ['Implementar função hash para strings','Criar classe HashTable com encadeamento','Adicionar métodos insert/search/delete','Implementar versão com sondagem linear','Comparar desempenho entre as duas'],
      ns: 'ads', trilhaId: 'estrutura-dados'
    },
    {
      title: 'API REST com Node.js e JSON',
      desc: 'Crie uma API completa com endpoints GET/POST/PUT/DELETE para gerenciar uma lista de usuários, usando arquivos JSON como banco.',
      tags: ['Node.js','REST API','JSON','HTTP'],
      level: 'avançado', color: '#f59e0b',
      skills: ['HTTP methods','status codes','JSON parsing','módulo http nativo'],
      steps: ['Criar servidor HTTP básico','Implementar roteamento manual','GET /users — listar','POST /users — criar','PUT /users/:id — editar','DELETE /users/:id — excluir','Persistir em arquivo JSON'],
      ns: 'jr', trilhaId: 'backend'
    },
    {
      title: 'Catálogo React com Filtros',
      desc: 'Catálogo de produtos em React com busca em tempo real, filtro por categoria, ordenação e paginação.',
      tags: ['React','JavaScript','CSS','API'],
      level: 'intermediário', color: '#38bdf8',
      skills: ['componentes React','useState','useEffect','props','filtros reativos'],
      steps: ['Criar componentes Card e Catalog','Consumir API pública (FakeStore, DummyJSON)','Implementar busca com debounce','Adicionar filtro por categoria','Ordenar por preço/nome','Implementar paginação'],
      ns: 'ads', trilhaId: 'web-react'
    },
    {
      title: 'Sistema de Login com Supabase',
      desc: 'Autenticação completa com email/senha, controle de sessão, rotas protegidas e perfil de usuário.',
      tags: ['React','Supabase','Auth','JWT'],
      level: 'avançado', color: '#f59e0b',
      skills: ['autenticação','controle de acesso','context API','Supabase auth'],
      steps: ['Configurar projeto Supabase','Criar formulários de login/cadastro','Integrar auth do Supabase','Criar contexto de autenticação','Proteger rotas privadas','Implementar logout e persistência de sessão'],
      ns: 'ads', trilhaId: 'vendy'
    },
    {
      title: 'Banco de Dados MySQL — E-commerce',
      desc: 'Modele e implemente o banco de dados de um e-commerce com produtos, pedidos, clientes e relatórios SQL.',
      tags: ['MySQL','SQL','Modelagem','Joins'],
      level: 'intermediário', color: '#34d399',
      skills: ['modelagem relacional','SQL avançado','JOINs','funções de agregação'],
      steps: ['Modelar entidades (clientes, produtos, pedidos, itens_pedido)','Criar tabelas com PKs e FKs','Inserir dados de teste','Consultar pedidos por cliente','Calcular total por pedido','Relatório de produtos mais vendidos','Normalizar até 3FN'],
      ns: 'ads', trilhaId: 'mysql'
    },
  ];

  function _levelCls(level) {
    if (level === 'avançado')   return 'advanced';
    if (level === 'intermediário') return 'inter';
    return 'basic';
  }

  function _card(p, i) {
    const stepsHTML = p.steps.map((s, j) => `<li><span class="proj-step-num">${j+1}</span>${s}</li>`).join('');
    const tagsHTML  = p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('');
    const skillsHTML = p.skills.map(s => `<span class="proj-skill">${s}</span>`).join('');
    return `<div class="project-card" style="border-top-color:${p.color}">
      <div class="proj-header">
        <div>
          <h3 class="proj-title">${p.title}</h3>
          <span class="proj-level ${_levelCls(p.level)}">${p.level}</span>
        </div>
      </div>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${tagsHTML}</div>
      <div class="proj-skills-label">Habilidades praticadas:</div>
      <div class="proj-skills">${skillsHTML}</div>
      <details class="proj-steps">
        <summary>Ver roteiro de implementação</summary>
        <ol class="proj-step-list">${stepsHTML}</ol>
      </details>
      <div class="proj-footer">
        <button class="btn-ghost btn-sm" onclick="Router.navigate('roadmap',{ns:'${p.ns}'})">Ver trilha relacionada →</button>
      </div>
    </div>`;
  }

  return {
    render() {
      document.getElementById('main-content').innerHTML = `
        <div class="view-projects">
          <div class="page-header">
            <h1>Projetos Práticos</h1>
            <p>Projetos recomendados para consolidar o aprendizado de cada trilha</p>
          </div>

          <div class="filter-row">
            <button class="filter-btn active" onclick="ProjectsView.filterLevel('all',this)">todos</button>
            <button class="filter-btn" onclick="ProjectsView.filterLevel('básico',this)">básico</button>
            <button class="filter-btn" onclick="ProjectsView.filterLevel('intermediário',this)">intermediário</button>
            <button class="filter-btn" onclick="ProjectsView.filterLevel('avançado',this)">avançado</button>
          </div>

          <div class="projects-grid" id="projects-grid">
            ${PROJECTS.map((p, i) => _card(p, i)).join('')}
          </div>
        </div>`;
    },

    filterLevel(level, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filtered = level === 'all' ? PROJECTS : PROJECTS.filter(p => p.level === level);
      document.getElementById('projects-grid').innerHTML = filtered.map((p, i) => _card(p, i)).join('');
    }
  };
})();
