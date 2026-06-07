const ADS_JAVA = [
  {
    id: 'java', label: 'Java', color: '#f97316', icon: '☕',
    description: 'Linguagem orientada a objetos usada em back-end, mobile e sistemas corporativos.',
    estimatedHours: 25, prerequisitos: [],
    modulos: [
      {
        id: 'java-fundamentos', name: 'fundamentos Java', estimatedHours: 6,
        topicos: [
          {
            id: 'java-sintaxe', title: 'sintaxe e tipos de dados', estimatedMinutes: 60,
            difficulty: 'basico', tags: ['java', 'sintaxe'],
            conteudo: {
              resumo: 'Java é uma linguagem fortemente tipada, orientada a objetos e compilada para bytecode. Roda na JVM — mesma versão funciona em qualquer sistema operacional.',
              conceitos: ['Tipos primitivos: int, double, boolean, char, long, float', 'Tipos de referência: String, arrays, objetos', 'Declaração de variáveis: tipo nome = valor', 'Wrapper classes: Integer, Double, Boolean (auto-boxing)', 'final: constante', 'var (Java 10+): inferência de tipo local'],
              explicacao: 'Diferente de JavaScript, Java tem tipagem estática forte — você declara o tipo de cada variável e ele não muda. String em Java é um objeto (não primitivo). == em Strings compara referência, não conteúdo — use .equals(). O main é o ponto de entrada: public static void main(String[] args).',
              exemplos: [{ titulo: 'Estrutura básica e tipos em Java', codigo: `public class Main {\n    public static void main(String[] args) {\n        // Tipos primitivos\n        int idade = 22;\n        double altura = 1.75;\n        boolean ativo = true;\n        char letra = 'A';\n\n        // String (objeto)\n        String nome = "Davi";\n        String sobrenome = new String("Rodrigues");\n\n        // NUNCA use == para Strings\n        System.out.println(nome.equals("Davi"));    // true\n        System.out.println(nome == "Davi");          // true (pool) — não confie nisso\n        System.out.println(sobrenome == "Rodrigues"); // false (objetos diferentes)\n\n        // Template string equivalente (Java 15+)\n        System.out.println("Olá, %s! Você tem %d anos.".formatted(nome, idade));\n\n        // var (inferência)\n        var lista = new ArrayList<String>(); // Java infere ArrayList<String>\n    }\n}`, linguagem: 'java' }],
              errosComuns: ['Usar == para comparar Strings (compara referência, não conteúdo)', 'Confundir int com Integer — int é primitivo, Integer é objeto nullable'],
              dicas: ['Use .equals() ou Objects.equals(a, b) para comparar Strings e objetos', 'String.format() ou "texto".formatted() para formatação (Java 15+)'],
              links: [{ titulo: 'Documentação Java — Oracle', url: 'https://docs.oracle.com/en/java/javase/21/' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'jsyn-f1', enunciado: 'Por que usar .equals() e não == para comparar Strings em Java?', tipo: 'dissertativo', gabarito: '== compara referências de memória (se são o mesmo objeto). .equals() compara o conteúdo das strings.' }],
              intermediario: [{ id: 'jsyn-i1', enunciado: 'Crie uma classe Calculadora com métodos estáticos: soma, subtracao, multiplicacao e divisao (que lança ArithmeticException ao dividir por zero).', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'jsyn-d1', enunciado: 'Implemente a sequência de Fibonacci iterativamente e recursivamente em Java. Compare a performance para n=40.', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Entendo tipos primitivos vs tipos de referência', 'Uso .equals() para comparar Strings', 'Sei criar e executar um programa Java básico', 'Conheço a estrutura do método main']
          },
          {
            id: 'java-oo', title: 'OO em Java: classes, herança, interfaces', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['java', 'oo', 'herança'],
            conteudo: {
              resumo: 'Java é fortemente orientado a objetos. Herança simples, implementação de múltiplas interfaces, modificadores de acesso (public, private, protected) e polimorfismo são pilares da linguagem.',
              conceitos: ['class e extends: herança simples', 'interface: contrato sem implementação (default methods desde Java 8)', 'abstract: classe/método que deve ser sobrescrito', 'Modificadores: public, private, protected, package-private', 'super: referencia o pai', 'Polimorfismo: mesmo método, comportamentos diferentes'],
              explicacao: 'Java permite herança de apenas uma classe, mas implementação de múltiplas interfaces. Interfaces com default methods (Java 8+) têm implementação parcial. Modificadores de acesso: private = só a classe; protected = a classe e filhos; public = todos; sem modificador = mesmo pacote.',
              exemplos: [{ titulo: 'Herança, interface e polimorfismo', codigo: `// Interface\npublic interface Pagavel {\n    double calcularTotal();\n    default String descricao() { return "Pagamento de " + calcularTotal(); }\n}\n\n// Classe abstrata\npublic abstract class Veiculo {\n    protected String placa;\n    protected double valorDiaria;\n\n    public Veiculo(String placa, double valorDiaria) {\n        this.placa = placa;\n        this.valorDiaria = valorDiaria;\n    }\n\n    public abstract String tipo();\n}\n\n// Concreta: herda de Veiculo e implementa Pagavel\npublic class Carro extends Veiculo implements Pagavel {\n    private int dias;\n\n    public Carro(String placa, double diaria, int dias) {\n        super(placa, diaria);\n        this.dias = dias;\n    }\n\n    @Override public String tipo() { return "Carro"; }\n    @Override public double calcularTotal() { return valorDiaria * dias; }\n}`, linguagem: 'java' }],
              errosComuns: ['Esquecer @Override (código compila mas não sobrescreve o método do pai)', 'Acessar membros private do pai diretamente no filho (use protected ou getter)'],
              dicas: ['@Override é opcional mas obrigatório por convenção — o compilador valida se realmente sobrescreve', 'Programe para interfaces, não implementações: List<String> lista = new ArrayList<>()'],
              links: [], projetosRelacionados: ['Modelar um sistema de locadora com Veiculo, Carro, Moto, Cliente e Locacao usando herança e interfaces']
            },
            exercicios: {
              fixacao: [{ id: 'joo-f1', enunciado: 'Qual a diferença entre classe abstrata e interface em Java?', tipo: 'dissertativo', gabarito: 'Classe abstrata: pode ter estado, construtores e implementações. Interface: apenas contratos (+ default methods). Uma classe pode implementar N interfaces mas herdar de apenas 1 classe.' }],
              intermediario: [{ id: 'joo-i1', enunciado: 'Crie a hierarquia: Animal → Mamifero, Ave → Cachorro, Gato, Pinguim, Papagaio. Implemente interface Nadador para animais que nadam e Voador para os que voam.', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'joo-d1', enunciado: 'Implemente o padrão Observer em Java: um EventBus onde objetos se inscrevem para receber notificações de eventos específicos.', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Crio hierarquias com extends e implements', 'Uso @Override corretamente', 'Entendo a diferença entre abstract e interface', 'Aplico modificadores de acesso adequados']
          },
          {
            id: 'java-collections', title: 'Collections (List, Map, Set)', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['java', 'collections'],
            conteudo: {
              resumo: 'O Java Collections Framework oferece implementações eficientes de estruturas de dados: ArrayList, LinkedList, HashMap, TreeMap, HashSet — cada uma com trade-offs de performance.',
              conceitos: ['List: sequência ordenada com duplicados (ArrayList, LinkedList)', 'Set: sem duplicados (HashSet O(1), TreeSet ordenado O(log n))', 'Map: pares chave-valor (HashMap O(1), TreeMap ordenado)', 'Collections.sort() vs Comparable vs Comparator', 'Iterator e for-each'],
              explicacao: 'ArrayList é O(1) para acesso por índice; LinkedList é O(1) para inserção/remoção nas extremidades. HashMap é O(1) para get/put com boa função hash. Use generics sempre: List<String> em vez de List (raw type — gera warnings e erros em runtime).',
              exemplos: [{ titulo: 'Collections e ordenação customizada', codigo: `import java.util.*;\n\npublic class ExemploCollections {\n    public static void main(String[] args) {\n        // List\n        List<String> nomes = new ArrayList<>(List.of("Davi", "Ana", "Carlos"));\n        nomes.add("Bruno");\n        Collections.sort(nomes); // ordena in-place\n\n        // Map\n        Map<String, Integer> notas = new HashMap<>();\n        notas.put("Matemática", 9);\n        notas.put("Java", 10);\n        notas.getOrDefault("Física", 0); // evita NullPointerException\n\n        // Set para unicidade\n        Set<String> visitados = new HashSet<>();\n        visitados.add("página1");\n        visitados.contains("página1"); // O(1)\n\n        // Ordenar objetos com Comparator\n        List<Produto> produtos = ...; // lista de produtos\n        produtos.sort(Comparator\n            .comparingDouble(Produto::getPreco)\n            .thenComparing(Produto::getNome));\n    }\n}`, linguagem: 'java' }],
              errosComuns: ['ConcurrentModificationException ao remover item de List durante for-each (use Iterator ou removeIf)', 'NullPointerException ao usar Map.get() sem verificar null — prefira getOrDefault()'],
              dicas: ['List.of() e Map.of() criam coleções imutáveis (Java 9+)', 'removeIf(predicate) remove elementos que satisfazem a condição — seguro e conciso'],
              links: [], projetosRelacionados: ['Implementar um sistema de estoque usando Map para produtos e Set para categorias']
            },
            exercicios: {
              fixacao: [{ id: 'jcol-f1', enunciado: 'Quando usar HashSet vs TreeSet?', tipo: 'dissertativo', gabarito: 'HashSet: O(1) para add/contains/remove, sem ordem. TreeSet: O(log n), mantém elementos ordenados. Use TreeSet quando precisar iterar em ordem.' }],
              intermediario: [{ id: 'jcol-i1', enunciado: 'Dado uma lista de palavras, use Map<String, Integer> para contar a frequência de cada palavra e retorne as 5 mais frequentes.', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'jcol-d1', enunciado: 'Implemente uma versão simplificada do LRU Cache (Least Recently Used) usando LinkedHashMap com accessOrder=true.', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Uso ArrayList, HashMap e HashSet com fluência', 'Ordeno coleções com Comparator', 'Evito NullPointerException com getOrDefault', 'Uso generics sempre (sem raw types)']
          }
        ]
      },
      {
        id: 'java-streams', name: 'Streams e Lambdas', estimatedHours: 4,
        topicos: [
          {
            id: 'lambdas', title: 'lambdas e functional interfaces', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['java', 'lambda', 'funcional'],
            conteudo: {
              resumo: 'Lambdas (Java 8+) permitem tratar funções como valores. Functional interfaces têm exatamente um método abstrato e podem ser implementadas com lambdas.',
              conceitos: ['Lambda: (params) -> expressão', 'Functional interface: interface com um método abstrato', 'Predicate<T>: T → boolean', 'Function<T,R>: T → R', 'Consumer<T>: T → void', 'Supplier<T>: () → T', 'Method reference: Classe::metodo'],
              explicacao: 'Lambdas eliminam o boilerplate de classes anônimas. Uma Comparator antes exigia 4 linhas de classe anônima; com lambda é uma linha. Method references são lambdas ainda mais concisas: str -> str.toUpperCase() equivale a String::toUpperCase.',
              exemplos: [{ titulo: 'Lambdas e method references', codigo: `import java.util.function.*;\nimport java.util.*;\n\n// Lambda\nPredicate<String> ehVazio = s -> s.isEmpty();\nFunction<String, Integer> tamanho = String::length; // method ref\nConsumer<String> imprimir = System.out::println;   // method ref\n\n// Composição de funções\nPredicate<String> naoVazio = ehVazio.negate();\nPredicate<String> curto = s -> s.length() < 5;\nPredicate<String> curtoENaoVazio = naoVazio.and(curto);\n\n// Antes (classe anônima)\nComparator<String> comp1 = new Comparator<String>() {\n    @Override\n    public int compare(String a, String b) { return a.compareTo(b); }\n};\n\n// Depois (lambda)\nComparator<String> comp2 = String::compareTo;\n\n// Uso\nList<String> nomes = Arrays.asList("Davi", "Ana", "Bruno");\nnomes.removeIf(ehVazio);\nnomes.forEach(imprimir);`, linguagem: 'java' }],
              errosComuns: ['Tentar modificar variáveis externas dentro de lambda (devem ser effectively final)', 'Confusion entre Predicate.not() e .negate() — ambos negam, mas Predicate.not() é static'],
              dicas: ['Predicate.not(String::isEmpty) é mais legível que s -> !s.isEmpty()', 'Use method references sempre que possível — código mais limpo e intenção mais clara'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'lmb-f1', enunciado: 'O que é uma functional interface? Por que lambdas só funcionam com elas?', tipo: 'dissertativo', gabarito: 'Functional interface tem exatamente 1 método abstrato. O compilador Java sabe qual método o lambda implementa porque há apenas uma opção.' }],
              intermediario: [{ id: 'lmb-i1', enunciado: 'Implemente uma função que recebe uma List<String> e um Predicate<String> e retorna quantas strings satisfazem o predicado.', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'lmb-d1', enunciado: 'Crie uma pipeline de transformação genérica: Function<T,T>[] que aplica uma série de transformações em sequência usando Function.andThen().', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Escrevo lambdas simples e compostas', 'Conheço Predicate, Function, Consumer e Supplier', 'Uso method references', 'Entendo que variáveis capturadas devem ser effectively final']
          },
          {
            id: 'streams-api', title: 'Stream API', estimatedMinutes: 90,
            difficulty: 'intermediario', tags: ['java', 'streams', 'funcional'],
            conteudo: {
              resumo: 'Stream API (Java 8+) permite processar coleções de forma declarativa e funcional: filtrar, transformar, reduzir — similar ao map/filter/reduce do JavaScript.',
              conceitos: ['stream(): criar stream de coleção', 'filter(predicate): filtrar elementos', 'map(function): transformar', 'reduce(identity, accumulator): reduzir a um valor', 'collect(Collectors.*): materializar resultado', 'flatMap: achatar streams aninhadas', 'Streams paralelas: parallelStream()'],
              explicacao: 'Streams são lazy — a operação só executa quando há uma operação terminal (collect, count, findFirst). Streams intermediárias (filter, map) retornam Stream; terminais (collect, count, forEach) produzem resultado. Uma stream só pode ser consumida uma vez.',
              exemplos: [{ titulo: 'Stream API: filtrar, transformar e coletar', codigo: `import java.util.stream.*;\nimport java.util.*;\n\nrecord Produto(String nome, double preco, String categoria) {}\n\nList<Produto> produtos = List.of(\n    new Produto("Notebook", 3500, "eletronico"),\n    new Produto("Mouse", 150, "eletronico"),\n    new Produto("Camiseta", 80, "vestuario")\n);\n\n// Filtrar, transformar e coletar\nList<String> nomesCaros = produtos.stream()\n    .filter(p -> p.preco() > 100)\n    .sorted(Comparator.comparingDouble(Produto::preco).reversed())\n    .map(Produto::nome)\n    .collect(Collectors.toList());\n\n// Agrupar por categoria\nMap<String, List<Produto>> porCategoria = produtos.stream()\n    .collect(Collectors.groupingBy(Produto::categoria));\n\n// Total por categoria\nMap<String, Double> totalPorCat = produtos.stream()\n    .collect(Collectors.groupingBy(\n        Produto::categoria,\n        Collectors.summingDouble(Produto::preco)\n    ));\n\n// Soma total\ndouble total = produtos.stream()\n    .mapToDouble(Produto::preco)\n    .sum();`, linguagem: 'java' }],
              errosComuns: ['Reutilizar uma stream após operação terminal (IllegalStateException)', 'Usar parallelStream() sem medir — overhead pode tornar mais lento para coleções pequenas'],
              dicas: ['Collectors.groupingBy é o groupBy/reduce mais útil do Java', 'mapToInt/mapToDouble evitam boxing/unboxing e têm sum(), average(), max(), min()'],
              links: [{ titulo: 'Baeldung — Java Streams', url: 'https://www.baeldung.com/java-8-streams' }], projetosRelacionados: ['Processar um arquivo CSV de vendas com Stream API: filtrar, agrupar, calcular totais e exportar relatório']
            },
            exercicios: {
              fixacao: [{ id: 'str-f1', enunciado: 'O que são operações intermediárias e terminais em Stream API?', tipo: 'dissertativo', gabarito: 'Intermediárias (filter, map, sorted): retornam Stream, são lazy. Terminais (collect, count, forEach): produzem resultado ou side effect, iniciam a execução.' }],
              intermediario: [{ id: 'str-i1', enunciado: 'Dada uma lista de funcionários (nome, salário, departamento), use Streams para: calcular o salário médio por departamento, listar os 3 mais bem pagos e contar por departamento.', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'str-d1', enunciado: 'Processe um arquivo de log linha por linha com Stream. Extraia as linhas de ERROR, agrupe por hora e calcule a taxa de erros por hora.', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Uso filter, map, collect com fluência', 'Uso Collectors.groupingBy', 'Entendo lazy evaluation em Streams', 'Uso mapToInt/mapToDouble para operações numéricas']
          }
        ]
      },
      {
        id: 'java-excecoes', name: 'exceções e I/O', estimatedHours: 3,
        topicos: [
          {
            id: 'excecoes', title: 'exceções (checked, unchecked, custom)', estimatedMinutes: 45,
            difficulty: 'intermediario', tags: ['java', 'exceções', 'erros'],
            conteudo: {
              resumo: 'Java tem sistema robusto de exceções. Checked exceptions obrigam tratamento em tempo de compilação; unchecked (RuntimeException) são opcionais.',
              conceitos: ['try-catch-finally: captura e limpeza de recursos', 'throws: declara exceções checked que o método pode lançar', 'throw: lança uma exceção', 'Checked: IOException, SQLException — obrigatório tratar ou declarar', 'Unchecked: NullPointerException, IllegalArgumentException — opcional', 'Custom exception: criar sua própria exceção'],
              explicacao: 'Regra de ouro: lance exceções específicas (IllegalArgumentException para argumento inválido), nunca capture Exception genérica a não ser na borda do sistema. try-with-resources fecha automaticamente recursos que implementam AutoCloseable — prefira a try-finally manual.',
              exemplos: [{ titulo: 'Exceção customizada e try-with-resources', codigo: `// Exceção customizada\npublic class SaldoInsuficienteException extends RuntimeException {\n    private final double saldo;\n    private final double tentativa;\n\n    public SaldoInsuficienteException(double saldo, double tentativa) {\n        super("Saldo %.2f insuficiente para saque de %.2f".formatted(saldo, tentativa));\n        this.saldo = saldo;\n        this.tentativa = tentativa;\n    }\n\n    public double getSaldo() { return saldo; }\n}\n\n// try-with-resources (fecha arquivo automaticamente)\ntry (var reader = new BufferedReader(new FileReader("dados.txt"))) {\n    String linha;\n    while ((linha = reader.readLine()) != null) {\n        System.out.println(linha);\n    }\n} catch (IOException e) {\n    System.err.println("Erro ao ler arquivo: " + e.getMessage());\n}\n// reader é fechado automaticamente mesmo em caso de exceção`, linguagem: 'java' }],
              errosComuns: ['Capturar Exception genérica — mascara bugs', 'Engolir exceção com catch vazio: catch(Exception e) {} — nunca faça isso'],
              dicas: ['RuntimeException para problemas de programação; checked exceptions para problemas recuperáveis', 'Sempre inclua a causa original: new RuntimeException("msg", causaOriginal) para não perder o stack trace'],
              links: [], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'exc-f1', enunciado: 'Qual a diferença entre checked e unchecked exceptions em Java?', tipo: 'dissertativo', gabarito: 'Checked: o compilador exige tratamento com try-catch ou declaração com throws. Unchecked (RuntimeException): opcional, sem obrigação de tratamento.' }],
              intermediario: [{ id: 'exc-i1', enunciado: 'Crie um sistema bancário com exceção customizada SaldoInsuficienteException, ContaInexistenteException e ValorInvalidoException. Implemente sacar() e depositar().', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'exc-d1', enunciado: 'Implemente um Result<T, E> type em Java que encapsula sucesso ou erro sem lançar exceção (inspirado no Result do Rust/Kotlin).', tipo: 'codigo', linguagem: 'java' }]
            },
            checklist: ['Entendo checked vs unchecked exceptions', 'Crio exceções customizadas', 'Uso try-with-resources para recursos', 'Nunca engulo exceções silenciosamente']
          }
        ]
      },
      {
        id: 'spring-boot-mod', name: 'Spring Boot (introdução)', estimatedHours: 6,
        topicos: [
          {
            id: 'spring-intro', title: 'Spring Boot: primeiro projeto', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['java', 'spring boot', 'api'],
            conteudo: {
              resumo: 'Spring Boot é o framework Java mais usado para criar APIs REST e aplicações web. Abstrai a configuração complexa do Spring e deixa você focar na lógica de negócio.',
              conceitos: ['@SpringBootApplication: ponto de entrada', '@RestController: controller REST', '@GetMapping, @PostMapping, etc.: mapear endpoints', '@RequestBody: deserializar JSON do body', '@PathVariable e @RequestParam: parâmetros da URL', '@Service e @Repository: camadas da aplicação'],
              explicacao: 'Spring Boot usa injeção de dependências automática (@Autowired ou via construtor). A arquitetura típica é 3 camadas: Controller (recebe request) → Service (lógica de negócio) → Repository (acesso ao banco). Use injeção via construtor, não via campo — mais testável.',
              exemplos: [{ titulo: 'API REST com Spring Boot', codigo: `// Controller\n@RestController\n@RequestMapping("/api/produtos")\npublic class ProdutoController {\n\n    private final ProdutoService service;\n\n    // Injeção via construtor (preferida)\n    public ProdutoController(ProdutoService service) {\n        this.service = service;\n    }\n\n    @GetMapping\n    public List<ProdutoDTO> listar() {\n        return service.listarTodos();\n    }\n\n    @GetMapping("/{id}")\n    public ResponseEntity<ProdutoDTO> buscar(@PathVariable Long id) {\n        return service.buscarPorId(id)\n            .map(ResponseEntity::ok)\n            .orElse(ResponseEntity.notFound().build());\n    }\n\n    @PostMapping\n    @ResponseStatus(HttpStatus.CREATED)\n    public ProdutoDTO criar(@RequestBody @Valid CriarProdutoRequest req) {\n        return service.criar(req);\n    }\n}`, linguagem: 'java' }],
              errosComuns: ['Injeção de dependência via campo (@Autowired no campo) — dificulta testes', 'Lógica de negócio no Controller em vez do Service'],
              dicas: ['Spring Initializr (start.spring.io) gera o projeto com as dependências escolhidas', 'Lombok (@Data, @Builder) reduz drasticamente o boilerplate de getters/setters'],
              links: [{ titulo: 'Spring Initializr — Gerar projeto', url: 'https://start.spring.io' }], projetosRelacionados: ['Criar uma API REST completa com Spring Boot + Spring Data JPA + PostgreSQL']
            },
            exercicios: {
              fixacao: [{ id: 'sbi-f1', enunciado: 'Qual a diferença entre @Controller e @RestController no Spring Boot?', tipo: 'dissertativo', gabarito: '@RestController = @Controller + @ResponseBody. @Controller retorna o nome de uma view (template). @RestController serializa o retorno direto como JSON.' }],
              intermediario: [{ id: 'sbi-i1', enunciado: 'Crie um CRUD completo com Spring Boot para a entidade Tarefa (id, titulo, descricao, status, criadaEm).', tipo: 'dissertativo' }],
              desafio: [{ id: 'sbi-d1', enunciado: 'Adicione autenticação JWT ao projeto Spring Boot: register, login e proteção de endpoints com Spring Security.', tipo: 'dissertativo' }]
            },
            checklist: ['Crio controllers com @RestController', 'Uso as 3 camadas (Controller, Service, Repository)', 'Configuro endpoints com @GetMapping, @PostMapping etc.', 'Uso injeção via construtor']
          },
          {
            id: 'spring-data', title: 'Spring Data JPA', estimatedMinutes: 60,
            difficulty: 'intermediario', tags: ['java', 'spring', 'jpa', 'hibernate'],
            conteudo: {
              resumo: 'Spring Data JPA é a camada de persistência do Spring Boot. Mapeia classes Java para tabelas do banco automaticamente e gera queries a partir de nomes de métodos.',
              conceitos: ['@Entity: mapeia classe para tabela', '@Id e @GeneratedValue: chave primária', '@Column: configurar colunas', '@ManyToOne, @OneToMany, @ManyToMany: relacionamentos', 'JpaRepository: CRUD + paginação gerados automaticamente', 'Query methods: findByNome(), findByPrecoBetween()'],
              explicacao: 'JPA (Jakarta Persistence API) é a especificação; Hibernate é a implementação padrão. Spring Data JPA gera o SQL a partir dos nomes dos métodos — findByEmailAndAtivo(email, true) vira SELECT ... WHERE email = ? AND ativo = ?. Para queries complexas, use @Query com JPQL ou SQL nativo.',
              exemplos: [{ titulo: 'Entidade e Repository com Spring Data', codigo: `@Entity\n@Table(name = "produtos")\npublic class Produto {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n\n    @Column(nullable = false, length = 200)\n    private String nome;\n\n    @Column(precision = 10, scale = 2)\n    private BigDecimal preco;\n\n    @ManyToOne(fetch = FetchType.LAZY)\n    @JoinColumn(name = "categoria_id")\n    private Categoria categoria;\n\n    // getters/setters ou use @Data do Lombok\n}\n\n// Repository gerado automaticamente\npublic interface ProdutoRepository extends JpaRepository<Produto, Long> {\n    List<Produto> findByCategoriaId(Long categoriaId);\n    List<Produto> findByPrecoLessThan(BigDecimal preco);\n\n    @Query("SELECT p FROM Produto p WHERE p.nome LIKE %:termo%\")\n    List<Produto> buscarPorTermo(@Param("termo") String termo);\n}`, linguagem: 'java' }],
              errosComuns: ['N+1 problem: carregar lista e depois @ManyToOne para cada item — use FETCH JOIN ou @EntityGraph', 'EAGER loading em @OneToMany — sempre use LAZY'],
              dicas: ['Lombok @Data gera getters, setters, equals, hashCode — mas cuidado com @Data em entidades JPA (problemas com equals e hashCode)', 'Use DTOs para não expor entidades JPA diretamente na API'],
              links: [{ titulo: 'Spring Data JPA — Documentação', url: 'https://spring.io/projects/spring-data-jpa' }], projetosRelacionados: []
            },
            exercicios: {
              fixacao: [{ id: 'jpa-f1', enunciado: 'O que faz o Spring Data JPA ao definir um método findByEmailAndAtivo(String email, boolean ativo)?', tipo: 'dissertativo', gabarito: 'Gera automaticamente a query SQL: SELECT * FROM tabela WHERE email = ? AND ativo = ?' }],
              intermediario: [{ id: 'jpa-i1', enunciado: 'Implemente um sistema de blog com entidades Autor e Post (@ManyToOne). Crie repository com: buscar posts por autor, posts mais recentes e busca por título.', tipo: 'codigo', linguagem: 'java' }],
              desafio: [{ id: 'jpa-d1', enunciado: 'Resolver o N+1 problem em uma lista de Posts com Comentarios usando @EntityGraph ou JOIN FETCH. Compare a quantidade de queries antes e depois.', tipo: 'dissertativo' }]
            },
            checklist: ['Anoto entidades com @Entity, @Id, @Column', 'Crio repositories com JpaRepository', 'Uso query methods por nome', 'Entendo FetchType.LAZY vs EAGER']
          }
        ]
      }
    ]
  }
];
