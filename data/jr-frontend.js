const JR_FRONTEND = [
  {
    id: 'frontend', label: 'trilha frontend', color: '#ff7a40', icon: '🌐',
    description: 'HTML, CSS e JavaScript — os três pilares do desenvolvimento web.',
    estimatedHours: 40, prerequisitos: ['base', 'fundamentos'],
    modulos: [
      {
        id: 'html-mod', name: 'HTML', estimatedHours: 6, description: 'A estrutura de toda página web.',
        topicos: [
          {
            id: 'html-estrutura', title: 'estrutura de páginas', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['html', 'web'],
            conteudo: {
              resumo: 'HTML (HyperText Markup Language) é a linguagem que define a estrutura e o conteúdo de páginas web. Cada elemento HTML tem um significado e um propósito semântico.',
              conceitos: [
                'DOCTYPE: declara o tipo do documento (<!DOCTYPE html>)',
                'html, head, body: estrutura raiz de toda página',
                'head: metadados (título, charset, links para CSS)',
                'body: conteúdo visível da página',
                'Elementos em bloco vs inline'
              ],
              explicacao: 'Uma página HTML bem estruturada facilita a acessibilidade, o SEO e a manutenção. O head contém informações para o browser e motores de busca. O body contém o que o usuário vê. Cada tag tem um propósito — não use div para tudo.',
              exemplos: [
                {
                  titulo: 'Estrutura básica de uma página HTML',
                  codigo: `<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Minha Página</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <header>\n    <nav>...</nav>\n  </header>\n  <main>\n    <section>...</section>\n  </main>\n  <footer>...</footer>\n  <script src="app.js"></script>\n</body>\n</html>`,
                  linguagem: 'html'
                }
              ],
              errosComuns: [
                'Esquecer o meta viewport (quebra o layout em mobile)',
                'Colocar o <script> no <head> sem defer (bloqueia o render)'
              ],
              dicas: [
                'Script no final do body ou com atributo defer para não bloquear o carregamento',
                'lang="pt-BR" no html ajuda leitores de tela e SEO'
              ],
              links: [{ titulo: 'MDN — HTML', url: 'https://developer.mozilla.org/pt-BR/docs/Web/HTML' }],
              projetosRelacionados: ['Criar o HTML de um currículo pessoal usando apenas HTML sem CSS']
            },
            exercicios: {
              fixacao: [{ id: 'hest-f1', enunciado: 'Qual é a diferença entre elementos de bloco e inline? Dê 3 exemplos de cada.', tipo: 'dissertativo', gabarito: 'Bloco: div, p, h1 (ocupam a linha toda). Inline: span, a, strong (ficam na mesma linha).' }],
              intermediario: [{ id: 'hest-i1', enunciado: 'Crie o HTML de uma página de perfil pessoal com: cabeçalho, foto, bio, lista de habilidades e rodapé.', tipo: 'codigo', linguagem: 'html' }],
              desafio: [{ id: 'hest-d1', enunciado: 'Valide sua página no W3C Validator e corrija todos os erros/warnings encontrados.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei a estrutura básica de um HTML', 'Uso DOCTYPE corretamente', 'Entendo head vs body', 'Sei a diferença entre bloco e inline']
          },
          {
            id: 'html-semantico', title: 'tags semânticas (header, main, section, article)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['html', 'semântica', 'acessibilidade'],
            conteudo: {
              resumo: 'Tags semânticas descrevem o significado do conteúdo, não apenas sua aparência. Elas melhoram acessibilidade, SEO e legibilidade do código.',
              conceitos: [
                'header: cabeçalho do site ou de uma seção',
                'nav: menu de navegação',
                'main: conteúdo principal (único por página)',
                'section: agrupamento temático de conteúdo',
                'article: conteúdo independente (post, produto)',
                'aside: conteúdo relacionado mas secundário',
                'footer: rodapé'
              ],
              explicacao: 'Usar div para tudo funciona visualmente, mas prejudica leitores de tela e robôs de busca. Um screen reader anuncia "nav" como "menu de navegação" — algo impossível com uma div genérica. O Google também usa semântica para entender o conteúdo.',
              exemplos: [
                {
                  titulo: 'Página com semântica correta',
                  codigo: `<body>\n  <header>\n    <nav>\n      <a href="/">Home</a>\n      <a href="/sobre">Sobre</a>\n    </nav>\n  </header>\n\n  <main>\n    <section id="projetos">\n      <h2>Projetos</h2>\n      <article>\n        <h3>Nome do Projeto</h3>\n        <p>Descrição...</p>\n      </article>\n    </section>\n\n    <aside>\n      <h2>Links úteis</h2>\n    </aside>\n  </main>\n\n  <footer>\n    <p>© 2026 Davi</p>\n  </footer>\n</body>`,
                  linguagem: 'html'
                }
              ],
              errosComuns: [
                'Usar header dentro de article e main dentro de section (confundir hierarquia)',
                'Ter mais de um <main> por página'
              ],
              dicas: [
                'Use a extensão "Accessibility Insights" no Chrome para verificar a semântica',
                'h1 deve aparecer apenas uma vez por página — é o título principal'
              ],
              links: [{ titulo: 'HTML Semântico — web.dev', url: 'https://web.dev/learn/html/semantic-html' }],
              projetosRelacionados: ['Refatorar um site seu substituindo todas as divs desnecessárias por tags semânticas']
            },
            exercicios: {
              fixacao: [{ id: 'hse-f1', enunciado: 'Qual tag usar para: 1) menu de navegação, 2) rodapé, 3) conteúdo principal, 4) post de blog?', tipo: 'dissertativo', gabarito: 'nav, footer, main, article' }],
              intermediario: [{ id: 'hse-i1', enunciado: 'Converta um layout com apenas divs para usar as tags semânticas corretas.', tipo: 'codigo', linguagem: 'html', templateInicial: '<div class="header"><div class="nav">...</div></div><div class="main"><div class="section">...</div></div><div class="footer">...</div>' }],
              desafio: [{ id: 'hse-d1', enunciado: 'Inspecione um site popular (ex: GitHub) com o DevTools e liste as tags semânticas que ele usa.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso header, main, nav, footer corretamente', 'Entendo a diferença entre section e article', 'Evito divs desnecessárias', 'Sei por que semântica importa']
          },
          {
            id: 'html-formularios', title: 'formulários e inputs', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['html', 'formulários', 'interação'],
            conteudo: {
              resumo: 'Formulários são a principal forma de coletar dados do usuário. HTML5 oferece validação nativa, tipos de input específicos e atributos de acessibilidade.',
              conceitos: [
                'form: container do formulário com action e method',
                'input types: text, email, password, number, date, checkbox, radio',
                'label: associa texto descritivo ao input (for + id)',
                'required, pattern, min, max: validação nativa do HTML',
                'button type="submit": envia o formulário'
              ],
              explicacao: 'Sempre associe labels aos inputs — sem label, leitores de tela não sabem o que o campo significa. Use o type correto do input: type="email" valida email automaticamente; type="tel" abre teclado numérico no mobile. Agrupe campos relacionados com fieldset.',
              exemplos: [
                {
                  titulo: 'Formulário de cadastro acessível',
                  codigo: `<form action="/cadastro" method="POST">\n  <fieldset>\n    <legend>Dados pessoais</legend>\n\n    <label for="nome">Nome completo *</label>\n    <input type="text" id="nome" name="nome" required\n           minlength="3" placeholder="Seu nome">\n\n    <label for="email">E-mail *</label>\n    <input type="email" id="email" name="email" required>\n\n    <label for="senha">Senha *</label>\n    <input type="password" id="senha" name="senha"\n           required minlength="8">\n  </fieldset>\n\n  <button type="submit">Cadastrar</button>\n</form>`,
                  linguagem: 'html'
                }
              ],
              errosComuns: [
                'Input sem label (não acessível)',
                'Usar type="text" para email e telefone em vez dos tipos específicos'
              ],
              dicas: [
                'novalidate no form desativa a validação nativa (útil para implementar validação própria)',
                'Use autocomplete="email" para facilitar preenchimento no mobile'
              ],
              links: [{ titulo: 'MDN — Formulários HTML', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/Forms' }],
              projetosRelacionados: ['Criar um formulário de contato com validação HTML5 nativa e exibir os dados no console']
            },
            exercicios: {
              fixacao: [{ id: 'hfo-f1', enunciado: 'Por que sempre associar um label a cada input? Como fazer isso corretamente?', tipo: 'dissertativo', gabarito: 'Para acessibilidade (leitores de tela) e usabilidade (clicar no label foca o input). Use for no label igual ao id do input.' }],
              intermediario: [{ id: 'hfo-i1', enunciado: 'Crie um formulário de login com email, senha e checkbox "lembrar de mim". Use validação HTML5 nativa.', tipo: 'codigo', linguagem: 'html' }],
              desafio: [{ id: 'hfo-d1', enunciado: 'Crie um formulário multistep (3 passos) usando HTML e JS, validando cada etapa antes de avançar.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Sei criar formulários completos', 'Uso labels corretamente', 'Uso tipos de input adequados', 'Conheço validação HTML5 nativa']
          },
          {
            id: 'acessibilidade', title: 'acessibilidade básica', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['html', 'acessibilidade', 'a11y'],
            conteudo: {
              resumo: 'Acessibilidade (a11y) garante que pessoas com deficiências possam usar sua aplicação. É um requisito legal em muitos países e uma boa prática universal.',
              conceitos: [
                'WCAG: diretrizes de acessibilidade do W3C',
                'alt em imagens: descrição para leitores de tela',
                'ARIA: atributos para enriquecer semântica (aria-label, role)',
                'Contraste: mínimo 4.5:1 para texto normal',
                'Navegação por teclado: Tab, Enter, Esc devem funcionar'
              ],
              explicacao: 'Cerca de 15% da população tem alguma deficiência. Acessibilidade não é sobre funcionalidades extras — é sobre não criar barreiras. Imagens decorativas devem ter alt="" (vazio). Imagens informativas precisam de descrição. Links "clique aqui" são inacessíveis — descreva o destino.',
              exemplos: [
                {
                  titulo: 'Práticas de acessibilidade básica',
                  codigo: `<!-- ✅ Imagem com alt descritivo -->\n<img src="foto.jpg" alt="Foto de perfil de Davi Rodrigues">\n\n<!-- ✅ Imagem decorativa (alt vazio) -->\n<img src="estrela.svg" alt="">\n\n<!-- ✅ Link descritivo -->\n<a href="/sobre">Saiba mais sobre o projeto</a>\n\n<!-- ❌ Link inacessível -->\n<a href="/sobre">clique aqui</a>\n\n<!-- ✅ Botão com label -->\n<button aria-label="Fechar menu">✕</button>`,
                  linguagem: 'html'
                }
              ],
              errosComuns: [
                'Imagens sem atributo alt (leitores de tela leem o nome do arquivo)',
                'Contraste de texto insuficiente — texto cinza claro em fundo branco'
              ],
              dicas: [
                'Use a extensão WAVE ou axe no Chrome para auditar acessibilidade',
                'Teste navegando apenas com Tab e Enter — tudo deve ser acessível'
              ],
              links: [{ titulo: 'WebAIM — Acessibilidade Web', url: 'https://webaim.org' }],
              projetosRelacionados: ['Auditar um projeto existente com a extensão axe e corrigir todos os problemas encontrados']
            },
            exercicios: {
              fixacao: [{ id: 'acc-f1', enunciado: 'Qual o valor do atributo alt para uma imagem puramente decorativa (como um ícone de fundo)?', tipo: 'dissertativo', gabarito: 'alt="" (vazio) — indica ao leitor de tela que a imagem deve ser ignorada.' }],
              intermediario: [{ id: 'acc-i1', enunciado: 'Instale a extensão axe DevTools e audite um projeto seu. Liste todos os erros de acessibilidade encontrados e corrija pelo menos 3.', tipo: 'dissertativo' }],
              desafio: [{ id: 'acc-d1', enunciado: 'Navegue um site que você criou usando apenas o teclado (sem mouse). Documente os problemas encontrados e corrija-os.', tipo: 'dissertativo' }]
            },
            checklist: ['Todas as imagens têm alt adequado', 'Meu site é navegável por teclado', 'O contraste do texto é suficiente', 'Já auditei acessibilidade com uma ferramenta']
          }
        ]
      },
      {
        id: 'css-mod', name: 'CSS', estimatedHours: 10, description: 'Estilo, layout e responsividade.',
        topicos: [
          {
            id: 'css-seletores', title: 'seletores e especificidade', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['css', 'seletores'],
            conteudo: {
              resumo: 'Seletores CSS definem quais elementos recebem os estilos. Especificidade determina qual regra "vence" quando há conflito — um dos conceitos mais incompreendidos do CSS.',
              conceitos: [
                'Seletores básicos: tipo (p), classe (.btn), id (#header)',
                'Combinadores: descendente (div p), filho (div > p), adjacente (h1 + p)',
                'Pseudo-classes: :hover, :focus, :first-child, :nth-child()',
                'Pseudo-elementos: ::before, ::after, ::placeholder',
                'Especificidade: id (100) > class (10) > tipo (1) > * (0)'
              ],
              explicacao: 'Especificidade é calculada por pontos: id vale 100, classe e atributo valem 10, elemento vale 1. Se dois seletores conflitam, vence o de maior especificidade. !important quebra esse sistema e deve ser evitado. A ordem de declaração no CSS só desempata quando a especificidade é igual.',
              exemplos: [
                {
                  titulo: 'Exemplos de especificidade',
                  codigo: `/* Especificidade: 0 (seletor universal) */\n* { color: gray; }\n\n/* Especificidade: 1 (tipo) */\np { color: black; }\n\n/* Especificidade: 10 (classe) */\n.destaque { color: blue; }\n\n/* Especificidade: 11 (tipo + classe) */\np.destaque { color: green; }\n\n/* Especificidade: 100 (id) */\n#titulo { color: red; }\n\n/* Vence sobre tudo (evitar!) */\np { color: pink !important; }`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Usar !important para resolver conflitos — é como gritar para calar todo mundo',
                'IDs muito específicos que dificultam reutilização de estilos'
              ],
              dicas: [
                'Prefira classes a IDs para estilos — são mais reutilizáveis',
                'Mantenha a especificidade baixa — torna o CSS mais fácil de sobrescrever quando necessário'
              ],
              links: [{ titulo: 'Specificity Calculator', url: 'https://specificity.keegan.st' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'css-sel-f1', enunciado: 'Qual tem maior especificidade: ".btn.primary" ou "#submit"?', tipo: 'dissertativo', gabarito: '#submit (100 pontos) > .btn.primary (20 pontos).' }],
              intermediario: [{ id: 'css-sel-i1', enunciado: 'Crie CSS que estiliza: todos os li dentro de ul.menu, o primeiro li, e o li ao passar o mouse.', tipo: 'codigo', linguagem: 'css' }],
              desafio: [{ id: 'css-sel-d1', enunciado: 'Sem usar classes ou IDs, estilize um formulário usando apenas seletores de tipo e pseudo-classes.', tipo: 'codigo', linguagem: 'css' }]
            },
            checklist: ['Entendo a hierarquia de especificidade', 'Uso pseudo-classes (:hover, :focus)', 'Uso combinadores corretamente', 'Evito !important']
          },
          {
            id: 'css-box-model', title: 'box model', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['css', 'layout'],
            conteudo: {
              resumo: 'O box model define como o browser calcula o espaço de cada elemento: conteúdo + padding + border + margin. Entender isso elimina 80% dos bugs de layout.',
              conceitos: [
                'content: área do conteúdo (width/height)',
                'padding: espaço interno entre conteúdo e borda',
                'border: a borda do elemento',
                'margin: espaço externo entre elementos',
                'box-sizing: border-box faz width incluir padding e border'
              ],
              explicacao: 'Por padrão (content-box), width define apenas o conteúdo. Com box-sizing: border-box, width inclui padding e border — muito mais intuitivo. Sempre use border-box como global reset. Margin não faz parte do "visual" do elemento e pode colapsar com margins adjacentes.',
              exemplos: [
                {
                  titulo: 'Reset universal e box model',
                  codigo: `/* Reset recomendado */\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.card {\n  width: 300px;        /* largura total com border-box */\n  padding: 20px;       /* espaço interno */\n  border: 1px solid #ccc;\n  margin-bottom: 16px; /* espaço abaixo do card */\n}`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Não usar box-sizing: border-box e ter elementos maiores do que o esperado',
                'Confundir padding (espaço interno) com margin (espaço externo)'
              ],
              dicas: [
                'Sempre inicie um projeto com o reset *, *::before, *::after { box-sizing: border-box }',
                'Use o painel computed no DevTools para ver exatamente como o box model está calculado'
              ],
              links: [{ titulo: 'MDN — Box Model', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/CSS/Building_blocks/The_box_model' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'box-f1', enunciado: 'Com content-box, um elemento com width:200px, padding:20px, border:2px tem qual largura visual?', tipo: 'dissertativo', gabarito: '200 + 40 (padding) + 4 (border) = 244px. Com border-box, seria 200px.' }],
              intermediario: [{ id: 'box-i1', enunciado: 'Crie um card de 300px de largura com padding de 24px, borda de 1px e margin de 16px usando border-box.', tipo: 'codigo', linguagem: 'css' }],
              desafio: [{ id: 'box-d1', enunciado: 'Explique o "margin collapse" e demonstre com 2 exemplos: quando acontece e quando NÃO acontece.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo content, padding, border e margin', 'Uso box-sizing: border-box', 'Sei calcular a largura visual de um elemento', 'Entendo margin collapse']
          },
          {
            id: 'css-flexbox', title: 'Flexbox', estimatedMinutes: 90,
            difficulty: 'basico', tags: ['css', 'layout', 'flexbox'],
            conteudo: {
              resumo: 'Flexbox é o sistema de layout unidimensional do CSS. Perfeito para distribuir itens em uma linha ou coluna, alinhar elementos e criar layouts responsivos sem float ou position.',
              conceitos: [
                'display: flex — ativa o flexbox no container',
                'flex-direction: row | column (eixo principal)',
                'justify-content: alinhamento no eixo principal',
                'align-items: alinhamento no eixo cruzado',
                'flex-wrap: quebra para próxima linha se necessário',
                'flex: shorthand para flex-grow, flex-shrink, flex-basis',
                'gap: espaçamento entre itens'
              ],
              explicacao: 'Flexbox resolve o que antes exigia gambiarras com float, inline-block e position. Para centralizar algo: display:flex + justify-content:center + align-items:center. O container flex controla o layout; os filhos (flex items) se adaptam. Use flex:1 para um item crescer e ocupar o espaço disponível.',
              exemplos: [
                {
                  titulo: 'Padrões comuns com Flexbox',
                  codigo: `/* Centralizar vertical e horizontalmente */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n}\n\n/* Navbar com logo à esquerda e links à direita */\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 20px;\n}\n\n/* Coluna de cards que quebra linha */\n.grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.card { flex: 1 1 300px; } /* mínimo 300px, cresce igual */`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Usar Flexbox para grid 2D complexo — use CSS Grid para isso',
                'Não usar gap e usar margin em cada item (dificulta o layout)'
              ],
              dicas: [
                'Flexbox Froggy é o melhor jogo para aprender Flexbox: flexboxfroggy.com',
                'O eixo principal é row por padrão. justify-content age nele; align-items no cruzado'
              ],
              links: [
                { titulo: 'Flexbox Froggy — jogo interativo', url: 'https://flexboxfroggy.com/#pt-br' },
                { titulo: 'CSS Tricks — Guia Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
              ],
              projetosRelacionados: ['Criar uma navbar responsiva e um grid de cards usando apenas Flexbox']
            },
            exercicios: {
              fixacao: [{ id: 'flex-f1', enunciado: 'Como centralizar um elemento vertical e horizontalmente usando Flexbox?', tipo: 'codigo', linguagem: 'css', gabarito: '.pai { display: flex; justify-content: center; align-items: center; }' }],
              intermediario: [{ id: 'flex-i1', enunciado: 'Crie uma navbar com logo à esquerda, links no centro e botão à direita, usando apenas Flexbox.', tipo: 'codigo', linguagem: 'css' }],
              desafio: [{ id: 'flex-d1', enunciado: 'Crie um layout de dashboard com sidebar fixa à esquerda e área de conteúdo que ocupa o restante, usando Flexbox.', tipo: 'codigo', linguagem: 'css' }]
            },
            checklist: ['Sei usar justify-content e align-items', 'Entendo a diferença entre eixo principal e cruzado', 'Uso gap para espaçamento', 'Já construí um layout real com Flexbox']
          },
          {
            id: 'css-grid', title: 'Grid', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['css', 'layout', 'grid'],
            conteudo: {
              resumo: 'CSS Grid é o sistema de layout bidimensional. Enquanto Flexbox trabalha em uma direção (linha OU coluna), Grid controla linhas E colunas simultaneamente.',
              conceitos: [
                'display: grid — ativa o grid no container',
                'grid-template-columns: define as colunas',
                'grid-template-rows: define as linhas',
                'fr: unidade fracionária (1fr = 1 parte do espaço disponível)',
                'repeat(): repete definições de colunas/linhas',
                'gap: espaçamento entre células',
                'grid-column / grid-row: posiciona itens manualmente'
              ],
              explicacao: 'Use Grid para layouts de página (header, sidebar, content, footer). Use Flexbox para componentes internos (navbar, cards inline). A unidade fr distribui o espaço restante proporcionalmente. repeat(3, 1fr) cria 3 colunas iguais. minmax(200px, 1fr) define um mínimo.',
              exemplos: [
                {
                  titulo: 'Layout clássico com CSS Grid',
                  codigo: `/* Layout de app com sidebar */\n.app {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr 40px;\n  grid-template-areas:\n    "sidebar header"\n    "sidebar main"\n    "sidebar footer";\n  min-height: 100vh;\n}\n\n.sidebar { grid-area: sidebar; }\n.header  { grid-area: header; }\n.main    { grid-area: main; }\n.footer  { grid-area: footer; }\n\n/* Grid responsivo de cards */\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Usar Grid quando Flexbox seria mais simples e adequado',
                'Não usar grid-template-areas para layouts complexos — dificulta leitura'
              ],
              dicas: [
                'CSS Grid Garden é o jogo equivalente ao Flexbox Froggy: cssgridgarden.com',
                'repeat(auto-fill, minmax(280px, 1fr)) cria colunas responsivas automaticamente'
              ],
              links: [
                { titulo: 'CSS Grid Garden — jogo', url: 'https://cssgridgarden.com/#pt-br' },
                { titulo: 'CSS Tricks — Guia Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
              ],
              projetosRelacionados: ['Criar o layout principal de um dashboard (sidebar + header + conteúdo) usando CSS Grid']
            },
            exercicios: {
              fixacao: [{ id: 'grid-f1', enunciado: 'Qual a diferença entre CSS Grid e Flexbox? Quando usar cada um?', tipo: 'dissertativo', gabarito: 'Grid é 2D (linhas E colunas), Flexbox é 1D (linha OU coluna). Grid para layout da página, Flexbox para componentes.' }],
              intermediario: [{ id: 'grid-i1', enunciado: 'Crie um grid de cards que se adapte automaticamente: 1 coluna em mobile, 2 em tablet, 3 em desktop.', tipo: 'codigo', linguagem: 'css' }],
              desafio: [{ id: 'grid-d1', enunciado: 'Recriar o layout do GitHub (header, sidebar, lista de repositórios) usando CSS Grid e Grid Areas.', tipo: 'codigo', linguagem: 'css' }]
            },
            checklist: ['Entendo grid-template-columns e rows', 'Uso a unidade fr', 'Sei usar repeat() e minmax()', 'Já criei um layout real com Grid']
          },
          {
            id: 'css-responsividade', title: 'responsividade (media queries)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['css', 'responsividade', 'mobile'],
            conteudo: {
              resumo: 'Responsividade é a capacidade do site de se adaptar a diferentes tamanhos de tela. Media queries são as regras CSS que aplicam estilos condicionalmente com base no tamanho da tela.',
              conceitos: [
                'Mobile first: estilize para mobile primeiro, depois expanda',
                'Breakpoints comuns: 480px, 768px, 1024px, 1280px',
                'min-width: condição para telas maiores que X',
                'max-width: condição para telas menores que X',
                'viewport: meta tag que configura o comportamento em mobile'
              ],
              explicacao: 'A abordagem Mobile First escreve estilos base para mobile e usa min-width para adicionar estilos em telas maiores. Isso resulta em CSS mais eficiente e prioriza a experiência mobile (maioria dos usuários). Use unidades relativas (%, em, rem, vw, vh) em vez de pixels fixos.',
              exemplos: [
                {
                  titulo: 'Media queries mobile first',
                  codigo: `/* Base: mobile */\n.container {\n  padding: 16px;\n  grid-template-columns: 1fr;\n}\n\n/* Tablet (min-width) */\n@media (min-width: 768px) {\n  .container {\n    padding: 24px;\n    grid-template-columns: 1fr 1fr;\n  }\n}\n\n/* Desktop */\n@media (min-width: 1024px) {\n  .container {\n    max-width: 1200px;\n    margin: 0 auto;\n    grid-template-columns: repeat(3, 1fr);\n  }\n}`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Desktop first com max-width — dificulta manutenção e mobile fica como exceção',
                'Usar pixels fixos em fontes e espaçamentos — não escalam bem'
              ],
              dicas: [
                'Use rem para fontes (1rem = 16px por padrão, respeita a preferência do usuário)',
                'Ctrl+Shift+M no DevTools ativa o modo responsivo para testar diferentes tamanhos'
              ],
              links: [{ titulo: 'MDN — Media Queries', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries' }],
              projetosRelacionados: ['Tornar um site que você criou totalmente responsivo usando media queries']
            },
            exercicios: {
              fixacao: [{ id: 'resp-f1', enunciado: 'Qual a diferença entre abordagem Mobile First e Desktop First? Por que Mobile First é recomendado?', tipo: 'dissertativo', gabarito: 'Mobile First: estilos base para mobile + min-width para expandir. Desktop First: estilos base para desktop + max-width para reduzir. Mobile First é mais eficiente e prioriza a experiência mais comum.' }],
              intermediario: [{ id: 'resp-i1', enunciado: 'Torne um grid de 3 colunas responsivo: 1 coluna em mobile, 2 em tablet, 3 em desktop.', tipo: 'codigo', linguagem: 'css' }],
              desafio: [{ id: 'resp-d1', enunciado: 'Crie um layout de página completo (header, hero, cards, footer) totalmente responsivo com 3 breakpoints.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Entendo media queries com min-width', 'Sei a abordagem Mobile First', 'Uso unidades relativas (rem, %)', 'Testei meu site em diferentes tamanhos']
          },
          {
            id: 'css-variaveis', title: 'variáveis CSS (custom properties)', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['css', 'variáveis', 'design system'],
            conteudo: {
              resumo: 'Variáveis CSS (custom properties) permitem reutilizar valores e criar um sistema de design consistente. Essenciais para temas, dark mode e manutenção.',
              conceitos: [
                '--nome-variavel: valor — define uma variável CSS',
                'var(--nome): usa o valor da variável',
                ':root — escopo global (disponível em todo CSS)',
                'Herança: variáveis são herdadas pelos filhos',
                'Fallback: var(--cor, #000) usa #000 se a variável não existir'
              ],
              explicacao: 'Custom properties eliminam a repetição de valores como cores e tamanhos. Com elas, trocar a cor primária do site é mudar um único valor no :root. São diferentes de variáveis SASS — as CSS rodas no browser e podem ser alteradas com JavaScript.',
              exemplos: [
                {
                  titulo: 'Sistema de design com variáveis CSS',
                  codigo: `/* Design tokens no :root */\n:root {\n  --color-primary: #1fcb8a;\n  --color-bg: #0d0f14;\n  --color-text: #e8eaf2;\n  --spacing-sm: 8px;\n  --spacing-md: 16px;\n  --spacing-lg: 24px;\n  --radius: 8px;\n  --font-body: 'Sora', sans-serif;\n}\n\n/* Uso em componentes */\n.btn {\n  background: var(--color-primary);\n  padding: var(--spacing-sm) var(--spacing-md);\n  border-radius: var(--radius);\n}\n\n/* Dark mode com variáveis */\n@media (prefers-color-scheme: dark) {\n  :root { --color-bg: #000; --color-text: #fff; }\n}`,
                  linguagem: 'css'
                }
              ],
              errosComuns: [
                'Esquecer os dois hifens (--) ao definir (erro comum: -variavel em vez de --variavel)',
                'Não usar :root para variáveis globais e depois não conseguir acessar'
              ],
              dicas: [
                'Use variáveis para todos os valores que se repetem: cores, espaçamentos, fontes, raios',
                'JavaScript pode alterar variáveis CSS: document.documentElement.style.setProperty("--cor", "red")'
              ],
              links: [{ titulo: 'MDN — Custom Properties', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties' }],
              projetosRelacionados: ['Criar um sistema de design tokens com variáveis CSS para um projeto e implementar dark mode']
            },
            exercicios: {
              fixacao: [{ id: 'cssvar-f1', enunciado: 'Como definir uma variável CSS global chamada --cor-primaria com valor azul, e usá-la em um botão?', tipo: 'codigo', linguagem: 'css', gabarito: ':root { --cor-primaria: blue; } .btn { background: var(--cor-primaria); }' }],
              intermediario: [{ id: 'cssvar-i1', enunciado: 'Crie um sistema de cores com variáveis CSS (primária, secundária, fundo, texto) e implemente um toggle de dark/light mode com JavaScript.', tipo: 'codigo', linguagem: 'html' }],
              desafio: [{ id: 'cssvar-d1', enunciado: 'Crie um "design system" completo com variáveis CSS para cores, espaçamentos, tipografia e bordas. Use em pelo menos 3 componentes.', tipo: 'dissertativo' }]
            },
            checklist: ['Defino variáveis CSS no :root', 'Uso var() para consumir variáveis', 'Tenho variáveis para cores e espaçamentos', 'Já implementei dark mode com variáveis']
          }
        ]
      },
      {
        id: 'js-mod', name: 'JavaScript / TypeScript', estimatedHours: 14, description: 'A linguagem de programação da web.',
        topicos: [
          {
            id: 'js-sintaxe', title: 'sintaxe básica', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['javascript', 'fundamentos'],
            conteudo: {
              resumo: 'JavaScript é a linguagem de programação da web. Com ela você adiciona comportamento às páginas, manipula dados e consome APIs. É a única linguagem que roda nativamente no browser.',
              conceitos: [
                'var (obsoleto) / let / const — declaração de variáveis',
                'Tipagem dinâmica: o tipo é inferido pelo valor',
                'Operadores: aritméticos, lógicos, comparação, ternário',
                'Template literals: `Olá, ${nome}!`',
                'Strict mode: "use strict" habilita modo estrito'
              ],
              explicacao: 'Prefira const para valores que não mudam; use let quando precisar reatribuir. Nunca use var (escopo confuso). JavaScript tem tipagem dinâmica — uma variável pode ser string e depois número. Use === (igualdade estrita) em vez de == para evitar coerção de tipo.',
              exemplos: [
                {
                  titulo: 'Sintaxe fundamental',
                  codigo: `// Variáveis\nconst nome = "Davi";\nlet idade = 22;\n\n// Template literal\nconsole.log(\`Olá, \${nome}! Você tem \${idade} anos.\`);\n\n// Comparação estrita (sempre prefira)\nconsole.log(1 === "1"); // false\nconsole.log(1 ==  "1"); // true (coerção — evite)\n\n// Ternário\nconst status = idade >= 18 ? "adulto" : "menor";\n\n// Nullish coalescing\nconst display = nome ?? "Anônimo";`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar == em vez de === (coerção de tipo gera bugs sutis)',
                'Usar var dentro de blocos (vazamento de escopo para a função)'
              ],
              dicas: [
                'console.log() é seu melhor amigo para debug rápido',
                'O site javascript.info é a melhor referência completa e gratuita'
              ],
              links: [{ titulo: 'JavaScript.info — tutorial moderno', url: 'https://javascript.info' }],
              projetosRelacionados: ['Resolver 10 problemas de lógica usando apenas JavaScript puro']
            },
            exercicios: {
              fixacao: [{ id: 'jss-f1', enunciado: 'Qual a diferença entre let, const e var? Quando usar cada um?', tipo: 'dissertativo', gabarito: 'const: valores imutáveis. let: valores que mudam. var: evitar (escopo de função, hoisting confuso).' }],
              intermediario: [{ id: 'jss-i1', enunciado: 'Reescreva o seguinte usando template literals e ternário: "var msg = "Olá " + nome + ". Status: " + (ativo ? "ativo" : "inativo")"', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'jss-d1', enunciado: 'Implemente uma função que recebe um objeto e retorna uma string formatada com todos os pares chave: valor.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Uso const e let corretamente (nunca var)', 'Uso === para comparações', 'Sei usar template literals', 'Entendo o operador ternário']
          },
          {
            id: 'js-tipos', title: 'tipos de dados', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['javascript', 'tipos'],
            conteudo: {
              resumo: 'JavaScript tem 8 tipos de dados: 7 primitivos (string, number, boolean, undefined, null, symbol, bigint) e 1 complexo (object). Entender a diferença é essencial.',
              conceitos: [
                'Primitivos: imutáveis, comparados por valor',
                'Objects e arrays: mutáveis, comparados por referência',
                'typeof: retorna o tipo de uma variável',
                'Coerção implícita: JS converte tipos automaticamente (perigoso)',
                'Conversão explícita: Number(), String(), Boolean(), parseInt()'
              ],
              explicacao: 'Em JavaScript, undefined é "nunca foi definido" e null é "intencionalmente vazio". typeof null retorna "object" (bug histórico da linguagem). Arrays são objects especiais. Objetos são comparados por referência: {} === {} é false porque são objetos diferentes na memória.',
              exemplos: [
                {
                  titulo: 'Tipos e coerção',
                  codigo: `// Primitivos\ntypeof "texto"      // "string"\ntypeof 42           // "number"\ntypeof true         // "boolean"\ntypeof undefined    // "undefined"\ntypeof null         // "object" (bug histórico!)\ntypeof {}           // "object"\ntypeof []           // "object"\ntypeof function(){} // "function"\n\n// Coerção implícita (cuidado!)\n"5" + 3  // "53" (concatenação!)\n"5" - 3  // 2   (subtração numérica)\n\n// Conversão explícita\nNumber("5")   // 5\nString(42)    // "42"\nBoolean(0)    // false\nBoolean("")   // false\nBoolean([])   // true (objeto, mesmo vazio!)`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Somar string com número sem converter: "5" + 3 = "53"',
                'Assumir que [] e {} são falsy — ambos são truthy!'
              ],
              dicas: [
                'Use Array.isArray() para verificar arrays, não typeof',
                'Valores falsy: false, 0, "", null, undefined, NaN — todo o resto é truthy'
              ],
              links: [{ titulo: 'MDN — Tipos e estruturas de dados', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Data_structures' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'jst-f1', enunciado: 'Quais são os valores falsy em JavaScript? Liste todos.', tipo: 'dissertativo', gabarito: 'false, 0, -0, 0n, "" (string vazia), null, undefined, NaN.' }],
              intermediario: [{ id: 'jst-i1', enunciado: 'Escreva uma função typeCheck que recebe qualquer valor e retorna seu tipo de forma precisa (especialmente distinguindo null, array e object).', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'jst-d1', enunciado: 'Implemente deepClone(obj) que faz uma cópia profunda de qualquer objeto sem usar JSON.parse/stringify (trate arrays, objetos aninhados e primitivos).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Conheço todos os tipos primitivos de JS', 'Entendo coerção implícita e explícita', 'Sei os valores falsy', 'Entendo comparação por referência vs valor']
          },
          {
            id: 'js-funcoes', title: 'funções (arrow, callback)', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['javascript', 'funções'],
            conteudo: {
              resumo: 'Funções são blocos de código reutilizáveis. Em JavaScript, funções são cidadãs de primeira classe — podem ser atribuídas a variáveis, passadas como argumento e retornadas de outras funções.',
              conceitos: [
                'Função declarada: function nome() {} (hoisted)',
                'Função expressão: const f = function() {}',
                'Arrow function: const f = () => {} (sem this próprio)',
                'Callback: função passada como argumento para outra',
                'Higher-order function: recebe ou retorna uma função'
              ],
              explicacao: 'Arrow functions são mais concisas e não têm seu próprio this — ótimas para callbacks. Funções declaradas sofrem hoisting (você pode chamá-las antes de definir). Closures permitem que funções "lembrem" do escopo onde foram criadas — conceito fundamental.',
              exemplos: [
                {
                  titulo: 'Diferentes formas de funções',
                  codigo: `// Declarada (hoisted)\nfunction soma(a, b) { return a + b; }\n\n// Expressão\nconst multiplica = function(a, b) { return a * b; };\n\n// Arrow (concisa)\nconst divide = (a, b) => a / b;\n\n// Arrow com corpo\nconst desconto = (preco, pct) => {\n  const valor = preco * (pct / 100);\n  return preco - valor;\n};\n\n// Callback\n[1, 2, 3].map(n => n * 2); // [2, 4, 6]\n\n// Closure\nfunction contador() {\n  let count = 0;\n  return () => ++count;\n}\nconst c = contador();\nc(); // 1\nc(); // 2`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar arrow function como método de objeto (this vai apontar para o escopo externo)',
                'Esquecer de retornar — arrow sem chaves tem return implícito; com chaves não'
              ],
              dicas: [
                'Arrow de uma linha tem return implícito: n => n * 2 equivale a n => { return n * 2; }',
                'Para retornar um objeto com arrow: n => ({ chave: n }) — parênteses obrigatórios'
              ],
              links: [{ titulo: 'MDN — Funções', url: 'https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions' }],
              projetosRelacionados: ['Implementar um sistema de eventos simples (pub/sub) usando closures e callbacks']
            },
            exercicios: {
              fixacao: [{ id: 'jsf-f1', enunciado: 'Qual a diferença entre função declarada e arrow function em relação ao this?', tipo: 'dissertativo', gabarito: 'Função declarada tem seu próprio this. Arrow function não tem this próprio — usa o this do escopo envolvente.' }],
              intermediario: [{ id: 'jsf-i1', enunciado: 'Crie uma função memoize que recebe uma função pura e retorna uma versão cacheada dos resultados.', tipo: 'codigo', linguagem: 'javascript', templateInicial: 'function memoize(fn) {\n  // seu código\n}' }],
              desafio: [{ id: 'jsf-d1', enunciado: 'Implemente o método Array.prototype.reduce do zero usando apenas loops. Teste com soma, produto e agrupamento.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo arrow vs function declaration', 'Sei o que é callback', 'Entendo closures básicos', 'Uso map, filter, reduce com fluência']
          },
          {
            id: 'js-dom', title: 'DOM (seleção e manipulação)', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['javascript', 'dom', 'frontend'],
            conteudo: {
              resumo: 'O DOM (Document Object Model) é a representação do HTML como uma árvore de objetos JavaScript. Manipular o DOM é como fazer o JS interagir com a página web.',
              conceitos: [
                'document.querySelector: seleciona o primeiro elemento que corresponde ao seletor CSS',
                'document.querySelectorAll: seleciona todos os elementos',
                'element.textContent / innerHTML: ler e alterar conteúdo',
                'element.classList: adicionar, remover, toggle classes',
                'element.setAttribute / getAttribute: manipular atributos',
                'document.createElement: criar elemento novo'
              ],
              explicacao: 'querySelector usa a mesma sintaxe de seletores CSS. Para criar e inserir elementos: createElement → definir propriedades → appendChild/insertBefore. Prefira textContent a innerHTML quando não há HTML no conteúdo (mais seguro contra XSS).',
              exemplos: [
                {
                  titulo: 'Manipulação básica do DOM',
                  codigo: `// Selecionar\nconst titulo = document.querySelector('h1');\nconst botoes = document.querySelectorAll('.btn');\n\n// Ler e alterar conteúdo\nconsole.log(titulo.textContent);\ntitulo.textContent = 'Novo título';\n\n// Classes\ndocument.querySelector('.card').classList.add('ativo');\ndocument.querySelector('.card').classList.toggle('dark');\n\n// Criar e inserir elemento\nconst li = document.createElement('li');\nli.textContent = 'Novo item';\nli.className = 'item-lista';\ndocument.querySelector('ul').appendChild(li);\n\n// Remover\nconst el = document.querySelector('.remover');\nel.remove();`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar innerHTML com dados do usuário (vulnerabilidade XSS)',
                'Selecionar elementos antes de o DOM carregar (script no head sem defer)'
              ],
              dicas: [
                'Prefira textContent a innerHTML para texto simples (mais seguro)',
                'classList.toggle() é ótimo para estados on/off'
              ],
              links: [{ titulo: 'MDN — Introdução ao DOM', url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model/Introduction' }],
              projetosRelacionados: ['Criar uma to-do list completa usando apenas DOM manipulation (sem frameworks)']
            },
            exercicios: {
              fixacao: [{ id: 'dom-f1', enunciado: 'Qual a diferença entre querySelector e querySelectorAll? O que cada um retorna?', tipo: 'dissertativo', gabarito: 'querySelector retorna o primeiro elemento (ou null). querySelectorAll retorna uma NodeList com todos (mesmo que vazia).' }],
              intermediario: [{ id: 'dom-i1', enunciado: 'Implemente uma lista de tarefas onde o usuário pode adicionar, marcar como feita e remover itens. Tudo com DOM puro.', tipo: 'codigo', linguagem: 'html' }],
              desafio: [{ id: 'dom-d1', enunciado: 'Implemente um componente de "accordion" (FAQ) usando DOM manipulation. Cada item expande/colapsa ao clicar.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Sei selecionar elementos com querySelector', 'Manipulo textContent e classList', 'Crio e insiro elementos dinamicamente', 'Entendo o risco de innerHTML']
          },
          {
            id: 'js-eventos', title: 'eventos (click, input, submit)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['javascript', 'eventos', 'dom'],
            conteudo: {
              resumo: 'Eventos são ações do usuário (clique, digitação, envio de formulário) ou do browser que o JavaScript pode escutar e reagir. São a base da interatividade web.',
              conceitos: [
                'addEventListener(evento, handler): registra ouvinte de evento',
                'event.target: o elemento que disparou o evento',
                'event.preventDefault(): cancela o comportamento padrão',
                'event.stopPropagation(): impede propagação para o pai',
                'Bubbling: eventos sobem pela árvore DOM',
                'Delegação: ouvir eventos no pai para filhos dinâmicos'
              ],
              explicacao: 'Eventos sobem pelo DOM (bubbling): um clique num botão dentro de um div também ativa o ouvinte do div. preventDefault() cancela o comportamento padrão (ex: submit não recarregar a página). Delegação de eventos é essencial para elementos criados dinamicamente.',
              exemplos: [
                {
                  titulo: 'Eventos e delegação',
                  codigo: `// Click básico\ndocument.querySelector('#btn').addEventListener('click', (e) => {\n  console.log('clicado!', e.target);\n});\n\n// Submit de formulário\ndocument.querySelector('form').addEventListener('submit', (e) => {\n  e.preventDefault(); // impede recarregar\n  const dados = new FormData(e.target);\n  console.log(Object.fromEntries(dados));\n});\n\n// Input em tempo real\ndocument.querySelector('#busca').addEventListener('input', (e) => {\n  filtrar(e.target.value);\n});\n\n// Delegação (para itens dinâmicos)\ndocument.querySelector('#lista').addEventListener('click', (e) => {\n  if (e.target.classList.contains('btn-delete')) {\n    e.target.closest('li').remove();\n  }\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Adicionar addEventListener dentro de um loop sem remover depois (memory leak)',
                'Esquecer event.preventDefault() em formulários (recarrega a página)'
              ],
              dicas: [
                'Use event delegation para listas e tabelas com itens dinâmicos',
                'Prefira addEventListener a onclick no HTML — separa JS do HTML'
              ],
              links: [{ titulo: 'MDN — Eventos', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Building_blocks/Events' }],
              projetosRelacionados: ['Criar um teclado virtual que exibe a tecla pressionada usando eventos de teclado']
            },
            exercicios: {
              fixacao: [{ id: 'evt-f1', enunciado: 'O que faz event.preventDefault() em um formulário?', tipo: 'dissertativo', gabarito: 'Impede o comportamento padrão do form de recarregar a página ao ser submetido.' }],
              intermediario: [{ id: 'evt-i1', enunciado: 'Implemente um buscador em tempo real que filtra uma lista de itens conforme o usuário digita.', tipo: 'codigo', linguagem: 'html', dica: 'Use evento input no campo de busca e filtre exibindo/ocultando itens.' }],
              desafio: [{ id: 'evt-d1', enunciado: 'Implemente um carrossel de imagens (anterior/próximo) usando eventos e animações CSS.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Uso addEventListener corretamente', 'Entendo event.preventDefault()', 'Sei o que é event bubbling', 'Uso delegação de eventos']
          },
          {
            id: 'js-async', title: 'Promises e async/await', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['javascript', 'async', 'promises'],
            conteudo: {
              resumo: 'JavaScript é single-threaded mas assíncrono. Promises representam valores futuros; async/await é a sintaxe moderna para trabalhar com código assíncrono de forma síncrona.',
              conceitos: [
                'Callback hell: o problema que Promises vieram resolver',
                'Promise: objeto que representa um valor que pode estar pendente, resolvido ou rejeitado',
                '.then() / .catch() / .finally(): encadear ações',
                'async function: declara uma função assíncrona',
                'await: pausa a execução até a Promise resolver',
                'try/catch com async/await: tratamento de erros'
              ],
              explicacao: 'Uma requisição HTTP é assíncrona — você não sabe quando vai responder. Com async/await: declare a função como async, use await antes de Promises. O código parece síncrono mas não bloqueia. Promise.all() resolve várias promises em paralelo — muito mais rápido que await sequencial.',
              exemplos: [
                {
                  titulo: 'Fetch com async/await',
                  codigo: `// Maneira moderna e legível\nasync function buscarUsuario(id) {\n  try {\n    const response = await fetch(\`/api/usuarios/\${id}\`);\n\n    if (!response.ok) {\n      throw new Error(\`Erro \${response.status}\`);\n    }\n\n    const usuario = await response.json();\n    return usuario;\n  } catch (erro) {\n    console.error('Falha ao buscar usuário:', erro.message);\n    throw erro;\n  }\n}\n\n// Paralelo com Promise.all\nasync function buscarDados() {\n  const [usuarios, produtos] = await Promise.all([\n    fetch('/api/usuarios').then(r => r.json()),\n    fetch('/api/produtos').then(r => r.json())\n  ]);\n  return { usuarios, produtos };\n}`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Usar await em sequência desnecessariamente quando pode usar Promise.all',
                'Não tratar erros com try/catch em funções async (erros silenciosos)'
              ],
              dicas: [
                'Sempre verifique response.ok antes de fazer response.json()',
                'Promise.allSettled() é mais seguro que Promise.all() quando uma pode falhar'
              ],
              links: [{ titulo: 'MDN — async/await', url: 'https://developer.mozilla.org/pt-BR/docs/Learn/JavaScript/Asynchronous/Promises' }],
              projetosRelacionados: ['Criar um app que busca dados de 2 APIs em paralelo e exibe os resultados combinados']
            },
            exercicios: {
              fixacao: [{ id: 'async-f1', enunciado: 'O que acontece se você usar await sem try/catch e a Promise rejeitar?', tipo: 'dissertativo', gabarito: 'Uma "Unhandled Promise Rejection" é lançada. Em Node.js pode encerrar o processo; no browser aparece no console mas a execução continua após o await.' }],
              intermediario: [{ id: 'async-i1', enunciado: 'Implemente uma função que busca dados de uma API, exibe um loading enquanto aguarda e trata erro caso a requisição falhe.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'async-d1', enunciado: 'Implemente retry automático: uma função que tenta uma Promise N vezes com delay entre tentativas antes de desistir.', tipo: 'codigo', linguagem: 'javascript', templateInicial: 'async function comRetry(fn, tentativas, delay) {\n  // seu código\n}' }]
            },
            checklist: ['Entendo como Promises funcionam', 'Uso async/await com fluência', 'Trato erros com try/catch', 'Sei usar Promise.all para paralelizar']
          },
          {
            id: 'typescript', title: 'TypeScript: tipos e interfaces', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['typescript', 'tipos', 'frontend'],
            conteudo: {
              resumo: 'TypeScript é um superset tipado de JavaScript. Adiciona tipagem estática opcional que pega erros em tempo de desenvolvimento antes de chegar ao browser.',
              conceitos: [
                'Tipos básicos: string, number, boolean, any, unknown, void',
                'Interface: define a forma de um objeto',
                'Type alias: cria um nome para qualquer tipo',
                'Union types: tipo pode ser A ou B (string | number)',
                'Generics: tipos parametrizados (<T>)',
                'Optional properties: propriedade?.campo'
              ],
              explicacao: 'TypeScript compila para JavaScript — o browser nunca vê TypeScript. O compilador tsc verifica os tipos e aponta erros antes de executar. Com TypeScript, autocompletar do editor fica muito mais poderoso porque ele sabe exatamente o que cada variável contém.',
              exemplos: [
                {
                  titulo: 'Tipos e interfaces em TypeScript',
                  codigo: `// Interface\ninterface Usuario {\n  id: number;\n  nome: string;\n  email: string;\n  ativo?: boolean; // opcional\n}\n\n// Função tipada\nfunction formatarNome(usuario: Usuario): string {\n  return \`\${usuario.nome} <\${usuario.email}>\`;\n}\n\n// Union types\ntype Status = 'ativo' | 'inativo' | 'pendente';\n\n// Generics\nfunction primeiroItem<T>(arr: T[]): T | undefined {\n  return arr[0];\n}\n\nconst primeiro = primeiroItem([1, 2, 3]);    // number\nconst primName  = primeiroItem(['a', 'b']);   // string`,
                  linguagem: 'typescript'
                }
              ],
              errosComuns: [
                'Usar any em tudo — perde o benefício da tipagem',
                'Confundir interface com type alias (ambos funcionam, mas interface é mais extensível)'
              ],
              dicas: [
                'Prefira unknown a any — unknown obriga a verificar o tipo antes de usar',
                'TypeScript não tem overhead em runtime — tudo é removido na compilação'
              ],
              links: [{ titulo: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' }],
              projetosRelacionados: ['Converter um projeto JavaScript existente para TypeScript gradualmente']
            },
            exercicios: {
              fixacao: [{ id: 'ts-f1', enunciado: 'Qual a diferença entre interface e type em TypeScript?', tipo: 'dissertativo', gabarito: 'Interface é para objetos e pode ser estendida. type pode representar qualquer tipo (union, intersection, primitivos). Na prática, ambos funcionam para objetos, mas interface é mais idiomático.' }],
              intermediario: [{ id: 'ts-i1', enunciado: 'Crie interfaces para: Produto (id, nome, preco, categoria) e Carrinho (itens: Produto[], total: number). Implemente uma função que calcula o total.', tipo: 'codigo', linguagem: 'typescript' }],
              desafio: [{ id: 'ts-d1', enunciado: 'Implemente uma função genérica groupBy<T>(arr: T[], key: keyof T) que agrupa um array de objetos por uma chave.', tipo: 'codigo', linguagem: 'typescript' }]
            },
            checklist: ['Entendo tipos básicos do TypeScript', 'Crio interfaces para objetos', 'Uso union types e optional properties', 'Já configurei TypeScript em um projeto']
          }
        ]
      },
      {
        id: 'conceitos-frontend-mod', name: 'conceitos de frontend', estimatedHours: 4, description: 'Como o browser funciona e como interagir com a web.',
        topicos: [
          {
            id: 'como-navegador-funciona', title: 'como o navegador funciona', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['browser', 'performance', 'frontend'],
            conteudo: {
              resumo: 'O browser transforma HTML, CSS e JavaScript em pixels na tela através de um pipeline complexo. Entender esse processo ajuda a otimizar performance.',
              conceitos: [
                'DOM: representação do HTML como árvore de objetos',
                'CSSOM: representação do CSS como árvore',
                'Render tree: combinação de DOM + CSSOM',
                'Layout: calcular posição e tamanho de cada elemento',
                'Paint: renderizar pixels na tela',
                'Reflow: recalcular layout (caro — evitar em loops)'
              ],
              explicacao: 'O pipeline de renderização é: Parse HTML → DOM → Parse CSS → CSSOM → Render Tree → Layout → Paint → Composite. JavaScript pode interromper esse pipeline. Ler offsetHeight força um layout (reflow). Escrever className depois de ler cria um forced reflow — aninhado em loops, isso trava o browser.',
              exemplos: [
                {
                  titulo: 'Reflow vs leitura em batch',
                  codigo: `// ❌ Causa múltiplos reflows\nitens.forEach(item => {\n  const altura = item.offsetHeight; // lê (reflow)\n  item.style.height = altura * 2 + 'px'; // escreve\n});\n\n// ✅ Batch: lê tudo, depois escreve\nconst alturas = itens.map(item => item.offsetHeight);\nalturas.forEach((h, i) => {\n  itens[i].style.height = h * 2 + 'px';\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Misturar leituras e escritas de layout em loops (causa trashing)',
                'Adicionar muitos event listeners sem removê-los (memory leak)'
              ],
              dicas: [
                'Use requestAnimationFrame para animações — sincroniza com o ciclo de render',
                'Propriedades que não causam layout: opacity, transform (usam GPU)'
              ],
              links: [{ titulo: 'web.dev — Como os browsers funcionam', url: 'https://web.dev/articles/howbrowserswork' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'nav-f1', enunciado: 'O que é "reflow" e por que é caro para performance?', tipo: 'dissertativo', gabarito: 'Reflow é o recálculo de posições e tamanhos de todos os elementos afetados. É caro porque bloqueia a thread principal e força um novo ciclo de layout.' }],
              intermediario: [{ id: 'nav-i1', enunciado: 'Use o painel Performance do Chrome DevTools para gravar e identificar um reflow em uma página. Documente o que encontrou.', tipo: 'dissertativo' }],
              desafio: [{ id: 'nav-d1', enunciado: 'Implemente uma animação suave de 60fps para 1000 elementos usando requestAnimationFrame e CSS transform (sem causar reflow).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Entendo o pipeline DOM → CSSOM → Render → Layout → Paint', 'Sei o que causa reflow', 'Entendo por que transform e opacity são eficientes', 'Já usei o painel Performance']
          },
          {
            id: 'http-requests', title: 'requisições HTTP (básico)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['http', 'fetch', 'apis'],
            conteudo: {
              resumo: 'Toda comunicação entre o browser e servidores acontece via HTTP. Saber fazer e analisar requisições é fundamental para qualquer dev frontend.',
              conceitos: [
                'fetch(): API nativa do browser para HTTP',
                'Métodos: GET (buscar), POST (criar), PUT (substituir), PATCH (atualizar parcial), DELETE (remover)',
                'Headers: Content-Type, Authorization, Accept',
                'CORS: restrição de segurança do browser para requisições cross-origin',
                'Status codes: 2xx (sucesso), 4xx (erro cliente), 5xx (erro servidor)'
              ],
              explicacao: 'O fetch retorna uma Promise. Sempre verifique response.ok antes de processar. Para POST, defina Content-Type: application/json e serialize o body com JSON.stringify(). CORS bloqueia requisições de domínios diferentes — o servidor precisa configurar os headers corretos para permitir.',
              exemplos: [
                {
                  titulo: 'GET e POST com fetch',
                  codigo: `// GET\nasync function buscar(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(res.status);\n  return res.json();\n}\n\n// POST com JSON\nasync function criar(url, dados) {\n  const res = await fetch(url, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify(dados)\n  });\n  if (!res.ok) throw new Error(res.status);\n  return res.json();\n}\n\n// Com autenticação\nconst res = await fetch('/api/perfil', {\n  headers: { 'Authorization': \`Bearer \${token}\` }\n});`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Não verificar response.ok (fetch não rejeita em 404 ou 500)',
                'Esquecer Content-Type no POST (servidor não consegue parsear o body)'
              ],
              dicas: [
                'Use o painel Network do DevTools para ver exatamente o que foi enviado e recebido',
                'Axios é uma alternativa popular ao fetch com mais features (interceptors, timeout)'
              ],
              links: [{ titulo: 'MDN — Fetch API', url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Fetch_API' }],
              projetosRelacionados: ['Criar um app que consome a API do ViaCEP e exibe dados de endereço a partir de um CEP']
            },
            exercicios: {
              fixacao: [{ id: 'httpr-f1', enunciado: 'Por que fetch não rejeita a Promise em caso de erro HTTP (404, 500)? Como verificar corretamente?', tipo: 'dissertativo', gabarito: 'fetch só rejeita em erros de rede. Para erros HTTP, verifique response.ok ou response.status manualmente.' }],
              intermediario: [{ id: 'httpr-i1', enunciado: 'Implemente uma função fetchComTimeout que cancela a requisição se demorar mais de N segundos usando AbortController.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'httpr-d1', enunciado: 'Crie uma camada de API centralizada com funções para GET, POST, PUT, DELETE que incluem: token de auth, tratamento de erros padronizado e loading state.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Faço requisições com fetch', 'Verifico response.ok', 'Envio dados em POST corretamente', 'Trato erros adequadamente']
          },
          {
            id: 'local-storage', title: 'LocalStorage / SessionStorage', estimatedMinutes: 30,
            difficulty: 'basico', tags: ['browser', 'storage', 'persistência'],
            conteudo: {
              resumo: 'LocalStorage e SessionStorage permitem persistir dados no browser sem backend. LocalStorage persiste entre sessões; SessionStorage é limpo quando a aba fecha.',
              conceitos: [
                'localStorage.setItem(chave, valor): salvar (apenas strings)',
                'localStorage.getItem(chave): recuperar',
                'localStorage.removeItem(chave): remover',
                'localStorage.clear(): limpar tudo',
                'JSON.stringify/parse: serializar objetos para string'
              ],
              explicacao: 'LocalStorage guarda apenas strings. Para salvar objetos, use JSON.stringify(). Para recuperar, JSON.parse(). O limite é geralmente 5-10MB por origem. Dados sensíveis (senhas, tokens de longa duração) NÃO devem ser armazenados no localStorage (vulnerável a XSS).',
              exemplos: [
                {
                  titulo: 'CRUD no localStorage',
                  codigo: `// Salvar\nconst usuario = { nome: "Davi", tema: "dark" };\nlocalStorage.setItem('usuario', JSON.stringify(usuario));\n\n// Recuperar\nconst dados = localStorage.getItem('usuario');\nconst user = dados ? JSON.parse(dados) : null;\n\n// Helper reutilizável\nconst Storage = {\n  get: (key) => {\n    const item = localStorage.getItem(key);\n    return item ? JSON.parse(item) : null;\n  },\n  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),\n  remove: (key) => localStorage.removeItem(key)\n};`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Salvar objeto sem JSON.stringify — salva "[object Object]"',
                'Armazenar tokens de autenticação sensíveis no localStorage'
              ],
              dicas: [
                'Inspecione o localStorage em DevTools → Application → Local Storage',
                'Para dados temporários da sessão, prefira SessionStorage'
              ],
              links: [{ titulo: 'MDN — Web Storage API', url: 'https://developer.mozilla.org/pt-BR/docs/Web/API/Web_Storage_API' }],
              projetosRelacionados: ['Implementar persistência de tema (dark/light) e preferências do usuário com localStorage']
            },
            exercicios: {
              fixacao: [{ id: 'ls-f1', enunciado: 'Qual a diferença entre localStorage e sessionStorage?', tipo: 'dissertativo', gabarito: 'localStorage persiste entre sessões (até ser limpo). sessionStorage é apagado quando a aba/janela fecha.' }],
              intermediario: [{ id: 'ls-i1', enunciado: 'Crie um helper de localStorage que: salva objetos automaticamente como JSON, recupera e faz parse, e retorna um valor padrão se não existir.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'ls-d1', enunciado: 'Implemente um sistema de histórico de buscas (últimas 10) usando localStorage. Deve mostrar sugestões ao digitar e permitir limpar o histórico.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Sei salvar e recuperar dados do localStorage', 'Uso JSON.stringify ao salvar objetos', 'Não armazeno dados sensíveis no localStorage', 'Inspecionei o storage no DevTools']
          },
          {
            id: 'fetch-apis', title: 'consumir APIs REST (fetch)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['javascript', 'apis', 'fetch'],
            conteudo: {
              resumo: 'Consumir APIs REST é conectar sua aplicação frontend a dados e serviços externos. É uma das habilidades mais usadas no dia a dia do dev frontend.',
              conceitos: [
                'API pública: endpoints abertos para qualquer um usar',
                'API com autenticação: requer token/chave de API',
                'Endpoint: URL específica que retorna dados (GET /users, POST /products)',
                'Loading state: exibir indicador enquanto aguarda',
                'Error state: tratar e exibir erros para o usuário'
              ],
              explicacao: 'O fluxo completo de consumo de API: 1) mostrar loading, 2) fazer fetch, 3) verificar response.ok, 4) parsear JSON, 5) atualizar o estado/DOM, 6) esconder loading, 7) tratar erros no catch. Sempre trate os três estados: loading, success e error.',
              exemplos: [
                {
                  titulo: 'Consumo completo de API com estados',
                  codigo: `async function carregarPosts() {\n  const container = document.getElementById('posts');\n  container.innerHTML = '<p>Carregando...</p>';\n\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/posts');\n    if (!res.ok) throw new Error(\`Erro \${res.status}\`);\n\n    const posts = await res.json();\n    container.innerHTML = posts\n      .slice(0, 10)\n      .map(p => \`<article><h3>\${p.title}</h3><p>\${p.body}</p></article>\`)\n      .join('');\n  } catch (err) {\n    container.innerHTML = \`<p class="erro">Falha ao carregar: \${err.message}</p>\`;\n  }\n}\n\ncarregarPosts();`,
                  linguagem: 'javascript'
                }
              ],
              errosComuns: [
                'Não mostrar feedback visual durante o carregamento',
                'Não tratar o estado de erro — usuário fica olhando para uma tela vazia'
              ],
              dicas: [
                'JSONPlaceholder e ViaCEP são ótimas APIs gratuitas para praticar',
                'Use o DevTools Network para ver o que sua requisição realmente enviou'
              ],
              links: [
                { titulo: 'JSONPlaceholder — API de teste', url: 'https://jsonplaceholder.typicode.com' },
                { titulo: 'ViaCEP — API de CEP', url: 'https://viacep.com.br' }
              ],
              projetosRelacionados: ['Criar um app de listagem com busca que consome uma API pública real (PokeAPI, Rick and Morty API, etc.)']
            },
            exercicios: {
              fixacao: [{ id: 'fa-f1', enunciado: 'Quais são os 3 estados que toda requisição HTTP deve ter na interface do usuário?', tipo: 'dissertativo', gabarito: 'Loading (carregando), Success (dados exibidos), Error (mensagem de erro amigável).' }],
              intermediario: [{ id: 'fa-i1', enunciado: 'Crie um app que busca e exibe personagens da Rick and Morty API com: loading spinner, paginação e tratamento de erro.', tipo: 'codigo', linguagem: 'html' }],
              desafio: [{ id: 'fa-d1', enunciado: 'Implemente um buscador de CEP com: busca automática ao digitar 8 dígitos, campo de loading, preenchimento automático de endereço e validação.', tipo: 'codigo', linguagem: 'html' }]
            },
            checklist: ['Consumo APIs REST com fetch', 'Trato loading, success e error', 'Exibo dados da API no DOM', 'Já criei um projeto que consome API real']
          }
        ]
      },
      {
        id: 'ferramentas-frontend-mod', name: 'ferramentas frontend', estimatedHours: 3, description: 'Ferramentas modernas do ecossistema frontend.',
        topicos: [
          {
            id: 'devtools-avancado', title: 'DevTools (debugging, network, performance)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['ferramentas', 'debug', 'performance'],
            conteudo: {
              resumo: 'O DevTools do Chrome é completo o suficiente para debugar qualquer problema de frontend — de erros de JS a gargalos de performance.',
              conceitos: [
                'Breakpoints condicionais: parar apenas quando condição é verdadeira',
                'XHR breakpoints: parar em qualquer requisição HTTP',
                'Performance flame chart: ver qual código está demorando mais',
                'Memory profiler: detectar memory leaks',
                'Lighthouse: auditoria de performance, SEO e acessibilidade'
              ],
              explicacao: 'Breakpoints condicionais são muito úteis em loops: clique direito no número da linha → Add conditional breakpoint → coloque uma condição. No painel Network, você pode throttle a conexão para simular 3G. Lighthouse no DevTools gera um relatório completo de qualidade.',
              exemplos: [
                {
                  titulo: 'Uso avançado do DevTools',
                  codigo: `// No painel Sources:\n// 1. Ctrl+P → abrir arquivo JS\n// 2. Clicar na margem → breakpoint\n// 3. Botão direito → Add Conditional Breakpoint\n//    Condição: i > 50  (para no 51º elemento do loop)\n\n// No Console:\n// $0 → último elemento selecionado em Elements\n// $_ → último valor retornado\n// monitor(nomeDaFuncao) → loga cada vez que é chamada\n// copy(objeto) → copia para clipboard`,
                  linguagem: 'text'
                }
              ],
              errosComuns: [
                'Não usar breakpoints condicionais em loops (para a cada iteração desnecessariamente)',
                'Nunca usar o Lighthouse para verificar performance'
              ],
              dicas: [
                'Performance → Record → interaja com a página → Stop → analise o flame chart',
                'Lighthouse no modo "incógnito" dá resultados mais precisos (sem extensões)'
              ],
              links: [{ titulo: 'Chrome DevTools — Performance', url: 'https://developer.chrome.com/docs/devtools/performance' }],
              projetosRelacionados: ['Executar Lighthouse no seu projeto e resolver pelo menos 3 issues de performance ou acessibilidade']
            },
            exercicios: {
              fixacao: [{ id: 'dta-f1', enunciado: 'O que é um breakpoint condicional e quando ele é útil?', tipo: 'dissertativo', gabarito: 'Breakpoint que só para quando uma condição específica é verdadeira. Útil em loops para parar apenas no elemento problemático.' }],
              intermediario: [{ id: 'dta-i1', enunciado: 'Execute o Lighthouse em um projeto seu e corrija pelo menos 2 problemas identificados. Mostre o before/after.', tipo: 'dissertativo' }],
              desafio: [{ id: 'dta-d1', enunciado: 'Use o Memory profiler do DevTools para identificar e corrigir um memory leak em uma página com event listeners não removidos.', tipo: 'dissertativo' }]
            },
            checklist: ['Uso breakpoints (incluindo condicionais)', 'Analiso requisições no Network', 'Já rodei o Lighthouse', 'Testei performance com o flame chart']
          },
          {
            id: 'npm', title: 'npm / yarn (básico)', estimatedMinutes: 45,
            difficulty: 'basico', tags: ['ferramentas', 'npm', 'pacotes'],
            conteudo: {
              resumo: 'npm (Node Package Manager) é o maior repositório de pacotes JavaScript. Com ele você instala, gerencia e publica bibliotecas e ferramentas.',
              conceitos: [
                'package.json: manifesto do projeto (dependências, scripts, metadados)',
                'npm install: instala dependências do package.json',
                'npm install pacote: adiciona nova dependência',
                'npm run script: executa um script definido no package.json',
                'node_modules: pasta onde os pacotes são instalados (não commitar!)',
                'package-lock.json: versões exatas instaladas (commitar)'
              ],
              explicacao: 'O package.json define o projeto. dependencies são necessárias em produção; devDependencies são apenas para desenvolvimento (testes, linters). Sempre commite o package-lock.json para garantir instalações reproducíveis. Nunca commite node_modules (coloque no .gitignore).',
              exemplos: [
                {
                  titulo: 'Comandos npm essenciais',
                  codigo: `# Iniciar novo projeto\nnpm init -y\n\n# Instalar dependência de produção\nnpm install axios\n\n# Instalar dependência de desenvolvimento\nnpm install --save-dev eslint prettier\n\n# Instalar tudo do package.json\nnpm install\n\n# Rodar script do package.json\nnpm run dev\nnpm run build\nnpm test\n\n# Remover pacote\nnpm uninstall axios\n\n# Ver pacotes desatualizados\nnpm outdated`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Commitar node_modules (pasta pesada, desnecessária e causa conflitos)',
                'Não usar package-lock.json (instalações diferentes em máquinas diferentes)'
              ],
              dicas: [
                'Sempre crie um .gitignore com node_modules antes do primeiro commit',
                'npx executa um pacote sem instalar: npx create-react-app meu-app'
              ],
              links: [{ titulo: 'Documentação npm', url: 'https://docs.npmjs.com' }],
              projetosRelacionados: ['Configurar um projeto com npm, .gitignore, ESLint e Prettier do zero']
            },
            exercicios: {
              fixacao: [{ id: 'npm-f1', enunciado: 'Qual a diferença entre dependencies e devDependencies no package.json?', tipo: 'dissertativo', gabarito: 'dependencies: necessárias em produção (runtime). devDependencies: apenas para desenvolvimento (testes, linters, ferramentas de build).' }],
              intermediario: [{ id: 'npm-i1', enunciado: 'Crie um projeto do zero: npm init, instale axios e eslint, crie scripts "dev" e "lint" no package.json.', tipo: 'dissertativo' }],
              desafio: [{ id: 'npm-d1', enunciado: 'Publique um pacote npm simples (pode ser um utilitário de formatação de strings) no registro público. Documente o processo.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo o package.json', 'Instalo e removo pacotes', 'Uso scripts npm', 'Nunca commito node_modules']
          },
          {
            id: 'vite', title: 'Vite (build tool)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['ferramentas', 'vite', 'build'],
            conteudo: {
              resumo: 'Vite é uma ferramenta de build moderna extremamente rápida. Usa ES modules nativos para dev server instantâneo e Rollup para builds otimizados de produção.',
              conceitos: [
                'Dev server: servidor de desenvolvimento com HMR (hot module replacement)',
                'HMR: atualiza apenas o módulo alterado sem recarregar a página inteira',
                'Build: empacota e otimiza para produção (minificação, tree-shaking)',
                'Tree-shaking: remove código não usado do bundle',
                'vite.config.js: configuração do projeto'
              ],
              explicacao: 'Vite é o padrão atual para novos projetos (substituiu o Create React App). É muito mais rápido que Webpack porque usa ES modules nativos em desenvolvimento. npm run dev inicia o servidor; npm run build gera os arquivos de produção em /dist.',
              exemplos: [
                {
                  titulo: 'Criar projeto com Vite',
                  codigo: `# Criar projeto React + TypeScript\nnpm create vite@latest meu-projeto -- --template react-ts\n\ncd meu-projeto\nnpm install\nnpm run dev\n\n# Outros templates disponíveis:\n# vanilla, vanilla-ts, react, react-ts\n# vue, vue-ts, svelte, svelte-ts`,
                  linguagem: 'bash'
                }
              ],
              errosComuns: [
                'Commitar a pasta /dist (gerada no build — não deve ser versionada)',
                'Usar variáveis de ambiente sem o prefixo VITE_ (não são expostas ao browser)'
              ],
              dicas: [
                'Variáveis de ambiente devem começar com VITE_: VITE_API_URL=https://...',
                'import.meta.env.VITE_NOME acessa a variável no código'
              ],
              links: [{ titulo: 'Vite — Documentação oficial', url: 'https://vitejs.dev/guide/' }],
              projetosRelacionados: ['Criar um projeto React + TypeScript com Vite do zero e fazer o deploy no Vercel']
            },
            exercicios: {
              fixacao: [{ id: 'vite-f1', enunciado: 'O que é HMR (Hot Module Replacement) e por que torna o desenvolvimento mais ágil?', tipo: 'dissertativo', gabarito: 'HMR atualiza apenas o módulo alterado no browser sem recarregar a página inteira, preservando o estado da aplicação.' }],
              intermediario: [{ id: 'vite-i1', enunciado: 'Crie um projeto com Vite + React. Configure uma variável de ambiente para a URL da API e use no código.', tipo: 'dissertativo' }],
              desafio: [{ id: 'vite-d1', enunciado: 'Configure o Vite para: código splitting por rotas, análise de bundle com rollup-plugin-visualizer e proxy de API para evitar CORS.', tipo: 'dissertativo' }]
            },
            checklist: ['Criei projeto com Vite', 'Entendo dev server e HMR', 'Sei fazer build para produção', 'Uso variáveis de ambiente com VITE_']
          },
          {
            id: 'semver', title: 'noções de versionamento semântico', estimatedMinutes: 20,
            difficulty: 'basico', tags: ['ferramentas', 'versionamento'],
            conteudo: {
              resumo: 'SemVer (Semantic Versioning) é a convenção padrão para versionar pacotes: MAJOR.MINOR.PATCH. Saber ler versões evita surpresas com atualizações.',
              conceitos: [
                'MAJOR (1.x.x): mudanças incompatíveis (breaking changes)',
                'MINOR (x.1.x): novas funcionalidades retrocompatíveis',
                'PATCH (x.x.1): correções de bugs retrocompatíveis',
                '^ (caret): aceita MINOR e PATCH mais recentes (^1.2.3 = >=1.2.3 <2.0.0)',
                '~ (tilde): aceita apenas PATCH mais recente (~1.2.3 = >=1.2.3 <1.3.0)'
              ],
              explicacao: 'No package.json, "react": "^18.2.0" significa que npm pode instalar qualquer 18.x.x >= 18.2.0, mas não 19.x.x. Isso evita breaking changes automáticos. NUNCA atualize MAJOR automaticamente — leia o changelog primeiro.',
              exemplos: [
                {
                  titulo: 'Lendo versões no package.json',
                  codigo: `{\n  "dependencies": {\n    "axios":    "^1.6.0",  // aceita 1.7.0, mas não 2.0.0\n    "react":    "^18.2.0", // aceita 18.3.0, mas não 19.0.0\n    "prettier": "~3.1.0"   // aceita 3.1.1, mas não 3.2.0\n  }\n}\n\n// Verificar versão instalada\nnpm list react\n\n// Atualizar para última versão compatível\nnpm update axios`,
                  linguagem: 'json'
                }
              ],
              errosComuns: [
                'Usar * no package.json (aceita qualquer versão — altamente imprevisível)',
                'Não ler o changelog antes de atualizar para uma MAJOR nova'
              ],
              dicas: [
                'npm outdated lista pacotes desatualizados com versões disponíveis',
                'Atualize pacotes um por um em PRs separados para facilitar rastrear problemas'
              ],
              links: [{ titulo: 'SemVer.org', url: 'https://semver.org/lang/pt-BR/' }],
              projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'sv-f1', enunciado: 'O que significa "^2.5.1" no package.json? Quais versões serão aceitas?', tipo: 'dissertativo', gabarito: 'Aceita qualquer versão >=2.5.1 e <3.0.0. Então: 2.5.2, 2.6.0, 2.9.9 — mas não 3.0.0.' }],
              intermediario: [{ id: 'sv-i1', enunciado: 'Execute npm outdated em um projeto. Liste os pacotes desatualizados e decida quais são seguros de atualizar e por quê.', tipo: 'dissertativo' }],
              desafio: [{ id: 'sv-d1', enunciado: 'Atualize um projeto de React 17 para React 18. Pesquise o migration guide e documente as mudanças necessárias.', tipo: 'dissertativo' }]
            },
            checklist: ['Entendo MAJOR.MINOR.PATCH', 'Sei ler ^ e ~ no package.json', 'Verifico o changelog antes de atualizar MAJOR', 'Uso npm outdated para ver atualizações']
          }
        ]
      }
    ]
  }
];
