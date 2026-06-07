const ADS_MYSQL = [
  {
    id: 'mysql', label: 'MySQL / banco de dados', color: '#16a34a', icon: '🗄️',
    description: 'Banco de dados relacional, modelagem e SQL avançado.',
    estimatedHours: 20, prerequisitos: [],
    modulos: [
      {
        id: 'mysql-fundamentos', name: 'fundamentos MySQL', estimatedHours: 5,
        topicos: [
          {
            id: 'mysql-intro', title: 'instalação e conceitos básicos', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['mysql', 'banco de dados'],
            conteudo: {
              resumo: 'MySQL é o banco de dados relacional open-source mais usado no mundo. Organiza dados em tabelas com linhas e colunas, garantindo integridade e relacionamentos.',
              conceitos: ['SGBD: Sistema de Gerenciamento de Banco de Dados', 'Tabela: estrutura com colunas (atributos) e linhas (registros)', 'Schema: conjunto de tabelas e objetos relacionados', 'DDL: CREATE, ALTER, DROP — estrutura', 'DML: SELECT, INSERT, UPDATE, DELETE — dados'],
              explicacao: 'MySQL é cliente-servidor: o servidor gerencia os dados, clientes (seu código, MySQL Workbench) se conectam para consultar. Em ADS você vai usar MySQL extensivamente em projetos de sistemas. Aprenda também o MySQL Workbench para visualizar e executar queries graficamente.',
              exemplos: [{ titulo: 'Criação de banco e tabela', codigo: `-- Criar banco de dados\nCREATE DATABASE IF NOT EXISTS escola\n  CHARACTER SET utf8mb4\n  COLLATE utf8mb4_unicode_ci;\n\nUSE escola;\n\n-- Criar tabela\nCREATE TABLE alunos (\n  id         INT         AUTO_INCREMENT PRIMARY KEY,\n  nome       VARCHAR(100) NOT NULL,\n  email      VARCHAR(150) UNIQUE NOT NULL,\n  data_nasc  DATE,\n  matricula  CHAR(10)    UNIQUE NOT NULL,\n  ativo      BOOLEAN     DEFAULT TRUE,\n  criado_em  TIMESTAMP   DEFAULT CURRENT_TIMESTAMP\n);\n\n-- Ver estrutura\nDESCRIBE alunos;`, linguagem: 'sql' }],
              errosComuns: ['Não usar utf8mb4 (emojis e caracteres especiais quebram com utf8 antigo)', 'Esquecer NOT NULL em campos obrigatórios (aceita NULL silenciosamente)'],
              dicas: ['utf8mb4 é o charset correto para MySQL — utf8 no MySQL é incompleto', 'AUTO_INCREMENT garante IDs únicos sem lógica no código'],
              links: [{ titulo: 'MySQL Workbench — Download', url: 'https://dev.mysql.com/downloads/workbench/' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'myi-f1', enunciado: 'Qual a diferença entre DDL e DML no MySQL?', tipo: 'dissertativo', gabarito: 'DDL (Data Definition Language): define a estrutura (CREATE, ALTER, DROP). DML (Data Manipulation Language): manipula os dados (SELECT, INSERT, UPDATE, DELETE).' }],
              intermediario: [{ id: 'myi-i1', enunciado: 'Crie o banco de dados e tabelas para um sistema de biblioteca (livros, autores, emprestimos, usuarios) com todos os tipos de dados e constraints adequados.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'myi-d1', enunciado: 'Documente o schema criado com comentários SQL (COMMENT ON COLUMN) e gere o diagrama ER no MySQL Workbench.', tipo: 'dissertativo' }]
            },
            checklist: ['Instalei MySQL e MySQL Workbench', 'Sei criar bancos e tabelas', 'Entendo DDL vs DML', 'Uso tipos de dados e constraints corretos']
          },
          {
            id: 'tipos-constraints', title: 'tipos de dados e constraints', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['mysql', 'tipos', 'constraints'],
            conteudo: {
              resumo: 'Escolher os tipos corretos e constraints adequados é fundamental para integridade dos dados e performance.',
              conceitos: ['INT/BIGINT: inteiros', 'VARCHAR(n): texto variável até n caracteres', 'TEXT: texto longo (sem indexação de prefixo)', 'DECIMAL(p,s): valores monetários (nunca FLOAT!)', 'DATE/DATETIME/TIMESTAMP: datas', 'BOOLEAN (TINYINT(1))', 'PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, DEFAULT, CHECK'],
              explicacao: 'Nunca use FLOAT ou DOUBLE para valores monetários — imprecisão de ponto flutuante. Use DECIMAL(10,2) para preços. VARCHAR é mais eficiente que TEXT e pode ser indexado. TIMESTAMP armazena em UTC e converte para o timezone do servidor; DATETIME armazena literal.',
              exemplos: [{ titulo: 'Tipos corretos para e-commerce', codigo: `CREATE TABLE produtos (\n  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  nome         VARCHAR(200)      NOT NULL,\n  descricao    TEXT,\n  preco        DECIMAL(10, 2)    NOT NULL CHECK(preco >= 0),\n  estoque      INT UNSIGNED      DEFAULT 0,\n  categoria    ENUM('eletronico','vestuario','livro') NOT NULL,\n  imagem_url   VARCHAR(500),\n  ativo        BOOLEAN           DEFAULT TRUE,\n  criado_em    TIMESTAMP         DEFAULT CURRENT_TIMESTAMP,\n  atualizado_em TIMESTAMP        DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n);\n\nCREATE TABLE pedidos (\n  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\n  usuario_id  INT UNSIGNED NOT NULL,\n  total       DECIMAL(12, 2) NOT NULL,\n  status      ENUM('pendente','pago','enviado','entregue','cancelado') DEFAULT 'pendente',\n  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE RESTRICT\n);`, linguagem: 'sql' }],
              errosComuns: ['Usar FLOAT para valores de moeda (0.1 + 0.2 ≠ 0.3 em ponto flutuante)', 'FK sem ON DELETE definido — comportamento pode variar'],
              dicas: ['ON DELETE RESTRICT impede deletar registro pai que tem filhos', 'ON DELETE CASCADE deleta filhos automaticamente — use com cuidado'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'tc-f1', enunciado: 'Por que usar DECIMAL e não FLOAT para valores monetários?', tipo: 'dissertativo', gabarito: 'FLOAT tem imprecisão de ponto flutuante: 0.1 + 0.2 = 0.30000000000000004. DECIMAL armazena exatamente os dígitos especificados.' }],
              intermediario: [{ id: 'tc-i1', enunciado: 'Crie a tabela de clientes com: id, cpf (UNIQUE), nome, email, telefone, endereco (JSON), plano (ENUM básico/premium/enterprise) e data de adesão.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'tc-d1', enunciado: 'Modele um banco para um sistema de agendamento médico: médicos, pacientes, consultas, especialidades. Defina todos os tipos, FKs e constraints adequados.', tipo: 'codigo', linguagem: 'sql' }]
            },
            checklist: ['Uso DECIMAL para valores monetários', 'Conheço os principais tipos (INT, VARCHAR, DATE, DECIMAL)', 'Defino FKs com ON DELETE adequado', 'Uso CHECK constraints para validar dados']
          }
        ]
      },
      {
        id: 'sql-avancado-mod', name: 'SQL avançado', estimatedHours: 8,
        topicos: [
          {
            id: 'aggregations', title: 'agregações e GROUP BY', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['sql', 'agregações', 'group by'],
            conteudo: {
              resumo: 'Funções de agregação calculam valores sobre grupos de linhas. Essenciais para relatórios, dashboards e análise de dados.',
              conceitos: ['COUNT(*): total de linhas', 'SUM(col): soma', 'AVG(col): média', 'MIN/MAX: mínimo e máximo', 'GROUP BY: agrupa por coluna', 'HAVING: filtrar grupos (como WHERE mas para agregações)', 'DISTINCT: valores únicos'],
              explicacao: 'WHERE filtra antes da agregação; HAVING filtra depois. A ordem de execução SQL é: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. COUNT(*) conta todas as linhas; COUNT(col) ignora NULLs.',
              exemplos: [{ titulo: 'Relatório de vendas por período', codigo: `-- Vendas por categoria no último mês\nSELECT\n  p.categoria,\n  COUNT(ip.id)          AS total_itens,\n  SUM(ip.subtotal)      AS receita,\n  AVG(ip.preco_unitario) AS ticket_medio,\n  MAX(ip.preco_unitario) AS maior_venda\nFROM itens_pedido ip\nJOIN produtos p ON ip.produto_id = p.id\nJOIN pedidos pe ON ip.pedido_id = pe.id\nWHERE pe.status = 'entregue'\n  AND pe.criado_em >= DATE_SUB(NOW(), INTERVAL 1 MONTH)\nGROUP BY p.categoria\nHAVING receita > 1000  -- só categorias com mais de R$1000\nORDER BY receita DESC;`, linguagem: 'sql' }],
              errosComuns: ['Usar WHERE em vez de HAVING para filtrar agregações', 'Selecionar colunas não agregadas sem incluir no GROUP BY'],
              dicas: ['MySQL 5.7+ aceita colunas no SELECT não presentes no GROUP BY por padrão — evite esta ambiguidade', 'ROLLUP adiciona subtotais automaticamente: GROUP BY categoria WITH ROLLUP'],
              links: [], projetosRelacionados: ['Criar um dashboard de vendas com 5 relatórios usando apenas SQL (sem código)']
            },
            exercicios: {
              fixacao: [{ id: 'agg-f1', enunciado: 'Qual a diferença entre WHERE e HAVING?', tipo: 'dissertativo', gabarito: 'WHERE filtra linhas individuais antes da agregação. HAVING filtra grupos após GROUP BY. Não é possível usar funções de agregação no WHERE.' }],
              intermediario: [{ id: 'agg-i1', enunciado: 'Escreva uma query que retorna os 5 clientes com maior total de compras, o número de pedidos de cada um e a data do último pedido.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'agg-d1', enunciado: 'Calcule a taxa de retenção mensal: percentual de clientes que compraram no mês M que também compraram no mês M+1.', tipo: 'codigo', linguagem: 'sql' }]
            },
            checklist: ['Uso COUNT, SUM, AVG, MIN, MAX', 'Entendo GROUP BY e HAVING', 'Sei a diferença entre WHERE e HAVING', 'Crio relatórios com múltiplas agregações']
          },
          {
            id: 'subqueries', title: 'subqueries e CTEs', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['sql', 'subquery', 'cte'],
            conteudo: {
              resumo: 'Subqueries são queries dentro de queries. CTEs (WITH) tornam queries complexas legíveis dividindo em etapas nomeadas.',
              conceitos: ['Subquery no WHERE: filtrar com resultado de outra query', 'Subquery no SELECT: calcular valor por linha', 'Subquery no FROM: usar resultado como tabela', 'CTE (WITH): nomear resultado para reutilizar', 'CTE recursiva: percorrer hierarquias (árvores, org charts)'],
              explicacao: 'CTEs são açúcar sintático — o banco otimiza da mesma forma que subqueries. A diferença é legibilidade. Para hierarquias (categoria → subcategoria → produto), use CTE recursiva. Subquery correlacionada (referencia a query externa) executa para cada linha — pode ser lenta.',
              exemplos: [{ titulo: 'CTE para relatório complexo', codigo: `-- Clientes acima da média de gastos\nWITH media_gastos AS (\n  SELECT AVG(total) AS media FROM pedidos WHERE status = 'pago'\n),\nclientesAgregados AS (\n  SELECT\n    u.id, u.nome, u.email,\n    COUNT(p.id)  AS total_pedidos,\n    SUM(p.total) AS total_gasto\n  FROM usuarios u\n  JOIN pedidos p ON p.usuario_id = u.id AND p.status = 'pago'\n  GROUP BY u.id, u.nome, u.email\n)\nSELECT\n  ca.nome, ca.email,\n  ca.total_pedidos,\n  ca.total_gasto,\n  ca.total_gasto - mg.media AS diferenca_da_media\nFROM clientesAgregados ca\nCROSS JOIN media_gastos mg\nWHERE ca.total_gasto > mg.media\nORDER BY ca.total_gasto DESC\nLIMIT 10;`, linguagem: 'sql' }],
              errosComuns: ['Subquery correlacionada em tabelas grandes (O(n) queries)', 'CTEs sem índice nas colunas de JOIN — pode ser mais lento que esperado'],
              dicas: ['Em MySQL 8+, CTEs são otimizadas como views materializadas em alguns casos', 'Prefira CTEs a subqueries aninhadas para legibilidade'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'sub-f1', enunciado: 'Quando usar CTE (WITH) em vez de subquery no FROM?', tipo: 'dissertativo', gabarito: 'Quando o resultado da subquery é usado mais de uma vez, ou quando a query ficaria muito aninhada. CTEs melhoram legibilidade e podem ser referenciadas múltiplas vezes.' }],
              intermediario: [{ id: 'sub-i1', enunciado: 'Usando CTE, calcule: para cada mês do último ano, o total de vendas, o crescimento em relação ao mês anterior e a participação no total anual.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'sub-d1', enunciado: 'Implemente uma CTE recursiva para uma estrutura de categorias em árvore. Retorne todas as subcategorias de uma categoria pai com o nível de profundidade.', tipo: 'codigo', linguagem: 'sql' }]
            },
            checklist: ['Escrevo subqueries no WHERE e FROM', 'Uso CTEs com WITH para organizar queries complexas', 'Entendo o risco de performance de subqueries correlacionadas', 'Sei quando CTE é preferível a subquery']
          },
          {
            id: 'indices', title: 'índices e performance', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['mysql', 'índices', 'performance'],
            conteudo: {
              resumo: 'Índices são a diferença entre uma query em 0.001s e 10 segundos. Entender quando e como criar índices é uma habilidade crítica de banco de dados.',
              conceitos: ['B-Tree Index: índice padrão — ótimo para =, >, <, BETWEEN, LIKE prefix', 'Full-text index: busca em texto (MATCH AGAINST)', 'Composite index: índice em múltiplas colunas', 'EXPLAIN: analisar o plano de execução de uma query', 'Covering index: índice contém todas as colunas da query — não acessa a tabela'],
              explicacao: 'EXPLAIN mostra se MySQL usa um índice ou faz full table scan (tipo ALL — ruim). Colunas em WHERE, JOIN ON, ORDER BY e GROUP BY são candidatas a índice. Mas índices custam espaço e tornam INSERT/UPDATE mais lentos. A regra: índice onde há lentidão confirmada por EXPLAIN.',
              exemplos: [{ titulo: 'Criando e analisando índices', codigo: `-- Ver plano de execução ANTES do índice\nEXPLAIN SELECT * FROM pedidos\nWHERE usuario_id = 5 AND status = 'pago';\n-- type: ALL → full table scan (ruim)\n\n-- Criar índice composto\nCREATE INDEX idx_pedidos_usuario_status\nON pedidos (usuario_id, status);\n\n-- Verificar DEPOIS\nEXPLAIN SELECT * FROM pedidos\nWHERE usuario_id = 5 AND status = 'pago';\n-- type: ref → usa o índice (bom)\n\n-- Ver todos os índices de uma tabela\nSHOW INDEXES FROM pedidos;\n\n-- Remover índice desnecessário\nDROP INDEX idx_pedidos_usuario_status ON pedidos;`, linguagem: 'sql' }],
              errosComuns: ['Criar índice em coluna de baixa cardinalidade (BOOLEAN, ENUM com 2 valores) — não ajuda', 'Índice composto com colunas na ordem errada — só o primeiro prefixo é usado'],
              dicas: ['Ordem do índice composto importa: (usuario_id, status) serve para queries que filtram por usuario_id, mas (status, usuario_id) serve para queries que filtram só por status', 'Perceba: LIKE "abc%" usa índice; LIKE "%abc" não usa'],
              links: [], projetosRelacionados: ['Analisar e otimizar 5 queries lentas com EXPLAIN e índices adequados']
            },
            exercicios: {
              fixacao: [{ id: 'idx-f1', enunciado: 'O que significa type: ALL no resultado do EXPLAIN? Por que é um problema?', tipo: 'dissertativo', gabarito: 'type: ALL = full table scan — MySQL lê todas as linhas da tabela. Em tabelas com 1M+ registros, isso é muito lento. O ideal é type: ref, range ou const.' }],
              intermediario: [{ id: 'idx-i1', enunciado: 'Use EXPLAIN para analisar 3 queries do seu projeto. Identifique quais fazem full table scan e adicione índices para corrigir.', tipo: 'dissertativo' }],
              desafio: [{ id: 'idx-d1', enunciado: 'Compare a performance de uma query de busca em 1 milhão de registros antes e depois de adicionar o índice adequado. Documente o tempo e o plano de execução.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso EXPLAIN para analisar queries', 'Crio índices nas colunas corretas', 'Entendo índices compostos e a ordem das colunas', 'Sei que índices têm custo em escrita']
          },
          {
            id: 'transacoes', title: 'transações e ACID', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['mysql', 'transações', 'acid'],
            conteudo: {
              resumo: 'Transações garantem que um conjunto de operações seja executado de forma atômica — ou tudo acontece, ou nada acontece. ACID é o conjunto de propriedades que garantem confiabilidade.',
              conceitos: ['Atomicidade: tudo ou nada', 'Consistência: banco vai de estado válido para estado válido', 'Isolamento: transações concorrentes não se interferem', 'Durabilidade: dados confirmados sobrevivem a falhas', 'BEGIN / COMMIT / ROLLBACK', 'Deadlock: duas transações esperando uma pela outra'],
              explicacao: 'Sem transação, uma transferência bancária que debita conta A mas falha antes de creditar B fica com o dinheiro sumido. Com transação: se qualquer parte falhar, o ROLLBACK desfaz tudo. InnoDB (engine padrão do MySQL) suporta transações; MyISAM não.',
              exemplos: [{ titulo: 'Transação de transferência bancária', codigo: `START TRANSACTION;\n\nSELECT saldo FROM contas WHERE id = 1 FOR UPDATE; -- lock da linha\n\n-- Verifica saldo suficiente (no app ou via check)\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1;\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2;\n\n-- Se tudo OK:\nCOMMIT;\n\n-- Se qualquer erro:\n-- ROLLBACK;\n\n-- Em Node.js com Prisma:\nconst resultado = await prisma.$transaction(async (tx) => {\n  const origem = await tx.conta.findUnique({ where: { id: 1 } });\n  if (origem.saldo < 100) throw new Error('Saldo insuficiente');\n  await tx.conta.update({ where: { id: 1 }, data: { saldo: { decrement: 100 } } });\n  await tx.conta.update({ where: { id: 2 }, data: { saldo: { increment: 100 } } });\n  return 'OK';\n});`, linguagem: 'sql' }],
              errosComuns: ['Esquecer COMMIT — transação fica aberta e causa lock de outras transações', 'Transações muito longas — aumentam risco de deadlock'],
              dicas: ['Mantenha transações curtas — bloqueio longo causa lentidão', 'FOR UPDATE bloqueia as linhas selecionadas para outras transações'],
              links: [], projetosRelacionados: ['Implementar sistema de estoque que usa transação para: verificar estoque, reservar e criar pedido atomicamente']
            },
            exercicios: {
              fixacao: [{ id: 'tx-f1', enunciado: 'O que é ACID? Explique atomicidade com um exemplo.', tipo: 'dissertativo', gabarito: 'Atomicidade: tudo ou nada. Ex: transferência bancária — debitar conta A e creditar conta B são uma única operação atômica. Se o crédito falhar, o débito é desfeito.' }],
              intermediario: [{ id: 'tx-i1', enunciado: 'Implemente no Node.js (com Prisma) uma transferência entre contas usando transação. Valide saldo suficiente e registre o histórico de transferências.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'tx-d1', enunciado: 'Simule um deadlock entre duas transações, identifique-o no log do MySQL e implemente retry automático na aplicação para quando ocorrer deadlock.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo ACID e o que cada letra significa', 'Uso BEGIN/COMMIT/ROLLBACK', 'Sei que transações longas causam locks', 'Implementei transações no código da aplicação']
          }
        ]
      },
      {
        id: 'normalizacao-mod', name: 'modelagem e normalização', estimatedHours: 4,
        topicos: [
          {
            id: 'normalizacao', title: 'normalização (1FN, 2FN, 3FN)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['modelagem', 'normalização', 'banco de dados'],
            conteudo: {
              resumo: 'Normalização é o processo de organizar um banco para eliminar redundância e dependências problemáticas, garantindo integridade e facilidade de manutenção.',
              conceitos: ['1FN: atributos atômicos, sem grupos repetitivos', '2FN: 1FN + sem dependência parcial da PK composta', '3FN: 2FN + sem dependência transitiva', 'Desnormalização: sacrificar normalização por performance', 'Anomalias: inserção, atualização, exclusão'],
              explicacao: '1FN: cada célula tem um único valor (não "SP, RJ, MG" numa coluna). 2FN: em tabelas com PK composta, cada coluna deve depender da PK completa, não de parte dela. 3FN: colunas não-chave não devem depender de outras colunas não-chave (ex: cidade dependendo do CEP, não da PK).',
              exemplos: [{ titulo: 'Processo de normalização', codigo: `-- ❌ Tabela não normalizada (viola 1FN e 3FN)\nCREATE TABLE pedidos_ruim (\n  pedido_id  INT,\n  cliente    VARCHAR(100),\n  email      VARCHAR(150),  -- depende do cliente, não do pedido\n  cep        CHAR(8),\n  cidade     VARCHAR(100),  -- depende do CEP, não do pedido\n  produtos   TEXT           -- "Notebook, Mouse, Teclado" — viola 1FN\n);\n\n-- ✅ Normalizado até 3FN\nCREATE TABLE clientes (\n  id    INT PRIMARY KEY,\n  nome  VARCHAR(100) NOT NULL,\n  email VARCHAR(150) UNIQUE NOT NULL\n);\n\nCREATE TABLE enderecos (\n  cep    CHAR(8) PRIMARY KEY,\n  cidade VARCHAR(100),\n  estado CHAR(2)\n);\n\nCREATE TABLE pedidos (\n  id         INT PRIMARY KEY,\n  cliente_id INT REFERENCES clientes(id),\n  cep        CHAR(8) REFERENCES enderecos(cep)\n);\n\nCREATE TABLE itens_pedido (\n  pedido_id  INT REFERENCES pedidos(id),\n  produto_id INT REFERENCES produtos(id),\n  quantidade INT,\n  PRIMARY KEY (pedido_id, produto_id)\n);`, linguagem: 'sql' }],
              errosComuns: ['Guardar múltiplos valores numa coluna (lista de tags como string)', 'Desnormalizar prematuramente sem evidência de problema de performance'],
              dicas: ['Normalize primeiro, desnormalize depois se necessário com evidências de performance', 'JSON no MySQL pode ser útil para dados semi-estruturados sem violar 1FN'],
              links: [], projetosRelacionados: ['Modelar o banco de dados de um sistema de ADS (alunos, disciplinas, notas, turmas) normalizado até 3FN']
            },
            exercicios: {
              fixacao: [{ id: 'norm-f1', enunciado: 'Explique a 1ª Forma Normal com um exemplo de violação e como corrigi-la.', tipo: 'dissertativo', gabarito: 'Violação: coluna "telefones" = "99999-0001, 99999-0002". Correção: tabela separada telefones com FK para cliente, uma linha por telefone.' }],
              intermediario: [{ id: 'norm-i1', enunciado: 'Normalize a tabela: vendas(id, vendedor, cpf_vendedor, cliente, produto, categoria, preco) até 3FN. Identifique as dependências e crie as tabelas necessárias.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'norm-d1', enunciado: 'Analise um banco de dados existente (pode ser o do seu projeto de ADS) e documente quais formas normais ele atende e onde há violações.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo 1FN, 2FN e 3FN', 'Identifico anomalias de atualização', 'Normalizo um banco dado um problema de negócio', 'Sei quando desnormalizar é aceitável']
          },
          {
            id: 'stored-procedures', title: 'stored procedures e views', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['mysql', 'stored procedures', 'views'],
            conteudo: {
              resumo: 'Views são queries salvas como tabelas virtuais. Stored procedures são blocos de código SQL armazenados no banco, com lógica condicional e loops.',
              conceitos: ['VIEW: query nomeada — simplifica consultas complexas', 'STORED PROCEDURE: código SQL reutilizável no banco', 'TRIGGER: executa automaticamente em INSERT/UPDATE/DELETE', 'FUNCTION: retorna um valor (diferente de procedure)', 'Parâmetros: IN, OUT, INOUT'],
              explicacao: 'Views simplificam consultas para usuários/sistemas sem precisar reescrever a query. Stored procedures reduzem round-trips ao banco — em vez de 5 queries separadas, uma única chamada. Mas lógica de negócio no banco dificulta testes e versionamento.',
              exemplos: [{ titulo: 'View e Stored Procedure', codigo: `-- VIEW: resumo de vendas\nCREATE VIEW vw_resumo_vendas AS\nSELECT\n  u.nome AS cliente,\n  COUNT(p.id) AS total_pedidos,\n  SUM(p.total) AS total_gasto,\n  MAX(p.criado_em) AS ultimo_pedido\nFROM usuarios u\nJOIN pedidos p ON p.usuario_id = u.id\nWHERE p.status = 'pago'\nGROUP BY u.id, u.nome;\n\n-- Consultar a view\nSELECT * FROM vw_resumo_vendas WHERE total_gasto > 1000;\n\n-- STORED PROCEDURE\nDELIMITER //\nCREATE PROCEDURE sp_transferir(IN de_id INT, IN para_id INT, IN valor DECIMAL(10,2))\nBEGIN\n  DECLARE saldo_atual DECIMAL(10,2);\n  SELECT saldo INTO saldo_atual FROM contas WHERE id = de_id FOR UPDATE;\n  IF saldo_atual < valor THEN\n    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente';\n  END IF;\n  UPDATE contas SET saldo = saldo - valor WHERE id = de_id;\n  UPDATE contas SET saldo = saldo + valor WHERE id = para_id;\nEND //\nDELIMITER ;\n\n-- Chamar\nCALL sp_transferir(1, 2, 150.00);`, linguagem: 'sql' }],
              errosComuns: ['Lógica de negócio complexa em triggers — dificulta debug e entendimento', 'View sem índice nas colunas de filtro — ainda pode ser lenta'],
              dicas: ['Views não têm performance mágica — são queries executadas em tempo real', 'Prefira código da aplicação a stored procedures para lógica de negócio — mais testável'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'sp-f1', enunciado: 'Qual a diferença entre VIEW e STORED PROCEDURE no MySQL?', tipo: 'dissertativo', gabarito: 'VIEW: query salva como tabela virtual, só lê dados. STORED PROCEDURE: código SQL com lógica (IF, LOOP), pode modificar dados e ter parâmetros.' }],
              intermediario: [{ id: 'sp-i1', enunciado: 'Crie uma VIEW que mostra o estoque crítico (produtos com estoque abaixo do mínimo) e uma PROCEDURE que reabastece o estoque de um produto.', tipo: 'codigo', linguagem: 'sql' }],
              desafio: [{ id: 'sp-d1', enunciado: 'Implemente um TRIGGER que registra toda alteração de preço de produto em uma tabela de auditoria (produto_id, preco_anterior, preco_novo, alterado_em).', tipo: 'codigo', linguagem: 'sql' }]
            },
            checklist: ['Crio VIEWs para simplificar consultas', 'Escrevo STORED PROCEDURES básicas', 'Entendo quando usar TRIGGER', 'Sei os tradeoffs de lógica no banco vs na aplicação']
          }
        ]
      }
    ]
  }
];
