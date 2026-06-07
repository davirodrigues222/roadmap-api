const ADS_ESTRUTURA = [
  {
    id: 'estrutura-dados', label: 'estruturas de dados', color: '#e11d48', icon: '📊',
    description: 'Estruturas de dados avançadas para o curso de ADS.',
    estimatedHours: 30, prerequisitos: [],
    modulos: [
      {
        id: 'arrays-strings', name: 'arrays e strings', estimatedHours: 4,
        topicos: [
          {
            id: 'arrays-avancado', title: 'arrays: manipulação avançada', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['arrays', 'javascript'],
            conteudo: {
              resumo: 'Arrays são a estrutura de dados mais usada. Dominar os métodos funcionais (map, filter, reduce) e algoritmos de manipulação é essencial.',
              conceitos: ['map: transforma cada elemento', 'filter: filtra por condição', 'reduce: acumula em um valor', 'sort: ordena (cuidado com comparação numérica)', 'flat/flatMap: achata arrays aninhados', 'find/findIndex: busca por condição'],
              explicacao: 'sort() sem comparador converte para string — [10, 9, 2].sort() retorna [10, 2, 9] (ordem lexicográfica). Para numérico: arr.sort((a,b) => a - b). reduce é o método mais poderoso — pode implementar map e filter usando reduce.',
              exemplos: [{ titulo: 'Métodos funcionais encadeados', codigo: `const vendas = [\n  { produto: 'A', valor: 150, categoria: 'eletrônico' },\n  { produto: 'B', valor: 50,  categoria: 'livro' },\n  { produto: 'C', valor: 200, categoria: 'eletrônico' }\n];\n\n// Total de eletrônicos\nconst totalEletronicos = vendas\n  .filter(v => v.categoria === 'eletrônico')\n  .reduce((acc, v) => acc + v.valor, 0);\n// 350\n\n// Agrupar por categoria\nconst porCategoria = vendas.reduce((acc, v) => {\n  acc[v.categoria] = (acc[v.categoria] || 0) + v.valor;\n  return acc;\n}, {}); // { eletrônico: 350, livro: 50 }`, linguagem: 'javascript' }],
              errosComuns: ['sort() sem comparador em arrays numéricos', 'Modificar o array original dentro de map (deve ser puro)'],
              dicas: ['Encadeie métodos funcionais em vez de loops imperativoss', 'Array.from({length: n}, (_, i) => i) cria array [0,1,...,n-1]'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'aa-f1', enunciado: 'Por que [10, 9, 2].sort() retorna [10, 2, 9]? Como ordenar numericamente?', tipo: 'dissertativo', gabarito: 'sort sem comparador converte para string. Para numérico: arr.sort((a,b) => a-b).' }],
              intermediario: [{ id: 'aa-i1', enunciado: 'Implemente uma função groupBy(arr, key) que agrupa objetos de um array pela chave especificada.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'aa-d1', enunciado: 'Implemente os métodos map, filter e find usando apenas reduce.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Uso map, filter, reduce com fluência', 'Sei ordenar arrays numericamente', 'Entendo que métodos funcionais não mutam o original']
          },
          {
            id: 'strings-algoritmos', title: 'strings: algoritmos comuns', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['strings', 'algoritmos'],
            conteudo: {
              resumo: 'Manipulação de strings é frequente em entrevistas e no dia a dia. Anagramas, palíndromos, compressão — são padrões que se repetem.',
              conceitos: ['split/join: converter entre string e array', 'slice/substring: extrair partes', 'replace/replaceAll: substituir', 'trim/padStart/padEnd: limpar e formatar', 'Regex básico para validação'],
              explicacao: 'Em JavaScript, strings são imutáveis — todo método retorna uma nova string. Para algoritmos de string, frequentemente converta para array de caracteres: [...str] ou str.split(""). Regex é poderoso para validação: /^[a-z]+$/.test(str).',
              exemplos: [{ titulo: 'Verificar anagrama e palíndromo', codigo: `// Palíndromo\nfunction ehPalindromo(str) {\n  const limpa = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return limpa === [...limpa].reverse().join('');\n}\n\n// Anagrama\nfunction saoAnagramas(a, b) {\n  const ordenar = s => s.toLowerCase().split('').sort().join('');\n  return ordenar(a) === ordenar(b);\n}\n\nconsole.log(ehPalindromo('A man, a plan, a canal: Panama')); // true\nconsole.log(saoAnagramas('listen', 'silent'));               // true`, linguagem: 'javascript' }],
              errosComuns: ['Usar == para comparar strings de forma case-insensitive', 'Esquecer de normalizar (toLowerCase, trim) antes de comparar'],
              dicas: ['Para contar frequência de caracteres, use um Map ou objeto', 'str.charCodeAt(i) retorna o código ASCII — útil para algoritmos de hash'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'str-f1', enunciado: 'Como verificar se "racecar" é palíndromo em JavaScript?', tipo: 'codigo', linguagem: 'javascript', gabarito: 'str === str.split("").reverse().join("")' }],
              intermediario: [{ id: 'str-i1', enunciado: 'Implemente contarPalavras(texto) que retorna um objeto com a frequência de cada palavra (case-insensitive).', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'str-d1', enunciado: 'Implemente a compressão RLE: "aaabbc" → "3a2bc". Se a compressão for maior que o original, retorne o original.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Manipulo strings com split, join, slice', 'Sei verificar palíndromo e anagrama', 'Uso regex básico para validação']
          }
        ]
      },
      {
        id: 'listas-pilhas-filas', name: 'listas, pilhas e filas', estimatedHours: 6,
        topicos: [
          {
            id: 'lista-encadeada', title: 'lista encadeada (linked list)', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['estruturas', 'linked list'],
            conteudo: {
              resumo: 'Lista encadeada é uma sequência de nós onde cada nó aponta para o próximo. Inserção/remoção O(1) na cabeça; busca O(n).',
              conceitos: ['Nó (Node): dado + ponteiro para próximo', 'head: primeiro nó da lista', 'tail: último nó', 'Simplesmente encadeada: next apenas', 'Duplamente encadeada: next e prev', 'Ciclo: último nó aponta para o início (lista circular)'],
              explicacao: 'Arrays têm acesso direto por índice O(1) mas inserção/remoção no meio é O(n). Lista encadeada tem inserção/remoção O(1) (dado o nó) mas acesso O(n). Use lista quando inserções/remoções frequentes; array quando acesso por índice é frequente.',
              exemplos: [{ titulo: 'Lista simplesmente encadeada', codigo: `class No {\n  constructor(valor) {\n    this.valor = valor;\n    this.proximo = null;\n  }\n}\n\nclass ListaEncadeada {\n  constructor() { this.head = null; this.tamanho = 0; }\n\n  inserirInicio(valor) {\n    const no = new No(valor);\n    no.proximo = this.head;\n    this.head = no;\n    this.tamanho++;\n  }\n\n  removerInicio() {\n    if (!this.head) return null;\n    const valor = this.head.valor;\n    this.head = this.head.proximo;\n    this.tamanho--;\n    return valor;\n  }\n\n  buscar(valor) {\n    let atual = this.head;\n    while (atual) {\n      if (atual.valor === valor) return atual;\n      atual = atual.proximo;\n    }\n    return null;\n  }\n}`, linguagem: 'javascript' }],
              errosComuns: ['Perder a referência ao head ao remover', 'Não tratar lista vazia nas operações'],
              dicas: ['Desenhe os nós e ponteiros antes de codificar', 'Técnica do nó sentinela (dummy head) simplifica edge cases'],
              links: [{ titulo: 'Visualgo — Linked List', url: 'https://visualgo.net/pt/list' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'll-f1', enunciado: 'Qual a complexidade de inserção no início e busca em uma lista simplesmente encadeada?', tipo: 'dissertativo', gabarito: 'Inserção no início: O(1). Busca: O(n) — precisa percorrer toda a lista.' }],
              intermediario: [{ id: 'll-i1', enunciado: 'Implemente uma lista encadeada com métodos: inserirFim, removerFim, inverter (in-place) e imprimir.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'll-d1', enunciado: 'Detecte se uma lista encadeada tem ciclo usando o algoritmo de Floyd (tartaruga e lebre). O(n) tempo, O(1) espaço.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei uma lista encadeada do zero', 'Entendo a diferença entre array e lista encadeada', 'Sei inverter uma lista', 'Conheço o algoritmo de detecção de ciclo']
          },
          {
            id: 'pilha-fila-impl', title: 'pilha e fila: implementação', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['pilha', 'fila', 'estruturas'],
            conteudo: {
              resumo: 'Pilha (LIFO) e fila (FIFO) são ADTs (Abstract Data Types) com operações restritas. Implementá-las do zero solidifica o entendimento.',
              conceitos: ['Pilha: push/pop/peek — LIFO (Last In, First Out)', 'Fila: enqueue/dequeue/peek — FIFO (First In, First Out)', 'Deque: dupla extremidade (dequeue: add/remove em ambos os lados)', 'Aplicações: pilha de chamadas, fila de tarefas, BFS/DFS'],
              explicacao: 'A call stack do JavaScript é uma pilha — quando você chama uma função, ela é empilhada; ao retornar, é desempilhada. Filas são usadas em sistemas de mensagens, BFS em grafos e escalonamento de processos. Implementar com lista encadeada dá O(1) em todas as operações.',
              exemplos: [{ titulo: 'Pilha com verificação de parênteses', codigo: `function verificarParenteses(str) {\n  const pilha = [];\n  const fechamento = { ')': '(', ']': '[', '}': '{' };\n\n  for (const char of str) {\n    if ('([{'.includes(char)) {\n      pilha.push(char);\n    } else if ('])}'.includes(char)) {\n      if (pilha.pop() !== fechamento[char]) return false;\n    }\n  }\n  return pilha.length === 0;\n}\n\nconsole.log(verificarParenteses('({[]})')); // true\nconsole.log(verificarParenteses('({[}])'));  // false`, linguagem: 'javascript' }],
              errosComuns: ['pop() em pilha vazia retorna undefined (não lança erro em JS)', 'Confundir enqueue (add no fim) com dequeue (remove do início)'],
              dicas: ['Pilha: ctrl+Z (undo), histórico de navegação, avaliação de expressões', 'Fila: fila de impressão, tarefas assíncronas, BFS'],
              links: [], projetosRelacionados: ['Implementar um avaliador de expressões matemáticas usando pilha (suporte a + - * /)']
            },
            exercicios: {
              fixacao: [{ id: 'pf-f1', enunciado: 'Dado "((()))", a pilha tem como conteúdo ao processar o 4º caractere?', tipo: 'dissertativo', gabarito: '[\'(\', \'(\', \'(\'] — 3 parênteses de abertura empilhados.' }],
              intermediario: [{ id: 'pf-i1', enunciado: 'Implemente uma fila usando dois arrays sem usar shift() (O(1) amortizado para enqueue e dequeue).', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'pf-d1', enunciado: 'Implemente uma pilha que suporta getMin() em O(1) usando pilha auxiliar.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Sei implementar pilha e fila do zero', 'Conheço aplicações reais de cada uma', 'Implementei verificação de parênteses balanceados', 'Entendo a call stack como pilha']
          }
        ]
      },
      {
        id: 'arvores-mod', name: 'árvores', estimatedHours: 8,
        topicos: [
          {
            id: 'arvore-binaria', title: 'árvore binária de busca (BST)', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['árvore', 'bst', 'recursão'],
            conteudo: {
              resumo: 'BST é uma árvore onde, para cada nó, o filho esquerdo é menor e o direito é maior. Permite busca, inserção e remoção em O(log n) no caso médio.',
              conceitos: ['Nó: valor, filho esquerdo, filho direito', 'Busca: compara com raiz, vai para esquerda ou direita', 'Inserção: busca até null e insere', 'Balanceamento: árvore degenerada tem O(n) em vez de O(log n)', 'Traversal: in-order (crescente), pre-order, post-order'],
              explicacao: 'In-order traversal em uma BST retorna os elementos em ordem crescente — útil para listar ordenado. Uma BST degenerada (inserir elementos já ordenados) vira uma lista encadeada. AVL Tree e Red-Black Tree são BSTs auto-balanceadas que garantem O(log n) sempre.',
              exemplos: [{ titulo: 'BST com insert e search', codigo: `class NoArvore {\n  constructor(valor) {\n    this.valor = valor;\n    this.esq = this.dir = null;\n  }\n}\n\nclass BST {\n  constructor() { this.raiz = null; }\n\n  inserir(valor) {\n    const inserirRec = (no, val) => {\n      if (!no) return new NoArvore(val);\n      if (val < no.valor) no.esq = inserirRec(no.esq, val);\n      else if (val > no.valor) no.dir = inserirRec(no.dir, val);\n      return no;\n    };\n    this.raiz = inserirRec(this.raiz, valor);\n  }\n\n  inOrder(no = this.raiz, result = []) {\n    if (!no) return result;\n    this.inOrder(no.esq, result);\n    result.push(no.valor);\n    this.inOrder(no.dir, result);\n    return result;\n  }\n}\n\nconst bst = new BST();\n[5, 3, 7, 1, 4].forEach(v => bst.inserir(v));\nconsole.log(bst.inOrder()); // [1, 3, 4, 5, 7]`, linguagem: 'javascript' }],
              errosComuns: ['Não tratar o caso de árvore vazia (raiz = null)', 'Inserir duplicatas sem definir comportamento'],
              dicas: ['Visualize com Visualgo para entender o balanceamento', 'In-order sempre retorna os valores em ordem — use para verificar se é BST válida'],
              links: [{ titulo: 'Visualgo — BST', url: 'https://visualgo.net/pt/bst' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'bst-f1', enunciado: 'Qual a complexidade de busca em uma BST balanceada vs degenerada?', tipo: 'dissertativo', gabarito: 'Balanceada: O(log n). Degenerada (lista): O(n).' }],
              intermediario: [{ id: 'bst-i1', enunciado: 'Implemente busca e remoção em uma BST. A remoção de nó com dois filhos deve substituir pelo sucessor in-order.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'bst-d1', enunciado: 'Dado um array, construa a BST mais balanceada possível. Dica: o elemento do meio deve ser a raiz.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei insert e search em BST', 'Implementei os 3 tipos de traversal', 'Entendo por que BST pode degenerar', 'Sei o que é balanceamento']
          },
          {
            id: 'heap', title: 'heap (min/max)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['heap', 'fila de prioridade'],
            conteudo: {
              resumo: 'Heap é uma árvore binária completa onde o pai é sempre menor (min-heap) ou maior (max-heap) que os filhos. Implementada eficientemente com array.',
              conceitos: ['Min-heap: menor elemento sempre na raiz', 'Max-heap: maior elemento sempre na raiz', 'insert: adiciona no fim e faz "sift up"', 'extractMin/Max: remove raiz, coloca último e faz "sift down"', 'Heapify: construir heap a partir de array em O(n)', 'Fila de prioridade: implementada com heap'],
              explicacao: 'Num heap armazenado como array, o pai do índice i está em Math.floor((i-1)/2); os filhos de i estão em 2i+1 e 2i+2. Heap permite extractMin em O(log n) — muito mais eficiente que buscar em O(n). Usado em Dijkstra, heap sort e filas de prioridade.',
              exemplos: [{ titulo: 'Min-Heap com array', codigo: `class MinHeap {\n  constructor() { this.heap = []; }\n\n  pai(i)   { return Math.floor((i - 1) / 2); }\n  esq(i)   { return 2 * i + 1; }\n  dir(i)   { return 2 * i + 2; }\n  trocar(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }\n\n  inserir(val) {\n    this.heap.push(val);\n    let i = this.heap.length - 1;\n    while (i > 0 && this.heap[this.pai(i)] > this.heap[i]) {\n      this.trocar(i, this.pai(i));\n      i = this.pai(i);\n    }\n  }\n\n  extrairMin() {\n    if (this.heap.length === 0) return null;\n    const min = this.heap[0];\n    this.heap[0] = this.heap.pop();\n    this._siftDown(0);\n    return min;\n  }\n\n  _siftDown(i) {\n    let menor = i;\n    const { esq, dir } = { esq: this.esq(i), dir: this.dir(i) };\n    if (esq < this.heap.length && this.heap[esq] < this.heap[menor]) menor = esq;\n    if (dir < this.heap.length && this.heap[dir] < this.heap[menor]) menor = dir;\n    if (menor !== i) { this.trocar(i, menor); this._siftDown(menor); }\n  }\n}`, linguagem: 'javascript' }],
              errosComuns: ['Confundir heap com BST — heap não tem propriedade de ordenação esquerda/direita', 'Esquecer de verificar o tamanho antes de extrair'],
              dicas: ['Heap é a melhor estrutura para "k menores/maiores elementos de um array"', 'JavaScript não tem heap nativo — em entrevistas, pergunte se pode usar sorted array como aproximação'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'heap-f1', enunciado: 'Qual é a complexidade de inserção e de extração do mínimo em um min-heap?', tipo: 'dissertativo', gabarito: 'Ambas: O(log n). O sift up/down percorre no máximo a altura da árvore.' }],
              intermediario: [{ id: 'heap-i1', enunciado: 'Usando o MinHeap implementado, resolva: encontre os 3 menores elementos de um array de 10 mil números.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'heap-d1', enunciado: 'Implemente o Heap Sort usando max-heap. Complexidade deve ser O(n log n).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo a propriedade de heap', 'Implementei min-heap com array', 'Sei quando usar heap vs outros', 'Já resolvi problema de "k maiores" com heap']
          }
        ]
      },
      {
        id: 'grafos-mod', name: 'grafos', estimatedHours: 6,
        topicos: [
          {
            id: 'grafos-intro', title: 'representação de grafos', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['grafos', 'teoria dos grafos'],
            conteudo: {
              resumo: 'Grafos modelam relações entre entidades — redes sociais, mapas, dependências entre tarefas. Compostos por vértices (nós) e arestas (conexões).',
              conceitos: ['Vértice/nó: entidade', 'Aresta: conexão entre dois vértices', 'Dirigido vs não-dirigido', 'Ponderado: arestas com peso (distância, custo)', 'Lista de adjacência: { A: [B, C], B: [A] }', 'Matriz de adjacência: grid n×n'],
              explicacao: 'Lista de adjacência é mais eficiente em espaço para grafos esparsos. Matriz de adjacência permite verificar se há aresta em O(1) mas usa O(V²) de espaço. A maioria dos problemas reais usa lista de adjacência.',
              exemplos: [{ titulo: 'Grafo com lista de adjacência', codigo: `class Grafo {\n  constructor() { this.adj = new Map(); }\n\n  addVertice(v) { this.adj.set(v, []); }\n\n  addAresta(v1, v2) { // não-dirigido\n    this.adj.get(v1)?.push(v2);\n    this.adj.get(v2)?.push(v1);\n  }\n\n  vizinhos(v) { return this.adj.get(v) || []; }\n}\n\nconst g = new Grafo();\n['A','B','C','D'].forEach(v => g.addVertice(v));\ng.addAresta('A','B'); g.addAresta('A','C'); g.addAresta('B','D');\nconsole.log(g.vizinhos('A')); // ['B', 'C']`, linguagem: 'javascript' }],
              errosComuns: ['Esquecer que grafos não-dirigidos adicionam aresta nos dois sentidos', 'Usar matriz de adjacência para grafos grandes (O(V²) memória)'],
              dicas: ['Grafos aparecem em: redes sociais, GPS, compiladores (dependências), sistemas de recomendação', 'Árvores são um tipo especial de grafo (acíclico, conexo, dirigido)'],
              links: [{ titulo: 'Visualgo — Grafos', url: 'https://visualgo.net/pt/graphds' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'grf-f1', enunciado: 'Qual a diferença entre lista de adjacência e matriz de adjacência? Quando usar cada uma?', tipo: 'dissertativo', gabarito: 'Lista: eficiente para grafos esparsos (pouco arestas). Matriz: verificação de aresta O(1) mas O(V²) de memória. Use lista na maioria dos casos.' }],
              intermediario: [{ id: 'grf-i1', enunciado: 'Implemente um grafo dirigido e ponderado com lista de adjacência. Adicione método para retornar todos os caminhos de V1 para V2.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'grf-d1', enunciado: 'Dado um grafo social (usuarios e seguidores), encontre todos os usuários a no máximo 2 graus de distância de um usuário específico.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo vértices, arestas, grafos dirigidos/ponderados', 'Implementei grafo com lista de adjacência', 'Sei a diferença de complexidade entre lista e matriz']
          },
          {
            id: 'bfs-dfs', title: 'BFS e DFS', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['grafos', 'bfs', 'dfs', 'traversal'],
            conteudo: {
              resumo: 'BFS (Breadth-First Search) e DFS (Depth-First Search) são os dois algoritmos fundamentais de travessia de grafos com aplicações em caminho mínimo, detecção de ciclos e componentes conectados.',
              conceitos: ['BFS: usa fila, explora nível por nível — caminho mais curto em grafos não ponderados', 'DFS: usa pilha (ou recursão), explora fundo antes de voltar', 'Visitados: set para não visitar nó duas vezes', 'Aplicações: BFS para caminho mais curto, DFS para detecção de ciclo, topological sort'],
              explicacao: 'BFS garantidamente encontra o caminho mais curto (em nós) em grafos não ponderados. DFS é mais simples de implementar recursivamente e usa menos memória. Ambos têm complexidade O(V + E) onde V = vértices e E = arestas.',
              exemplos: [{ titulo: 'BFS e DFS em grafo', codigo: `function bfs(grafo, inicio) {\n  const visitados = new Set([inicio]);\n  const fila = [inicio];\n  const ordem = [];\n\n  while (fila.length > 0) {\n    const v = fila.shift();\n    ordem.push(v);\n    for (const viz of grafo.vizinhos(v)) {\n      if (!visitados.has(viz)) {\n        visitados.add(viz);\n        fila.push(viz);\n      }\n    }\n  }\n  return ordem;\n}\n\nfunction dfs(grafo, inicio) {\n  const visitados = new Set();\n  const ordem = [];\n\n  function explorar(v) {\n    visitados.add(v);\n    ordem.push(v);\n    for (const viz of grafo.vizinhos(v)) {\n      if (!visitados.has(viz)) explorar(viz);\n    }\n  }\n\n  explorar(inicio);\n  return ordem;\n}`, linguagem: 'javascript' }],
              errosComuns: ['Esquecer de marcar como visitado antes de adicionar à fila (causa duplicados)', 'Usar DFS recursivo em grafos muito profundos (stack overflow)'],
              dicas: ['BFS em grid (matriz): cada célula é um vértice, vizinhos são as 4 direções', 'DFS iterativo usa pilha explícita em vez de recursão — evita stack overflow'],
              links: [], projetosRelacionados: ['Implementar um maze solver usando BFS (garante caminho mais curto)']
            },
            exercicios: {
              fixacao: [{ id: 'bfsdfs-f1', enunciado: 'Por que BFS garante o caminho mais curto mas DFS não?', tipo: 'dissertativo', gabarito: 'BFS explora por níveis — todos os nós a distância 1, depois 2, etc. O primeiro caminho encontrado é garantidamente o mais curto. DFS vai fundo — pode encontrar caminhos longos primeiro.' }],
              intermediario: [{ id: 'bfsdfs-i1', enunciado: 'Implemente BFS para encontrar o caminho mais curto entre dois vértices, retornando a lista de nós do caminho.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'bfsdfs-d1', enunciado: 'Implemente um solver de labirinto (matriz 2D com 0=livre, 1=parede) que encontra o caminho mais curto do início ao fim usando BFS.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei BFS com fila', 'Implementei DFS com recursão', 'Uso set de visitados para evitar ciclos', 'Sei quando usar BFS vs DFS']
          }
        ]
      },
      {
        id: 'algoritmos-mod', name: 'algoritmos de ordenação e busca', estimatedHours: 6,
        topicos: [
          {
            id: 'ordenacao', title: 'algoritmos de ordenação', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['algoritmos', 'ordenação', 'complexidade'],
            conteudo: {
              resumo: 'Algoritmos de ordenação são fundamentais para entrevistas técnicas e para entender complexidade. Cada um tem trade-offs de tempo e espaço.',
              conceitos: ['Bubble Sort: O(n²) — troca adjacentes', 'Selection Sort: O(n²) — seleciona mínimo', 'Insertion Sort: O(n²) mas O(n) para quase ordenados', 'Merge Sort: O(n log n) — divide e conquista, estável', 'Quick Sort: O(n log n) médio, O(n²) pior — in-place', 'Counting/Radix Sort: O(n) para inteiros em range conhecido'],
              explicacao: 'Merge Sort é estável (preserva ordem de iguais) e O(n log n) garantido. Quick Sort é mais rápido na prática (cache-friendly) mas pode degradar para O(n²) sem bom pivô. Para entrevistas: Merge Sort é o mais importante para entender divide and conquer.',
              exemplos: [{ titulo: 'Merge Sort', codigo: `function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n\n  const meio = Math.floor(arr.length / 2);\n  const esq  = mergeSort(arr.slice(0, meio));\n  const dir  = mergeSort(arr.slice(meio));\n\n  return merge(esq, dir);\n}\n\nfunction merge(esq, dir) {\n  const result = [];\n  let i = 0, j = 0;\n\n  while (i < esq.length && j < dir.length) {\n    if (esq[i] <= dir[j]) result.push(esq[i++]);\n    else                  result.push(dir[j++]);\n  }\n\n  return [...result, ...esq.slice(i), ...dir.slice(j)];\n}\n\nconsole.log(mergeSort([5, 3, 1, 4, 2])); // [1, 2, 3, 4, 5]`, linguagem: 'javascript' }],
              errosComuns: ['Bubble sort tem O(n²) — nunca use em produção para listas grandes', 'Quick sort sem randomização do pivô é vulnerável a arrays já ordenados'],
              dicas: ['Na prática, use Array.prototype.sort() — o JS usa TimSort (híbrido Merge+Insertion)', 'Entender Merge Sort ensina divide and conquer — padrão que aparece em muitos algoritmos'],
              links: [{ titulo: 'Visualgo — Sorting', url: 'https://visualgo.net/pt/sorting' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ord-f1', enunciado: 'Qual algoritmo de ordenação usar se: 1) a lista já está quase ordenada, 2) precisa ser estável, 3) memória é limitada?', tipo: 'dissertativo', gabarito: '1) Insertion Sort (O(n) para quase ordenados). 2) Merge Sort (estável). 3) Quick Sort (in-place, O(1) de espaço).' }],
              intermediario: [{ id: 'ord-i1', enunciado: 'Implemente Quick Sort com randomização do pivô para evitar o pior caso.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'ord-d1', enunciado: 'Implemente counting sort para ordenar uma lista de notas (0-100) em O(n). Compare com Merge Sort para 10 mil elementos.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo a complexidade de cada algoritmo', 'Implementei Merge Sort', 'Sei quando usar cada algoritmo', 'Entendo a diferença entre estável e instável']
          },
          {
            id: 'busca-binaria', title: 'busca binária', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['algoritmos', 'busca'],
            conteudo: {
              resumo: 'Busca binária é O(log n) — metade do array é eliminada a cada passo. Só funciona em arrays ordenados.',
              conceitos: ['Pré-requisito: array ordenado', 'Divide e conquista: compara com meio, descarta metade', 'Complexidade: O(log n) tempo, O(1) espaço', 'Variações: primeiro/último índice de um elemento, limite inferior/superior'],
              explicacao: 'Em 1 milhão de elementos, busca linear faz até 1.000.000 comparações. Busca binária faz apenas 20 (log₂ de 1.000.000 ≈ 20). Bugs clássicos: overflow em (left + right)/2 — prefira left + (right - left)/2. Loop condition: while(left <= right) não while(left < right).',
              exemplos: [{ titulo: 'Busca binária com variações', codigo: `function buscaBinaria(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n\n  while (esq <= dir) {\n    const meio = esq + Math.floor((dir - esq) / 2);\n    if (arr[meio] === alvo) return meio;\n    if (arr[meio] < alvo) esq = meio + 1;\n    else dir = meio - 1;\n  }\n  return -1; // não encontrado\n}\n\n// Variação: encontrar limite inferior (primeiro índice >= alvo)\nfunction limiteInferior(arr, alvo) {\n  let esq = 0, dir = arr.length;\n  while (esq < dir) {\n    const meio = esq + Math.floor((dir - esq) / 2);\n    if (arr[meio] < alvo) esq = meio + 1;\n    else dir = meio;\n  }\n  return esq;\n}`, linguagem: 'javascript' }],
              errosComuns: ['Usar em array não ordenado (resultados incorretos sem erro)', 'Condição while(esq < dir) em vez de while(esq <= dir) — perde o último elemento'],
              dicas: ['Busca binária pode ser aplicada a qualquer espaço de busca monotônico (não só arrays)', 'Sempre verifique: o array está ordenado? Qual o range válido de esq e dir?'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'bb-f1', enunciado: 'Quantas comparações busca binária faz em um array de 1024 elementos no pior caso?', tipo: 'dissertativo', gabarito: '10 comparações — log₂(1024) = 10.' }],
              intermediario: [{ id: 'bb-i1', enunciado: 'Dada uma lista de palavras ordenadas, use busca binária para implementar um autocomplete que retorna todas as palavras com determinado prefixo.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'bb-d1', enunciado: 'Encontre a raiz quadrada de um número inteiro positivo sem usar Math.sqrt(), usando busca binária com precisão de 2 casas decimais.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Implementei busca binária corretamente', 'Sei o limite de comparações para N elementos', 'Entendo variações (limite inferior, superior)', 'Uso left + (right-left)/2 para evitar overflow']
          }
        ]
      }
    ]
  }
];
