const ADS_BOOTCAMP = [
  {
    id: 'bootcamp', label: 'bootcamp ADS', color: '#0891b2', icon: '🚀',
    description: 'Projetos integradores e habilidades transversais do curso de ADS.',
    estimatedHours: 15, prerequisitos: ['estrutura-dados', 'mysql'],
    modulos: [
      {
        id: 'projeto-integrador-mod', name: 'projeto integrador', estimatedHours: 6,
        topicos: [
          {
            id: 'levantamento-requisitos', title: 'levantamento de requisitos', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['requisitos', 'engenharia de software'],
            conteudo: {
              resumo: 'Levantamento de requisitos é o processo de entender o que o sistema deve fazer. É a fase mais crítica — um requisito errado vira código errado.',
              conceitos: ['Requisito funcional: o que o sistema faz (o usuário pode cadastrar produtos)', 'Requisito não-funcional: como o sistema se comporta (resposta em < 1s)', 'Stakeholder: qualquer pessoa afetada pelo sistema', 'Casos de uso: interações entre ator e sistema', 'User Story: "Como [ator], quero [ação] para [benefício]"', 'Critérios de aceite: condições que definem quando a story está pronta'],
              explicacao: 'Erros de requisito são 10x mais baratos de corrigir antes de codificar do que depois. Técnicas: entrevistas com stakeholders, observação do processo atual, workshops, prototipagem rápida. Documente o "o quê" e o "por quê", não o "como" — a solução técnica vem depois.',
              exemplos: [{ titulo: 'User Story bem escrita', codigo: `// User Story no formato padrão\n"Como cliente cadastrado,\n quero adicionar produtos ao carrinho\n para poder comprar mais de um item de uma vez."\n\n// Critérios de aceite (BDD: Given-When-Then)\nGiven: Estou na página de um produto disponível em estoque\nWhen:  Clico em "Adicionar ao carrinho"\nThen:  O produto aparece no carrinho\n  AND: O contador do carrinho é incrementado\n  AND: Recebo confirmação visual de sucesso\n\n// Critério negativo\nGiven: O produto está sem estoque\nWhen:  Tento adicionar ao carrinho\nThen:  Botão está desabilitado\n  AND: Vejo a mensagem "Produto indisponível"\n\n// Requisito não-funcional associado\n"A adição ao carrinho deve ocorrer em menos de 200ms\n (experiência em redes lentas de 3G incluídas)"`, linguagem: 'text' }],
              errosComuns: ['Misturar "o que" com "como" nos requisitos (especificar implementação antes da necessidade)', 'Não validar os requisitos com o stakeholder antes de implementar'],
              dicas: ['"Se você não puder descrever o que está fazendo como um processo, você não sabe o que está fazendo" — W. Edwards Deming', 'Wireframes/protótipos em papel validam requisitos 10x mais rápido que explicações verbais'],
              links: [], projetosRelacionados: ['Documentar os requisitos funcionais e não-funcionais do projeto integrador de ADS']
            },
            exercicios: {
              fixacao: [{ id: 'lr-f1', enunciado: 'Qual a diferença entre requisito funcional e não-funcional? Dê 2 exemplos de cada.', tipo: 'dissertativo', gabarito: 'Funcional: o sistema cadastra usuários, o sistema envia email de confirmação. Não-funcional: resposta < 1s, disponibilidade de 99.9%, suporte a 1000 usuários simultâneos.' }],
              intermediario: [{ id: 'lr-i1', enunciado: 'Escreva 5 User Stories para um sistema de agendamento de consultas médicas. Para cada uma, adicione pelo menos 2 critérios de aceite.', tipo: 'dissertativo' }],
              desafio: [{ id: 'lr-d1', enunciado: 'Conduza uma "entrevista" com um colega simulando um cliente. Documente os requisitos levantados e valide com ele se estão corretos.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei distinguir requisitos funcionais de não-funcionais', 'Escrevo User Stories no formato correto', 'Defino critérios de aceite (Given-When-Then)', 'Valido requisitos com stakeholders antes de codificar']
          },
          {
            id: 'diagramas-uml', title: 'UML: diagramas de caso de uso e classe', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['uml', 'modelagem', 'diagrama'],
            conteudo: {
              resumo: 'UML (Unified Modeling Language) é a linguagem padrão para modelagem de sistemas. Os diagramas mais usados em ADS são: caso de uso, classe, sequência e atividade.',
              conceitos: ['Diagrama de caso de uso: atores e suas interações com o sistema', 'Diagrama de classe: estrutura estática (classes, atributos, métodos, relações)', 'Diagrama de sequência: fluxo de mensagens ao longo do tempo', 'Relações: associação, herança, composição, agregação, dependência'],
              explicacao: 'Caso de uso mostra "quem faz o quê no sistema" — ator, caso de uso, include/extend. Diagrama de classe é o mapa do código antes de escrever. Sequência mostra a ordem das chamadas de método. Use Mermaid ou draw.io para criar diagramas sem instalar software.',
              exemplos: [{ titulo: 'Diagrama de classe em notação textual (Mermaid)', codigo: `classDiagram\n    class Usuario {\n        +Long id\n        +String nome\n        +String email\n        +String senhaHash\n        +Date criadoEm\n        +autenticar(senha) Boolean\n        +atualizarPerfil(dados) void\n    }\n\n    class Pedido {\n        +Long id\n        +StatusPedido status\n        +Date criadoEm\n        +calcularTotal() Double\n        +cancelar() void\n    }\n\n    class ItemPedido {\n        +int quantidade\n        +Double precoUnitario\n        +Double subtotal()\n    }\n\n    class Produto {\n        +Long id\n        +String nome\n        +Double preco\n        +int estoque\n    }\n\n    Usuario "1" --> "0..*" Pedido : realiza\n    Pedido "1" *-- "1..*" ItemPedido : contém\n    ItemPedido "0..*" --> "1" Produto : referencia`, linguagem: 'text' }],
              errosComuns: ['Diagrama de classe que copia código diretamente sem modelar o domínio', 'Caso de uso com verbos no lugar de atores ("Processar Pedido" não é ator — "Sistema de Pagamento" é)'],
              dicas: ['Use Mermaid.js para diagramas em código (versionável no git)', 'O diagrama deve ser entendido pelo cliente, não apenas por devs'],
              links: [{ titulo: 'Mermaid — Diagramas em Markdown', url: 'https://mermaid.js.org' }], projetosRelacionados: ['Criar todos os diagramas UML necessários para o projeto integrador antes de começar a codificar']
            },
            exercicios: {
              fixacao: [{ id: 'uml-f1', enunciado: 'Qual a diferença entre composição e agregação em diagrama de classe?', tipo: 'dissertativo', gabarito: 'Composição: o filho não existe sem o pai (Pedido e ItemPedido — se o pedido é deletado, os itens também são). Agregação: o filho pode existir independente (Departamento e Funcionario).' }],
              intermediario: [{ id: 'uml-i1', enunciado: 'Desenhe o diagrama de caso de uso de um sistema de biblioteca (empréstimo de livros). Inclua pelo menos 3 atores e 6 casos de uso com include/extend.', tipo: 'dissertativo' }],
              desafio: [{ id: 'uml-d1', enunciado: 'Crie o diagrama de sequência do fluxo de "realizar pedido" de um e-commerce, incluindo: cliente, API, serviço de pedidos, banco de dados e serviço de pagamento.', tipo: 'dissertativo' }]
            },
            checklist: ['Crio diagramas de caso de uso', 'Crio diagramas de classe com relações corretas', 'Entendo composição vs agregação', 'Uso ferramenta (draw.io, Mermaid) para os diagramas']
          },
          {
            id: 'metodologias-ageis', title: 'metodologias ágeis (Scrum/Kanban)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['scrum', 'kanban', 'agile'],
            conteudo: {
              resumo: 'Metodologias ágeis entregam software em ciclos curtos (sprints) com feedback constante do cliente, em vez de planejar tudo antes e entregar no final.',
              conceitos: ['Sprint: ciclo de trabalho de 1-2 semanas', 'Backlog: lista priorizada de funcionalidades', 'Daily standup: reunião diária de 15 minutos', 'Sprint Review: demonstração para o cliente', 'Sprint Retrospective: melhoria do processo', 'Kanban: fluxo contínuo com limites de WIP (Work In Progress)'],
              explicacao: 'Scrum tem papéis (Product Owner, Scrum Master, Dev Team), eventos (Sprint, Daily, Review, Retro) e artefatos (Product Backlog, Sprint Backlog, Increment). Kanban é mais simples: colunas (To Do, In Progress, Done) com limite máximo de tarefas em progresso para evitar multitasking.',
              exemplos: [{ titulo: 'Estrutura de Sprint com tarefas reais', codigo: `// Sprint Backlog (exemplo para 2 semanas)\n// Story Points: estimativa de esforço relativo\n\n// Semana 1\n[8pts] US-01: Como cliente, quero me cadastrar\n  - Criar endpoint POST /auth/register\n  - Hash da senha com bcrypt\n  - Enviar email de confirmação\n  - Testes de integração\n\n[5pts] US-02: Como cliente, quero fazer login\n  - Criar endpoint POST /auth/login\n  - Retornar JWT com 1h de duração\n  - Testes unitários do serviço\n\n// Semana 2\n[13pts] US-03: Como cliente, quero ver meu perfil\n  - GET /profile (autenticado)\n  - Endpoint PATCH /profile para atualizar\n  - Validação com Zod\n\n// Definition of Done (DoD)\n✅ Código revisado por 1 colega\n✅ Testes automatizados cobrindo os critérios de aceite\n✅ Deploy no ambiente de staging\n✅ Demonstrado para o PO`, linguagem: 'text' }],
              errosComuns: ['Daily que vira reunião de status de 1 hora (deve ser rápida e focada em impedimentos)', 'Sprint sem demonstração para o cliente — perde o feedback rápido'],
              dicas: ['Definition of Done (DoD): critérios que definem quando algo está verdadeiramente pronto', 'Story Points não são horas — são estimativas relativas de complexidade'],
              links: [{ titulo: 'Scrum Guide — oficial', url: 'https://scrumguides.org/scrum-guide.html' }], projetosRelacionados: ['Organizar o projeto integrador usando Scrum: criar backlog, planejar 2 sprints e fazer retrospectiva']
            },
            exercicios: {
              fixacao: [{ id: 'agil-f1', enunciado: 'Quais são os 3 papéis do Scrum e a responsabilidade de cada um?', tipo: 'dissertativo', gabarito: 'Product Owner: define e prioriza o backlog. Scrum Master: facilita o processo e remove impedimentos. Dev Team: auto-organizado, entrega o incremento.' }],
              intermediario: [{ id: 'agil-i1', enunciado: 'Crie o backlog de um sistema de agendamento médico com pelo menos 10 user stories priorizadas. Estime os story points de cada uma.', tipo: 'dissertativo' }],
              desafio: [{ id: 'agil-d1', enunciado: 'Simule um Sprint completo com seu grupo: planning (escolher stories), daily por 3 dias, review (demonstrar) e retrospectiva (o que funcionou, o que melhorar).', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo os eventos e papéis do Scrum', 'Sei usar Kanban para gerenciar fluxo de trabalho', 'Escrevo user stories com critérios de aceite', 'Já participei de uma retrospectiva']
          }
        ]
      },
      {
        id: 'soft-skills-mod', name: 'habilidades para o mercado', estimatedHours: 3,
        topicos: [
          {
            id: 'portfolio-github', title: 'portfólio e GitHub', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['carreira', 'portfólio', 'github'],
            conteudo: {
              resumo: 'Um portfólio sólido no GitHub é muitas vezes mais importante que o currículo. Mostra seu nível real de código, consistência e projetos concretos.',
              conceitos: ['README profissional: explica o projeto, como rodar, screenshots', 'GitHub Profile README: apresentação pessoal na home do perfil', 'Commits consistentes: demonstra disciplina e progresso', 'Deploy público: projeto no ar (Vercel, Netlify, Render)', 'Open source contributions: PRs em projetos externos'],
              explicacao: 'Recrutadores passam em média 6 segundos no perfil inicial. Um README bem feito com screenshot, descrição clara e link do projeto ao vivo aumenta muito a chance de interesse. Não precisa de 50 projetos — 3 projetos bem feitos e documentados valem mais que 20 repositórios vazios.',
              exemplos: [{ titulo: 'Estrutura de um README profissional', codigo: `# Nome do Projeto\n\n> Uma linha descrevendo o projeto e seu propósito\n\n![Screenshot do projeto](./screenshots/demo.png)\n\n## Sobre\n\nDescrição mais detalhada: qual problema resolve, para quem é,\no que o torna interessante tecnicamente.\n\n## Tecnologias\n\n- React + TypeScript\n- TanStack Query\n- Node.js + Express\n- PostgreSQL + Prisma\n- Docker + CI/CD (GitHub Actions)\n\n## Funcionalidades\n\n- [x] Autenticação JWT\n- [x] CRUD de produtos\n- [x] Busca em tempo real\n- [ ] Notificações push (em desenvolvimento)\n\n## Como rodar localmente\n\n\`\`\`bash\ngit clone https://github.com/usuario/projeto\ncd projeto\ncp .env.example .env  # configure suas variáveis\ndocker-compose up     # sobe banco e API\nnpm run dev           # frontend na porta 5173\n\`\`\`\n\n## Link do projeto ao vivo\n\n🔗 [Ver demonstração](https://projeto.vercel.app)`, linguagem: 'markdown' }],
              errosComuns: ['Repositórios sem README (parecem projetos abandonados)', 'Código de tutorial sem modificações (copia exata do YouTube — é perceptível)'],
              dicas: ['Faça algo diferente do tutorial: adicione funcionalidades, mude o domínio, melhore a UX', 'GitHub Activity Graph mostra consistência — commits regulares, mesmo que pequenos'],
              links: [], projetosRelacionados: ['Criar ou melhorar 3 projetos do portfólio com README profissional, deploy e código limpo']
            },
            exercicios: {
              fixacao: [{ id: 'port-f1', enunciado: 'O que um recrutador quer ver em um repositório do GitHub?', tipo: 'dissertativo', gabarito: 'README claro com screenshots e link de demo, código organizado, commits descritivos, projeto que resolve um problema real e evidência de que você sabe usar as tecnologias.' }],
              intermediario: [{ id: 'port-i1', enunciado: 'Escreva o README completo para um dos seus projetos seguindo a estrutura profissional. Inclua: descrição, tecnologias, funcionalidades, como rodar e link de demo.', tipo: 'dissertativo' }],
              desafio: [{ id: 'port-d1', enunciado: 'Faça seu primeiro PR (pull request) para um projeto open source. Pode ser: corrigir typo na documentação, adicionar tradução ou corrigir um bug reportado.', tipo: 'dissertativo' }]
            },
            checklist: ['Tenho profile README no GitHub', 'Meus projetos têm README profissional', 'Pelo menos 1 projeto com deploy ao vivo', 'Commits descritivos e consistentes']
          },
          {
            id: 'entrevista-tecnica', title: 'preparação para entrevistas técnicas', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['carreira', 'entrevista'],
            conteudo: {
              resumo: 'Entrevistas técnicas variam muito por empresa — de live coding com algoritmos a code review de pull request. Preparação e prática reduzem a ansiedade.',
              conceitos: ['Live coding: resolver problema de código ao vivo', 'System design: desenhar arquitetura de um sistema', 'Technical screening: questionário assíncrono', 'Pair programming: codificar junto com o entrevistador', 'Behavioral: "me fale sobre uma vez que..."'],
              explicacao: 'Para júnior em BR, o foco é: conceitos da linguagem, estruturas de dados básicas, SQL, Git e um projeto funcional para mostrar. Algoritmos avançados (LeetCode hard) são raridade em vagas júnior. Comunique seu raciocínio em voz alta — o entrevistador quer ver como você pensa, não só a resposta correta.',
              exemplos: [{ titulo: 'Como abordar um live coding', codigo: `// PROCESSO RECOMENDADO para live coding\n\n// 1. Entenda o problema (2-3 min)\n// - Faça perguntas de clarificação\n// - Repita o problema com suas palavras\n// - Peça exemplos se não ficou claro\n\n// 2. Planeje a solução (2-3 min)\n// - Pense em voz alta\n// - Mencione casos de borda (null, vazio, negativo)\n// - Discuta a abordagem antes de codificar\n\n// 3. Codifique (10-15 min)\n// - Comece com solução funcional, mesmo que O(n²)\n// - Nomeie variáveis claramente\n// - Comente quando a lógica for complexa\n\n// 4. Teste (3-5 min)\n// - Rode mentalmente com o exemplo dado\n// - Teste o caso de borda\n// - Mencione como testaria com testes automatizados\n\n// 5. Otimize se sobrar tempo\n// - "Posso melhorar para O(n) usando um Map..."`, linguagem: 'text' }],
              errosComuns: ['Ir direto para o código sem entender o problema', 'Silêncio total durante live coding — comunique o raciocínio'],
              dicas: ['"Não sei, mas posso pesquisar" é melhor que inventar — desonestidade é red flag', 'Prepare 3 histórias de projetos reais que você pode contar (usando formato STAR)'],
              links: [{ titulo: 'LeetCode — Prática para entrevistas', url: 'https://leetcode.com' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ent-f1', enunciado: 'Qual o processo recomendado para live coding? Por que comunicar o raciocínio é importante?', tipo: 'dissertativo', gabarito: 'Entender → Planejar → Codificar → Testar → Otimizar. Comunicar porque o entrevistador quer ver como você pensa, não apenas a resposta. Um candidato que chega perto com raciocínio claro > candidato silencioso que acerta.' }],
              intermediario: [{ id: 'ent-i1', enunciado: 'Simule uma entrevista técnica com um colega. Um faz perguntas (conceitos, código, situação) e o outro responde. Depois trocam. Dê feedback mútuo.', tipo: 'dissertativo' }],
              desafio: [{ id: 'ent-d1', enunciado: 'Resolva 5 problemas de live coding no LeetCode no modo "timed" (com cronômetro). Anote: tempo gasto, dificuldade percebida e o que estudar para melhorar.', tipo: 'dissertativo' }]
            },
            checklist: ['Conheço o formato de entrevistas técnicas júnior', 'Pratico live coding regularmente', 'Comunico meu raciocínio em voz alta', 'Tenho histórias de projetos para contar']
          }
        ]
      },
      {
        id: 'devops-basico-mod', name: 'DevOps básico para devs', estimatedHours: 3,
        topicos: [
          {
            id: 'ci-cd', title: 'CI/CD com GitHub Actions', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['ci/cd', 'github actions', 'devops'],
            conteudo: {
              resumo: 'CI (Continuous Integration) executa testes automaticamente a cada push. CD (Continuous Delivery/Deployment) faz deploy automático quando os testes passam.',
              conceitos: ['Pipeline: sequência de etapas automatizadas', 'Job: grupo de steps que roda num ambiente', 'Step: comando individual no pipeline', 'Trigger: quando a pipeline executa (push, PR, schedule)', 'Secrets: credenciais armazenadas de forma segura', 'Artifacts: arquivos gerados pela pipeline (build, relatório de testes)'],
              explicacao: 'Uma pipeline CI básica: 1) instalar dependências, 2) rodar lint, 3) rodar testes, 4) build. CD adiciona: 5) deploy automático para staging ou produção. GitHub Actions usa YAML e tem marketplace com actions prontas. Nunca coloque credenciais no YAML — use Secrets.',
              exemplos: [{ titulo: 'GitHub Actions: CI para Node.js', codigo: `# .github/workflows/ci.yml\nname: CI\n\non:\n  push:\n    branches: [ main, develop ]\n  pull_request:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n\n    services:\n      postgres:\n        image: postgres:16\n        env:\n          POSTGRES_PASSWORD: test\n          POSTGRES_DB: testdb\n        ports: ['5432:5432']\n        options: >-\n          --health-cmd pg_isready\n          --health-interval 10s\n\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-node@v4\n        with:\n          node-version: '20'\n          cache: 'npm'\n\n      - run: npm ci\n\n      - run: npm run lint\n\n      - name: Run tests\n        run: npm test\n        env:\n          DATABASE_URL: postgresql://postgres:test@localhost/testdb\n          JWT_SECRET: \${{ secrets.JWT_SECRET }}\n\n      - name: Upload coverage\n        uses: codecov/codecov-action@v4`, linguagem: 'yaml' }],
              errosComuns: ['Credenciais hardcoded no YAML (ficam no histórico do git)', 'Pipeline que demora 15 minutos por não usar cache de dependências'],
              dicas: ['cache: npm no setup-node evita instalar dependências do zero a cada run', 'fail-fast: false em matrix strategy deixa todos os jobs terminarem mesmo quando um falha'],
              links: [{ titulo: 'GitHub Actions — Documentação', url: 'https://docs.github.com/en/actions' }], projetosRelacionados: ['Configurar pipeline CI/CD completo para um projeto: testes + linting + deploy automático no Render']
            },
            exercicios: {
              fixacao: [{ id: 'cicd-f1', enunciado: 'Qual a diferença entre CI (Continuous Integration) e CD (Continuous Deployment)?', tipo: 'dissertativo', gabarito: 'CI: integração contínua — roda testes e builds automaticamente a cada push. CD: entrega/deploy contínuo — deploy automático em staging ou produção quando CI passa.' }],
              intermediario: [{ id: 'cicd-i1', enunciado: 'Configure um GitHub Actions workflow que: roda testes a cada PR, faz deploy no Render apenas quando merge na main com testes passando.', tipo: 'dissertativo' }],
              desafio: [{ id: 'cicd-d1', enunciado: 'Configure pipeline com matrix strategy para testar em Node.js 18, 20 e 22 simultaneamente. Adicione badge de build status no README.', tipo: 'codigo', linguagem: 'yaml' }]
            },
            checklist: ['Tenho pipeline CI rodando em pelo menos 1 projeto', 'Testes são executados automaticamente em PRs', 'Não coloco credenciais no YAML (uso Secrets)', 'Entendo triggers (push, pull_request, schedule)']
          }
        ]
      }
    ]
  }
];
