const JR_FUNDAMENTOS = [
  {
    id: 'fundamentos', label: 'fundamentos comuns', color: '#4d9fff', icon: '🛠️',
    description: 'Habilidades transversais que todo dev usa, independente de ser front ou back.',
    estimatedHours: 20, prerequisitos: ['base'],
    modulos: [
      {
        id: 'versionamento', name: 'controle de versão', estimatedHours: 4,
        description: 'Git é a ferramenta mais usada no mercado. Dominar é obrigatório.',
        topicos: [
          {
            id: 'git-basico', title: 'Git: init, add, commit, status, log', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['git', 'versionamento'],
            conteudo: {
              resumo: 'Git é um sistema de controle de versão que registra o histórico de mudanças no código. Com ele você nunca perde trabalho e pode colaborar com outros devs.',
              conceitos: [
                'git init: cria um repositório Git na pasta atual',
                'git add: adiciona arquivos à área de staging',
                'git commit: salva um snapshot do estado atual com uma mensagem',
                'git status: mostra o estado atual do repositório',
                'git log: exibe o histórico de commits'
              ],
              explicacao: 'O fluxo básico do Git é: modificar arquivos → git add (preparar) → git commit (salvar). Cada commit é um ponto no tempo para o qual você pode voltar. A mensagem do commit deve descrever O QUE mudou e POR QUÊ, não como.',
              exemplos: [
                {
                  titulo: 'Fluxo básico do Git',
                  codigo: `# Iniciar repositório\ngit init\n\n# Ver estado atual\ngit status\n\n# Adicionar arquivo específico\ngit add index.html\n\n# Adicionar tudo\ngit add .\n\n# Commitar com mensagem\ngit commit -m "feat: adiciona página inicial"\n\n# Ver histórico\ngit log --oneline`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Fazer git add . sem verificar quais arquivos estão sendo incluídos',
                'Escrever mensagens de commit vagas como "ajustes" ou "fix"'
              ],
              dicas: [
                'Use mensagens no formato: "tipo: descrição curta" (feat, fix, docs, refactor)',
                'Commite com frequência — pequenos commits são mais fáceis de reverter'
              ],
              links: [{ titulo: 'Pro Git Book (grátis)', url: 'https://git-scm.com/book/pt-br/v2' }],
              projetosRelacionados: ['Versionar qualquer projeto pessoal usando Git desde o início']
            },
            exercicios: {
              fixacao: [{ id: 'git-f1', enunciado: 'Qual a diferença entre "git add" e "git commit"?', tipo: 'dissertativo', gabarito: 'git add prepara as mudanças (staging), git commit as salva permanentemente no histórico.' }],
              intermediario: [{ id: 'git-i1', enunciado: 'Crie uma pasta, inicialize um repositório Git, crie 3 arquivos em commits separados e visualize o log.', tipo: 'dissertativo', dica: 'Use git log --oneline ao final para ver os 3 commits.' }],
              desafio: [{ id: 'git-d1', enunciado: 'Usando git rebase interativo, combine 3 commits em um só (squash). Documente o processo.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei inicializar um repositório', 'Uso add, commit e status com fluência', 'Escrevo mensagens de commit descritivas', 'Consigo ler o git log']
          },
          {
            id: 'github-gitlab', title: 'GitHub / GitLab', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['git', 'github', 'colaboração'],
            conteudo: {
              resumo: 'GitHub e GitLab são plataformas de hospedagem de repositórios Git com ferramentas para colaboração, code review e CI/CD. GitHub é o mais popular para open source; GitLab é forte em empresas.',
              conceitos: [
                'Repositório remoto: cópia do projeto na nuvem',
                'git push: envia commits locais para o remoto',
                'git pull: busca e integra mudanças do remoto',
                'git clone: baixa um repositório existente',
                'Fork: cópia de um repositório para sua conta'
              ],
              explicacao: 'O fluxo com GitHub é: criar repositório remoto → conectar com git remote add origin → git push para enviar. Em equipes, cada dev trabalha em uma branch separada e abre um Pull Request para integrar ao main.',
              exemplos: [
                {
                  titulo: 'Conectar projeto local ao GitHub',
                  codigo: `# Adicionar remote\ngit remote add origin https://github.com/usuario/repo.git\n\n# Enviar pela primeira vez\ngit push -u origin main\n\n# Nas próximas vezes\ngit push\n\n# Baixar mudanças de outros\ngit pull`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Commitar senhas, chaves de API ou arquivos .env no repositório',
                'Fazer push direto no main sem abrir Pull Request em projetos em equipe'
              ],
              dicas: [
                'Sempre crie um .gitignore antes do primeiro commit para excluir node_modules, .env etc.',
                'Use SSH em vez de HTTPS para evitar digitar senha toda hora'
              ],
              links: [{ titulo: 'GitHub Docs', url: 'https://docs.github.com/pt' }],
              projetosRelacionados: ['Publicar um projeto pessoal no GitHub com README bem documentado']
            },
            exercicios: {
              fixacao: [{ id: 'gh-f1', enunciado: 'Qual a diferença entre git push e git pull?', tipo: 'dissertativo', gabarito: 'push envia commits locais para o remoto. pull busca commits do remoto e integra localmente.' }],
              intermediario: [{ id: 'gh-i1', enunciado: 'Crie um repositório no GitHub, conecte seu projeto local e faça push de 3 commits.', tipo: 'dissertativo' }],
              desafio: [{ id: 'gh-d1', enunciado: 'Configure SSH no GitHub e explique a diferença de segurança entre SSH e HTTPS.', tipo: 'dissertativo' }]
            },
            checklist: ['Tenho conta no GitHub', 'Sei fazer push/pull', 'Sei clonar repositórios', 'Tenho pelo menos 1 projeto público no GitHub']
          },
          {
            id: 'git-branches', title: 'branches, merge, pull, push', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['git', 'branches'],
            conteudo: {
              resumo: 'Branches permitem desenvolver funcionalidades isoladamente sem afetar o código principal. É o coração do fluxo de trabalho em equipe.',
              conceitos: [
                'Branch: linha paralela de desenvolvimento',
                'git branch nome: cria uma nova branch',
                'git checkout / git switch: troca de branch',
                'git merge: une duas branches',
                'Conflito de merge: quando duas branches alteram a mesma linha'
              ],
              explicacao: 'O fluxo padrão de mercado (GitHub Flow): criar uma branch a partir do main, desenvolver a feature, abrir Pull Request, fazer code review, mergear ao main e deletar a branch. Nunca commite diretamente no main em projetos em equipe.',
              exemplos: [
                {
                  titulo: 'Criar, trabalhar e mergear uma branch',
                  codigo: `# Criar e entrar na branch\ngit checkout -b feature/login\n\n# Trabalhar normalmente (add, commit)\ngit add .\ngit commit -m "feat: implementa tela de login"\n\n# Enviar branch para o remoto\ngit push origin feature/login\n\n# Voltar ao main e mergear\ngit checkout main\ngit merge feature/login\n\n# Deletar branch\ngit branch -d feature/login`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Trabalhar semanas numa branch sem sincronizar com o main (muitos conflitos)',
                'Não deletar branches antigas (o repositório fica bagunçado)'
              ],
              dicas: [
                'Mantenha branches pequenas e focadas em uma única funcionalidade',
                'Faça git pull origin main frequentemente para manter sua branch atualizada'
              ],
              links: [{ titulo: 'Atlassian — Git Branching', url: 'https://www.atlassian.com/br/git/tutorials/using-branches' }],
              projetosRelacionados: ['Simular trabalho em equipe: criar 2 branches, gerar conflito intencional e resolver']
            },
            exercicios: {
              fixacao: [{ id: 'br-f1', enunciado: 'Por que usar branches em vez de commitar direto no main?', tipo: 'dissertativo', gabarito: 'Isola o desenvolvimento, evita quebrar o código estável e permite code review antes de integrar.' }],
              intermediario: [{ id: 'br-i1', enunciado: 'Crie duas branches, faça commits em ambas alterando a mesma linha e resolva o conflito de merge.', tipo: 'dissertativo' }],
              desafio: [{ id: 'br-d1', enunciado: 'Configure um repositório com proteção de branch no GitHub (só aceita merge via PR com aprovação).', tipo: 'dissertativo' }]
            },
            checklist: ['Sei criar e trocar de branches', 'Sei mergear branches', 'Já resolvi um conflito de merge', 'Entendo o GitHub Flow']
          },
          {
            id: 'pull-requests', title: 'pull requests e code review', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['git', 'colaboração', 'code review'],
            conteudo: {
              resumo: 'Pull Request (PR) é uma proposta de mudança de código que passa por revisão antes de ser integrada. É a principal ferramenta de colaboração e garantia de qualidade em times.',
              conceitos: [
                'PR: solicitação para integrar uma branch ao main',
                'Reviewer: pessoa que revisa o código',
                'Aprovação: o revisor confirma que o código está OK',
                'Comentário: feedback específico em uma linha de código',
                'Merge: integração final após aprovação'
              ],
              explicacao: 'Um bom PR tem: título claro, descrição do que foi feito e por quê, prints se houver mudanças visuais, e tamanho razoável (não tente resolver o mundo inteiro num PR). Como revisor: comente com perguntas, não ordens; sugira melhorias com contexto.',
              exemplos: [
                {
                  titulo: 'Estrutura de uma boa descrição de PR',
                  codigo: `## O que este PR faz?\nImplementa a tela de login com validação de formulário.\n\n## Por que?\nNecessário para o fluxo de autenticação do projeto.\n\n## Como testar?\n1. Acesse /login\n2. Tente submeter com campos vazios (deve mostrar erro)\n3. Preencha corretamente e verifique redirecionamento\n\n## Screenshots\n[imagem da tela aqui]`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'PRs gigantes com centenas de arquivos alterados (ninguém revisa com qualidade)',
                'Mergear sem revisão em projetos em equipe'
              ],
              dicas: [
                'PRs pequenos e focados são revisados mais rapidamente e com mais qualidade',
                'Use a opção "Draft PR" quando ainda não terminou mas quer feedback antecipado'
              ],
              links: [{ titulo: 'GitHub — Sobre Pull Requests', url: 'https://docs.github.com/pt/pull-requests' }],
              projetosRelacionados: ['Abrir um PR num projeto open source pequeno (mesmo que seja correção de typo na documentação)']
            },
            exercicios: {
              fixacao: [{ id: 'pr-f1', enunciado: 'Qual a diferença entre um Pull Request e um git merge?', tipo: 'dissertativo', gabarito: 'git merge é local e imediato. PR é um processo colaborativo com revisão, discussão e aprovação antes do merge.' }],
              intermediario: [{ id: 'pr-i1', enunciado: 'Crie um PR no GitHub com uma feature nova. Escreva uma descrição completa incluindo como testar.', tipo: 'dissertativo' }],
              desafio: [{ id: 'pr-d1', enunciado: 'Contribua com um repositório open source: abra uma issue, fork o projeto, faça uma melhoria e abra um PR.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei abrir um PR no GitHub', 'Escrevo descrições claras de PR', 'Já recebi ou fiz um code review', 'Entendo o processo de aprovação e merge']
          }
        ]
      },
      {
        id: 'conceitos-dev', name: 'conceitos de desenvolvimento', estimatedHours: 2,
        description: 'Como programas funcionam de fato por baixo dos panos.',
        topicos: [
          {
            id: 'como-programas-funcionam', title: 'como programas funcionam', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['fundamentos', 'computação'],
            conteudo: {
              resumo: 'Um programa é código-fonte que é transformado em instruções que o processador consegue executar. Entender esse processo ajuda a diagnosticar erros e escrever código mais eficiente.',
              conceitos: [
                'Código-fonte: texto escrito pelo programador',
                'Compilação: transformação completa do código em binário antes de executar',
                'Interpretação: leitura e execução linha a linha em tempo real',
                'Runtime: ambiente onde o programa é executado (Node.js, browser, JVM)',
                'Memória: onde variáveis e dados ficam durante a execução'
              ],
              explicacao: 'JavaScript é interpretado (mais precisamente, JIT compilado) e executado no browser ou no Node.js. Java é compilado para bytecode e interpretado pela JVM. C é compilado direto para binário. Saber isso explica por que um erro de sintaxe em Python só aparece quando aquela linha é executada.',
              exemplos: [
                {
                  titulo: 'Pipeline simplificado de um programa JS',
                  codigo: `// 1. Você escreve código fonte\nconst soma = (a, b) => a + b;\n\n// 2. O engine V8 (Chrome/Node) faz o parse (AST)\n// 3. JIT compila para código de máquina\n// 4. O processador executa\n// 5. O resultado aparece\nconsole.log(soma(2, 3)); // 5`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Confundir erros de compilação com erros de runtime',
                'Não entender por que "undefined" aparece — variável declarada mas não inicializada'
              ],
              dicas: [
                'Erros de sintaxe são detectados antes de executar; erros lógicos só aparecem em runtime',
                'console.log() é seu melhor amigo para entender o que está acontecendo'
              ],
              links: [{ titulo: 'V8 — Como o JavaScript é executado', url: 'https://v8.dev/blog/ignition-interpreter' }],
              projetosRelacionados: ['Comparar o mesmo algoritmo implementado em linguagem compilada e interpretada']
            },
            exercicios: {
              fixacao: [{ id: 'cpf-f1', enunciado: 'Qual a diferença entre linguagem compilada e interpretada? Dê 1 exemplo de cada.', tipo: 'dissertativo', gabarito: 'Compilada: C, Go (geram binário antes de executar). Interpretada: Python, JS (executam linha a linha).' }],
              intermediario: [{ id: 'cpf-i1', enunciado: 'O que acontece quando você abre um site? Descreva o processo desde digitar a URL até ver a página.', tipo: 'dissertativo', dica: 'Pense em DNS, HTTP, HTML, CSS, JS...' }],
              desafio: [{ id: 'cpf-d1', enunciado: 'Pesquise o que é "Just-in-Time Compilation" (JIT) e explique como o V8 usa isso para tornar JavaScript rápido.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo a diferença entre compilado e interpretado', 'Sei o que é runtime', 'Entendo o ciclo de vida básico de um programa']
          },
          {
            id: 'compilacao-vs-interpretacao', title: 'compilação vs interpretação', estimatedMinutes: 25,
            difficulty: 'basico', tags: ['fundamentos', 'linguagens'],
            conteudo: {
              resumo: 'Compilação converte todo o código em executável antes de rodar. Interpretação executa o código diretamente, linha por linha. Cada abordagem tem vantagens de performance e portabilidade.',
              conceitos: [
                'Compilador: analisa o código inteiro e gera um executável',
                'Interpretador: lê e executa uma instrução por vez',
                'Bytecode: formato intermediário (Java, Python)',
                'JIT (Just-in-Time): compila trechos quentes em tempo de execução'
              ],
              explicacao: 'C/C++ compilam para binário específico do sistema operacional — extremamente rápido, mas não portável. Java compila para bytecode que roda na JVM em qualquer OS. JavaScript é interpretado (com JIT no V8). Python é interpretado linha a linha, por isso mais lento que Java para tarefas CPU-intensivas.',
              exemplos: [
                {
                  titulo: 'Comparação por linguagem',
                  codigo: `// JavaScript (interpretado + JIT)\nconsole.log("Olá"); // executado agora\n\n// Java (compilado para bytecode)\n// javac Hello.java → Hello.class → java Hello\n\n// C (compilado para binário)\n// gcc hello.c -o hello → ./hello`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Achar que "compilado é sempre mais rápido que interpretado" — o JIT eliminou muito dessa diferença',
                'Confundir "tipagem estática" com "compilado" — são conceitos diferentes'
              ],
              dicas: [
                'Para o mercado web, JavaScript interpretado é mais que suficiente',
                'Linguagens compiladas são preferidas em sistemas de baixo nível e jogos'
              ],
              links: [{ titulo: 'MDN — Sobre JavaScript', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/About_JavaScript' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'cvi-f1', enunciado: 'Por que programas compilados geralmente são mais rápidos que interpretados?', tipo: 'dissertativo', gabarito: 'Porque já estão traduzidos para código de máquina e não precisam de tradução em tempo de execução.' }],
              intermediario: [{ id: 'cvi-i1', enunciado: 'Pesquise o que TypeScript é em relação a compilado/interpretado e explique.', tipo: 'dissertativo', dica: 'TypeScript transpila para JavaScript.' }],
              desafio: [{ id: 'cvi-d1', enunciado: 'Implemente o mesmo algoritmo de ordenação em C e JavaScript. Compare a diferença conceitual (não precisa medir performance).', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo compilação vs interpretação', 'Sei classificar as linguagens que conheço', 'Entendo o que é JIT']
          },
          {
            id: 'debug', title: 'depuração (debug)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['debug', 'ferramentas'],
            conteudo: {
              resumo: 'Debug é o processo de encontrar e corrigir erros (bugs) em um programa. É uma das habilidades mais práticas e usadas no dia a dia do desenvolvedor.',
              conceitos: [
                'Breakpoint: ponto de parada para inspecionar o estado do programa',
                'Step over / step into: avançar linha a linha no debugger',
                'Watch: monitorar o valor de uma variável em tempo real',
                'Stack trace: sequência de chamadas de função que levou ao erro',
                'console.log: forma mais simples de debug (mas não a única)'
              ],
              explicacao: 'O processo de debug eficiente é: 1) reproduzir o bug de forma confiável, 2) isolar onde ele ocorre, 3) entender por que ocorre, 4) corrigir, 5) verificar que não quebrou mais nada. Usar o DevTools do browser ou o debugger do VS Code é muito mais eficiente do que console.log para erros complexos.',
              exemplos: [
                {
                  titulo: 'Debug com breakpoint no VS Code',
                  codigo: `// 1. Coloque um breakpoint clicando na margem esquerda\n// 2. Rode com F5 (ou botão de debug)\n// 3. O programa para na linha com breakpoint\n// 4. Inspecione variáveis no painel lateral\n// 5. Use F10 (step over) para avançar linha a linha\n\nfunction calcularDesconto(preco, pct) {\n  const desconto = preco * (pct / 100); // breakpoint aqui\n  return preco - desconto;\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Adicionar dezenas de console.log sem estratégia — fica difícil de rastrear',
                'Não ler o stack trace — ele já diz exatamente onde o erro está'
              ],
              dicas: [
                'Leia a mensagem de erro COMPLETA antes de sair alterando o código',
                'Divida para conquistar: comente metade do código para isolar onde o bug está'
              ],
              links: [{ titulo: 'Chrome DevTools — Debugging', url: 'https://developer.chrome.com/docs/devtools/javascript' }],
              projetosRelacionados: ['Usar o debugger do VS Code para resolver um bug intencional num projeto seu']
            },
            exercicios: {
              fixacao: [{ id: 'dbg-f1', enunciado: 'O que é um stack trace e como ele ajuda a encontrar um bug?', tipo: 'dissertativo', gabarito: 'É a sequência de funções que foram chamadas até o erro. Mostra exatamente a linha onde o erro ocorreu e como chegou lá.' }],
              intermediario: [{ id: 'dbg-i1', enunciado: 'Introduza um bug intencional em um projeto seu e use o DevTools para encontrá-lo sem usar console.log.', tipo: 'dissertativo' }],
              desafio: [{ id: 'dbg-d1', enunciado: 'Configure o VS Code para debugar um projeto Node.js com breakpoints e watch de variáveis.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei ler um stack trace', 'Usei breakpoints no DevTools ou VS Code', 'Consigo debugar sem depender só de console.log']
          }
        ]
      },
      {
        id: 'boas-praticas', name: 'boas práticas', estimatedHours: 3,
        description: 'Código que outras pessoas (e você no futuro) conseguem entender e manter.',
        topicos: [
          {
            id: 'codigo-limpo', title: 'código limpo', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['qualidade', 'clean code'],
            conteudo: {
              resumo: 'Código limpo é aquele que qualquer programador consegue ler, entender e modificar sem dificuldade. É tão importante quanto código que funciona.',
              conceitos: [
                'Funções pequenas: fazem uma coisa só e fazem bem',
                'Nomes significativos: variáveis e funções explicam sua intenção',
                'DRY (Don\'t Repeat Yourself): não repita lógica',
                'KISS (Keep It Simple, Stupid): preferir soluções simples',
                'Comentários apenas quando o porquê não é óbvio'
              ],
              explicacao: 'O código é lido muito mais vezes do que escrito. Investir em legibilidade economiza tempo de toda a equipe. Refatorar para limpar código existente é tão valioso quanto adicionar features. O livro "Clean Code" de Robert C. Martin é referência fundamental.',
              exemplos: [
                {
                  titulo: 'Código sujo vs código limpo',
                  codigo: `// ❌ Código sujo\nfunction f(u, p) {\n  if (u.length > 3 && p.length > 5) return true;\n  return false;\n}\n\n// ✅ Código limpo\nfunction credenciaisValidas(usuario, senha) {\n  const usuarioValido = usuario.length > 3;\n  const senhaValida   = senha.length > 5;\n  return usuarioValido && senhaValida;\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar nomes de variáveis como a, b, x, temp em código de produção',
                'Funções com 100+ linhas fazendo muitas coisas'
              ],
              dicas: [
                'Se você precisa de um comentário para explicar o que o código faz, renomeie a variável',
                'Regra do escoteiro: deixe o código sempre mais limpo do que encontrou'
              ],
              links: [{ titulo: 'Resumo Clean Code', url: 'https://github.com/ryanmcdermott/clean-code-javascript' }],
              projetosRelacionados: ['Refatorar um projeto antigo aplicando os princípios de código limpo']
            },
            exercicios: {
              fixacao: [{ id: 'cc-f1', enunciado: 'Refatore este código: function c(x){return x*x+2*x+1;}', tipo: 'codigo', linguagem: 'javascript', gabarito: 'function calcularPolinomio(x) { return x*x + 2*x + 1; }' }],
              intermediario: [{ id: 'cc-i1', enunciado: 'Identifique e corrija 5 problemas de código limpo em um projeto seu mais antigo.', tipo: 'dissertativo' }],
              desafio: [{ id: 'cc-d1', enunciado: 'Leia o primeiro capítulo de Clean Code (Robert Martin) e liste 3 práticas que vai adotar imediatamente.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso nomes descritivos para variáveis e funções', 'Minhas funções fazem uma coisa só', 'Não repito lógica (DRY)', 'Refatorei algum código antigo']
          },
          {
            id: 'nomenclatura', title: 'nomenclatura e organização', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['qualidade', 'padrões'],
            conteudo: {
              resumo: 'Nomear bem variáveis, funções e arquivos é uma das habilidades mais subestimadas e mais impactantes na qualidade do código.',
              conceitos: [
                'camelCase: para variáveis e funções em JavaScript (minhaVariavel)',
                'PascalCase: para classes e componentes (MeuComponente)',
                'SCREAMING_SNAKE_CASE: para constantes (MAX_TENTATIVAS)',
                'kebab-case: para arquivos e URLs (meu-arquivo.js)',
                'Nomes de funções devem ser verbos (calcular, buscar, validar)'
              ],
              explicacao: 'Um bom nome elimina a necessidade de comentário. Em vez de comentar o que uma função faz, nomeie ela de forma que seja auto-explicativa. Arquivo bem organizado em pastas lógicas facilita onboarding de novos devs e manutenção.',
              exemplos: [
                {
                  titulo: 'Padrões de nomenclatura JavaScript',
                  codigo: `// Variáveis e funções: camelCase\nconst totalPedidos = 5;\nfunction calcularPrecoFinal(preco, desconto) { }\n\n// Classes: PascalCase\nclass ProdutoService { }\n\n// Constantes: SCREAMING_SNAKE_CASE\nconst MAX_TENTATIVAS_LOGIN = 3;\n\n// Arquivos\n// produto-service.js (kebab-case)\n// ProdutoCard.jsx (PascalCase para componentes)`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Misturar idiomas no mesmo projeto (mixar português e inglês)',
                'Abreviações desnecessárias: usr em vez de usuario, btn em vez de botao'
              ],
              dicas: [
                'Defina com a equipe: português ou inglês? Seja consistente',
                'Leia seu código em voz alta — se soar estranho, o nome é ruim'
              ],
              links: [{ titulo: 'Guia de estilo Google JavaScript', url: 'https://google.github.io/styleguide/jsguide.html' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'nom-f1', enunciado: 'Converta para os padrões corretos: var x = 10; var USER_name = "joão"; function DoSomething() {}', tipo: 'dissertativo', gabarito: 'const quantidade = 10; const nomeUsuario = "joão"; function fazerAlgo() {}' }],
              intermediario: [{ id: 'nom-i1', enunciado: 'Revise um projeto seu e liste 10 nomes que poderiam ser melhores. Proponha o nome correto para cada.', tipo: 'dissertativo' }],
              desafio: [{ id: 'nom-d1', enunciado: 'Configure o ESLint no seu projeto com regras de nomenclatura e corrija todos os erros apontados.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso camelCase para variáveis/funções', 'Uso PascalCase para classes', 'Meus nomes são descritivos', 'Sou consistente no idioma']
          },
          {
            id: 'legibilidade', title: 'legibilidade', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['qualidade', 'clean code'],
            conteudo: {
              resumo: 'Código legível é aquele que transmite intenção claramente. Formatação consistente, espaçamento e estrutura fazem diferença enorme na leitura.',
              conceitos: [
                'Indentação: 2 ou 4 espaços (defina e seja consistente)',
                'Linha máxima: geralmente 80-120 caracteres',
                'Espaço entre blocos lógicos de código',
                'Early return: retornar cedo para evitar if aninhados',
                'Prettier/ESLint: formatação automática'
              ],
              explicacao: 'Use um formatador automático (Prettier) para garantir estilo consistente sem discussões. Early return elimina a "pirâmide da morte" (if aninhados profundos). Separe código em blocos lógicos com linhas em branco para facilitar a leitura visual.',
              exemplos: [
                {
                  titulo: 'Early return vs if aninhado',
                  codigo: `// ❌ Pirâmide da morte\nfunction processar(usuario) {\n  if (usuario) {\n    if (usuario.ativo) {\n      if (usuario.temPermissao) {\n        return executar();\n      }\n    }\n  }\n}\n\n// ✅ Early return\nfunction processar(usuario) {\n  if (!usuario)            return;\n  if (!usuario.ativo)      return;\n  if (!usuario.temPermissao) return;\n  return executar();\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Mixing tabs e spaces no mesmo arquivo',
                'Linha com 200+ caracteres que exige scroll horizontal para ler'
              ],
              dicas: [
                'Configure o Prettier no VS Code para formatar ao salvar (Format On Save)',
                'Se precisar de mais de 3 níveis de if, provavelmente há uma forma melhor'
              ],
              links: [{ titulo: 'Prettier — formatador de código', url: 'https://prettier.io' }],
              projetosRelacionados: ['Instalar e configurar Prettier + ESLint em um projeto existente']
            },
            exercicios: {
              fixacao: [{ id: 'leg-f1', enunciado: 'O que é "early return" e como ele melhora a legibilidade?', tipo: 'dissertativo', gabarito: 'Retornar cedo quando uma condição não é atendida, evitando ifs aninhados e deixando o fluxo principal mais claro.' }],
              intermediario: [{ id: 'leg-i1', enunciado: 'Instale o Prettier no VS Code e configure para formatar ao salvar. Aplique em um projeto.', tipo: 'dissertativo' }],
              desafio: [{ id: 'leg-d1', enunciado: 'Refatore uma função com mais de 3 níveis de if aninhado usando early return e extraindo subfunções.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Uso indentação consistente', 'Aplico early return nas minhas funções', 'Tenho Prettier configurado', 'Meu código é fácil de ler']
          },
          {
            id: 'documentacao', title: 'documentação básica', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['qualidade', 'documentação'],
            conteudo: {
              resumo: 'Documentação básica inclui README, comentários em código complexo e JSDoc. Boa documentação é o que separa um projeto profissional de um script pessoal.',
              conceitos: [
                'README.md: apresentação do projeto (o que é, como instalar, como usar)',
                'Comentário inline: explica o POR QUÊ, não o O QUÊ',
                'JSDoc: documenta funções com tipos e exemplos',
                'Changelog: histórico de versões e mudanças',
                'API docs: documenta endpoints e parâmetros'
              ],
              explicacao: 'Um README bem feito no GitHub é seu cartão de visita. Deve incluir: o que o projeto faz, como instalar, como rodar, como contribuir e licença. Comentários no código devem ser raros — se você precisa comentar muito, o código provavelmente pode ser melhorado.',
              exemplos: [
                {
                  titulo: 'Estrutura de um README básico',
                  codigo: `# Nome do Projeto\n\nDescrição em 1-2 frases.\n\n## Instalação\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Como usar\n[exemplos de uso]\n\n## Tecnologias\n- React\n- Node.js\n\n## Licença\nMIT`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'README vazio ou só com o nome do projeto',
                'Comentar o óbvio: // incrementa i → i++ '
              ],
              dicas: [
                'Escreva o README como se fosse para alguém que nunca viu o projeto',
                'Badges do GitHub (build passing, coverage) tornam o projeto mais profissional'
              ],
              links: [{ titulo: 'Awesome README — exemplos', url: 'https://github.com/matiassingers/awesome-readme' }],
              projetosRelacionados: ['Escrever um README completo para um projeto existente seu']
            },
            exercicios: {
              fixacao: [{ id: 'doc-f1', enunciado: 'O que deve conter um README bem escrito? Liste pelo menos 5 seções.', tipo: 'dissertativo', gabarito: 'Nome/descrição, instalação, uso, tecnologias, contribuição, licença.' }],
              intermediario: [{ id: 'doc-i1', enunciado: 'Escreva um README completo para um projeto que você já tem no GitHub.', tipo: 'dissertativo' }],
              desafio: [{ id: 'doc-d1', enunciado: 'Adicione JSDoc a todas as funções de um arquivo JS e configure o VS Code para exibir os tipos ao passar o mouse.', tipo: 'dissertativo' }]
            },
            checklist: ['Todos meus projetos têm README', 'Sei quando comentar e quando não comentar', 'Já documentei uma função com JSDoc']
          }
        ]
      },
      {
        id: 'ferramentas', name: 'ferramentas comuns', estimatedHours: 4,
        description: 'O arsenal básico de todo desenvolvedor moderno.',
        topicos: [
          {
            id: 'vscode', title: 'VS Code (atalhos e extensões)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['ferramentas', 'editor'],
            conteudo: {
              resumo: 'VS Code é o editor de código mais usado no mundo. Dominar seus atalhos e extensões pode dobrar sua produtividade.',
              conceitos: [
                'Ctrl+P: abrir arquivo rapidamente',
                'Ctrl+Shift+P: paleta de comandos (tudo está aqui)',
                'Alt+Click: múltiplos cursores simultâneos',
                'Ctrl+D: selecionar próxima ocorrência da seleção',
                'Ctrl+`: abrir terminal integrado'
              ],
              explicacao: 'Extensões essenciais: Prettier (formatação), ESLint (linting), GitLens (git avançado), Live Server (hot reload), Error Lens (erros inline), Auto Rename Tag (HTML). Configure o Format On Save para garantir código formatado sempre.',
              exemplos: [
                {
                  titulo: 'Atalhos mais importantes',
                  codigo: `Ctrl+P          → Abrir arquivo\nCtrl+Shift+P    → Paleta de comandos\nCtrl+/          → Comentar/descomentar linha\nAlt+Up/Down     → Mover linha\nCtrl+D          → Selecionar próxima ocorrência\nCtrl+Shift+L    → Selecionar todas as ocorrências\nF12             → Ir para definição\nCtrl+Shift+F    → Buscar em todos os arquivos\nCtrl+\`          → Terminal integrado`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Não usar extensões — o VS Code vanilla é limitado',
                'Usar o mouse para tudo quando atalhos seriam muito mais rápidos'
              ],
              dicas: [
                'Aprenda 1 atalho novo por semana — em 2 meses você vai dominar os principais',
                'Sincronize suas configurações com o GitHub para não perder ao trocar de máquina'
              ],
              links: [{ titulo: 'VS Code Tips and Tricks', url: 'https://code.visualstudio.com/docs/getstarted/tips-and-tricks' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vsc-f1', enunciado: 'Liste 5 atalhos do VS Code que você usa (ou deveria usar) todo dia.', tipo: 'dissertativo' }],
              intermediario: [{ id: 'vsc-i1', enunciado: 'Instale e configure: Prettier, ESLint, GitLens e Live Server. Documente como cada um te ajuda.', tipo: 'dissertativo' }],
              desafio: [{ id: 'vsc-d1', enunciado: 'Crie um snippet personalizado no VS Code para um padrão que você digita com frequência.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso Ctrl+P e Ctrl+Shift+P com fluência', 'Tenho Prettier e ESLint instalados', 'Uso o terminal integrado', 'Conheço pelo menos 10 atalhos']
          },
          {
            id: 'linha-de-comando', title: 'linha de comando (bash/terminal)', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['ferramentas', 'terminal'],
            conteudo: {
              resumo: 'O terminal é a interface mais poderosa para um desenvolvedor. Saber usá-lo bem é indispensável para trabalhar com Git, npm, servidores e automação.',
              conceitos: [
                'ls / dir: listar arquivos na pasta',
                'cd: navegar entre pastas',
                'mkdir: criar pasta',
                'touch / type nul: criar arquivo',
                'cat: exibir conteúdo de arquivo',
                'pwd: mostrar caminho atual'
              ],
              explicacao: 'O terminal te dá acesso direto ao sistema operacional. Você vai usar para: instalar dependências (npm install), rodar scripts (npm run dev), navegar por pastas, criar arquivos, configurar servidores e muito mais. No Windows, use o PowerShell, Git Bash ou WSL.',
              exemplos: [
                {
                  titulo: 'Comandos mais usados no dia a dia',
                  codigo: `# Navegar\ncd projetos/meu-projeto\ncd ..            # voltar um nível\n\n# Criar estrutura\nmkdir src\nmkdir src/components\ntouch src/index.js\n\n# Ver conteúdo\nls -la           # listar com detalhes\ncat package.json # ver arquivo\n\n# npm\nnpm install\nnpm run dev\nnpm install express --save`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Ter medo do terminal — é só uma interface de texto, você não vai "quebrar nada"',
                'Não usar Tab para autocompletar (economiza muito tempo)'
              ],
              dicas: [
                'Tab autocompleta caminhos e comandos — use sempre',
                'Ctrl+C cancela o comando atual (útil quando travar um processo)'
              ],
              links: [{ titulo: 'Command Line Crash Course', url: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line' }],
              projetosRelacionados: ['Criar a estrutura de um projeto inteiro usando apenas o terminal, sem interface gráfica']
            },
            exercicios: {
              fixacao: [{ id: 'cli-f1', enunciado: 'Qual o comando para criar uma pasta chamada "componentes" dentro de "src"?', tipo: 'dissertativo', gabarito: 'mkdir src/componentes (ou cd src && mkdir componentes)' }],
              intermediario: [{ id: 'cli-i1', enunciado: 'Usando apenas o terminal, crie a estrutura de pastas: projeto/src/components, projeto/src/pages, projeto/public, projeto/tests.', tipo: 'dissertativo' }],
              desafio: [{ id: 'cli-d1', enunciado: 'Escreva um script bash/bat que cria a estrutura completa de um projeto Node.js do zero.', tipo: 'codigo', linguagem: 'bash' }]
            },
            checklist: ['Navego entre pastas com cd', 'Crio arquivos e pastas pelo terminal', 'Uso Tab para autocompletar', 'Rodo npm/git pelo terminal sem dificuldade']
          },
          {
            id: 'devtools', title: 'DevTools (navegador)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['ferramentas', 'debug', 'frontend'],
            conteudo: {
              resumo: 'O DevTools do browser é a ferramenta de debug mais usada por devs frontend. Com ele você inspeciona HTML, CSS, erros JavaScript, requisições HTTP e performance.',
              conceitos: [
                'Elements: inspecionar e editar HTML/CSS ao vivo',
                'Console: executar JS, ver erros e logs',
                'Network: monitorar todas as requisições HTTP',
                'Sources: debugar JavaScript com breakpoints',
                'Application: inspecionar localStorage, cookies, Service Workers'
              ],
              explicacao: 'Abra com F12 ou Ctrl+Shift+I. No painel Network você vê cada requisição, seu status code, headers e response body — essencial para debugar APIs. No Application você pode ver e editar o localStorage diretamente. O Console permite executar qualquer JS na página.',
              exemplos: [
                {
                  titulo: 'Inspecionar uma requisição no Network',
                  codigo: `// 1. Abra DevTools → aba Network\n// 2. Recarregue a página\n// 3. Clique em qualquer requisição\n// 4. Veja:\n//    - Headers: o que foi enviado\n//    - Response: o que voltou\n//    - Status: 200 OK, 404 Not Found etc.\n\n// Você pode até filtrar por tipo: Fetch/XHR para ver só as APIs`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Não usar o Network para verificar se a API realmente foi chamada com os parâmetros certos',
                'Esquecer de limpar o localStorage no Application quando testando'
              ],
              dicas: [
                'Ctrl+Shift+M ativa o modo responsivo para testar em diferentes tamanhos de tela',
                'No Console, $0 referencia o último elemento selecionado no Elements'
              ],
              links: [{ titulo: 'Chrome DevTools Docs', url: 'https://developer.chrome.com/docs/devtools' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'dt-f1', enunciado: 'Quais são as 4 abas principais do DevTools e para que serve cada uma?', tipo: 'dissertativo', gabarito: 'Elements (HTML/CSS), Console (JS/erros), Network (requisições), Sources (debug JS).' }],
              intermediario: [{ id: 'dt-i1', enunciado: 'Abra o DevTools em qualquer site e intercepte uma requisição de API no painel Network. Descreva o que você viu (URL, método, status, resposta).', tipo: 'dissertativo' }],
              desafio: [{ id: 'dt-d1', enunciado: 'Use o painel Performance do DevTools para gravar e analisar o carregamento de um site. Identifique o que mais demora.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei abrir o DevTools', 'Uso o Console para debug', 'Inspecionei requisições no Network', 'Sei acessar o localStorage no Application']
          },
          {
            id: 'http-basico', title: 'HTTP básico', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['fundamentos', 'web', 'http'],
            conteudo: {
              resumo: 'HTTP é o protocolo de comunicação da web. Todo site, API e aplicação web usa HTTP para trocar dados entre cliente (browser) e servidor.',
              conceitos: [
                'Request: o cliente pede algo ao servidor',
                'Response: o servidor responde com dados e um status code',
                'URL: endereço do recurso (https://api.exemplo.com/users)',
                'Header: metadados da requisição (Content-Type, Authorization)',
                'Body: dados enviados ou recebidos (JSON, FormData)'
              ],
              explicacao: 'Quando você acessa um site, seu browser faz uma requisição GET para o servidor. O servidor responde com HTML, CSS e JS. Quando você faz login, o browser faz um POST com seu email e senha. A resposta inclui um token de autenticação que é usado nas próximas requisições.',
              exemplos: [
                {
                  titulo: 'Estrutura de uma requisição HTTP',
                  codigo: `// REQUEST\nGET /api/usuarios/1 HTTP/1.1\nHost: api.exemplo.com\nAuthorization: Bearer eyJhbGciOi...\n\n// RESPONSE\nHTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n  "id": 1,\n  "nome": "Davi",\n  "email": "davi@exemplo.com"\n}`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Confundir 401 (não autenticado) com 403 (autenticado mas sem permissão)',
                'Enviar dados sensíveis na URL (query string) em vez do body'
              ],
              dicas: [
                'Status 2xx = sucesso, 4xx = erro do cliente, 5xx = erro do servidor',
                'HTTPS é HTTP com criptografia — sempre use em produção'
              ],
              links: [{ titulo: 'MDN — HTTP', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTTP' }],
              projetosRelacionados: ['Fazer requisições manuais com o Postman para uma API pública e analisar as respostas']
            },
            exercicios: {
              fixacao: [{ id: 'http-f1', enunciado: 'O que significam os status codes: 200, 201, 400, 401, 404, 500?', tipo: 'dissertativo', gabarito: '200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error.' }],
              intermediario: [{ id: 'http-i1', enunciado: 'Use o Postman para fazer GET, POST e DELETE na API pública JSONPlaceholder. Analise os headers de cada resposta.', tipo: 'dissertativo' }],
              desafio: [{ id: 'http-d1', enunciado: 'Implemente um middleware de log que imprime o método, URL e status code de cada requisição recebida por um servidor Express.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo request/response', 'Conheço os principais métodos HTTP', 'Sei o que os status codes significam', 'Já inspecionei requisições HTTP no DevTools']
          },
          {
            id: 'json', title: 'JSON', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['fundamentos', 'dados', 'apis'],
            conteudo: {
              resumo: 'JSON (JavaScript Object Notation) é o formato padrão de troca de dados na web. Toda API REST usa JSON para enviar e receber dados.',
              conceitos: [
                'JSON é texto: sempre strings com aspas duplas nas chaves',
                'Tipos válidos: string, number, boolean, array, object, null',
                'JSON.parse(): converte string JSON para objeto JS',
                'JSON.stringify(): converte objeto JS para string JSON',
                'Sem funções, sem undefined, sem comentários no JSON'
              ],
              explicacao: 'JSON é simples e universal — qualquer linguagem sabe ler e escrever JSON. Quando uma API responde, você recebe uma string JSON que precisa ser parseada com JSON.parse(). Quando vai enviar dados, converta o objeto com JSON.stringify().',
              exemplos: [
                {
                  titulo: 'Parse e Stringify em JavaScript',
                  codigo: `// String JSON (o que vem da API)\nconst resposta = '{"nome":"Davi","idade":22,"ativo":true}';\n\n// Parse: string → objeto\nconst usuario = JSON.parse(resposta);\nconsole.log(usuario.nome); // "Davi"\n\n// Stringify: objeto → string\nconst obj = { produto: "Notebook", preco: 3500 };\nconst json = JSON.stringify(obj, null, 2); // null, 2 = formatado\nconsole.log(json);\n// {\n//   "produto": "Notebook",\n//   "preco": 3500\n// }`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar aspas simples nas chaves do JSON (inválido: {\'nome\': \'João\'})',
                'Tentar fazer JSON.parse de algo que já é um objeto (dá erro)'
              ],
              dicas: [
                'Use JSON.stringify(obj, null, 2) para formatar bonito ao fazer debug',
                'Instale a extensão "JSON Formatter" no Chrome para visualizar APIs'
              ],
              links: [{ titulo: 'JSON.org', url: 'https://www.json.org/json-pt.html' }],
              projetosRelacionados: ['Criar um mini banco de dados em arquivo JSON com operações CRUD']
            },
            exercicios: {
              fixacao: [{ id: 'json-f1', enunciado: 'Qual a diferença entre JSON.parse() e JSON.stringify()?', tipo: 'dissertativo', gabarito: 'parse converte string JSON para objeto JS. stringify converte objeto JS para string JSON.' }],
              intermediario: [{ id: 'json-i1', enunciado: 'Crie um objeto usuário com 5 propriedades, converta para JSON, e depois parse de volta. Verifique que os dados são idênticos.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'json-d1', enunciado: 'Implemente uma função deepEqual que compara dois objetos JS complexos (com objetos e arrays aninhados) usando JSON.stringify.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo a estrutura do JSON', 'Uso JSON.parse e JSON.stringify', 'Sei a diferença entre objeto JS e JSON', 'Já consumi uma API e processsei JSON']
          }
        ]
      },
      {
        id: 'habilidades-soft', name: 'habilidades comportamentais', estimatedHours: 2,
        description: 'As habilidades que definem um dev completo — técnica e comportamento juntos.',
        topicos: [
          {
            id: 'comunicacao-tecnica', title: 'comunicação técnica', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['soft skills', 'comunicação'],
            conteudo: {
              resumo: 'Saber comunicar ideias técnicas para diferentes públicos — devs, designers, gestores e clientes — é tão importante quanto saber programar.',
              conceitos: [
                'Adapte a linguagem ao público: evite jargão com não-técnicos',
                'Documente decisões técnicas (Architecture Decision Records)',
                'Saiba explicar um bug claramente: o que esperava vs o que aconteceu',
                'Perguntas bem formuladas recebem melhores respostas'
              ],
              explicacao: 'Um dev que comunica mal bloqueia a equipe inteira. Ao reportar um bug: inclua o comportamento esperado, o comportamento atual, os passos para reproduzir e o ambiente (browser, versão). Ao pedir ajuda: mostre o que você já tentou — isso economiza tempo de todos.',
              exemplos: [
                {
                  titulo: 'Como relatar um bug corretamente',
                  codigo: `// ❌ Ruim\n"Tá quebrando quando faço login"\n\n// ✅ Bom\n"Ao fazer login com email válido e senha correta,\nrecebo o erro 401 Unauthorized.\nComportamento esperado: redirecionar para /dashboard.\nAmbiente: Chrome 120, produção.\nPassos: 1) ir para /login, 2) preencher credenciais, 3) clicar em Entrar.\nLog do console: [colar o erro]"`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Explicar problemas técnicos complexos para o cliente como se ele fosse dev',
                'Fazer perguntas sem mostrar o que já tentou'
              ],
              dicas: [
                'Antes de perguntar, pesquise por 30 minutos. Depois documente o que tentou',
                'Use a técnica "ELI5" (Explain Like I\'m 5) para simplificar conceitos técnicos'
              ],
              links: [{ titulo: 'How to ask good questions', url: 'https://stackoverflow.com/help/how-to-ask' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'com-f1', enunciado: 'Escreva um relato de bug completo para o seguinte cenário: "O botão de salvar não funciona no formulário de cadastro."', tipo: 'dissertativo' }],
              intermediario: [{ id: 'com-i1', enunciado: 'Explique o que é uma API REST para alguém que não é desenvolvedor, usando uma analogia do mundo real.', tipo: 'dissertativo' }],
              desafio: [{ id: 'com-d1', enunciado: 'Apresente um projeto técnico em 5 minutos para uma audiência mista (devs e gestores). Prepare os slides e pratique.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei relatar bugs de forma clara', 'Adapto minha linguagem ao público', 'Faço perguntas bem formuladas', 'Já expliquei algo técnico para não-devs']
          },
          {
            id: 'trabalho-em-equipe', title: 'trabalho em equipe', estimatedMinutes: 25,
            difficulty: 'basico', tags: ['soft skills', 'equipe'],
            conteudo: {
              resumo: 'Desenvolvimento de software é quase sempre trabalho em equipe. Saber colaborar, compartilhar conhecimento e integrar contribuições é fundamental.',
              conceitos: [
                'Code review: revisar o código de outros com construtividade',
                'Pair programming: programar junto em tempo real',
                'Daily standup: comunicar o que fez, o que fará e impedimentos',
                'Definition of Done: quando algo está realmente pronto',
                'Kanban/Scrum: metodologias ágeis de organização'
              ],
              explicacao: 'Um bom dev de equipe: avisa quando vai atrasar, não deixa PR aberto por dias sem revisar, documenta suas decisões, pede ajuda antes de travar por muito tempo e celebra conquistas dos colegas. Ego prejudica times.',
              exemplos: [
                {
                  titulo: 'Bom comentário de code review',
                  codigo: `// ❌ Comentário ruim\n"Isso está errado. Refaça."\n\n// ✅ Comentário bom\n"Hmm, vejo que usou um loop aqui.\nPoderia funcionar com Array.reduce() também:\nconst soma = arr.reduce((acc, n) => acc + n, 0);\nO que acha? Acho que fica mais legível,\nmas fica à sua escolha."`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Não pedir ajuda e travar dias num problema que um colega resolveria em minutos',
                'Fazer code review apenas para aprovar sem realmente analisar'
              ],
              dicas: [
                'Compartilhe conhecimento proativamente — crie um ambiente de aprendizado mútuo',
                'Pair programming acelera onboarding e reduz bugs'
              ],
              links: [{ titulo: 'Google Engineering Practices — Code Review', url: 'https://google.github.io/eng-practices/review' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'team-f1', enunciado: 'O que é um "daily standup" e quais são as 3 perguntas que ele responde?', tipo: 'dissertativo', gabarito: 'O que fiz ontem, o que vou fazer hoje, e se tenho algum impedimento.' }],
              intermediario: [{ id: 'team-i1', enunciado: 'Faça um code review de um PR aberto num projeto open source no GitHub. Deixe pelo menos 2 comentários construtivos.', tipo: 'dissertativo' }],
              desafio: [{ id: 'team-d1', enunciado: 'Organize um projeto com outra pessoa usando GitHub Projects (Kanban), branches, PRs e code review. Documente o processo.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo o fluxo de trabalho em equipe', 'Faço code reviews construtivos', 'Comunico meu progresso e impedimentos', 'Pesso ajuda antes de travar muito tempo']
          },
          {
            id: 'proatividade', title: 'proatividade e autonomia', estimatedMinutes: 20,
            difficulty: 'basico', tags: ['soft skills', 'carreira'],
            conteudo: {
              resumo: 'Proatividade é agir antes de ser solicitado. Autonomia é resolver problemas sem precisar de instrução para cada detalhe. Essas duas qualidades são as mais valorizadas por empresas.',
              conceitos: [
                'Não espere alguém te dizer o próximo passo — busque',
                'Documente o que aprendeu ao resolver um problema',
                'Proponha melhorias, não apenas execute tarefas',
                'Aprenda a distinguir o que precisa de aprovação do que pode resolver sozinho'
              ],
              explicacao: 'Um dev júnior proativo é mais valioso que um sênior passivo. Quando estiver preso, tente resolver por 30 min primeiro. Quando resolver, documente a solução. Quando vir um problema recorrente, proponha uma solução permanente.',
              exemplos: [
                {
                  titulo: 'Ciclo de aprendizado autônomo',
                  codigo: `// 1. Encontrou um problema\n// 2. Pesquisou por 30 minutos\n// 3. Perguntou com contexto ("Tentei X e Y, mas...")\n// 4. Resolveu\n// 5. Documentou a solução (README, Notion, comentário)\n// 6. Compartilhou com a equipe\n// ↑ Esse ciclo te torna referência em 6 meses`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Esperar que alguém te dê uma tarefa quando você poderia puxar do backlog',
                'Resolver o mesmo problema repetidamente sem documentar a solução'
              ],
              dicas: [
                'Mantenha um diário técnico — anote o que aprendeu cada dia',
                'Quando resolver algo difícil, escreva um post ou doc para fixar o conhecimento'
              ],
              links: [],
              projetosRelacionados: ['Identificar um processo manual repetitivo no seu estudo e automatizá-lo']
            },
            exercicios: {
              fixacao: [{ id: 'pro-f1', enunciado: 'Descreva uma situação onde você foi proativo (ou poderia ter sido) no seu aprendizado.', tipo: 'dissertativo' }],
              intermediario: [{ id: 'pro-i1', enunciado: 'Crie um "diário técnico" digital e escreva uma entrada por dia durante 7 dias sobre o que aprendeu.', tipo: 'dissertativo' }],
              desafio: [{ id: 'pro-d1', enunciado: 'Identifique uma melhoria que poderia ser feita em um projeto seu sem que ninguém pediu. Implemente e documente.', tipo: 'dissertativo' }]
            },
            checklist: ['Busco resolver problemas antes de pedir ajuda', 'Documento o que aprendo', 'Proponho melhorias proativamente', 'Tenho autonomia no meu aprendizado']
          },
          {
            id: 'vontade-aprender', title: 'vontade de aprender', estimatedMinutes: 20,
            difficulty: 'basico', tags: ['soft skills', 'carreira'],
            conteudo: {
              resumo: 'Tecnologia muda rápido. A habilidade de aprender de forma contínua e eficiente é mais importante do que conhecer uma linguagem específica.',
              conceitos: [
                'Growth mindset: habilidades são desenvolvidas, não inatas',
                'Aprendizado ativo: praticar enquanto aprende, não só assistir',
                'Fontes de qualidade: documentação oficial, MDN, blogs técnicos',
                'Comunidade: Discord, fóruns, meetups, GitHub'
              ],
              explicacao: 'O dev que para de aprender fica obsoleto em 2-3 anos. Mas "aprender" não significa fazer um curso novo todo mês — significa entender profundamente o que você usa, praticar constantemente, e acompanhar as tendências relevantes para sua área.',
              exemplos: [
                {
                  titulo: 'Rotina de aprendizado sustentável',
                  codigo: `// Semanal\n→ Ler 1 artigo técnico relevante\n→ Resolver 3-5 problemas de código\n→ Contribuir para um projeto (ou praticar pessoal)\n\n// Mensal\n→ Completar 1 módulo/curso focado\n→ Fazer um projeto pequeno com algo novo\n→ Assistir 1 palestra técnica (YouTube, conf)\n\n// Trimestral\n→ Avaliar seu progresso\n→ Ajustar os próximos objetivos`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Tutorial hell: assistir tutoriais infinitos sem praticar',
                'Aprender largura sem profundidade — 10 linguagens superficialmente'
              ],
              dicas: [
                'Regra do projeto: para cada tutorial, construa um projeto próprio usando o que aprendeu',
                'Feynman technique: explique o conceito como se fosse para uma criança — revela o que você não sabe'
              ],
              links: [{ titulo: 'Roadmap.sh — Guias de aprendizado', url: 'https://roadmap.sh' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'vap-f1', enunciado: 'O que é "tutorial hell" e como evitá-lo?', tipo: 'dissertativo', gabarito: 'Tutorial hell é ficar preso em tutoriais sem construir nada. Solução: para cada tutorial, faça um projeto que usa o que aprendeu.' }],
              intermediario: [{ id: 'vap-i1', enunciado: 'Monte seu plano de estudo para os próximos 3 meses com metas semanais realistas.', tipo: 'dissertativo' }],
              desafio: [{ id: 'vap-d1', enunciado: 'Escolha um conceito que você já sabe e ensine-o para alguém (presencialmente, por escrito ou em vídeo).', tipo: 'dissertativo' }]
            },
            checklist: ['Tenho uma rotina de estudo consistente', 'Pratico além de assistir tutoriais', 'Acompanho fontes técnicas de qualidade', 'Tenho metas de aprendizado definidas']
          },
          {
            id: 'feedback', title: 'receber e dar feedback', estimatedMinutes: 20,
            difficulty: 'basico', tags: ['soft skills', 'equipe'],
            conteudo: {
              resumo: 'Feedback é a ferramenta mais poderosa de crescimento profissional. Saber receber sem defensividade e dar de forma construtiva é uma habilidade rara e muito valorizada.',
              conceitos: [
                'Feedback é sobre o comportamento/código, não sobre a pessoa',
                'Seja específico: cite exemplos concretos',
                'SBI Framework: Situação, Comportamento, Impacto',
                'Pergunte antes de assumir: "Você quis dizer...?"',
                'Agradeça o feedback — mesmo que discorde'
              ],
              explicacao: 'Ao receber feedback de code review: não leve para o lado pessoal, pergunte se não entendeu, agradeça insights. Ao dar: foque no código, não na pessoa. "Esse if pode ser simplificado" é melhor que "você fez isso de forma complicada".',
              exemplos: [
                {
                  titulo: 'Modelo SBI para dar feedback',
                  codigo: `// S — Situação\n"Na reunião de ontem..."\n\n// B — Comportamento\n"...quando você apresentou o design,\nvocê interrompeu os outros 3 vezes"\n\n// I — Impacto\n"...isso dificultou a participação da equipe\ne a reunião ficou mais longa que o necessário."`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Dar feedback vago: "Você precisa melhorar sua comunicação"',
                'Receber feedback com defensividade e contra-argumentar imediatamente'
              ],
              dicas: [
                'Ao receber feedback, ouça completamente antes de responder',
                'Feedback positivo é tão importante quanto crítico — celebre o que foi bem'
              ],
              links: [],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'fb-f1', enunciado: 'Use o modelo SBI para dar feedback sobre um code review: "O PR tinha funções muito grandes e sem testes."', tipo: 'dissertativo' }],
              intermediario: [{ id: 'fb-i1', enunciado: 'Peça feedback para alguém sobre um projeto seu. Documente o que recebeu e o que vai mudar.', tipo: 'dissertativo' }],
              desafio: [{ id: 'fb-d1', enunciado: 'Conduza uma retrospectiva de um projeto usando o formato Start/Stop/Continue com pelo menos 1 colega.', tipo: 'dissertativo' }]
            },
            checklist: ['Recebo feedback sem defensividade', 'Dou feedback específico e construtivo', 'Agradeço feedback, mesmo crítico', 'Aplico o que aprendo no feedback']
          }
        ]
      }
    ]
  }
];
