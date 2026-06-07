const ADS_WEB = [
  {
    id: 'web-react', label: 'web / React', color: '#0ea5e9', icon: '⚛️',
    description: 'Desenvolvimento web moderno com React e ecossistema.',
    estimatedHours: 35, prerequisitos: ['estrutura-dados'],
    modulos: [
      {
        id: 'react-fundamentos', name: 'React: fundamentos', estimatedHours: 8,
        topicos: [
          {
            id: 'react-intro', title: 'React: componentes e JSX', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['react', 'jsx', 'componentes'],
            conteudo: {
              resumo: 'React é uma biblioteca JavaScript para construir interfaces de usuário declarativas e baseadas em componentes. Cada componente é uma função que retorna JSX.',
              conceitos: ['Componente: função que retorna JSX', 'JSX: sintaxe que parece HTML mas é JavaScript', 'Props: dados passados do pai para o filho', 'key: identificador único em listas', 'Fragment: <> </> para retornar múltiplos elementos sem wrapper'],
              explicacao: 'React atualiza apenas o que mudou no DOM (Virtual DOM diffing). JSX é transformado em React.createElement() pelo compilador. Um componente deve ser puro — dada as mesmas props, sempre retorna o mesmo JSX. Props são read-only — o filho não modifica props do pai.',
              exemplos: [{ titulo: 'Componente React básico com props e lista', codigo: `// Componente simples\nfunction Cartao({ titulo, descricao, cor }) {\n  return (\n    <div className="card" style={{ borderColor: cor }}>\n      <h2>{titulo}</h2>\n      <p>{descricao}</p>\n    </div>\n  );\n}\n\n// Lista com key\nfunction ListaCartoes({ itens }) {\n  return (\n    <div className="grid">\n      {itens.map(item => (\n        <Cartao\n          key={item.id}\n          titulo={item.titulo}\n          descricao={item.desc}\n          cor={item.cor}\n        />\n      ))}\n    </div>\n  );\n}\n\n// Uso\n<ListaCartoes itens={[\n  { id: 1, titulo: 'React', desc: 'Biblioteca UI', cor: 'blue' },\n  { id: 2, titulo: 'Vite',  desc: 'Build tool',   cor: 'purple' }\n]} />`, linguagem: 'jsx' }],
              errosComuns: ['Usar índice do array como key (quebra quando a ordem muda)', 'Modificar props diretamente (props são imutáveis)'],
              dicas: ['key deve ser único E estável — use IDs do banco, nunca índices', 'className em vez de class no JSX; htmlFor em vez de for'],
              links: [{ titulo: 'React — Documentação oficial', url: 'https://react.dev' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ri-f1', enunciado: 'Por que não usar o índice do array como key no React?', tipo: 'dissertativo', gabarito: 'Se a ordem dos itens muda (reordenar, deletar do meio), o React associa os elementos errados, causando bugs visuais e de estado.' }],
              intermediario: [{ id: 'ri-i1', enunciado: 'Crie um componente UserCard com avatar, nome, email e status online/offline. Use props para todos os dados.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'ri-d1', enunciado: 'Implemente um componente Table genérico que recebe columns e data como props e renderiza qualquer tabela de dados.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Sei criar componentes funcionais', 'Uso props corretamente', 'Sei renderizar listas com key', 'Entendo o que é JSX e como é compilado']
          },
          {
            id: 'react-hooks', title: 'hooks: useState e useEffect', estimatedMinutes: 90,
            difficulty: 'basico', tags: ['react', 'hooks', 'estado'],
            conteudo: {
              resumo: 'Hooks são funções que permitem usar estado e outros recursos do React em componentes funcionais. useState e useEffect são os mais fundamentais.',
              conceitos: ['useState: estado local do componente — rerenderiza ao mudar', 'useEffect: side effects (fetch, subscriptions, timers)', 'Array de dependências: controla quando o efeito executa', 'Cleanup: função retornada no useEffect para limpar recursos', 'Batching: React agrupa múltiplos setState em um único render'],
              explicacao: 'useState retorna [valor, setter]. Nunca mute o estado diretamente — use o setter. useEffect com [] executa apenas uma vez (componentDidMount). Com dependências, executa quando elas mudam. Sem array, executa a cada render. O cleanup previne memory leaks (cancelar fetch, remover listeners).',
              exemplos: [{ titulo: 'useState e useEffect para buscar dados', codigo: `import { useState, useEffect } from 'react';\n\nfunction ListaUsuarios() {\n  const [usuarios, setUsuarios]   = useState([]);\n  const [loading,  setLoading]    = useState(true);\n  const [erro,     setErro]       = useState(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n\n    async function buscar() {\n      try {\n        const res = await fetch('/api/usuarios', { signal: controller.signal });\n        const data = await res.json();\n        setUsuarios(data);\n      } catch (e) {\n        if (e.name !== 'AbortError') setErro(e.message);\n      } finally {\n        setLoading(false);\n      }\n    }\n\n    buscar();\n    return () => controller.abort(); // cleanup\n  }, []); // [] = executa uma vez\n\n  if (loading) return <p>Carregando...</p>;\n  if (erro)    return <p>Erro: {erro}</p>;\n  return <ul>{usuarios.map(u => <li key={u.id}>{u.nome}</li>)}</ul>;\n}`, linguagem: 'jsx' }],
              errosComuns: ['useEffect sem array de dependências — loop infinito se setState dentro', 'Não fazer cleanup em timers e subscriptions dentro de useEffect'],
              dicas: ['React StrictMode monta componentes duas vezes em dev para detectar side effects incorretos', 'Prefira bibliotecas de data fetching (TanStack Query, SWR) a useEffect para fetch'],
              links: [{ titulo: 'React — Hooks Reference', url: 'https://react.dev/reference/react' }], projetosRelacionados: ['Criar um app de clima que busca dados de API com useState + useEffect, com loading e error states']
            },
            exercicios: {
              fixacao: [{ id: 'rh-f1', enunciado: 'O que acontece se você chamar setCount dentro de useEffect sem array de dependências?', tipo: 'dissertativo', gabarito: 'Loop infinito: setCount → rerenderiza → useEffect executa → setCount → rerenderiza...' }],
              intermediario: [{ id: 'rh-i1', enunciado: 'Implemente um contador com incremento, decremento e reset usando useState. Adicione um efeito que atualiza o título da página com o valor atual.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'rh-d1', enunciado: 'Implemente um hook customizado useDebounce(value, delay) que retorna o valor debounced. Use para implementar busca em tempo real sem spam de requisições.', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Uso useState para gerenciar estado local', 'Entendo o array de dependências do useEffect', 'Faço cleanup em useEffect', 'Nunca muto o estado diretamente']
          },
          {
            id: 'react-context', title: 'Context API e estado global', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['react', 'context', 'estado global'],
            conteudo: {
              resumo: 'Context API resolve o "prop drilling" — passar props por muitos níveis desnecessariamente. Permite compartilhar estado entre componentes sem passar props manualmente.',
              conceitos: ['createContext: cria o contexto', 'Provider: fornece o valor para os filhos', 'useContext: consome o valor do contexto mais próximo', 'Prop drilling: problema que Context resolve', 'Re-render: todos os consumidores rerenderizam quando o valor muda'],
              explicacao: 'Context não é substituto do Zustand ou Redux para estado complexo — é para dados que mudam pouco (tema, usuário logado, idioma). Se o contexto muda frequentemente e tem muitos consumidores, causa re-renders desnecessários. Para estado complexo e performático, use Zustand.',
              exemplos: [{ titulo: 'Context de tema dark/light', codigo: `import { createContext, useContext, useState } from 'react';\n\nconst TemaContext = createContext(null);\n\nexport function TemaProvider({ children }) {\n  const [tema, setTema] = useState('dark');\n\n  const alternarTema = () =>\n    setTema(t => t === 'dark' ? 'light' : 'dark');\n\n  return (\n    <TemaContext.Provider value={{ tema, alternarTema }}>\n      {children}\n    </TemaContext.Provider>\n  );\n}\n\nexport function useTema() {\n  const ctx = useContext(TemaContext);\n  if (!ctx) throw new Error('useTema precisa estar dentro de TemaProvider');\n  return ctx;\n}\n\n// Uso em qualquer componente filho\nfunction BotaoTema() {\n  const { tema, alternarTema } = useTema();\n  return <button onClick={alternarTema}>Tema atual: {tema}</button>;\n}`, linguagem: 'jsx' }],
              errosComuns: ['Colocar estado que muda frequentemente no Context (causa re-renders em cascata)', 'Consumir Context fora do Provider (valor null)'],
              dicas: ['Crie sempre um hook customizado (useTema) para consumir o context — valida o uso fora do Provider', 'Para tema: combine Context com CSS variables — eficiente e elegante'],
              links: [], projetosRelacionados: ['Implementar tema dark/light usando Context API + CSS variables']
            },
            exercicios: {
              fixacao: [{ id: 'rctx-f1', enunciado: 'O que é prop drilling e como Context API resolve esse problema?', tipo: 'dissertativo', gabarito: 'Prop drilling: passar prop por 5 componentes só para chegar ao que usa. Context fornece o valor diretamente a qualquer descendente sem intermediários.' }],
              intermediario: [{ id: 'rctx-i1', enunciado: 'Crie um contexto de carrinho de compras com: adicionar item, remover item e exibir total. Use em 3 componentes diferentes.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'rctx-d1', enunciado: 'Implemente contexto de autenticação com: login, logout, usuário atual e proteção de rotas. Redirecione para login se não autenticado.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Crei contextos com createContext e Provider', 'Uso useContext para consumir', 'Sei quando usar Context vs estado local', 'Crio hooks customizados para encapsular Context']
          },
          {
            id: 'react-router', title: 'React Router (rotas e navegação)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['react', 'react-router', 'spa'],
            conteudo: {
              resumo: 'React Router é a biblioteca padrão para navegação em SPAs (Single Page Apps). Permite definir rotas sem recarregar a página, com parâmetros dinâmicos e rotas protegidas.',
              conceitos: ['BrowserRouter: router baseado em history API', 'Routes + Route: mapear URL para componente', 'Link / NavLink: navegar sem recarregar', 'useNavigate: navegação programática', 'useParams: ler parâmetros da URL (:id)', 'Outlet: renderizar filhos em layouts aninhados'],
              explicacao: 'SPA não recarrega a página ao navegar — o React Router intercepta o clique em Link e atualiza o componente. useNavigate() permite navegar via código (após login, redirecionar para dashboard). Rotas aninhadas com Outlet criam layouts compartilhados (sidebar + header + conteúdo).',
              exemplos: [{ titulo: 'Configuração de rotas com React Router v6', codigo: `import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path="/" element={<Layout />}>\n          <Route index element={<Home />} />\n          <Route path="produtos" element={<Produtos />} />\n          <Route path="produtos/:id" element={<DetalhesProduto />} />\n          <Route path="*" element={<NaoEncontrado />} />\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}\n\nfunction DetalhesProduto() {\n  const { id } = useParams();\n  const navigate = useNavigate();\n  // ...\n  return (\n    <div>\n      <h1>Produto {id}</h1>\n      <button onClick={() => navigate(-1)}>Voltar</button>\n    </div>\n  );\n}`, linguagem: 'jsx' }],
              errosComuns: ['Usar <a href> em vez de <Link> (recarrega a página)', 'Não definir rota 404 (path="*") — página em branco para URLs inválidas'],
              dicas: ['NavLink adiciona classe active automaticamente — ótimo para menus de navegação', 'useSearchParams() para ler/escrever query strings (?filtro=ativo)'],
              links: [{ titulo: 'React Router v6 — Documentação', url: 'https://reactrouter.com/en/main' }], projetosRelacionados: ['Criar SPA com 4 rotas, navegação por menu, rota protegida e página 404']
            },
            exercicios: {
              fixacao: [{ id: 'rr-f1', enunciado: 'Qual a diferença entre <Link> e <a> no React Router?', tipo: 'dissertativo', gabarito: 'Link intercepta o clique e atualiza o componente sem recarregar a página. <a href> faz uma requisição HTTP completa, recarregando o app.' }],
              intermediario: [{ id: 'rr-i1', enunciado: 'Implemente um sistema de rotas com: layout compartilhado (navbar), rota de lista e detalhe (/:id) e rota protegida que redireciona se não logado.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'rr-d1', enunciado: 'Implemente navegação com estado (passar dados entre rotas sem query string), breadcrumbs dinâmicos e scroll to top ao navegar.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Configuro rotas com Routes e Route', 'Uso Link em vez de <a>', 'Leio parâmetros com useParams', 'Navego programaticamente com useNavigate']
          }
        ]
      },
      {
        id: 'react-avancado', name: 'React: padrões avançados', estimatedHours: 6,
        topicos: [
          {
            id: 'hooks-avancados', title: 'hooks avançados (useCallback, useMemo, useRef)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['react', 'hooks', 'performance'],
            conteudo: {
              resumo: 'Hooks de otimização evitam cálculos e renders desnecessários. useRef acessa o DOM diretamente. Mas otimização prematura é ruim — só use quando houver problema real.',
              conceitos: ['useRef: referência mutável que não causa re-render', 'useMemo: memoiza o resultado de um cálculo pesado', 'useCallback: memoiza uma função (evita recriar a cada render)', 'React.memo: memoiza um componente — só rerenderiza se as props mudarem'],
              explicacao: 'useRef é usado para: acessar elementos DOM (ref.current), guardar valores mutáveis sem trigger re-render (como intervalos de timer). useMemo e useCallback só valem quando o custo de recomputar é maior que o custo de memoizar. Não use em cálculos simples.',
              exemplos: [{ titulo: 'useRef para timer e useMemo para cálculo pesado', codigo: `import { useRef, useMemo, useCallback, useState } from 'react';\n\nfunction Cronometro() {\n  const [tempo, setTempo] = useState(0);\n  const intervaloRef = useRef(null);\n\n  const iniciar = useCallback(() => {\n    if (intervaloRef.current) return;\n    intervaloRef.current = setInterval(() => setTempo(t => t + 1), 1000);\n  }, []);\n\n  const parar = useCallback(() => {\n    clearInterval(intervaloRef.current);\n    intervaloRef.current = null;\n  }, []);\n\n  return <div>{tempo}s <button onClick={iniciar}>▶</button> <button onClick={parar}>⏸</button></div>;\n}\n\n// useMemo para filtrar lista grande\nfunction ListaFiltrada({ itens, filtro }) {\n  const itensFiltrados = useMemo(\n    () => itens.filter(i => i.nome.includes(filtro)),\n    [itens, filtro] // recalcula só quando mudar\n  );\n  return <ul>{itensFiltrados.map(i => <li key={i.id}>{i.nome}</li>)}</ul>;\n}`, linguagem: 'jsx' }],
              errosComuns: ['useCallback em toda função — overhead desnecessário para funções simples', 'useMemo sem dependências corretas — resultados stale'],
              dicas: ['Regra prática: só memoize se o profiler do React mostrar problema real', 'useRef para guardar referência de setInterval/setTimeout sem causar re-render'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'ha-f1', enunciado: 'Quando devo usar useMemo vs useCallback?', tipo: 'dissertativo', gabarito: 'useMemo: memoizar o resultado de um cálculo (retorna valor). useCallback: memoizar uma função (retorna função). Ambos evitam recomputação desnecessária.' }],
              intermediario: [{ id: 'ha-i1', enunciado: 'Use React.memo e useCallback para otimizar uma lista de 1000 itens onde cada item tem um botão de ação.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'ha-d1', enunciado: 'Use o React DevTools Profiler para identificar quais componentes estão re-renderizando desnecessariamente em um app existente e corrija-os.', tipo: 'dissertativo' }]
            },
            checklist: ['Sei para que serve useRef', 'Uso useMemo apenas para cálculos realmente pesados', 'Entendo a diferença entre useMemo e useCallback', 'Conheço React.memo']
          },
          {
            id: 'forms-react', title: 'formulários com React Hook Form', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['react', 'formulários', 'validação'],
            conteudo: {
              resumo: 'React Hook Form é a biblioteca mais performática para formulários em React. Usa refs em vez de estado, evitando re-renders a cada keystroke.',
              conceitos: ['register: registra o input no form', 'handleSubmit: wrapper da função de submit', 'formState.errors: erros de validação por campo', 'watch: observa o valor de um campo em tempo real', 'Controller: para componentes de UI não nativos'],
              explicacao: 'Formulários controlados com useState causam re-render a cada digitação. RHF usa refs — o valor fica no DOM até o submit. Integra com Zod via @hookform/resolvers para validação tipada. watch() observa campos específicos em tempo real quando necessário.',
              exemplos: [{ titulo: 'Formulário com React Hook Form + Zod', codigo: `import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { z } from 'zod';\n\nconst Schema = z.object({\n  nome:  z.string().min(2, 'Nome muito curto'),\n  email: z.string().email('E-mail inválido'),\n  senha: z.string().min(8, 'Mínimo 8 caracteres')\n});\n\nfunction FormCadastro() {\n  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({\n    resolver: zodResolver(Schema)\n  });\n\n  async function onSubmit(data) {\n    await fetch('/api/users', { method: 'POST', body: JSON.stringify(data) });\n  }\n\n  return (\n    <form onSubmit={handleSubmit(onSubmit)}>\n      <input {...register('nome')} placeholder="Nome" />\n      {errors.nome && <span>{errors.nome.message}</span>}\n\n      <input {...register('email')} type="email" />\n      {errors.email && <span>{errors.email.message}</span>}\n\n      <button disabled={isSubmitting}>\n        {isSubmitting ? 'Enviando...' : 'Cadastrar'}\n      </button>\n    </form>\n  );\n}`, linguagem: 'jsx' }],
              errosComuns: ['Re-implementar validação que já existe no Zod (duplicar lógica)', 'Usar watch() em muitos campos (re-renders desnecessários)'],
              dicas: ['isSubmitting desabilita o botão automaticamente durante o submit', 'reset() limpa o formulário após submit bem-sucedido'],
              links: [{ titulo: 'React Hook Form — Documentação', url: 'https://react-hook-form.com' }], projetosRelacionados: ['Criar formulário multistep com React Hook Form, validação por etapa e resumo final']
            },
            exercicios: {
              fixacao: [{ id: 'rhf-f1', enunciado: 'Por que React Hook Form é mais performático que formulários controlados com useState?', tipo: 'dissertativo', gabarito: 'Usa refs em vez de estado — o DOM mantém os valores sem causar re-render a cada keystroke.' }],
              intermediario: [{ id: 'rhf-i1', enunciado: 'Implemente formulário de login com RHF + Zod: validar email e senha, mostrar erros inline e exibir loading no botão durante o submit.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'rhf-d1', enunciado: 'Implemente um formulário dinâmico com useFieldArray (lista de campos que o usuário pode adicionar/remover) para cadastro de múltiplos endereços.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Uso React Hook Form para formulários', 'Integro com Zod para validação', 'Exibo erros por campo', 'Trato loading e erros do submit']
          }
        ]
      },
      {
        id: 'estado-global-mod', name: 'gerenciamento de estado', estimatedHours: 4,
        topicos: [
          {
            id: 'zustand', title: 'Zustand: estado global simples', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['react', 'zustand', 'estado global'],
            conteudo: {
              resumo: 'Zustand é a biblioteca de estado global mais simples e performática para React. Substitui Redux na maioria dos casos com 1/10 do boilerplate.',
              conceitos: ['create: cria uma store', 'get: ler estado atual', 'set: atualizar estado', 'Selector: ler apenas parte do estado (evita re-renders)', 'Devtools middleware: integração com Redux DevTools'],
              explicacao: 'Diferente do Context, Zustand só rerenderiza componentes que usam o slice de estado que mudou. Não precisa de Provider. A store é um hook — basta importar e usar. persist middleware salva automaticamente no localStorage.',
              exemplos: [{ titulo: 'Zustand: store de carrinho', codigo: `import { create } from 'zustand';\nimport { persist } from 'zustand/middleware';\n\nconst useCarrinho = create(persist(\n  (set, get) => ({\n    itens: [],\n    total: 0,\n\n    adicionar: (produto) => set(state => {\n      const existe = state.itens.find(i => i.id === produto.id);\n      const itens = existe\n        ? state.itens.map(i => i.id === produto.id ? { ...i, qtd: i.qtd + 1 } : i)\n        : [...state.itens, { ...produto, qtd: 1 }];\n      return { itens, total: itens.reduce((acc, i) => acc + i.preco * i.qtd, 0) };\n    }),\n\n    remover: (id) => set(state => {\n      const itens = state.itens.filter(i => i.id !== id);\n      return { itens, total: itens.reduce((acc, i) => acc + i.preco * i.qtd, 0) };\n    }),\n  }),\n  { name: 'carrinho-storage' }\n));\n\n// Uso no componente\nfunction Botao({ produto }) {\n  const adicionar = useCarrinho(s => s.adicionar); // selector\n  return <button onClick={() => adicionar(produto)}>Adicionar</button>;\n}`, linguagem: 'javascript' }],
              errosComuns: ['Chamar useCarrinho() sem selector — rerenderiza em qualquer mudança do estado', 'Mutar o estado diretamente (sempre use set() com spread)'],
              dicas: ['Use shallow da zustand para comparação de objetos em selectors', 'devtools middleware integra com Redux DevTools Extension para debug'],
              links: [{ titulo: 'Zustand — Documentação', url: 'https://zustand-demo.pmnd.rs' }], projetosRelacionados: ['Criar um carrinho de compras com Zustand: adicionar, remover, aumentar quantidade e persistir no localStorage']
            },
            exercicios: {
              fixacao: [{ id: 'zus-f1', enunciado: 'Por que usar seletores no Zustand? O que acontece sem eles?', tipo: 'dissertativo', gabarito: 'Sem selector, o componente rerenderiza sempre que qualquer parte do estado mudar. Com selector, só rerenderiza quando o slice selecionado muda.' }],
              intermediario: [{ id: 'zus-i1', enunciado: 'Crie uma store Zustand para gerenciar autenticação: usuário, token, login e logout. Persistir com middleware persist.', tipo: 'codigo', linguagem: 'javascript' }],
              desafio: [{ id: 'zus-d1', enunciado: 'Implemente undo/redo em uma store Zustand usando o padrão de histórico de estados (array de snapshots + índice atual).', tipo: 'codigo', linguagem: 'javascript' }]
            },
            checklist: ['Crio stores com Zustand', 'Uso seletores para evitar re-renders desnecessários', 'Persisto estado com middleware persist', 'Entendo quando usar Context vs Zustand']
          }
        ]
      },
      {
        id: 'data-fetching-mod', name: 'data fetching e cache', estimatedHours: 4,
        topicos: [
          {
            id: 'tanstack-query', title: 'TanStack Query (React Query)', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['react', 'react-query', 'cache'],
            conteudo: {
              resumo: 'TanStack Query resolve o gerenciamento de dados assíncronos: cache automático, refetch, loading/error states, paginação e sincronização em background.',
              conceitos: ['useQuery: buscar e cachear dados', 'useMutation: criar/atualizar/deletar dados', 'QueryClient: gerencia o cache global', 'staleTime: quanto tempo os dados são considerados frescos', 'invalidateQueries: invalidar cache após mutação'],
              explicacao: 'Com TanStack Query, você não gerencia mais loading/error/data com useState + useEffect. useQuery faz isso automaticamente. O cache evita requests repetidas — navegar para uma página e voltar não faz novo fetch (se dados ainda frescos). invalidateQueries após mutação atualiza os dados automaticamente.',
              exemplos: [{ titulo: 'useQuery e useMutation', codigo: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';\n\nconst queryClient = new QueryClient();\n\nfunction Usuarios() {\n  const { data, isLoading, error } = useQuery({\n    queryKey: ['usuarios'],\n    queryFn: () => fetch('/api/usuarios').then(r => r.json()),\n    staleTime: 5 * 60 * 1000 // 5 minutos\n  });\n\n  if (isLoading) return <p>Carregando...</p>;\n  if (error)    return <p>Erro: {error.message}</p>;\n\n  return <ul>{data.map(u => <li key={u.id}>{u.nome}</li>)}</ul>;\n}\n\nfunction CriarUsuario() {\n  const qc = useQueryClient();\n  const mutation = useMutation({\n    mutationFn: (data) => fetch('/api/usuarios', {\n      method: 'POST',\n      body: JSON.stringify(data)\n    }),\n    onSuccess: () => qc.invalidateQueries({ queryKey: ['usuarios'] })\n  });\n\n  return <button onClick={() => mutation.mutate({ nome: 'Novo' })}>Criar</button>;\n}`, linguagem: 'jsx' }],
              errosComuns: ['queryKey inconsistente para o mesmo recurso — cria caches duplicados', 'Não invalidar queries após mutações — dados ficam stale na UI'],
              dicas: ['queryKey como array: [\'usuarios\', filtro] faz cache separado por filtro', 'prefetchQuery pré-busca dados de uma rota que o usuário provavelmente vai visitar'],
              links: [{ titulo: 'TanStack Query — Documentação', url: 'https://tanstack.com/query/latest' }], projetosRelacionados: ['Refatorar um app que usa useEffect + fetch para TanStack Query e observar a diferença em UX']
            },
            exercicios: {
              fixacao: [{ id: 'tq-f1', enunciado: 'O que faz invalidateQueries após uma mutação?', tipo: 'dissertativo', gabarito: 'Marca o cache da query como stale e faz novo fetch, garantindo que os dados exibidos estejam atualizados.' }],
              intermediario: [{ id: 'tq-i1', enunciado: 'Implemente paginação com TanStack Query: useQuery com page como parâmetro, botões de anterior/próximo e keepPreviousData.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'tq-d1', enunciado: 'Implemente infinite scroll com useInfiniteQuery. A lista deve carregar mais itens ao rolar para o fim da página.', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Uso useQuery para buscar dados', 'Uso useMutation para modificar dados', 'Invalido queries após mutações', 'Entendo como o cache do TanStack Query funciona']
          }
        ]
      },
      {
        id: 'styling-mod', name: 'estilização em React', estimatedHours: 3,
        topicos: [
          {
            id: 'tailwind', title: 'Tailwind CSS', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['css', 'tailwind', 'estilização'],
            conteudo: {
              resumo: 'Tailwind CSS é um framework utility-first — em vez de classes semânticas (.btn), você usa classes utilitárias (flex items-center bg-blue-500). Muito popular com React.',
              conceitos: ['Utility-first: classes atômicas no HTML', 'Responsividade: prefixos md: lg: xl:', 'Estado: hover: focus: dark: active:', '@apply: extrair classes para CSS customizado', 'tailwind.config.js: customizar o design system'],
              explicacao: 'Tailwind gera apenas as classes que você usa — bundle muito pequeno em produção. A crítica é "HTML sujo com classes demais" — mas elimina context switching entre CSS e HTML. Para componentes reutilizáveis com muitas classes, use cva (class-variance-authority) para variantes.',
              exemplos: [{ titulo: 'Componente com Tailwind', codigo: `// Botão com variantes\nfunction Button({ children, variant = 'primary', size = 'md', onClick }) {\n  const base = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';\n  const variants = {\n    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300',\n    ghost:   'bg-transparent text-gray-700 hover:bg-gray-100'\n  };\n  const sizes = {\n    sm: 'px-3 py-1.5 text-sm',\n    md: 'px-4 py-2 text-base',\n    lg: 'px-6 py-3 text-lg'\n  };\n\n  return (\n    <button\n      className={\`\${base} \${variants[variant]} \${sizes[size]}\`}\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n}`, linguagem: 'jsx' }],
              errosComuns: ['Estender classes Tailwind com strings concatenadas (breaking purge/JIT)', 'Não configurar o content no tailwind.config.js (classes não geradas)'],
              dicas: ['Extensão "Tailwind CSS IntelliSense" para VSCode é obrigatória', 'Use cn() (clsx + tailwind-merge) para combinar classes condicionalmente'],
              links: [{ titulo: 'Tailwind CSS — Documentação', url: 'https://tailwindcss.com/docs' }], projetosRelacionados: ['Reconstruir um componente de UI complexo (modal, dropdown, tabela) usando apenas Tailwind']
            },
            exercicios: {
              fixacao: [{ id: 'tw-f1', enunciado: 'Como fazer um elemento azul em mobile e verde em desktop com Tailwind?', tipo: 'dissertativo', gabarito: 'className="bg-blue-500 md:bg-green-500" — o prefixo md: aplica em telas >= 768px.' }],
              intermediario: [{ id: 'tw-i1', enunciado: 'Construa um card de produto com Tailwind: imagem, nome, preço, badge de desconto e botão "adicionar ao carrinho" com hover state.', tipo: 'codigo', linguagem: 'jsx' }],
              desafio: [{ id: 'tw-d1', enunciado: 'Implemente um componente Button com 3 variantes (primary, secondary, danger) e 3 tamanhos usando cva (class-variance-authority).', tipo: 'codigo', linguagem: 'jsx' }]
            },
            checklist: ['Configuro Tailwind em projeto Vite/React', 'Uso classes de layout (flex, grid, gap)', 'Uso responsividade com prefixos md: lg:', 'Crio componentes reutilizáveis com variantes']
          }
        ]
      }
    ]
  }
];
