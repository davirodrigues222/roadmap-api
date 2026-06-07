const JR_BACKEND = [
  {
    id: 'backend', label: 'trilha backend', color: '#7c3aed', icon: '⚙️',
    description: 'Construção de servidores, APIs, bancos de dados e infraestrutura.',
    estimatedHours: 48, prerequisitos: ['base', 'fundamentos'],
    modulos: [
      {
        id: 'oo-mod', name: 'orientação a objetos', estimatedHours: 6,
        description: 'Os pilares da OO e como aplicá-los em código real.',
        topicos: [
          {
            id: 'oo-classes', title: 'classes, herança e encapsulamento', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['oo', 'classes'],
            conteudo: {
              resumo: 'Orientação a objetos organiza código em objetos que combinam dados e comportamentos. Os quatro pilares são: encapsulamento, herança, polimorfismo e abstração.',
              conceitos: [
                'Classe: molde para criar objetos',
                'Instância: objeto criado a partir de uma classe',
                'Constructor: método chamado ao criar a instância',
                'Herança (extends): reutilizar e especializar uma classe',
                'super(): chama o constructor da classe pai',
                'Encapsulamento: esconder detalhes internos (# private, get/set)'
              ],
              explicacao: 'Classes em JavaScript são açúcar sintático sobre prototype. Herança cria uma cadeia: Cachorro extends Animal — Cachorro herda todos os métodos de Animal. Encapsulamento com # (fields privados) garante que propriedades internas não sejam alteradas externamente, protegendo a integridade do objeto.',
              exemplos: [
                {
                  titulo: 'Hierarquia de classes com herança',
                  codigo: `class Animal {\n  #nome; // campo privado\n\n  constructor(nome) {\n    this.#nome = nome;\n  }\n\n  get nome() { return this.#nome; }\n\n  emitirSom() {\n    return 'som genérico';\n  }\n}\n\nclass Cachorro extends Animal {\n  constructor(nome, raca) {\n    super(nome);\n    this.raca = raca;\n  }\n\n  emitirSom() { return 'Au!'; } // override\n\n  buscar() { return \`\${this.nome} foi buscar!\`; }\n}\n\nconst rex = new Cachorro('Rex', 'Labrador');\nconsole.log(rex.emitirSom()); // 'Au!'\nconsole.log(rex.nome);       // 'Rex' (via getter)`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Herança profunda demais (> 2-3 níveis) — prefira composição',
                'Não chamar super() antes de usar this no constructor filho'
              ],
              dicas: [
                '"Prefira composição à herança" — use herança quando for realmente uma relação "é um"',
                'Campos privados com # são JavaScript puro (sem TypeScript necessário)'
              ],
              links: [{ titulo: 'MDN — Classes', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes' }],
              projetosRelacionados: ['Modelar um sistema de biblioteca com classes Livro, Autor, Emprestimo usando herança e encapsulamento']
            },
            exercicios: {
              fixacao: [{ id: 'oo-f1', enunciado: 'Quais são os 4 pilares da orientação a objetos? Explique cada um em uma frase.', tipo: 'dissertativo', gabarito: 'Encapsulamento: ocultar detalhes internos. Herança: reutilizar de classe pai. Polimorfismo: mesmo método, comportamentos diferentes. Abstração: modelar essência do problema.' }],
              intermediario: [{ id: 'oo-i1', enunciado: 'Crie uma hierarquia Forma → Retangulo, Circulo com o método area(). Cada forma deve calcular sua área corretamente.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'oo-d1', enunciado: 'Implemente o padrão Strategy para um carrinho de compras com diferentes estratégias de desconto (percentual, valor fixo, fidelidade).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Sei criar classes com constructor', 'Uso herança com extends corretamente', 'Entendo encapsulamento com campos privados', 'Conheço os 4 pilares da OO']
          },
          {
            id: 'solid', title: 'SOLID (os 5 princípios)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['oo', 'solid', 'design'],
            conteudo: {
              resumo: 'SOLID são 5 princípios de design orientado a objetos que tornam o código mais manutenível, extensível e testável.',
              conceitos: [
                'S — Single Responsibility: uma classe tem apenas uma razão para mudar',
                'O — Open/Closed: aberto para extensão, fechado para modificação',
                'L — Liskov Substitution: subclasses devem poder substituir a classe pai',
                'I — Interface Segregation: interfaces específicas são melhores que uma geral',
                'D — Dependency Inversion: dependa de abstrações, não de implementações concretas'
              ],
              explicacao: 'SRP: uma classe que salva usuário E envia email E gera relatório tem muitas responsabilidades. OCP: em vez de modificar uma classe existente, crie uma extensão. DIP: em vez de instanciar EmailService dentro de UserService, injete-o como parâmetro. Esses princípios facilitam testes e manutenção.',
              exemplos: [
                {
                  titulo: 'Single Responsibility e Dependency Inversion',
                  codigo: `// ❌ Viola SRP e DIP\nclass UsuarioService {\n  salvar(usuario) { /* salva no banco */ }\n  enviarEmail(usuario) { /* chama SMTP diretamente */ }\n  gerarRelatorio() { /* monta PDF */ }\n}\n\n// ✅ SRP: cada classe tem uma responsabilidade\nclass UsuarioRepository { salvar(u) { /* banco */ } }\nclass EmailService { enviar(para, msg) { /* email */ } }\n\n// ✅ DIP: UserService recebe dependências injetadas\nclass UsuarioService {\n  constructor(repo, emailService) {\n    this.repo = repo;\n    this.email = emailService;\n  }\n  async cadastrar(usuario) {\n    await this.repo.salvar(usuario);\n    await this.email.enviar(usuario.email, 'Bem-vindo!');\n  }\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Tentar aplicar SOLID em excesso em código simples (over-engineering)',
                'Criar classes com um único método só para "cumprir" SRP'
              ],
              dicas: [
                'SOLID é guia, não lei absoluta. Aplique onde traz benefício real',
                'DIP é a base para injeção de dependências — fundamental para testes'
              ],
              links: [{ titulo: 'SOLID em JavaScript — Medium', url: 'https://medium.com/desenvolvendo-com-paixao/o-que-é-solid-o-guia-completo-para-você-entender-os-5-princípios-da-poo-2b937b3fc530' }],
              projetosRelacionados: ['Refatorar um projeto existente aplicando pelo menos 3 dos princípios SOLID']
            },
            exercicios: {
              fixacao: [{ id: 'solid-f1', enunciado: 'Explique o Princípio da Responsabilidade Única com um exemplo do cotidiano.', tipo: 'dissertativo', gabarito: 'Uma classe que gerencia usuários NÃO deve também enviar emails. O email é outra responsabilidade — qualquer mudança no email não deve afetar a lógica de usuário.' }],
              intermediario: [{ id: 'solid-i1', enunciado: 'Identifique quais princípios SOLID estão sendo violados neste código e refatore: uma classe Order com métodos calculateTotal, saveToDatabase, sendConfirmationEmail e printReceipt.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'solid-d1', enunciado: 'Implemente um sistema de pagamentos que suporte Pix, Cartão e Boleto usando OCP — adicionar um novo método não deve alterar código existente.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Conheço os 5 princípios SOLID', 'Entendo SRP e DIP na prática', 'Sei aplicar injeção de dependência', 'Já refatorei código usando SOLID']
          }
        ]
      },
      {
        id: 'banco-dados-mod', name: 'banco de dados', estimatedHours: 8,
        description: 'Modelagem relacional, SQL e integração com aplicações.',
        topicos: [
          {
            id: 'sql-fundamentos', title: 'SQL: SELECT, INSERT, UPDATE, DELETE', estimatedMinutes: 90,
            difficulty: 'basico', tags: ['sql', 'banco de dados'],
            conteudo: {
              resumo: 'SQL (Structured Query Language) é a linguagem padrão para interagir com bancos de dados relacionais. Dominar os 4 comandos CRUD é o ponto de partida.',
              conceitos: [
                'SELECT: buscar dados (+ WHERE, ORDER BY, LIMIT)',
                'INSERT INTO: inserir novo registro',
                'UPDATE SET ... WHERE: atualizar registros',
                'DELETE FROM ... WHERE: remover registros',
                'WHERE: filtrar resultados por condição',
                'ORDER BY / LIMIT / OFFSET: ordenar e paginar'
              ],
              explicacao: 'Nunca faça UPDATE ou DELETE sem WHERE — você vai alterar ou apagar todos os registros da tabela. Use LIMIT 1 em DELETEs quando possível. ORDER BY é fundamental para paginação. NULL não é igual a nada — use IS NULL, não = NULL.',
              exemplos: [
                {
                  titulo: 'CRUD básico em SQL',
                  codigo: `-- SELECT com filtros\nSELECT id, nome, email\nFROM usuarios\nWHERE ativo = true AND criado_em > '2026-01-01'\nORDER BY nome ASC\nLIMIT 10 OFFSET 0;\n\n-- INSERT\nINSERT INTO usuarios (nome, email, senha_hash)\nVALUES ('Davi', 'davi@email.com', 'hash...');\n\n-- UPDATE (SEMPRE com WHERE!)\nUPDATE usuarios\nSET ativo = false, atualizado_em = NOW()\nWHERE id = 42;\n\n-- DELETE (SEMPRE com WHERE!)\nDELETE FROM usuarios WHERE id = 42;`,
                  linguagem: 'sql'
                }
              ],
              errosComuns: [
                'UPDATE ou DELETE sem WHERE (afeta toda a tabela)',
                'Buscar com = NULL em vez de IS NULL'
              ],
              dicas: [
                'Em produção, teste SELECTs antes de atualizar: rode o SELECT com o mesmo WHERE, veja o que seria afetado',
                'EXPLAIN ANALYZE (PostgreSQL) / EXPLAIN (MySQL) mostra como a query é executada'
              ],
              links: [{ titulo: 'SQLBolt — tutorial interativo', url: 'https://sqlbolt.com' }],
              projetosRelacionados: ['Criar e popular um banco de dados de uma livraria e escrever 10 queries diferentes']
            },
            exercicios: {
              fixacao: [{ id: 'sql-f1', enunciado: 'O que acontece se você executar DELETE FROM usuarios; sem WHERE?', tipo: 'dissertativo', gabarito: 'Todos os registros da tabela são apagados. Sem WHERE, o DELETE afeta todas as linhas.' }],
              intermediario: [{ id: 'sql-i1', enunciado: 'Escreva queries para: buscar usuários ativos criados este mês, atualizar o email de um usuário específico, e excluir usuários sem login há mais de 1 ano.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'sql-d1', enunciado: 'Implemente uma query de paginação eficiente para 1 milhão de registros usando LIMIT/OFFSET e explique os problemas de performance em páginas altas.', tipo: 'dissertativo' }]
            },
            checklist: ['Faço SELECT com WHERE, ORDER BY e LIMIT', 'Faço INSERT, UPDATE e DELETE com segurança', 'Nunca esqueço o WHERE no UPDATE/DELETE', 'Entendo como paginar resultados']
          },
          {
            id: 'sql-joins', title: 'JOINs e modelagem relacional', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['sql', 'joins', 'modelagem'],
            conteudo: {
              resumo: 'JOINs combinam dados de múltiplas tabelas. É fundamental para consultas em bancos relacionais, onde os dados estão divididos por entidade.',
              conceitos: [
                'INNER JOIN: retorna apenas registros que existem em ambas as tabelas',
                'LEFT JOIN: todos do lado esquerdo + os que têm correspondência à direita',
                'RIGHT JOIN: o inverso do LEFT JOIN',
                'Chave Primária (PK): identificador único de cada linha',
                'Chave Estrangeira (FK): referência à PK de outra tabela',
                'Normalização: organizar para eliminar redundância'
              ],
              explicacao: 'INNER JOIN é o mais comum — retorna apenas registros com relação. LEFT JOIN é útil para listar todos os usuários, mesmo sem pedidos (pedido seria NULL). FKs garantem integridade referencial: não é possível criar um pedido para um usuário inexistente.',
              exemplos: [
                {
                  titulo: 'JOINs em um modelo de e-commerce',
                  codigo: `-- INNER JOIN: pedidos com dados do cliente\nSELECT p.id, u.nome, u.email, p.total, p.criado_em\nFROM pedidos p\nINNER JOIN usuarios u ON p.usuario_id = u.id\nWHERE p.status = 'pago'\nORDER BY p.criado_em DESC;\n\n-- LEFT JOIN: todos os usuários (com ou sem pedidos)\nSELECT u.nome, COUNT(p.id) AS total_pedidos\nFROM usuarios u\nLEFT JOIN pedidos p ON p.usuario_id = u.id\nGROUP BY u.id, u.nome\nORDER BY total_pedidos DESC;\n\n-- JOIN triplo\nSELECT p.id, u.nome, pr.titulo, ip.quantidade\nFROM itens_pedido ip\nJOIN pedidos p ON ip.pedido_id = p.id\nJOIN usuarios u ON p.usuario_id = u.id\nJOIN produtos pr ON ip.produto_id = pr.id;`,
                  linguagem: 'sql'
                }
              ],
              errosComuns: [
                'Usar INNER JOIN quando deveria ser LEFT JOIN (perde registros sem relação)',
                'JOIN sem índice na FK — degrada performance brutalmente em tabelas grandes'
              ],
              dicas: [
                'Sempre adicione índice nas FKs (PostgreSQL faz automaticamente, MySQL não)',
                'Desenhe o diagrama ER antes de escrever as queries'
              ],
              links: [{ titulo: 'Visual JOIN — explicação visual', url: 'https://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins' }],
              projetosRelacionados: ['Modelar e implementar o banco de dados de um sistema de agendamento com consultas JOIN']
            },
            exercicios: {
              fixacao: [{ id: 'join-f1', enunciado: 'Qual a diferença entre INNER JOIN e LEFT JOIN?', tipo: 'dissertativo', gabarito: 'INNER JOIN retorna apenas registros que têm correspondência em ambas as tabelas. LEFT JOIN retorna todos do lado esquerdo, mesmo sem correspondência (NULL no lado direito).' }],
              intermediario: [{ id: 'join-i1', enunciado: 'Crie as tabelas clientes, produtos e pedidos. Escreva queries que: listem todos os pedidos com nome do cliente, e mostrem clientes que nunca fizeram pedido.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'join-d1', enunciado: 'Escreva uma query que retorna os 5 produtos mais vendidos por mês nos últimos 3 meses, usando window functions ou subqueries.', tipo: 'codigo', linguagem: 'sql' }]
            },
            checklist: ['Entendo INNER, LEFT e RIGHT JOIN', 'Sei modelar tabelas com PKs e FKs', 'Uso GROUP BY e funções de agregação', 'Criei um banco completo com múltiplas tabelas']
          },
          {
            id: 'orm', title: 'ORMs (Prisma ou Sequelize)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['orm', 'nodejs', 'banco de dados'],
            conteudo: {
              resumo: 'ORM (Object-Relational Mapper) mapeia tabelas do banco para objetos JavaScript. Em vez de escrever SQL manual, você usa código tipado que gera as queries.',
              conceitos: [
                'ORM: abstração sobre o banco de dados',
                'Schema: define a estrutura do banco em código',
                'Migration: versionamento das mudanças no banco',
                'Query builder: construção programática de queries',
                'Relations: define relacionamentos entre modelos'
              ],
              explicacao: 'Prisma é o ORM moderno padrão do ecossistema Node.js. Você define o schema em prisma/schema.prisma, roda npx prisma migrate dev e o banco é criado. As queries são completamente tipadas — o TypeScript sabe exatamente quais campos existem em cada modelo.',
              exemplos: [
                {
                  titulo: 'Prisma: schema e queries',
                  codigo: `// schema.prisma\nmodel User {\n  id        Int      @id @default(autoincrement())\n  email     String   @unique\n  name      String\n  posts     Post[]\n  createdAt DateTime @default(now())\n}\n\nmodel Post {\n  id        Int    @id @default(autoincrement())\n  title     String\n  author    User   @relation(fields: [authorId], references: [id])\n  authorId  Int\n}\n\n// queries no código\nconst users = await prisma.user.findMany({\n  where: { posts: { some: {} } }, // usuários com posts\n  include: { posts: { take: 5 } },\n  orderBy: { createdAt: 'desc' }\n});\n\n// criar com relação\nconst user = await prisma.user.create({\n  data: {\n    email: 'davi@email.com',\n    name: 'Davi',\n    posts: { create: { title: 'Primeiro post' } }\n  }\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'N+1 problem: buscar usuários e depois fazer query por usuário em loop — use include',
                'Rodar migrations em produção sem backup prévia'
              ],
              dicas: [
                'Prisma Studio (npx prisma studio) é um GUI para ver e editar os dados',
                'N+1: sempre use include ou select com relações para evitar múltiplas queries'
              ],
              links: [{ titulo: 'Prisma — Getting Started', url: 'https://www.prisma.io/docs/getting-started' }],
              projetosRelacionados: ['Criar uma API com Express + Prisma + PostgreSQL para um blog com usuários e posts']
            },
            exercicios: {
              fixacao: [{ id: 'orm-f1', enunciado: 'O que é o problema N+1 em ORMs? Como o Prisma resolve isso?', tipo: 'dissertativo', gabarito: 'N+1: buscar 10 usuários e fazer 10 queries para os posts de cada um. Prisma resolve com include — faz um JOIN e retorna tudo numa só query.' }],
              intermediario: [{ id: 'orm-i1', enunciado: 'Configure Prisma em um projeto Node.js com as entidades User e Post. Implemente CRUD completo para posts.', tipo: 'dissertativo' }],
              desafio: [{ id: 'orm-d1', enunciado: 'Implemente transações no Prisma: transferência bancária entre duas contas deve ser atômica — debitar uma e creditar outra como operação única.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Configurei um ORM em um projeto', 'Crio, busco, atualizo e deleto registros', 'Entendo migrations e versionamento do schema', 'Sei usar include para evitar N+1']
          },
          {
            id: 'nosql', title: 'introdução ao NoSQL (MongoDB)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['nosql', 'mongodb', 'banco de dados'],
            conteudo: {
              resumo: 'NoSQL são bancos não relacionais, que armazenam dados em formatos diferentes (documentos, chave-valor, grafos). MongoDB é o mais popular — armazena documentos JSON.',
              conceitos: [
                'Documento: equivalente a uma linha, mas sem schema fixo',
                'Coleção: equivalente a uma tabela',
                'BSON: formato binário do MongoDB (extensão do JSON)',
                'ObjectId: identificador único gerado automaticamente',
                'Embedding vs Reference: incorporar dados ou referenciar'
              ],
              explicacao: 'MongoDB é ótimo para dados sem estrutura fixa ou com estrutura variável. Em vez de relações com JOINs, você pode embutir subdocumentos. Embedding é mais rápido (uma query), mas gera duplicação. Reference é como FK — use para relações um-para-muitos com grande volume.',
              exemplos: [
                {
                  titulo: 'CRUD no MongoDB com Mongoose',
                  codigo: `import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  nome: { type: String, required: true },\n  email: { type: String, unique: true },\n  endereco: {\n    rua: String,\n    cidade: String // documento embutido\n  }\n});\n\nconst User = mongoose.model('User', userSchema);\n\n// Create\nconst user = await User.create({ nome: 'Davi', email: 'davi@email.com' });\n\n// Read\nconst todos = await User.find({ 'endereco.cidade': 'SP' });\n\n// Update\nawait User.findByIdAndUpdate(id, { nome: 'Novo Nome' }, { new: true });\n\n// Delete\nawait User.findByIdAndDelete(id);`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Embutir documentos que crescem sem limite (array de comentários com milhares de itens)',
                'Usar MongoDB quando o dado é claramente relacional (e-commerce, financeiro)'
              ],
              dicas: [
                'MongoDB Atlas oferece cluster gratuito para estudar',
                'Use MongoDB Compass (GUI) para explorar os documentos visualmente'
              ],
              links: [{ titulo: 'MongoDB Docs — Node.js Driver', url: 'https://www.mongodb.com/docs/drivers/node/current/' }],
              projetosRelacionados: ['Criar uma API de notas pessoais com Express + MongoDB (sem schema fixo para demonstrar flexibilidade)']
            },
            exercicios: {
              fixacao: [{ id: 'nosql-f1', enunciado: 'Quando usar MongoDB vs PostgreSQL? Liste 2 casos de uso para cada.', tipo: 'dissertativo', gabarito: 'MongoDB: catálogos de produtos com atributos variáveis, logs de eventos. PostgreSQL: dados financeiros, e-commerce com relacionamentos complexos.' }],
              intermediario: [{ id: 'nosql-i1', enunciado: 'Crie um schema Mongoose para um blog com posts e comentários embutidos. Implemente busca por texto nos posts.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'nosql-d1', enunciado: 'Implemente agregações no MongoDB: total de posts por usuário, posts mais comentados, média de comentários por categoria.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo a diferença de NoSQL vs SQL', 'Faço CRUD com Mongoose', 'Entendo embedding vs reference', 'Já criei um projeto com MongoDB']
          }
        ]
      },
      {
        id: 'apis-mod', name: 'APIs REST', estimatedHours: 8,
        description: 'Design, implementação e autenticação de APIs REST.',
        topicos: [
          {
            id: 'nodejs-http', title: 'Node.js: servidor HTTP com Express', estimatedMinutes: 90,
            difficulty: 'basico', tags: ['nodejs', 'express', 'api'],
            conteudo: {
              resumo: 'Express é o framework web mais usado no Node.js. Permite criar servidores HTTP, definir rotas, processar requisições e retornar respostas de forma simples.',
              conceitos: [
                'app.get/post/put/delete: definir rota por método HTTP',
                'req: objeto da requisição (req.body, req.params, req.query)',
                'res: objeto da resposta (res.json, res.status, res.send)',
                'Middleware: função que processa req antes de chegar na rota',
                'Router: agrupar rotas relacionadas',
                'nodemon: reinicia automaticamente ao salvar'
              ],
              explicacao: 'Express é minimalista — você adiciona apenas o que precisa. Um middleware executa para todas as rotas (ex: autenticação). app.use(express.json()) é o middleware que parseia o body JSON — sem ele, req.body é undefined. Sempre retorne um status code adequado.',
              exemplos: [
                {
                  titulo: 'API REST básica com Express',
                  codigo: `import express from 'express';\n\nconst app = express();\napp.use(express.json()); // middleware JSON\n\n// Dados em memória (use banco em produção)\nlet produtos = [\n  { id: 1, nome: 'Notebook', preco: 2500 }\n];\n\n// GET - listar\napp.get('/produtos', (req, res) => {\n  res.json(produtos);\n});\n\n// GET - buscar por id\napp.get('/produtos/:id', (req, res) => {\n  const produto = produtos.find(p => p.id === +req.params.id);\n  if (!produto) return res.status(404).json({ error: 'Não encontrado' });\n  res.json(produto);\n});\n\n// POST - criar\napp.post('/produtos', (req, res) => {\n  const novo = { id: Date.now(), ...req.body };\n  produtos.push(novo);\n  res.status(201).json(novo);\n});\n\napp.listen(3000, () => console.log('API rodando na porta 3000'));`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Esquecer app.use(express.json()) — req.body fica undefined',
                'Não retornar status codes adequados (criar com 200 em vez de 201)'
              ],
              dicas: [
                'Use HTTPie ou Thunder Client (VSCode) para testar sua API',
                '201 para criação, 204 para deleção sem body, 400 para erros do cliente, 500 para erros do servidor'
              ],
              links: [{ titulo: 'Express.js — Documentação', url: 'https://expressjs.com/pt-br/' }],
              projetosRelacionados: ['Criar uma API REST completa para gerenciar tarefas com Express + banco de dados']
            },
            exercicios: {
              fixacao: [{ id: 'exp-f1', enunciado: 'O que é um middleware no Express? Como você criaria um que loga todas as requisições recebidas?', tipo: 'dissertativo', gabarito: 'Middleware: função (req, res, next) que executa antes da rota. Para logar: app.use((req, res, next) => { console.log(req.method, req.url); next(); });' }],
              intermediario: [{ id: 'exp-i1', enunciado: 'Crie uma API Express com CRUD completo para "tarefas" (id, titulo, concluida, criadaEm). Teste com Thunder Client.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'exp-d1', enunciado: 'Implemente um middleware de validação reutilizável usando Zod que valida o body antes de chegar na rota.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Crio rotas GET, POST, PUT, DELETE com Express', 'Uso middlewares', 'Retorno status codes corretos', 'Testo minha API com ferramentas HTTP']
          },
          {
            id: 'rest-design', title: 'design RESTful (endpoints, status codes)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['rest', 'api', 'design'],
            conteudo: {
              resumo: 'Uma API RESTful segue convenções que a tornam previsível e intuitiva. Bom design de API é tão importante quanto a implementação.',
              conceitos: [
                'Recursos como substantivos plurais: /users, /products',
                'Verbos HTTP: GET (listar/buscar), POST (criar), PUT (substituir), PATCH (parcial), DELETE',
                'Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Internal Server Error',
                'Paginação: page/limit ou cursor-based',
                'Versioning: /api/v1/users'
              ],
              explicacao: 'URLs devem representar recursos, não ações. Não use /getUsers — use GET /users. Não use /deleteUser/5 — use DELETE /users/5. Erros devem retornar JSON com mensagem descritiva, não HTML do Express. Versione sua API (/api/v1/) para não quebrar clientes existentes.',
              exemplos: [
                {
                  titulo: 'Convenções RESTful',
                  codigo: `// ✅ RESTful correto\nGET    /api/v1/users         // listar usuários\nGET    /api/v1/users/:id      // buscar um\nPOST   /api/v1/users         // criar\nPATCH  /api/v1/users/:id     // atualizar parcial\nDELETE /api/v1/users/:id     // deletar\n\nGET    /api/v1/users/:id/posts // posts de um usuário\n\n// ❌ Não RESTful\nGET  /getUsers\nPOST /deleteUser/5\nGET  /api/updateUserEmail\n\n// ✅ Resposta de erro padronizada\n{\n  "error": "VALIDATION_ERROR",\n  "message": "email inválido",\n  "field": "email"\n}`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Usar verbos nas URLs (/getUser, /createProduct)',
                'Retornar 200 para erros com o erro no body'
              ],
              dicas: [
                'Use PATCH para atualizações parciais — PUT deve substituir o recurso inteiro',
                'Documente sua API com Swagger/OpenAPI — facilita integração para outros devs'
              ],
              links: [{ titulo: 'REST API Design Best Practices', url: 'https://restfulapi.net/rest-api-design-tutorial-with-example/' }],
              projetosRelacionados: ['Documentar uma API existente com Swagger/OpenAPI']
            },
            exercicios: {
              fixacao: [{ id: 'rest-f1', enunciado: 'Como seria um endpoint RESTful para: listar posts de um usuário específico e criar um post para esse usuário?', tipo: 'dissertativo', gabarito: 'GET /users/:id/posts e POST /users/:id/posts' }],
              intermediario: [{ id: 'rest-i1', enunciado: 'Refatore uma API que usa /getUsers, /createUser, /deleteUser para seguir convenções RESTful.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'rest-d1', enunciado: 'Documente uma API REST completa usando o formato OpenAPI 3.0 (swagger.yaml) com todos os endpoints, parâmetros e exemplos de resposta.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso substantivos plurais nas URLs', 'Retorno status codes corretos', 'Versiono minha API (/api/v1/)', 'Respondo erros com JSON padronizado']
          },
          {
            id: 'autenticacao', title: 'autenticação com JWT', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['auth', 'jwt', 'segurança'],
            conteudo: {
              resumo: 'JWT (JSON Web Token) é o padrão mais usado para autenticação stateless em APIs REST. O token carrega informações do usuário e é verificado sem consultar o banco.',
              conceitos: [
                'JWT: header.payload.signature — codificado em base64',
                'Stateless: servidor não armazena sessão — tudo está no token',
                'Access token: curta duração (15min-1h)',
                'Refresh token: longa duração, para renovar o access token',
                'bcrypt: hash seguro de senhas',
                'Middleware de autenticação: verifica JWT antes da rota'
              ],
              explicacao: 'O fluxo JWT: usuário faz login → servidor verifica senha com bcrypt → cria JWT assinado com secret → retorna token. Nas próximas requisições, o cliente envia o token no header Authorization: Bearer <token>. O servidor verifica a assinatura sem banco. Access tokens curtos + refresh tokens longos é o padrão seguro.',
              exemplos: [
                {
                  titulo: 'Login e middleware JWT com Express',
                  codigo: `import jwt from 'jsonwebtoken';\nimport bcrypt from 'bcrypt';\n\n// Login\napp.post('/auth/login', async (req, res) => {\n  const { email, senha } = req.body;\n  const user = await User.findOne({ email });\n\n  if (!user || !await bcrypt.compare(senha, user.senhaHash)) {\n    return res.status(401).json({ error: 'Credenciais inválidas' });\n  }\n\n  const token = jwt.sign(\n    { userId: user.id, email: user.email },\n    process.env.JWT_SECRET,\n    { expiresIn: '1h' }\n  );\n  res.json({ token });\n});\n\n// Middleware de autenticação\nfunction autenticar(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Token necessário' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: 'Token inválido' });\n  }\n}\n\n// Rota protegida\napp.get('/perfil', autenticar, (req, res) => {\n  res.json({ userId: req.user.userId });\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Armazenar o JWT_SECRET no código fonte (deve ser variável de ambiente)',
                'Token sem expiração (expiresIn) — dura para sempre se vazado'
              ],
              dicas: [
                'NUNCA coloque senhas ou dados sensíveis no payload do JWT — é apenas base64, não encriptado',
                'Guarde o refresh token em httpOnly cookie — mais seguro que localStorage'
              ],
              links: [{ titulo: 'JWT.io — Debugger e documentação', url: 'https://jwt.io' }],
              projetosRelacionados: ['Implementar autenticação completa: registro, login, refresh token e logout em uma API']
            },
            exercicios: {
              fixacao: [{ id: 'jwt-f1', enunciado: 'O que torna o JWT "stateless"? Qual é a vantagem disso?', tipo: 'dissertativo', gabarito: 'Stateless porque o servidor não armazena sessão — tudo está no token. Vantagem: escalabilidade horizontal — qualquer servidor pode verificar o token sem banco.' }],
              intermediario: [{ id: 'jwt-i1', enunciado: 'Implemente endpoint de registro (hash da senha com bcrypt) e login (retorna JWT). Crie uma rota protegida que retorna o perfil do usuário logado.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'jwt-d1', enunciado: 'Implemente o sistema completo com access token (15min) e refresh token (7 dias). O refresh token deve ser rotacionado a cada uso.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo como JWT funciona', 'Faço hash de senhas com bcrypt', 'Crio middleware de autenticação', 'Sei o que colocar (e o que NÃO colocar) no payload']
          },
          {
            id: 'validacao', title: 'validação e tratamento de erros', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['validação', 'erros', 'api'],
            conteudo: {
              resumo: 'Validar dados de entrada e tratar erros adequadamente torna sua API segura, confiável e fácil de usar. Dados inválidos devem ser rejeitados na borda.',
              conceitos: [
                'Zod / Joi: bibliotecas de validação de schema',
                'Error handling middleware: captura erros centralizadamente',
                'Erros operacionais vs de programação',
                'Mensagens de erro descritivas mas seguras (não vazar stack traces)'
              ],
              explicacao: 'Nunca confie em dados externos — valide tudo no body, params e query. Zod valida e transforma em TypeScript. Um middleware de erro global no Express captura todos os erros lançados com next(err). Em produção, não exponha stack traces ao cliente.',
              exemplos: [
                {
                  titulo: 'Validação com Zod e error handler global',
                  codigo: `import { z } from 'zod';\n\n// Schema de validação\nconst CriarUsuarioSchema = z.object({\n  nome:  z.string().min(2).max(100),\n  email: z.string().email(),\n  senha: z.string().min(8)\n});\n\n// Middleware de validação\nfunction validar(schema) {\n  return (req, res, next) => {\n    const result = schema.safeParse(req.body);\n    if (!result.success) {\n      return res.status(400).json({\n        error: 'VALIDATION_ERROR',\n        details: result.error.flatten()\n      });\n    }\n    req.body = result.data;\n    next();\n  };\n}\n\napp.post('/users', validar(CriarUsuarioSchema), criarUsuario);\n\n// Error handler global (deve ser o último middleware)\napp.use((err, req, res, next) => {\n  console.error(err);\n  const status = err.status || 500;\n  res.status(status).json({\n    error: err.message || 'Erro interno do servidor'\n  });\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Não ter error handler global — erros não tratados derrubam o servidor',
                'Retornar a stack trace completa em produção (expõe detalhes internos)'
              ],
              dicas: [
                'Em desenvolvimento, mostre a stack. Em produção, apenas o código e mensagem genérica',
                'Use process.on("uncaughtException") e process.on("unhandledRejection") para erros não capturados'
              ],
              links: [{ titulo: 'Zod — Documentação', url: 'https://zod.dev' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'val-f1', enunciado: 'Por que não se deve retornar a stack trace completa de um erro para o cliente em produção?', tipo: 'dissertativo', gabarito: 'Expõe detalhes internos da aplicação (caminhos de arquivo, versões de libs, lógica) que podem ser usados por atacantes.' }],
              intermediario: [{ id: 'val-i1', enunciado: 'Implemente validação com Zod para um endpoint de criação de produto (nome, preco, categoria, estoque). Retorne erros descritivos por campo.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'val-d1', enunciado: 'Crie uma classe AppError com status e código de erro, e implemente um error handler que diferencia erros operacionais de erros de programação.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Valido todos os dados de entrada', 'Tenho error handler global no Express', 'Uso Zod ou Joi para validação', 'Não exponho stack traces em produção']
          }
        ]
      },
      {
        id: 'testes-mod', name: 'testes', estimatedHours: 5,
        description: 'Testes unitários e de integração para garantir qualidade.',
        topicos: [
          {
            id: 'testes-intro', title: 'testes unitários com Vitest/Jest', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['testes', 'jest', 'vitest'],
            conteudo: {
              resumo: 'Testes automatizados garantem que seu código funciona e previnem regressões. Testes unitários verificam funções isoladas; testes de integração verificam módulos trabalhando juntos.',
              conceitos: [
                'describe(): agrupa testes relacionados',
                'it() / test(): define um caso de teste',
                'expect(): afirma o resultado esperado',
                'beforeEach / afterEach: setup e cleanup',
                'Mock: substitui dependências por versões controladas',
                'Coverage: porcentagem do código coberta por testes'
              ],
              explicacao: 'O padrão AAA (Arrange, Act, Assert) organiza cada teste: prepare os dados, execute a função, verifique o resultado. Teste casos de sucesso, de falha e casos de borda. Prefira Vitest para projetos Vite e Jest para Node.js puro. Ambos têm API muito parecida.',
              exemplos: [
                {
                  titulo: 'Testes com Vitest — padrão AAA',
                  codigo: `import { describe, it, expect, vi } from 'vitest';\nimport { calcularDesconto, validarEmail } from './utils';\n\ndescribe('calcularDesconto', () => {\n  it('aplica 10% de desconto', () => {\n    // Arrange\n    const preco = 100;\n    // Act\n    const resultado = calcularDesconto(preco, 10);\n    // Assert\n    expect(resultado).toBe(90);\n  });\n\n  it('lança erro se percentual for negativo', () => {\n    expect(() => calcularDesconto(100, -5)).toThrow('percentual inválido');\n  });\n\n  it('retorna 0 se preco for 0', () => {\n    expect(calcularDesconto(0, 50)).toBe(0);\n  });\n});\n\ndescribe('validarEmail', () => {\n  it.each([\n    ['teste@email.com', true],\n    ['invalido',        false],\n    ['@sem-user.com',  false],\n  ])('valida "%s" como %s', (email, esperado) => {\n    expect(validarEmail(email)).toBe(esperado);\n  });\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Testar apenas o caminho feliz — testes de borda e erros são tão importantes',
                'Testes que dependem entre si — cada teste deve ser independente'
              ],
              dicas: [
                'TDD (Test Driven Development): escreva o teste antes do código — força a pensar na interface',
                'Mire em 70-80% de coverage. 100% pode ser desperdício; abaixo de 60% é arriscado'
              ],
              links: [{ titulo: 'Vitest — Documentação', url: 'https://vitest.dev' }],
              projetosRelacionados: ['Escrever testes para toda a lógica de negócio de uma API (funções de validação, cálculo de preços, etc.)']
            },
            exercicios: {
              fixacao: [{ id: 'test-f1', enunciado: 'O que é o padrão AAA em testes? Como aplicá-lo?', tipo: 'dissertativo', gabarito: 'Arrange (preparar dados), Act (executar função), Assert (verificar resultado). Deixa o teste legível e organizado.' }],
              intermediario: [{ id: 'test-i1', enunciado: 'Escreva testes para uma função formatarMoeda(valor, moeda) que deve: formatar BRL corretamente, lidar com valores negativos e lançar erro para valor não-numérico.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'test-d1', enunciado: 'Configure Vitest com coverage em um projeto. Escreva testes para atingir 80% de coverage em todos os arquivos de utilidades.', tipo: 'dissertativo' }]
            },
            checklist: ['Escrevo testes com describe, it e expect', 'Testo casos de sucesso e de erro', 'Conheço mocks e stubs', 'Já configurei cobertura de testes (coverage)']
          },
          {
            id: 'testes-integracao', title: 'testes de integração (supertest)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['testes', 'supertest', 'api'],
            conteudo: {
              resumo: 'Testes de integração verificam que os componentes do sistema funcionam corretamente em conjunto — incluindo banco de dados, rotas e middlewares.',
              conceitos: [
                'Supertest: biblioteca para testar endpoints HTTP do Express',
                'Banco de teste: banco separado zerado antes de cada teste',
                'beforeAll/afterAll: setup e cleanup de toda a suite',
                'Cenários reais: criar dados → fazer requisição → verificar resposta + banco'
              ],
              explicacao: 'Com Supertest, você faz requisições HTTP reais à sua API sem precisar subir um servidor separado. Teste que um POST realmente cria o registro no banco. Para testes de integração confiáveis, use um banco de teste separado (nunca o de produção) e limpe entre as suites.',
              exemplos: [
                {
                  titulo: 'Teste de integração com Supertest',
                  codigo: `import request from 'supertest';\nimport { app } from '../app';\nimport { prisma } from '../db';\n\nbeforeEach(async () => {\n  await prisma.user.deleteMany(); // limpa antes de cada teste\n});\n\nafter(async () => {\n  await prisma.$disconnect();\n});\n\ndescribe('POST /users', () => {\n  it('cria usuário e retorna 201', async () => {\n    const res = await request(app)\n      .post('/users')\n      .send({ nome: 'Davi', email: 'davi@email.com', senha: 'senha123' });\n\n    expect(res.status).toBe(201);\n    expect(res.body).toMatchObject({ nome: 'Davi', email: 'davi@email.com' });\n    expect(res.body.senhaHash).toBeUndefined(); // não retornar hash\n\n    // Verifica no banco\n    const user = await prisma.user.findUnique({ where: { email: 'davi@email.com' } });\n    expect(user).not.toBeNull();\n  });\n\n  it('retorna 400 para email inválido', async () => {\n    const res = await request(app).post('/users').send({ email: 'inválido' });\n    expect(res.status).toBe(400);\n  });\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Testes de integração compartilhando estado — um teste afeta o próximo',
                'Usar o banco de desenvolvimento para testes (corre risco de apagar dados)'
              ],
              dicas: [
                'Use .env.test com DATABASE_URL apontando para banco de teste separado',
                'Testes de integração são mais lentos — separe de unitários com --testPathPattern'
              ],
              links: [{ titulo: 'Supertest — GitHub', url: 'https://github.com/ladjs/supertest' }],
              projetosRelacionados: ['Escrever testes de integração para todos os endpoints de uma API REST']
            },
            exercicios: {
              fixacao: [{ id: 'tint-f1', enunciado: 'Por que usar um banco de dados separado para testes de integração?', tipo: 'dissertativo', gabarito: 'Para não contaminar dados reais, poder limpar entre testes e garantir resultados determinísticos.' }],
              intermediario: [{ id: 'tint-i1', enunciado: 'Escreva testes de integração para: criar usuário, login com email/senha e acessar rota protegida com o token retornado.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'tint-d1', enunciado: 'Configure pipeline completo: testes unitários + integração rodando em CI (GitHub Actions) com banco de teste em container Docker.', tipo: 'dissertativo' }]
            },
            checklist: ['Escrevo testes de integração com Supertest', 'Uso banco separado para testes', 'Limpo dados entre as suites de teste', 'Testo fluxos completos (criar → autenticar → acessar)']
          }
        ]
      },
      {
        id: 'infra-mod', name: 'Docker e infraestrutura', estimatedHours: 5,
        description: 'Containerização, ambientes reproduzíveis e deploy.',
        topicos: [
          {
            id: 'docker', title: 'Docker: containers e Compose', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['docker', 'devops', 'containers'],
            conteudo: {
              resumo: 'Docker empacota sua aplicação e todas as dependências em containers — ambientes isolados e reproduzíveis que rodam igual em qualquer máquina.',
              conceitos: [
                'Imagem: template read-only com o sistema e a aplicação',
                'Container: instância em execução de uma imagem',
                'Dockerfile: script que define como construir a imagem',
                'docker-compose.yml: orquestra múltiplos containers',
                'Volume: persistência de dados fora do container',
                'Port mapping: expõe porta do container no host'
              ],
              explicacao: 'Um container Node.js inclui: SO base, Node.js, dependências npm e seu código — isolado do host. docker-compose é essencial para dev: sobe API + banco + Redis com um único comando. Sem Docker, cada dev configura o ambiente diferente e "funciona na minha máquina" vira pesadelo.',
              exemplos: [
                {
                  titulo: 'Dockerfile + docker-compose para Node.js + PostgreSQL',
                  codigo: `# Dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "src/server.js"]\n\n# docker-compose.yml\nversion: '3.9'\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DATABASE_URL=postgresql://user:pass@db:5432/mydb\n    depends_on:\n      - db\n    volumes:\n      - ./src:/app/src  # hot reload em dev\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n      - POSTGRES_DB=mydb\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:`,
                  linguagem: 'yaml'
                }
              ],
              errosComuns: [
                'Rodar npm install dentro de um volume (sobrescreve node_modules)',
                'Usar COPY . . antes de npm ci (invalida cache do Docker em qualquer mudança)'
              ],
              dicas: [
                'Ordem no Dockerfile importa: copie package.json primeiro, depois npm ci, depois o código (cache)',
                '.dockerignore é tão importante quanto .gitignore — exclua node_modules, .env, etc.'
              ],
              links: [{ titulo: 'Docker — Getting Started', url: 'https://docs.docker.com/get-started/' }],
              projetosRelacionados: ['Dockerizar uma API Node.js + PostgreSQL e rodar com docker-compose up']
            },
            exercicios: {
              fixacao: [{ id: 'dck-f1', enunciado: 'Qual a diferença entre imagem Docker e container Docker?', tipo: 'dissertativo', gabarito: 'Imagem: template read-only (como uma classe). Container: instância em execução da imagem (como um objeto).' }],
              intermediario: [{ id: 'dck-i1', enunciado: 'Crie um Dockerfile para uma API Node.js e um docker-compose.yml que sobe a API e um banco PostgreSQL.', tipo: 'codigo', linguagem: 'yaml' }],
              desafio: [{ id: 'dck-d1', enunciado: 'Implemente multi-stage build no Dockerfile: stage de build (TypeScript) e stage de produção (apenas arquivos compilados). Compare tamanhos das imagens.', tipo: 'codigo', linguagem: 'yaml' }]
            },
            checklist: ['Entendo a diferença entre imagem e container', 'Escrevo Dockerfiles básicos', 'Uso docker-compose para orquestrar serviços', 'Já dockerizei um projeto']
          },
          {
            id: 'variaveis-ambiente', title: 'variáveis de ambiente e segredos', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['segurança', 'config', 'devops'],
            conteudo: {
              resumo: 'Variáveis de ambiente separam configuração do código. Segredos (credenciais, chaves de API) nunca devem estar no código-fonte — sempre em variáveis de ambiente.',
              conceitos: [
                '.env: arquivo local com variáveis (NUNCA commitar)',
                'process.env.NOME: acessar variável no Node.js',
                'dotenv: carrega .env para process.env',
                '.env.example: template documentado (SIM commitar)',
                'Secrets em produção: inject via plataforma (Render, Railway, etc.)'
              ],
              explicacao: 'O arquivo .env fica no .gitignore. O .env.example documenta quais variáveis são necessárias (sem valores reais). Em produção, configure as variáveis na plataforma de deploy. Se um segredo vazar para o git, assuma comprometido e rotacione imediatamente.',
              exemplos: [
                {
                  titulo: 'Usando dotenv corretamente',
                  codigo: `# .env (no .gitignore)\nDATABASE_URL=postgresql://user:senha@localhost/mydb\nJWT_SECRET=minha-chave-super-secreta\nPORT=3000\n\n# .env.example (commitar)\nDATABASE_URL=\nJWT_SECRET=\nPORT=3000\n\n# código\nimport 'dotenv/config'; // carrega .env\n// ou: import dotenv from 'dotenv'; dotenv.config();\n\nconst jwtSecret = process.env.JWT_SECRET;\nif (!jwtSecret) throw new Error('JWT_SECRET não configurado');\n\nconst porta = parseInt(process.env.PORT ?? '3000', 10);`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Commitar o .env no git (exposição de credenciais)',
                'Não validar variáveis obrigatórias na inicialização — o erro aparece tarde demais'
              ],
              dicas: [
                'Valide todas as variáveis obrigatórias no startup — falhe rápido com mensagem clara',
                'Use a biblioteca envalid ou zod para validar e tipar variáveis de ambiente'
              ],
              links: [{ titulo: 'dotenv — npm', url: 'https://www.npmjs.com/package/dotenv' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 've-f1', enunciado: 'Por que o arquivo .env não deve ser commitado no git?', tipo: 'dissertativo', gabarito: 'Contém segredos (senhas, chaves de API). Se no git, fica no histórico para sempre — mesmo que apagado depois.' }],
              intermediario: [{ id: 've-i1', enunciado: 'Configure um projeto Node.js para: validar todas as variáveis obrigatórias na inicialização e lançar erro descritivo se alguma faltar.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 've-d1', enunciado: 'Audite um repositório seu (ou público) e liste todos os locais onde credenciais estão hardcoded. Corrija migrando para variáveis de ambiente.', tipo: 'dissertativo' }]
            },
            checklist: ['.env está no .gitignore', 'Tenho .env.example documentado', 'Valido variáveis obrigatórias na inicialização', 'Nunca coloco segredos no código']
          }
        ]
      },
      {
        id: 'deploy-mod', name: 'deploy e nuvem', estimatedHours: 4,
        description: 'Subir sua aplicação na internet.',
        topicos: [
          {
            id: 'deploy-basico', title: 'deploy no Render/Railway (Node.js)', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['deploy', 'cloud', 'render'],
            conteudo: {
              resumo: 'Deploy é disponibilizar sua aplicação na internet. Plataformas como Render e Railway abstraem a complexidade de servidores — você faz push e elas cuidam do resto.',
              conceitos: [
                'PaaS (Platform as a Service): plataforma gerencia servidor e infraestrutura',
                'Render / Railway: PaaS com plano gratuito para Node.js',
                'Build command: como compilar o projeto',
                'Start command: como iniciar o servidor',
                'Variáveis de ambiente na plataforma',
                'Health check: endpoint /health para verificar se a app está viva'
              ],
              explicacao: 'O fluxo básico no Render: conecte o repositório GitHub → configure build command (npm install) e start command (node src/server.js) → adicione variáveis de ambiente → deploy automático a cada push. Implemente um endpoint GET /health que retorna 200 para o health check da plataforma.',
              exemplos: [
                {
                  titulo: 'Configurações para deploy',
                  codigo: `// Endpoint de health check\napp.get('/health', (req, res) => {\n  res.json({ status: 'ok', timestamp: new Date() });\n});\n\n// package.json — scripts de produção\n{\n  "scripts": {\n    "start": "node src/server.js",\n    "build": "tsc -p tsconfig.json",\n    "dev": "nodemon src/server.ts"\n  },\n  "engines": {\n    "node": ">=20.0.0" // especificar versão\n  }\n}\n\n// Porta dinâmica (obrigatório em PaaS)\nconst PORT = parseInt(process.env.PORT || '3000', 10);\napp.listen(PORT, () => console.log(\`Rodando na porta \${PORT}\`));`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar porta hardcoded (3000) em vez de process.env.PORT — PaaS define a porta',
                'Commitar .env em vez de configurar variáveis na plataforma'
              ],
              dicas: [
                'Railway tem banco PostgreSQL gratuito integrado — ótimo para projetos pessoais',
                'Render tem cold start no plano gratuito (fica dormindo) — Railway mantém ativo mais tempo'
              ],
              links: [
                { titulo: 'Render — Documentação', url: 'https://render.com/docs/deploy-node-express-app' },
                { titulo: 'Railway — Deploy Node.js', url: 'https://docs.railway.app/deploy/nodejs' }
              ],
              projetosRelacionados: ['Fazer deploy de uma API Node.js + banco PostgreSQL no Render ou Railway']
            },
            exercicios: {
              fixacao: [{ id: 'dep-f1', enunciado: 'Por que a porta do servidor deve ser process.env.PORT e não hardcoded?', tipo: 'dissertativo', gabarito: 'Plataformas PaaS atribuem a porta dinamicamente via variável de ambiente. Com porta hardcoded, o servidor não inicia na plataforma.' }],
              intermediario: [{ id: 'dep-i1', enunciado: 'Prepare uma API Node.js para deploy: adicione endpoint /health, configure PORT dinâmico, crie .env.example e documente no README os passos de deploy.', tipo: 'dissertativo' }],
              desafio: [{ id: 'dep-d1', enunciado: 'Configure um pipeline CI/CD: GitHub Actions roda testes automaticamente a cada PR. Deploy no Render/Railway só acontece se os testes passarem.', tipo: 'dissertativo' }]
            },
            checklist: ['Configurei PORT dinâmico', 'Tenho endpoint /health', 'Já fiz deploy de uma API real', 'Configuro variáveis de ambiente na plataforma (não no código)']
          }
        ]
      },
      {
        id: 'ferramentas-backend-mod', name: 'ferramentas backend', estimatedHours: 2,
        description: 'Ferramentas essenciais do dev backend.',
        topicos: [
          {
            id: 'postman-thunder', title: 'Postman / Thunder Client', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['ferramentas', 'api', 'teste'],
            conteudo: {
              resumo: 'Ferramentas HTTP como Postman e Thunder Client permitem testar APIs manualmente sem escrever código — fundamentais durante o desenvolvimento.',
              conceitos: [
                'Collection: grupo de requisições salvas',
                'Environment: conjunto de variáveis (dev, staging, prod)',
                'Auth: configurar token uma vez para toda a collection',
                'Pre-request script: executar código antes da requisição',
                'Test script: assertions automáticas na resposta'
              ],
              explicacao: 'No Thunder Client (extensão do VSCode): crie uma request, defina método, URL, headers e body, execute e inspecione a resposta. Salve em collections para não recriar toda vez. Configure variáveis de ambiente para alternar entre dev e produção facilmente.',
              exemplos: [
                {
                  titulo: 'Configurando coleção com autenticação',
                  codigo: `// Exemplo de fluxo no Postman/Thunder Client\n// 1. POST /auth/login — salvar token na variável de ambiente\n// Pre-request: --\n// Body: { "email": "{{email}}", "senha": "{{senha}}" }\n// Test script:\npm.test('Login bem-sucedido', () => {\n  pm.expect(pm.response.code).toBe(200);\n  const { token } = pm.response.json();\n  pm.environment.set('token', token);\n});\n\n// 2. GET /perfil — usa token salvo\n// Headers: Authorization: Bearer {{token}}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Não salvar as requisições em collections — recriar toda vez é perda de tempo',
                'Hardcodar tokens nas requisições — use variáveis de ambiente'
              ],
              dicas: [
                'Thunder Client é integrado ao VSCode — mais rápido que abrir o Postman separado',
                'Exporte a collection e commite para o repo — toda a equipe tem as mesmas requisições'
              ],
              links: [{ titulo: 'Thunder Client — VSCode Extension', url: 'https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ptc-f1', enunciado: 'Como você testaria manualmente um endpoint que requer autenticação JWT sem ter que copiar o token toda vez?', tipo: 'dissertativo', gabarito: 'Configure uma collection no Postman/Thunder Client com variável de ambiente "token". O endpoint de login salva o token nessa variável automaticamente via script.' }],
              intermediario: [{ id: 'ptc-i1', enunciado: 'Crie uma collection para uma API de tarefas com: login, criar tarefa (autenticado), listar tarefas e deletar. Configure variáveis de ambiente para dev e prod.', tipo: 'dissertativo' }],
              desafio: [{ id: 'ptc-d1', enunciado: 'Configure test scripts em todas as requisições da collection para validar: status code, campos obrigatórios na resposta e tempo de resposta < 500ms.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso Postman ou Thunder Client para testar APIs', 'Organizo requisições em collections', 'Uso variáveis de ambiente para tokens', 'Já exportei uma collection para o repositório']
          },
          {
            id: 'git-avancado', title: 'Git: branches, merge e rebase', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['git', 'versionamento'],
            conteudo: {
              resumo: 'Git avançado vai além do commit básico — branches permitem trabalho paralelo sem conflito; merge e rebase integram mudanças; pull requests são a base do trabalho em equipe.',
              conceitos: [
                'Feature branch: branch separada para cada funcionalidade',
                'git merge: integra branch mantendo histórico divergente',
                'git rebase: reaplica commits em cima de outro ponto (histórico linear)',
                'git stash: salva trabalho em andamento temporariamente',
                'Conflict resolution: resolver conflitos no merge',
                'git log --oneline --graph: visualizar o histórico'
              ],
              explicacao: 'O fluxo GitFlow: main (produção), develop (integração), feature/* (funcionalidades). Feature branch: crie de develop, desenvolva, abra PR para develop, revise, faça merge. Rebase antes do PR deixa o histórico limpo. git stash salva mudanças inacabadas para trocar de branch.',
              exemplos: [
                {
                  titulo: 'Fluxo de feature branch',
                  codigo: `# Criar feature branch\ngit checkout -b feature/autenticacao-jwt\n\n# Desenvolver... commitar...\ngit add src/auth.js\ngit commit -m "feat: implementar autenticação JWT"\n\n# Antes do PR: rebase em develop para incluir mudanças recentes\ngit fetch origin\ngit rebase origin/develop\n\n# Resolver conflitos se houver, depois:\ngit rebase --continue\n\n# Push para abrir PR\ngit push origin feature/autenticacao-jwt\n\n# Stash — salvar trabalho inacabado\ngit stash push -m "wip: validação de email"\ngit checkout outra-branch\n# voltar:\ngit stash pop`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Trabalhar direto na main — um erro afeta produção imediatamente',
                'Commits gigantes sem mensagem descritiva — dificulta code review e git blame'
              ],
              dicas: [
                'Commits pequenos e frequentes são melhores do que um commit gigante no final',
                'Conventional commits (feat:, fix:, chore:) facilitam geração de changelog automático'
              ],
              links: [{ titulo: 'Conventional Commits', url: 'https://www.conventionalcommits.org/pt-br/' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'gita-f1', enunciado: 'Qual a diferença entre git merge e git rebase? Quando usar cada um?', tipo: 'dissertativo', gabarito: 'Merge preserva o histórico real (divergência e junção). Rebase cria histórico linear (como se tivesse desenvolvido em cima da branch atual). Rebase antes do PR; merge para integrar a PR.' }],
              intermediario: [{ id: 'gita-i1', enunciado: 'Simule um conflito de merge: crie 2 branches que editam a mesma linha de um arquivo, faça merge e resolva o conflito manualmente.', tipo: 'dissertativo' }],
              desafio: [{ id: 'gita-d1', enunciado: 'Configure um repositório com branch protection na main: PRs obrigatórios, ao menos 1 aprovação e CI passando antes de fazer merge.', tipo: 'dissertativo' }]
            },
            checklist: ['Trabalho com feature branches', 'Sei fazer merge e rebase', 'Resolvo conflitos de merge', 'Uso mensagens de commit descritivas e padronizadas']
          }
        ]
      }
    ]
  }
];
