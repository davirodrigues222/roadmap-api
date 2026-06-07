const ADS_VENDY = [
  {
    id: 'vendy', label: 'Projeto Vendy+', color: '#ec4899', icon: '🛒',
    description: 'Sistema completo de e-commerce — projeto prático integrador de todas as tecnologias.',
    estimatedHours: 20, prerequisitos: ['web-react', 'mysql', 'java'],
    modulos: [
      {
        id: 'vendy-planejamento', name: 'planejamento e arquitetura', estimatedHours: 3,
        topicos: [
          {
            id: 'vendy-requisitos', title: 'requisitos e escopo do Vendy+', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['projeto', 'requisitos', 'e-commerce'],
            conteudo: {
              resumo: 'O Vendy+ é um sistema de e-commerce simplificado — projeto integrador que cobre: autenticação, catálogo de produtos, carrinho, pedidos e área administrativa.',
              conceitos: ['MVP: Minimum Viable Product — escopo mínimo que entrega valor', 'Módulos: Auth, Catálogo, Carrinho, Pedidos, Admin', 'Entidades principais: Usuario, Produto, Categoria, Pedido, ItemPedido', 'Fluxo principal: cadastro → login → buscar produto → adicionar ao carrinho → finalizar pedido', 'Área admin: gerenciar produtos, visualizar pedidos, relatórios básicos'],
              explicacao: 'Defina o MVP antes de codificar — é tentador adicionar features que não são essenciais. O fluxo mínimo viável: usuário cria conta → faz login → vê produtos → adiciona ao carrinho → finaliza compra → admin vê o pedido. Autenticação e segurança são não-negociáveis desde o início.',
              exemplos: [{ titulo: 'Escopo MVP do Vendy+', codigo: `// MÓDULO 1: AUTH\n✅ POST /auth/register  — cadastro com email e senha\n✅ POST /auth/login     — retorna JWT\n✅ GET  /auth/me        — perfil do usuário logado\n\n// MÓDULO 2: CATÁLOGO (público)\n✅ GET /produtos        — listar com filtro e paginação\n✅ GET /produtos/:id    — detalhe do produto\n✅ GET /categorias      — listar categorias\n\n// MÓDULO 3: CARRINHO (autenticado)\n✅ GET    /carrinho     — ver itens\n✅ POST   /carrinho     — adicionar produto\n✅ PATCH  /carrinho/:id — alterar quantidade\n✅ DELETE /carrinho/:id — remover item\n\n// MÓDULO 4: PEDIDOS (autenticado)\n✅ POST /pedidos        — finalizar carrinho como pedido\n✅ GET  /pedidos        — histórico de pedidos do usuário\n✅ GET  /pedidos/:id    — detalhe do pedido\n\n// MÓDULO 5: ADMIN (role=admin)\n✅ CRUD /admin/produtos\n✅ GET  /admin/pedidos  — todos os pedidos\n✅ PATCH /admin/pedidos/:id/status — atualizar status`, linguagem: 'text' }],
              errosComuns: ['Começar a codificar sem definir o escopo — feature creep desde o início', 'Deixar a autenticação para depois — o sistema inteiro depende dela'],
              dicas: ['Implemente os módulos na ordem: Auth → Catálogo → Carrinho → Pedidos → Admin', 'Use roles (user, admin) desde o início — difícil adicionar depois'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vreq-f1', enunciado: 'O que é MVP e por que definir o escopo antes de codificar é importante?', tipo: 'dissertativo', gabarito: 'MVP: conjunto mínimo de features que entrega valor real ao usuário. Definir escopo evita feature creep, mantém o foco e permite entregar algo funcional rapidamente.' }],
              intermediario: [{ id: 'vreq-i1', enunciado: 'Com base no escopo do Vendy+, escreva 5 user stories para o módulo de pedidos com critérios de aceite.', tipo: 'dissertativo' }],
              desafio: [{ id: 'vreq-d1', enunciado: 'Crie o diagrama de entidade-relacionamento completo do Vendy+ (todas as tabelas com PKs, FKs e cardinalidades).', tipo: 'dissertativo' }]
            },
            checklist: ['Entendi o escopo completo do Vendy+', 'Defini o MVP e priorizei os módulos', 'Criei o diagrama ER', 'Comecei pelo módulo de autenticação']
          },
          {
            id: 'vendy-banco', title: 'modelagem do banco de dados', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['mysql', 'modelagem', 'e-commerce'],
            conteudo: {
              resumo: 'O banco do Vendy+ tem 8 tabelas principais. A modelagem correta com índices e constraints adequados é a base de um sistema robusto.',
              conceitos: ['Tabelas: usuarios, categorias, produtos, enderecos, carrinhos, itens_carrinho, pedidos, itens_pedido', 'Soft delete: coluna deletado_em em vez de DELETE real', 'Preços históricos: guardar preco_unitario em itens_pedido (não referenciar produto)', 'Status de pedido: ENUM para controle de estado', 'Índices de busca: nome do produto, email do usuário'],
              explicacao: 'Guardar o preço no item do pedido é crítico — se o preço do produto mudar amanhã, o pedido de hoje não deve ser afetado. Soft delete (coluna deleted_at) preserva histórico e permite "restaurar". Sempre use DECIMAL(10,2) para valores monetários.',
              exemplos: [{ titulo: 'Schema do banco do Vendy+', codigo: `CREATE TABLE usuarios (\n  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  nome        VARCHAR(150) NOT NULL,\n  email       VARCHAR(200) UNIQUE NOT NULL,\n  senha_hash  VARCHAR(255) NOT NULL,\n  role        ENUM('user','admin') DEFAULT 'user',\n  ativo       BOOLEAN DEFAULT TRUE,\n  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE TABLE produtos (\n  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  categoria_id BIGINT UNSIGNED NOT NULL,\n  nome        VARCHAR(200) NOT NULL,\n  descricao   TEXT,\n  preco       DECIMAL(10,2) NOT NULL CHECK(preco >= 0),\n  estoque     INT UNSIGNED DEFAULT 0,\n  imagem_url  VARCHAR(500),\n  ativo       BOOLEAN DEFAULT TRUE,\n  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  INDEX idx_categoria (categoria_id),\n  INDEX idx_nome (nome),\n  FOREIGN KEY (categoria_id) REFERENCES categorias(id)\n);\n\nCREATE TABLE pedidos (\n  id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  usuario_id  BIGINT UNSIGNED NOT NULL,\n  status      ENUM('pendente','pago','enviado','entregue','cancelado') DEFAULT 'pendente',\n  total       DECIMAL(12,2) NOT NULL,\n  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)\n);\n\nCREATE TABLE itens_pedido (\n  id              BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  pedido_id       BIGINT UNSIGNED NOT NULL,\n  produto_id      BIGINT UNSIGNED NOT NULL,\n  quantidade      INT UNSIGNED NOT NULL,\n  preco_unitario  DECIMAL(10,2) NOT NULL, -- snapshot do preço na hora da compra\n  subtotal        DECIMAL(12,2) GENERATED ALWAYS AS (quantidade * preco_unitario),\n  FOREIGN KEY (pedido_id)  REFERENCES pedidos(id),\n  FOREIGN KEY (produto_id) REFERENCES produtos(id)\n);`, linguagem: 'sql' }],
              errosComuns: ['Referenciar produto.preco em itens_pedido em vez de guardar snapshot', 'Não adicionar índice em produto.categoria_id (query lenta ao filtrar por categoria)'],
              dicas: ['GENERATED ALWAYS AS para colunas calculadas — o banco calcula automaticamente', 'Crie o banco antes de qualquer código — refatorar banco é caro depois'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vban-f1', enunciado: 'Por que guardar preco_unitario em itens_pedido em vez de referenciar produto.preco?', tipo: 'dissertativo', gabarito: 'Se o preço do produto mudar, o pedido antigo deve manter o preço que o cliente pagou. O snapshot no item_pedido preserva o valor histórico.' }],
              intermediario: [{ id: 'vban-i1', enunciado: 'Crie as tabelas carrinhos e itens_carrinho. Um carrinho pertence a um usuário e tem N itens, cada um referenciando um produto e com quantidade.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'vban-d1', enunciado: 'Escreva as migrations do Vendy+ usando Prisma schema. Inclua todas as relações, constraints e índices necessários.', tipo: 'codigo', linguagem: 'text' }]
            },
            checklist: ['Modelei o banco completo do Vendy+', 'Guardo snapshot de preço em itens_pedido', 'Adicionei índices nas colunas de busca e FK', 'Usei tipos corretos (DECIMAL para dinheiro)']
          }
        ]
      },
      {
        id: 'vendy-backend', name: 'backend do Vendy+', estimatedHours: 8,
        topicos: [
          {
            id: 'vendy-auth', title: 'módulo de autenticação', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['auth', 'jwt', 'bcrypt'],
            conteudo: {
              resumo: 'Implementação completa do módulo de autenticação do Vendy+: registro, login, refresh token e middleware de autorização por role.',
              conceitos: ['Register: validação, hash da senha, verificar email único', 'Login: verificar credenciais, retornar access + refresh token', 'Middleware: verificar JWT, adicionar req.user', 'Autorização por role: adminOnly, userOnly', 'Refresh token: renovar access sem novo login'],
              explicacao: 'O fluxo completo: Register → salva usuário com bcrypt hash → Login → verifica hash → retorna access_token (15min) + refresh_token (7 dias) → cliente armazena refresh_token em httpOnly cookie → quando access expira, usa refresh para renovar sem pedir nova senha.',
              exemplos: [{ titulo: 'Fluxo completo de autenticação Vendy+', codigo: `// auth.service.js\nimport bcrypt from 'bcrypt';\nimport jwt from 'jsonwebtoken';\n\nexport class AuthService {\n  async register({ nome, email, senha }) {\n    const existe = await prisma.usuario.findUnique({ where: { email } });\n    if (existe) throw new ConflictError('E-mail já cadastrado');\n\n    const senhaHash = await bcrypt.hash(senha, 12);\n    const usuario = await prisma.usuario.create({\n      data: { nome, email, senha_hash: senhaHash },\n      select: { id: true, nome: true, email: true, role: true }\n    });\n    return usuario;\n  }\n\n  async login({ email, senha }) {\n    const usuario = await prisma.usuario.findUnique({ where: { email } });\n    if (!usuario || !await bcrypt.compare(senha, usuario.senha_hash)) {\n      throw new UnauthorizedError('Credenciais inválidas');\n    }\n    return this._gerarTokens(usuario);\n  }\n\n  _gerarTokens(usuario) {\n    const payload = { sub: usuario.id, role: usuario.role };\n    return {\n      access_token: jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' }),\n      refresh_token: jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' })\n    };\n  }\n}\n\n// middleware de autenticação\nexport function autenticar(req, res, next) {\n  const token = req.headers.authorization?.replace('Bearer ', '');\n  if (!token) return res.status(401).json({ error: 'Token necessário' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch { res.status(401).json({ error: 'Token inválido ou expirado' }); }\n}\n\n// middleware de role\nexport const adminOnly = (req, res, next) =>\n  req.user?.role === 'admin' ? next()\n  : res.status(403).json({ error: 'Acesso restrito' });`, linguagem: 'javascript' }],
              errosComuns: ['Retornar mensagem diferente para "email não existe" vs "senha errada" — permite enumeração de usuários', 'Não usar salt rounds adequados no bcrypt (mínimo 10, recomendado 12)'],
              dicas: ['Sempre retorne a mesma mensagem para login falho ("Credenciais inválidas") independente do motivo', 'bcrypt.compare é async — sempre use await'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vauth-f1', enunciado: 'Por que retornar a mesma mensagem de erro para "email não existe" e "senha incorreta"?', tipo: 'dissertativo', gabarito: 'Previne enumeração de usuários — um atacante não consegue descobrir quais emails estão cadastrados pelo tipo do erro.' }],
              intermediario: [{ id: 'vauth-i1', enunciado: 'Implemente o endpoint de refresh token do Vendy+: recebe refresh_token, valida, retorna novo access_token.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'vauth-d1', enunciado: 'Implemente logout com blacklist de tokens: ao fazer logout, o refresh_token é invalidado (armazene tokens inválidos no Redis ou tabela).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei register e login com JWT', 'Uso bcrypt com salt rounds >= 10', 'Tenho middleware de autenticação e autorização por role', 'Access token curto + refresh token longo']
          },
          {
            id: 'vendy-catalogo', title: 'módulo de catálogo', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['api', 'paginação', 'filtros'],
            conteudo: {
              resumo: 'O catálogo lista e exibe produtos com busca por texto, filtro por categoria, ordenação por preço e paginação eficiente.',
              conceitos: ['Paginação: page + limit ou cursor-based', 'Filtros: categoria, faixa de preço, disponível em estoque', 'Busca: texto no nome e descrição (LIKE ou full-text)', 'Ordenação: preço asc/desc, nome, novidades', 'DTO de resposta: não expor campos internos (custo, estoque exato)'],
              explicacao: 'Sempre pagine — nunca retorne todos os produtos de uma vez. Limite máximo de 100 itens por página. Para busca em texto, LIKE "%termo%" não usa índice — em produção, use FULLTEXT ou Elasticsearch. O DTO de resposta do produto público não deve incluir custo de compra ou estoque exato.',
              exemplos: [{ titulo: 'Endpoint de catálogo com filtros', codigo: `// GET /produtos?page=1&limit=20&categoria=1&q=notebook&minPreco=1000&ordenar=preco_asc\n\napp.get('/produtos', async (req, res) => {\n  const { page = 1, limit = 20, categoria, q, minPreco, maxPreco, ordenar } = req.query;\n\n  const skip  = (page - 1) * Math.min(limit, 100);\n  const take  = Math.min(limit, 100);\n\n  const where = {\n    ativo: true,\n    ...(categoria && { categoria_id: +categoria }),\n    ...(q && { nome: { contains: q } }),\n    ...(minPreco && { preco: { gte: +minPreco } }),\n    ...(maxPreco && { preco: { lte: +maxPreco } })\n  };\n\n  const orderBy = {\n    preco_asc:  { preco: 'asc' },\n    preco_desc: { preco: 'desc' },\n    novidades:  { criado_em: 'desc' }\n  }[ordenar] ?? { nome: 'asc' };\n\n  const [produtos, total] = await Promise.all([\n    prisma.produto.findMany({ where, skip, take, orderBy,\n      select: { id: true, nome: true, preco: true, imagem_url: true,\n                estoque: true, categoria: { select: { nome: true } } }\n    }),\n    prisma.produto.count({ where })\n  ]);\n\n  res.json({\n    dados: produtos,\n    meta: { pagina: +page, limite: take, total, totalPaginas: Math.ceil(total / take) }\n  });\n});`, linguagem: 'javascript' }],
              errosComuns: ['Retornar todos os produtos sem paginação (500ms+ para catálogos grandes)', 'Expor custo de compra, margem ou estoque exato no DTO público'],
              dicas: ['Promise.all para buscar dados e contar total simultaneamente — reduz tempo pela metade', 'Limite de 100 itens por página é uma regra de segurança — evita abusos'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vcat-f1', enunciado: 'Por que limitar o número máximo de itens por página na API?', tipo: 'dissertativo', gabarito: 'Evitar abusos (alguém pedindo 10000 itens), proteger o banco de dados de queries pesadas e garantir tempo de resposta aceitável.' }],
              intermediario: [{ id: 'vcat-i1', enunciado: 'Implemente o endpoint GET /produtos com filtro por categoria, busca por nome e paginação. Retorne também os metadados (total, páginas).', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'vcat-d1', enunciado: 'Implemente cursor-based pagination no catálogo (mais eficiente que page/offset para grandes volumes). Use o ID do último item como cursor.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei listagem com paginação e filtros', 'Nunca retorno sem limite de itens', 'O DTO público não expõe dados sensíveis', 'Busco dados e total em paralelo']
          },
          {
            id: 'vendy-pedidos', title: 'módulo de pedidos (transação)', estimatedMinutes: 90,
            difficulty: 'avancado', tags: ['transações', 'pedidos', 'e-commerce'],
            conteudo: {
              resumo: 'Finalizar um pedido é a operação mais crítica do Vendy+. Deve ser atômica: verificar estoque, reduzir estoque, criar pedido e limpar carrinho — tudo ou nada.',
              conceitos: ['Transação: todas as operações ou nenhuma', 'Race condition: dois usuários comprando o último item simultaneamente', 'Pessimistic lock: bloquear linha para updates concorrentes (SELECT FOR UPDATE)', 'Snapshot de preço: guardar o preço no momento da compra', 'Limpeza de carrinho: esvaziar após pedido criado'],
              explicacao: 'O fluxo de finalizar pedido: BEGIN TRANSACTION → buscar itens do carrinho → verificar estoque de cada produto (com SELECT FOR UPDATE) → calcular total → criar pedido + itens_pedido (com preço snapshot) → decrementar estoques → limpar carrinho → COMMIT. Se qualquer step falhar, ROLLBACK.',
              exemplos: [{ titulo: 'Finalizar pedido com transação no Prisma', codigo: `async function finalizarPedido(usuarioId) {\n  return prisma.$transaction(async (tx) => {\n    // 1. Buscar itens do carrinho\n    const carrinho = await tx.itenCarrinho.findMany({\n      where: { usuario_id: usuarioId },\n      include: { produto: true }\n    });\n    if (!carrinho.length) throw new Error('Carrinho vazio');\n\n    // 2. Verificar estoque\n    for (const item of carrinho) {\n      if (item.produto.estoque < item.quantidade) {\n        throw new Error(\`Estoque insuficiente: \${item.produto.nome}\`);\n      }\n    }\n\n    // 3. Calcular total\n    const total = carrinho.reduce(\n      (acc, i) => acc + i.produto.preco * i.quantidade, 0\n    );\n\n    // 4. Criar pedido\n    const pedido = await tx.pedido.create({\n      data: {\n        usuario_id: usuarioId,\n        total,\n        itens: {\n          create: carrinho.map(i => ({\n            produto_id:    i.produto_id,\n            quantidade:    i.quantidade,\n            preco_unitario: i.produto.preco // snapshot!\n          }))\n        }\n      }\n    });\n\n    // 5. Decrementar estoques\n    await Promise.all(carrinho.map(i =>\n      tx.produto.update({\n        where: { id: i.produto_id },\n        data:  { estoque: { decrement: i.quantidade } }\n      })\n    ));\n\n    // 6. Limpar carrinho\n    await tx.itenCarrinho.deleteMany({ where: { usuario_id: usuarioId } });\n\n    return pedido;\n  });\n}`, linguagem: 'javascript' }],
              errosComuns: ['Não usar transação — se a limpeza do carrinho falhar, o pedido existe mas o carrinho não foi limpo', 'Não verificar estoque antes de criar o pedido'],
              dicas: ['Prisma.$transaction com array executa em batch; com callback dá controle total', 'Race conditions em estoque exigem SELECT FOR UPDATE em MySQL — Prisma não suporta nativamente, use queryRaw'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vped-f1', enunciado: 'Por que finalizar um pedido deve ser uma transação?', tipo: 'dissertativo', gabarito: 'Se algum step falhar (ex: erro ao decrementar estoque), o sistema ficaria inconsistente — pedido criado mas estoque não atualizado. Transação garante atomicidade: tudo ou nada.' }],
              intermediario: [{ id: 'vped-i1', enunciado: 'Implemente o endpoint POST /pedidos que: valida carrinho, verifica estoque, cria pedido com itens (snapshot de preço), atualiza estoque e limpa carrinho — tudo em uma transação.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'vped-d1', enunciado: 'Simule race condition: dois usuários comprando o último item simultaneamente. Implemente solução com lock otimista (campo version no produto).', tipo: 'dissertativo' }]
            },
            checklist: ['Implementei finalização de pedido com transação', 'Verifico estoque antes de criar o pedido', 'Guardo snapshot do preço em itens_pedido', 'Limpo o carrinho após o pedido ser criado']
          }
        ]
      },
      {
        id: 'vendy-frontend', name: 'frontend do Vendy+', estimatedHours: 5,
        topicos: [
          {
            id: 'vendy-ui', title: 'interface com React + TanStack Query', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['react', 'tailwind', 'ux'],
            conteudo: {
              resumo: 'O frontend do Vendy+ é uma SPA React com catálogo, carrinho, fluxo de checkout e área do usuário. Usa TanStack Query para cache e Zustand para estado do carrinho.',
              conceitos: ['Catálogo: grid de produtos com filtros', 'Detalhe do produto: imagem, descrição, adicionar ao carrinho', 'Carrinho: persistido no localStorage via Zustand', 'Checkout: formulário de endereço e confirmação', 'Área do usuário: histórico de pedidos'],
              explicacao: 'Separe bem as responsabilidades: TanStack Query gerencia dados do servidor (produtos, pedidos); Zustand gerencia estado local do cliente (carrinho). O carrinho deve ser sincronizado com o servidor ao fazer login. Implemente skeleton screens para UX melhor durante loading.',
              exemplos: [{ titulo: 'Catálogo com filtros e TanStack Query', codigo: `function CatalogoPage() {\n  const [filtros, setFiltros] = useAtom(filtrosAtom); // ou useState\n\n  const { data, isLoading } = useQuery({\n    queryKey: ['produtos', filtros],\n    queryFn: () => api.get('/produtos', { params: filtros }).then(r => r.data),\n    keepPreviousData: true // não pisca ao trocar de página\n  });\n\n  if (isLoading) return <GridSkeleton />;\n\n  return (\n    <div className="flex gap-6">\n      <aside>\n        <FiltrosCatalogo\n          filtros={filtros}\n          onChange={novosFiltros => setFiltros(novosFiltros)}\n        />\n      </aside>\n\n      <main className="flex-1">\n        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n          {data?.dados.map(p => (\n            <ProdutoCard key={p.id} produto={p} />\n          ))}\n        </div>\n        <Paginacao meta={data?.meta} onChange={p => setFiltros(f => ({...f, page: p}))} />\n      </main>\n    </div>\n  );\n}`, linguagem: 'jsx' }],
              errosComuns: ['Não implementar skeleton screens — UX ruim com flash de conteúdo vazio', 'Recriar o carrinho do zero em vez de usar o que já está no backend'],
              dicas: ['keepPreviousData evita o flash de loading ao trocar de página', 'Skeleton screens são mais profissionais que spinners para listas e grids'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vui-f1', enunciado: 'Por que usar TanStack Query em vez de useState + useEffect para buscar produtos?', tipo: 'dissertativo', gabarito: 'TanStack Query oferece: cache automático, deduplicação de requests, refetch em background, estados de loading/error prontos, keepPreviousData e muito mais — tudo que você implementaria manualmente.' }],
              intermediario: [{ id: 'vui-i1', enunciado: 'Implemente o componente de carrinho com Zustand: adicionar produto, alterar quantidade, remover, calcular total e persistir no localStorage.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'vui-d1', enunciado: 'Implemente o fluxo completo de checkout: formulário de endereço → confirmação do pedido → tela de sucesso com número do pedido. Use React Hook Form + Zod para validação.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Implementei o catálogo com filtros e paginação', 'O carrinho é gerenciado com Zustand e persistido', 'Tenho skeleton screens para loading', 'O fluxo de checkout está funcional']
          }
        ]
      },
      {
        id: 'vendy-deploy', name: 'deploy do Vendy+', estimatedHours: 2,
        topicos: [
          {
            id: 'vendy-producao', title: 'colocando o Vendy+ em produção', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['deploy', 'docker', 'ci/cd'],
            conteudo: {
              resumo: 'O deploy do Vendy+ envolve: frontend no Vercel/Netlify, backend no Render/Railway, banco no Railway (PostgreSQL) e CI/CD com GitHub Actions.',
              conceitos: ['Frontend: Vercel/Netlify para React (CDN automático)', 'Backend: Render/Railway para Node.js', 'Banco: Railway PostgreSQL ou Supabase', 'CI/CD: testes automáticos + deploy automático', 'CORS: configurar allowed origins em produção', 'Environment variables: diferentes para dev e prod'],
              explicacao: 'O frontend faz requisições para o backend — você precisa configurar a URL da API como variável de ambiente no build. VITE_API_URL em desenvolvimento é localhost:3000; em produção é a URL do Render. O backend precisa configurar CORS para aceitar requisições do domínio do frontend.',
              exemplos: [{ titulo: 'Checklist de deploy do Vendy+', codigo: `// 1. Backend (Render)\n- Repositório conectado ao GitHub\n- Build command: npm ci\n- Start command: node dist/server.js (ou npm start)\n- Variáveis de ambiente:\n  DATABASE_URL=<postgresql do Railway>\n  JWT_SECRET=<string aleatória longa>\n  REFRESH_SECRET=<outra string>\n  ALLOWED_ORIGINS=https://vendy.vercel.app\n  NODE_ENV=production\n\n// 2. Frontend (Vercel)\n- Conectar repositório\n- Framework: Vite\n- Variável de ambiente:\n  VITE_API_URL=https://vendy-api.onrender.com\n\n// 3. CORS no backend\napp.use(cors({\n  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',\n  credentials: true // para cookies httpOnly\n}));\n\n// 4. GitHub Actions CI\n# Roda testes → se passar → deploy automático no Render`, linguagem: 'text' }],
              errosComuns: ['CORS bloqueando requisições do frontend (origem não permitida)', 'Variáveis de ambiente do desenvolvimento vazando para produção'],
              dicas: ['Render tem cold start no plano gratuito — use Railway para manter ativo', 'Vercel tem deploy preview automático para cada PR — ótimo para testar antes de mergear'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vprod-f1', enunciado: 'Por que o backend precisa configurar CORS?', tipo: 'dissertativo', gabarito: 'O browser bloqueia por padrão requisições para domínios diferentes (Same-Origin Policy). O servidor precisa explicitamente permitir o domínio do frontend via header Access-Control-Allow-Origin.' }],
              intermediario: [{ id: 'vprod-i1', enunciado: 'Faça o deploy completo do Vendy+: backend no Render, frontend no Vercel, banco no Railway. O sistema deve estar funcionando com URL pública.', tipo: 'dissertativo' }],
              desafio: [{ id: 'vprod-d1', enunciado: 'Configure GitHub Actions para o Vendy+: testes rodam em cada PR; deploy automático do backend (Render) e frontend (Vercel) apenas quando merge na main com testes passando.', tipo: 'dissertativo' }]
            },
            checklist: ['Backend em produção com URL pública', 'Frontend em produção acessível', 'CORS configurado corretamente', 'CI/CD rodando testes automaticamente']
          }
        ]
      }
    ]
  }
];
