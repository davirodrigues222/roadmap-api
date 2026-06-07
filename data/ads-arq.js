const ADS_ARQ = [
  {
    id: 'arquitetura', label: 'arquitetura de software', color: '#8b5cf6', icon: '🏛️',
    description: 'Padrões arquiteturais, design patterns e boas práticas de engenharia.',
    estimatedHours: 18, prerequisitos: ['estrutura-dados'],
    modulos: [
      {
        id: 'design-patterns-mod', name: 'design patterns', estimatedHours: 6,
        topicos: [
          {
            id: 'patterns-criacionais', title: 'padrões criacionais (Singleton, Factory, Builder)', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['design patterns', 'gof'],
            conteudo: {
              resumo: 'Padrões criacionais lidam com a criação de objetos de forma flexível e desacoplada.',
              conceitos: ['Singleton: uma única instância global', 'Factory Method: delegação da criação para subclasses', 'Abstract Factory: família de objetos relacionados', 'Builder: construção passo a passo de objetos complexos', 'Prototype: clonar objetos existentes'],
              explicacao: 'Singleton deve ser usado com cautela — dificulta testes e pode esconder dependências. Builder é ótimo para objetos com muitos parâmetros opcionais — elimina construtores telescópicos. Factory Method permite que o código dependa de abstrações, não de implementações concretas.',
              exemplos: [{ titulo: 'Builder pattern para requisições HTTP', codigo: `// Builder: objeto complexo com muitos parâmetros opcionais\nclass HttpRequest {\n  #url; #method; #headers; #body; #timeout;\n\n  constructor(builder) {\n    this.#url     = builder.url;\n    this.#method  = builder.method;\n    this.#headers = builder.headers;\n    this.#body    = builder.body;\n    this.#timeout = builder.timeout;\n  }\n\n  static get Builder() {\n    return class {\n      url(url)         { this.url = url;         return this; }\n      method(m)        { this.method = m;         return this; }\n      header(k, v)     { (this.headers ??= {})[k] = v; return this; }\n      body(b)          { this.body = b;           return this; }\n      timeout(ms)      { this.timeout = ms;       return this; }\n      build()          { return new HttpRequest(this); }\n    };\n  }\n}\n\nconst req = new HttpRequest.Builder()\n  .url('/api/users')\n  .method('POST')\n  .header('Content-Type', 'application/json')\n  .header('Authorization', 'Bearer token')\n  .body({ nome: 'Davi' })\n  .timeout(5000)\n  .build();`, linguagem: 'javascript' }],
              errosComuns: ['Singleton com estado mutável compartilhado — causa bugs difíceis de rastrear', 'Overengineering: usar Factory Method para criação simples que não precisa de extensão'],
              dicas: ['Builder é especialmente útil em testes: new UserBuilder().ativo(true).comEmail("a@b.com").build()', 'Prefira injeção de dependência a Singleton — mais testável e explícito'],
              links: [{ titulo: 'Refactoring Guru — Design Patterns', url: 'https://refactoring.guru/design-patterns' }], projetosRelacionados: ['Implementar os padrões Singleton, Factory e Builder em um sistema de notificações (email, SMS, push)']
            },
            exercicios: {
              fixacao: [{ id: 'pcr-f1', enunciado: 'Quais são os problemas do padrão Singleton e quando ele é aceitável?', tipo: 'dissertativo', gabarito: 'Problemas: dificulta testes (estado global compartilhado), viola SRP, concorrência. Aceitável: logger, configurações de leitura, cache read-only.' }],
              intermediario: [{ id: 'pcr-i1', enunciado: 'Implemente Factory Method para criar diferentes tipos de notificação (Email, SMS, Push) a partir de uma string de tipo.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'pcr-d1', enunciado: 'Implemente um Builder para SQLQueryBuilder que constrói queries SELECT com: tabela, colunas, WHERE, JOIN, ORDER BY e LIMIT.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo e implemento Builder pattern', 'Entendo os problemas do Singleton', 'Sei implementar Factory Method', 'Conheço pelo menos 3 padrões criacionais']
          },
          {
            id: 'patterns-comportamentais', title: 'padrões comportamentais (Observer, Strategy, Command)', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['design patterns', 'comportamental'],
            conteudo: {
              resumo: 'Padrões comportamentais definem como objetos colaboram e se comunicam.',
              conceitos: ['Observer: notificar múltiplos objetos sobre mudanças de estado', 'Strategy: encapsular algoritmos intercambiáveis', 'Command: encapsular ação como objeto (undo/redo)', 'Chain of Responsibility: passar requisição por cadeia de handlers', 'Template Method: esqueleto de algoritmo com passos customizáveis'],
              explicacao: 'Observer é a base de sistemas de eventos — o EventEmitter do Node.js, o addEventListener do DOM. Strategy elimina condicionais: em vez de if (tipo === "pix") ... else if (tipo === "boleto") ..., cada estratégia é uma classe/função. Command permite undo/redo ao armazenar o estado antes da ação.',
              exemplos: [{ titulo: 'Strategy para cálculo de frete', codigo: `// Strategy: encapsula algoritmos intercambiáveis\nconst estrategiasFrete = {\n  correios: (peso, distancia) => peso * 0.5 + distancia * 0.1,\n  jadlog:   (peso, distancia) => peso * 0.4 + distancia * 0.15,\n  sedex:    (peso, distancia) => peso * 0.8 + distancia * 0.05\n};\n\nclass Pedido {\n  constructor(peso, distancia, estrategia = 'correios') {\n    this.peso = peso;\n    this.distancia = distancia;\n    this.estrategiaFrete = estrategia;\n  }\n\n  calcularFrete() {\n    const fn = estrategiasFrete[this.estrategiaFrete];\n    if (!fn) throw new Error('Estratégia desconhecida');\n    return fn(this.peso, this.distancia);\n  }\n\n  setEstrategia(estrategia) {\n    this.estrategiaFrete = estrategia;\n  }\n}\n\nconst pedido = new Pedido(2, 500, 'sedex');\nconsole.log(pedido.calcularFrete()); // aplica regra do sedex`, linguagem: 'javascript' }],
              errosComuns: ['Observer sem remoção de listeners — memory leak', 'Strategy sem validação da estratégia (lança erro obscuro em runtime)'],
              dicas: ['Observer + EventEmitter é a base de Node.js, React state, Vue reatividade', 'Command com undo: armazene o estado anterior no próprio Command'],
              links: [], projetosRelacionados: ['Implementar um editor de texto simples com undo/redo usando Command pattern']
            },
            exercicios: {
              fixacao: [{ id: 'pco-f1', enunciado: 'Explique o padrão Observer com um exemplo do cotidiano.', tipo: 'dissertativo', gabarito: 'Um canal do YouTube é o Subject. Inscritos são Observers. Ao publicar vídeo, o canal notifica todos os inscritos automaticamente.' }],
              intermediario: [{ id: 'pco-i1', enunciado: 'Implemente um sistema de events com Observer: on(evento, handler), off(evento, handler) e emit(evento, dados). Use em uma store de estado simples.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'pco-d1', enunciado: 'Implemente um editor de texto com undo/redo usando Command pattern: cada ação (inserir, deletar, substituir) é um Command com execute() e undo().', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei Observer/EventEmitter', 'Uso Strategy para eliminar condicionais', 'Entendo Command e sua aplicação em undo/redo', 'Conheço a diferença entre padrões comportamentais']
          }
        ]
      },
      {
        id: 'arquiteturas-mod', name: 'arquiteturas de aplicação', estimatedHours: 6,
        topicos: [
          {
            id: 'mvc-mvp-mvvm', title: 'MVC, MVP e MVVM', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['arquitetura', 'mvc', 'mvvm'],
            conteudo: {
              resumo: 'MVC, MVP e MVVM são padrões arquiteturais que separam responsabilidades de UI, lógica de negócio e dados. Cada framework escolhe um (React usa MVVM, Django usa MVC).',
              conceitos: ['MVC: Model-View-Controller', 'Model: dados e regras de negócio', 'View: apresentação visual', 'Controller: processa input e coordena M e V', 'MVVM: Model-View-ViewModel — ViewModel expõe estado reativo', 'Two-way binding: View e ViewModel sincronizados automaticamente'],
              explicacao: 'MVC é o mais antigo e usado em frameworks server-side (Django, Rails, Spring MVC). No frontend, React usa um modelo unidirecional (MVVM): o estado (ViewModel) flui para a View; eventos da View atualizam o estado. O dado nunca flui de volta automaticamente — isso é unidirecional.',
              exemplos: [{ titulo: 'MVC vs React (MVVM)', codigo: `// MVC tradicional (server-side)\n// Model: regra de negócio pura\nclass ProdutoModel {\n  constructor(repo) { this.repo = repo; }\n  async listar(filtro) { return this.repo.buscar(filtro); }\n}\n\n// Controller: processa request, chama model, retorna view\napp.get('/produtos', async (req, res) => {\n  const produtos = await produtoModel.listar(req.query);\n  res.render('produtos/lista', { produtos }); // chama a View\n});\n\n// ============================\n// MVVM no React (unidirecional)\nfunction ProdutosView() {\n  // ViewModel: estado reativo\n  const [produtos, setProdutos] = useState([]);\n  const [filtro, setFiltro]     = useState('');\n\n  // Model (data layer)\n  useEffect(() => {\n    fetch(\`/api/produtos?q=\${filtro}\`)\n      .then(r => r.json())\n      .then(setProdutos); // atualiza ViewModel → View rerenderiza\n  }, [filtro]);\n\n  // View: apenas lê o estado, nunca escreve diretamente\n  return <input value={filtro} onChange={e => setFiltro(e.target.value)} />;\n}`, linguagem: 'javascript' }],
              errosComuns: ['Colocar lógica de negócio no Controller (deve estar no Model/Service)', 'Confundir MVC com camadas — MVC é sobre separação de responsabilidades de UI, não de toda a aplicação'],
              dicas: ['No backend, a camada Controller deve ser fina — apenas orquestrar, sem lógica de negócio', 'React introduziu Unidirectional Data Flow — diferente do two-way binding do Angular 1/Vue'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'mvc-f1', enunciado: 'Qual a responsabilidade de cada camada no MVC?', tipo: 'dissertativo', gabarito: 'Model: dados e regras de negócio. View: apresentação. Controller: processa input do usuário e coordena Model e View.' }],
              intermediario: [{ id: 'mvc-i1', enunciado: 'Refatore uma aplicação Express que tem toda a lógica no controller para separar em Controller (thin) + Service + Repository.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'mvc-d1', enunciado: 'Compare a mesma feature implementada com MVC puro (Express + template engine) e com React MVVM. Documente as diferenças de fluxo de dados.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo MVC e sei aplicar', 'Entendo MVVM e como React o implementa', 'Mantenho controllers finos', 'Separo lógica de negócio em Services']
          },
          {
            id: 'clean-arch', title: 'Clean Architecture e DDD básico', estimatedMinutes: 60,
            difficulty: 'avancado', tags: ['arquitetura', 'clean architecture', 'ddd'],
            conteudo: {
              resumo: 'Clean Architecture organiza o código em círculos concêntricos de responsabilidade. DDD (Domain-Driven Design) centra o software no domínio do negócio.',
              conceitos: ['Entities: regras de negócio universais', 'Use Cases: regras de aplicação específicas', 'Interface Adapters: controllers, gateways, presenters', 'Frameworks & Drivers: banco, web framework, UI', 'Dependency Rule: dependências apontam para dentro (centro)', 'Aggregate, Entity, Value Object: conceitos do DDD'],
              explicacao: 'A regra de dependência: código externo (banco, framework, UI) depende do código interno (domínio), nunca o contrário. O domínio não sabe que existe um banco — ele define interfaces; a implementação fica na camada de infraestrutura. Isso permite trocar o banco sem mudar a regra de negócio.',
              exemplos: [{ titulo: 'Clean Architecture em Node.js', codigo: `// Entidade — lógica de negócio pura, sem dependências externas\nclass Pedido {\n  #id; #itens; #status;\n\n  constructor(id, itens) {\n    if (!itens.length) throw new Error('Pedido sem itens');\n    this.#id = id;\n    this.#itens = itens;\n    this.#status = 'pendente';\n  }\n\n  get total() { return this.#itens.reduce((s, i) => s + i.preco * i.qtd, 0); }\n  aprovar() { this.#status = 'aprovado'; }\n}\n\n// Use Case — orquestra entidades e interfaces\nclass ProcessarPedidoUseCase {\n  constructor(pedidoRepo, pagamentoGateway, emailService) {\n    this.pedidoRepo = pedidoRepo;\n    this.pagamento  = pagamentoGateway;\n    this.email      = emailService;\n  }\n\n  async executar(pedidoId) {\n    const pedido = await this.pedidoRepo.buscar(pedidoId);\n    await this.pagamento.processar(pedido.total);\n    pedido.aprovar();\n    await this.pedidoRepo.salvar(pedido);\n    await this.email.enviar(pedido);\n  }\n}\n\n// Controller — adapter entre HTTP e Use Case\napp.post('/pedidos/:id/processar', async (req, res) => {\n  const useCase = new ProcessarPedidoUseCase(pedidoRepo, pagamento, email);\n  await useCase.executar(req.params.id);\n  res.json({ status: 'processado' });\n});`, linguagem: 'javascript' }],
              errosComuns: ['Domínio importando frameworks externos (Prisma, Express) — quebra a Dependency Rule', 'Over-engineering em sistemas simples — Clean Architecture é para sistemas complexos'],
              dicas: ['Comece simples (3 camadas), adicione complexidade quando o sistema crescer', 'DDD e Clean Architecture são complementares — DDD define o quê, Clean Architecture define onde coloca'],
              links: [{ titulo: 'Clean Architecture — Uncle Bob', url: 'https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html' }], projetosRelacionados: ['Implementar um módulo de um sistema usando Clean Architecture: entidades, use cases, repositories e controllers separados']
            },
            exercicios: {
              fixacao: [{ id: 'ca-f1', enunciado: 'Explique a Dependency Rule da Clean Architecture.', tipo: 'dissertativo', gabarito: 'O código das camadas internas não pode depender das camadas externas. Entidades não conhecem use cases; use cases não conhecem controllers; nada do domínio conhece o banco de dados.' }],
              intermediario: [{ id: 'ca-i1', enunciado: 'Implemente um Use Case de "transferência bancária" com Clean Architecture: entidade Conta, use case Transferir, interface de repositório, e controller HTTP.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'ca-d1', enunciado: 'Troque o banco de dados de um módulo (de in-memory para SQLite) sem modificar nenhuma entidade ou use case — apenas implemente o novo repositório.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo os 4 círculos da Clean Architecture', 'Sei aplicar a Dependency Rule', 'Implementei Use Cases desacoplados de infraestrutura', 'Conheço os conceitos básicos de DDD']
          },
          {
            id: 'microservicos', title: 'microserviços vs monolito', estimatedMinutes: 45,
            difficulty: 'avancado', tags: ['arquitetura', 'microserviços'],
            conteudo: {
              resumo: 'Microserviços dividem uma aplicação em serviços pequenos, independentes e com deploy separado. Monolitos têm tudo em uma única aplicação. Ambos têm trade-offs importantes.',
              conceitos: ['Monolito modular: módulos separados mas deploy único', 'Microserviço: serviço com domínio próprio, banco próprio, deploy independente', 'API Gateway: ponto de entrada único para os clientes', 'Event-driven: comunicação assíncrona via mensageria (Kafka, RabbitMQ)', 'Service mesh: observabilidade e roteamento entre serviços'],
              explicacao: 'Microserviços NÃO são a resposta padrão — adicionam complexidade enorme de infraestrutura, rede e observabilidade. Comece com monolito bem estruturado (monolito modular). Extraia serviços apenas quando houver necessidade real (times separados, escalabilidade diferente por componente, domínios muito distintos).',
              exemplos: [{ titulo: 'Quando migrar de monolito para microserviços', codigo: `// Monolito Modular (ponto de partida recomendado)\n// src/\n//   modules/\n//     auth/        → AuthService, AuthController\n//     catalogo/    → ProdutoService, CategoriaService\n//     pedidos/     → PedidoService, CarrinhoService\n//     pagamentos/  → PagamentoService\n//   shared/        → logger, database, config\n\n// Cada módulo tem interface clara\n// Comunicação interna via function calls (rápido, sem rede)\n// Deploy único (simples)\n\n// Microserviços (quando tem necessidade)\n// pedidos-service: POST /pedidos → Kafka → pagamentos-service\n// pagamentos-service: consome evento, processa, emite resultado\n// catalogo-service: independente, escala sozinho na Black Friday\n\n// Regra: "não são microserviços, são nano-serviços"\n// Cada serviço deve ser grande o suficiente para ter um time responsável`, linguagem: 'text' }],
              errosComuns: ['Começar com microserviços em produto novo (prematura complexidade)', 'Microserviços que compartilham o mesmo banco — perde o principal benefício'],
              dicas: ['Sam Newman: "monolito primeiro" — refatore para microserviços quando o monolito dói', '"Distributed monolith" é o pior dos dois mundos — monolito acoplado via rede'],
              links: [{ titulo: 'Martin Fowler — Microservices', url: 'https://martinfowler.com/articles/microservices.html' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ms-f1', enunciado: 'Quais são as principais desvantagens de microserviços que justificam começar com um monolito?', tipo: 'dissertativo', gabarito: 'Latência de rede, consistência eventual, transações distribuídas complexas, overhead de infraestrutura (k8s, service mesh), debugging difícil, múltiplos deploys.' }],
              intermediario: [{ id: 'ms-i1', enunciado: 'Desenhe a arquitetura de um e-commerce como monolito modular: quais módulos existem, quais são os contratos entre eles e como eles se comunicam?', tipo: 'dissertativo' }],
              desafio: [{ id: 'ms-d1', enunciado: 'Identifique num projeto existente quais partes poderiam ser extraídas como microserviço e justifique os critérios usados (escala, time, domínio).', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo a diferença entre monolito e microserviços', 'Sei quando microserviços fazem sentido', 'Conheço os padrões: API Gateway, event-driven', 'Defendo monolito modular como ponto de partida']
          }
        ]
      },
      {
        id: 'qualidade-mod', name: 'qualidade e boas práticas', estimatedHours: 3,
        topicos: [
          {
            id: 'code-review-bp', title: 'code review e boas práticas', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['qualidade', 'code review'],
            conteudo: {
              resumo: 'Code review é uma das práticas mais eficazes para qualidade. Não se trata só de encontrar bugs — é compartilhamento de conhecimento e alinhamento de padrões.',
              conceitos: ['O que revisar: lógica, segurança, performance, legibilidade, testes', 'Pull Request: proposta de mudança com descrição clara', 'Comentários construtivos: "considere X" em vez de "isso está errado"', 'Autorias coletivas: o código pertence ao time, não ao autor', 'LGTM: "looks good to me" — aprovação'],
              explicacao: 'Como dar review: foque em: segurança (validação, autenticação), lógica (edge cases, erros), legibilidade (nomes claros, complexidade desnecessária), testes (cobertura adequada). Seja específico e construtivo. Aprovar PR ruim por pressão de tempo é uma dívida técnica que vai cobrar depois.',
              exemplos: [{ titulo: 'O que checar em um code review', codigo: `// Checklist de code review\n\n// 1. SEGURANÇA\n// - Input do usuário validado?\n// - SQL injection possível?\n// - Dados sensíveis expostos (log, response)?\n\n// 2. LÓGICA\n// - Casos de borda tratados? (null, array vazio, overflow)\n// - Erro tratado adequadamente?\n// - Race conditions possíveis?\n\n// 3. LEGIBILIDADE\n// - Nomes de variáveis/funções claros?\n// - Funções com uma responsabilidade?\n// - Complexidade ciclomática alta?\n\n// 4. TESTES\n// - Happy path testado?\n// - Casos de erro testados?\n// - Coverage suficiente para a complexidade?\n\n// 5. PERFORMANCE\n// - N+1 queries?\n// - Loop desnecessário?\n// - Caching onde faria sentido?`, linguagem: 'text' }],
              errosComuns: ['Revisar apenas formatação (deixar para o linter)', 'Comentários vagos: "isso está errado" sem explicar por quê ou sugerir alternativa'],
              dicas: ['Elogie o que foi bem feito — code review não é só crítica', '"Nit:" indica comentário de baixa prioridade (cosmético) que o autor pode ignorar'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'cr-f1', enunciado: 'Liste 5 categorias de itens para verificar em um code review.', tipo: 'dissertativo', gabarito: 'Segurança, lógica e edge cases, legibilidade, testes, performance.' }],
              intermediario: [{ id: 'cr-i1', enunciado: 'Faça um code review de um PR fictício com os seguintes problemas: falta de validação de input, N+1 query, nome de variável ruim e sem tratamento de erro. Escreva os comentários como faria em um PR real.', tipo: 'dissertativo' }],
              desafio: [{ id: 'cr-d1', enunciado: 'Crie um checklist de code review personalizado para o projeto em que você trabalha, com exemplos específicos de cada categoria.', tipo: 'dissertativo' }]
            },
            checklist: ['Faço code reviews com feedback construtivo', 'Verifico segurança, lógica e testes', 'Sei dar e receber feedback técnico', 'Reviso meu próprio código antes de abrir PR']
          }
        ]
      }
    ]
  }
];
