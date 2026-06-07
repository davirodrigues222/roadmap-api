const JR_BASE = [
  {
    id: 'base', label: 'base obrigatória', color: '#639922', icon: '🧠',
    description: 'Fundamentos que todo dev precisa, independente da trilha escolhida.',
    estimatedHours: 12, prerequisitos: [],
    modulos: [
      {
        id: 'logica', name: 'lógica de programação', estimatedHours: 6,
        description: 'Pensar computacionalmente antes de escrever código.',
        topicos: [
          {
            id: 'algoritmos', title: 'algoritmos', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['lógica', 'fundamentos'],
            conteudo: {
              resumo: 'Um algoritmo é uma sequência finita e bem definida de passos para resolver um problema. É a base de toda a programação — antes de escrever código, você precisa saber descrever a solução.',
              conceitos: [
                'Sequência: passos executados em ordem específica',
                'Decisão: escolha entre caminhos (if/else)',
                'Repetição: executar algo enquanto uma condição for verdadeira',
                'Abstração: modelar o problema antes de codificar'
              ],
              explicacao: 'Todo programa é um algoritmo traduzido para uma linguagem que o computador entende. Saber escrever algoritmos em português (pseudocódigo) antes de codificar reduz erros e acelera o desenvolvimento. Um bom algoritmo deve ser correto, finito e eficiente.',
              exemplos: [
                {
                  titulo: 'Algoritmo de busca linear',
                  codigo: `function buscaLinear(arr, alvo) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === alvo) return i;\n  }\n  return -1; // não encontrado\n}\n\nconsole.log(buscaLinear([3, 7, 1, 9], 7)); // 1`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Pular direto para o código sem planejar o algoritmo antes',
                'Não prever casos de borda (array vazio, valor nulo, número negativo)'
              ],
              dicas: [
                'Escreva o algoritmo em português simples antes de qualquer código',
                'Teste mentalmente com exemplos concretos (trace manual)'
              ],
              links: [
                { titulo: 'Visualgo — visualização de algoritmos', url: 'https://visualgo.net/pt' }
              ],
              projetosRelacionados: [
                'Implementar busca binária e comparar com busca linear em velocidade',
                'Criar um jogo de adivinhar número usando algoritmo de divisão por 2'
              ]
            },
            exercicios: {
              fixacao: [{ id: 'alg-f1', enunciado: 'Descreva em português um algoritmo para encontrar o maior número em uma lista de inteiros.', tipo: 'dissertativo', dica: 'Use uma variável para guardar o maior encontrado até agora.', gabarito: 'Definir maior = primeiro elemento. Para cada elemento: se ele for maior que "maior", atualizar "maior". Retornar "maior".' }],
              intermediario: [{ id: 'alg-i1', enunciado: 'Implemente uma função que recebe um array e retorna o segundo maior elemento.', tipo: 'codigo', linguagem: 'javascript', templateInicial: 'function segundoMaior(arr) {\n  // seu código\n}', dica: 'Ordene o array ou mantenha dois valores (maior e segundo maior).' }],
              desafio: [{ id: 'alg-d1', enunciado: 'Dado um array de inteiros, encontre dois números que somem um alvo (Two Sum). Resolva com O(n) usando um Map.', tipo: 'codigo', linguagem: 'javascript', referencia: 'LeetCode #1' }]
            },
            checklist: [
              'Entendo o que é um algoritmo e para que serve',
              'Consigo descrever algoritmos em português antes de codificar',
              'Entendo sequência, decisão e repetição',
              'Resolvi pelo menos 1 exercício prático'
            ]
          },
          {
            id: 'estruturas-de-dados', title: 'estruturas de dados (básico)', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['lógica', 'dados'],
            conteudo: {
              resumo: 'Estruturas de dados são formas de organizar e armazenar dados para que possam ser acessados e modificados eficientemente. As mais comuns são arrays, listas, pilhas, filas e dicionários.',
              conceitos: [
                'Array: coleção ordenada de elementos com acesso por índice O(1)',
                'Pilha (Stack): LIFO — último a entrar, primeiro a sair',
                'Fila (Queue): FIFO — primeiro a entrar, primeiro a sair',
                'Dicionário/Map: pares chave-valor com busca eficiente'
              ],
              explicacao: 'Escolher a estrutura certa muda completamente a performance de um programa. Um array permite acesso direto por índice, mas inserção no meio é O(n). Um Map permite busca por chave em O(1). Conhecer essas diferenças é essencial para escrever código eficiente.',
              exemplos: [
                {
                  titulo: 'Pilha (Stack) em JavaScript',
                  codigo: `const pilha = [];\npilha.push('a'); // empilha\npilha.push('b');\npilha.push('c');\nconsole.log(pilha.pop()); // 'c' — desempilha o último\n\n// Fila (Queue)\nconst fila = [];\nfila.push('primeiro');\nfila.push('segundo');\nconsole.log(fila.shift()); // 'primeiro' — remove o início`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar array quando um Set seria mais adequado para verificar unicidade',
                'Não considerar a complexidade de operações ao escolher a estrutura'
              ],
              dicas: [
                'Arrays são bons para acesso por índice; Maps são bons para busca por chave',
                'Sets são ideais quando você precisa de elementos únicos'
              ],
              links: [{ titulo: 'MDN — Estruturas de dados em JS', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures' }],
              projetosRelacionados: ['Implementar uma pilha de histórico de navegação (como o botão Voltar do browser)']
            },
            exercicios: {
              fixacao: [{ id: 'ed-f1', enunciado: 'Qual é a diferença entre Pilha e Fila? Dê um exemplo do mundo real para cada.', tipo: 'dissertativo', gabarito: 'Pilha (LIFO): pilha de pratos. Fila (FIFO): fila de banco.' }],
              intermediario: [{ id: 'ed-i1', enunciado: 'Implemente uma fila usando dois arrays (sem usar shift()).', tipo: 'codigo', linguagem: 'javascript', templateInicial: 'class Fila {\n  enqueue(item) { }\n  dequeue() { }\n}', dica: 'Use um array de entrada e outro de saída. Transfira quando a saída estiver vazia.' }],
              desafio: [{ id: 'ed-d1', enunciado: 'Implemente uma fila com complexidade O(1) para enqueue e dequeue usando uma lista duplamente encadeada.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: [
              'Conheço arrays, pilhas, filas e dicionários',
              'Sei quando usar cada estrutura',
              'Entendo o conceito de complexidade O(1) vs O(n)',
              'Implementei pelo menos uma estrutura do zero'
            ]
          },
          {
            id: 'pensamento-logico', title: 'pensamento lógico', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['lógica', 'raciocínio'],
            conteudo: {
              resumo: 'Pensamento lógico é a capacidade de analisar problemas de forma estruturada, identificar padrões e deduzir soluções. É a habilidade mais importante de um programador.',
              conceitos: [
                'Decomposição: dividir um problema grande em partes menores',
                'Reconhecimento de padrões: identificar similaridades para reusar soluções',
                'Abstração: ignorar detalhes irrelevantes e focar no essencial',
                'Algoritmos: criar sequências de passos reproduzíveis'
              ],
              explicacao: 'Antes de qualquer linguagem de programação, o programador precisa saber pensar. Isso significa quebrar um problema complexo em subproblemas menores, resolver cada um separadamente e combinar as soluções. Essa habilidade se desenvolve com prática constante em exercícios e desafios.',
              exemplos: [
                {
                  titulo: 'Decomposição de problema: "calcular média de uma turma"',
                  codigo: `// 1. Obter as notas de todos os alunos\n// 2. Somar todas as notas\n// 3. Dividir pelo número de alunos\n// 4. Retornar o resultado\n\nfunction mediaTurma(notas) {\n  const soma = notas.reduce((acc, n) => acc + n, 0);\n  return soma / notas.length;\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Tentar resolver tudo de uma vez sem decompor o problema',
                'Não testar com casos simples antes de casos complexos'
              ],
              dicas: [
                'Resolva o problema mais simples possível primeiro, depois generalize',
                'Plataformas como Beecrowd e LeetCode são excelentes para treinar'
              ],
              links: [{ titulo: 'Beecrowd — exercícios de lógica', url: 'https://www.beecrowd.com.br' }],
              projetosRelacionados: ['Resolver 10 problemas no Beecrowd na categoria Iniciante']
            },
            exercicios: {
              fixacao: [{ id: 'pl-f1', enunciado: 'Decomponha o problema "fazer login em um site" em pelo menos 5 subproblemas.', tipo: 'dissertativo', gabarito: '1. Exibir formulário, 2. Receber email e senha, 3. Validar campos, 4. Verificar no banco, 5. Criar sessão ou exibir erro.' }],
              intermediario: [{ id: 'pl-i1', enunciado: 'Escreva um algoritmo que verifica se uma string é um palíndromo (lê igual de frente e de trás).', tipo: 'codigo', linguagem: 'javascript', templateInicial: 'function ehPalindromo(str) {\n  // seu código\n}', dica: 'Compare o caractere na posição i com o da posição (length-1-i).' }],
              desafio: [{ id: 'pl-d1', enunciado: 'Dado um tabuleiro de Sudoku parcialmente preenchido, valide se ele está correto até agora (sem resolver, apenas validar).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: [
              'Consigo decompor problemas em partes menores',
              'Identifico padrões em problemas similares',
              'Resolvi exercícios básicos em plataformas de lógica',
              'Consigo explicar meu raciocínio antes de codificar'
            ]
          },
          {
            id: 'pratica-exercicios', title: 'praticar exercícios (Leetcode, Beecrowd)', estimatedMinutes: 120,
            difficulty: 'basico', tags: ['lógica', 'prática'],
            conteudo: {
              resumo: 'A prática constante em plataformas de desafios é indispensável para desenvolver raciocínio lógico, velocidade de resolução e familiaridade com padrões de algoritmos.',
              conceitos: [
                'LeetCode: plataforma internacional, foco em entrevistas técnicas',
                'Beecrowd: plataforma brasileira, ótima para iniciantes',
                'Hackerrank: cobre algoritmos, SQL, linguagens e mais',
                'Abordagem: entender o problema → casos de borda → solução simples → otimizar'
              ],
              explicacao: 'Não adianta só estudar teoria — você precisa praticar. O processo recomendado é: ler o enunciado com calma, listar exemplos (incluindo casos extremos), escrever uma solução funcional antes de otimizar, e só então pensar em performance. Tente resolver 3-5 problemas por semana.',
              exemplos: [
                {
                  titulo: 'Estratégia para problemas de arrays',
                  codigo: `// Padrão comum: dois ponteiros (Two Pointers)\nfunction somaDoisPonteiros(arr, alvo) {\n  let esq = 0, dir = arr.length - 1;\n  while (esq < dir) {\n    const soma = arr[esq] + arr[dir];\n    if (soma === alvo) return [esq, dir];\n    if (soma < alvo) esq++;\n    else dir--;\n  }\n  return [];\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Desistir rápido — tente pelo menos 30 minutos antes de ver a solução',
                'Ver a solução sem entender completamente e não reimplementar sozinho'
              ],
              dicas: [
                'Comece pelos problemas "Easy" do LeetCode ou "Iniciante" do Beecrowd',
                'Após ver uma solução, feche e reimplemente do zero no dia seguinte'
              ],
              links: [
                { titulo: 'LeetCode', url: 'https://leetcode.com' },
                { titulo: 'Beecrowd', url: 'https://www.beecrowd.com.br' }
              ],
              projetosRelacionados: ['Resolver 20 problemas Easy no LeetCode e documentar o aprendizado de cada um']
            },
            exercicios: {
              fixacao: [{ id: 'pex-f1', enunciado: 'Liste 3 padrões clássicos de algoritmos e explique quando cada um é útil.', tipo: 'dissertativo', gabarito: 'Dois ponteiros (arrays ordenados), janela deslizante (substrings/subarrays), hash map (busca O(1)).' }],
              intermediario: [{ id: 'pex-i1', enunciado: 'Resolva o Beecrowd 1001 (Extremamente Básico) e explique cada linha do código.', tipo: 'codigo', linguagem: 'javascript', templateInicial: '// Leia dois inteiros A e B e imprima a soma\n// (adapte para JavaScript usando readline)', dica: 'Em JS no Beecrowd, use process.stdin.' }],
              desafio: [{ id: 'pex-d1', enunciado: 'Resolva 5 problemas Easy do LeetCode em uma semana. Documente: tempo gasto, dificuldade real e o que aprendeu.', tipo: 'dissertativo' }]
            },
            checklist: [
              'Tenho conta no LeetCode ou Beecrowd',
              'Resolvi ao menos 5 problemas básicos',
              'Conheço os padrões: dois ponteiros, janela deslizante, hash map',
              'Consigo resolver um Easy do LeetCode em até 30 minutos'
            ]
          }
        ]
      }
    ]
  }
];
