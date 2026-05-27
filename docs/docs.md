A tarefa do Trainee de Frontend será desenvolver, em ambiente web, a aplicação do **CineSol Cinema**, o sistema digital de bilheteria e bomboniere. Um projeto que visa desenvolver as tecnologias frontend utilizadas na empresa, visando proporcionar uma experiência real de ciclo de desenvolvimento web moderno para os membros. O objetivo final deve ser entregar um produto polido com a tecnologia Next.js, que foi escolhida por ser o padrão de mercado atual para aplicações React escaláveis.

### **Design da Aplicação (Figma):**

[https://www.figma.com/design/wACGXjewuSWZQ74bWN4xqr/PS-Loading?node-id=22-2&p=f&t=SSHySPv8FgGEGOkZ-0](https://www.figma.com/design/wACGXjewuSWZQ74bWN4xqr/PS-Loading?node-id=22-2&p=f&t=SSHySPv8FgGEGOkZ-0)

### Stack principal:

- **Next.js com TypeScript:** É o núcleo da aplicação web. O Next.js permite desenvolver interfaces robustas utilizando o App Router, otimizando o carregamento das páginas. A adoção do TypeScript é crucial aqui, pois garante a tipagem estática. Isso significa que erros são pegos em tempo de compilação, e a comunicação com o backend ganha uma camada extra de segurança, permitindo o compartilhamento de interfaces e contratos de dados de ponta a ponta.
- **Tailwind CSS:** Framework de CSS utilitário (utility-first) adotado para a estilização do projeto. Ele permite definir regras visuais diretamente nas classes dos elementos JSX, garantindo um desenvolvimento extremamente ágil e um design system consistente. Visa eliminar a complexidade de criar arquivos CSS extensos e difíceis de manter, facilitando a construção de interfaces responsivas.
- **React Hook Form:** A ferramenta definitiva para gerenciamento de formulários complexos no React. Em vez de criar múltiplos estados (`useState`) para cada campo de input, ele isola as renderizações, garantindo que a interface não trave ou perca performance enquanto o usuário digita nos modais de Registro, Login ou Pagamento.
- **Zod:** Biblioteca focada em validação de esquemas de dados com integração perfeita ao TypeScript e ao React Hook Form. No contexto web, o Zod atua como um "guarda-costas": ele valida as regras de negócios nos formulários (como verificar se as senhas coincidem ou se o cartão de crédito é válido) antes mesmo do envio, e valida se a resposta JSON que chegou do backend realmente possui a estrutura esperada.
- **TanStack Query (React Query):** Ferramenta definitiva para gerenciamento de estado do servidor (dados assíncronos). Em vez de usar `useState` e `useEffect` manualmente para buscar dados da API, o TanStack Query gerencia cache, tentativas de reconexão, atualizações em segundo plano e fornece variáveis prontas de controle (como `isLoading` e `isError`), otimizando radicalmente a performance da aplicação.
- **Axios / Fetch API:** Responsável pela comunicação com o servidor. Ideal para criar instâncias pré-configuradas, interceptando requisições para injetar automaticamente tokens de autenticação nas rotas privadas.

OBS: Considerem as tecnologias e bibliotecas listadas acima apenas como sugestões para começar. A ideia é fornecer um norte, mas o espaço para inovação é todo de vocês. De tal forma que, caso prefiram utilizar algo diferente para resolver um problema, tenham um bom argumento para não usar alguma biblioteca citada ou descubram uma tecnologia nova e interessante durante a fase de estudos, sintam-se totalmente livres para propor essa nova ferramenta para o projeto.

### Arquitetura sugerida: Component-Based & Custom Hooks

Atualmente, é o padrão para o desenvolvimento web moderno com React.

- **Components / UI:** É a interface do usuário (os botões, modais, inputs e cartões). São "passivos"; recebem dados via propriedades (props) e não tomam decisões de negócios.
- **Pages (App Router):** São os maestros das rotas. Elas agregam os componentes e definem o layout daquela URL específica.
- **Hooks (Lógica de Negócios/Estado):** Onde o TanStack Query e as regras vivem. Um custom hook (ex: `useMovies`) busca os dados da API e os entrega formatados para as Pages/Components, mantendo a interface limpa e focada apenas na renderização.

---

### O que deve ser desenvolvido?

#### Páginas:

1. Filme (Homepage)
2. Combos (Página estática)
3. Preços (Página estática)
4. Visualização detalhada do Filme
5. Registro
6. Login
7. Escolha de Poltronas (com modal **¹**)
8. Combos
9. Confirmação de compra (com modais **² e ³**)

#### Modais:

1. Modal de escolha Login ou de Registro (¹)
2. Modal de forma de pagamento (cartão de débito, cartão de crédito ou pix) (**²**)
3. Modal de compra confirmada (**³**)

---

### Roadmap de Desenvolvimento:

**Fase 1: Setup e Fundações Teóricas**

Antes de codar as telas, vocês precisam preparar o terreno e entender as ferramentas.

- **O que estudar/fazer:** Inicializar o projeto com Next.js (App Router), Tailwind CSS e TypeScript.
  - Estudar a documentação das tecnologias citadas, com foco em como o Tailwind aplica estilos e como o Next.js gerencia as rotas nas pastas.
  - Configurar o arquivo `tailwind.config.ts` com as cores primárias e fontes do CineSol.
- **Meta da fase:** Um app rodando no `localhost` com a estrutura de pastas organizada e uma navegação simples entre rotas vazias configurada.

**Fase 2: O Ponto de Partida Estático (Prioridade)**

As páginas que não dependem de lógica complexa de banco de dados. Elas são perfeitas para começar, permitindo focar 100% em dominar o Tailwind CSS e a responsividade.

- **O que estudar/fazer:**
  - Praticar a criação de layouts estáticos baseados nos protótipos.
  - Desenvolver o **Header** (Navbar) e o **Footer** globais.
  - Desenvolver a página de **Combos** (Página estática).
  - Desenvolver a página de **Preços** (Página estática).
- **Meta da fase:** As páginas informativas do cinema visualmente idênticas ao design, fluidas e prontas para uso.

**Fase 3: Componentização Inteligente (O Design System)**

Olhando para os anexos, vemos padrões se repetindo. Construir esses pedaços isoladamente economiza tempo.

- **O que criar:**
  - _MovieCard:_ O cartão contendo o pôster, título, duração e gêneros do filme.
  - _Seat (Poltrona):_ O componente visual de assento, com variações de cor para "Livre", "Ocupado" e "Selecionado".
  - _Inputs Genéricos:_ Componentes de campo de texto estilizados para serem reutilizados nos formulários.
- **Meta da fase:** Ter uma pasta `/components` com todos esses itens criados de forma "burra" (eles apenas recebem dados visuais por propriedades, sem processar lógica).

**Fase 4: Construção das Telas Dinâmicas (Com Dados Falsos)**

Agora você vai juntar os componentes criados na Fase 3 para montar as páginas complexas.

- **O que estudar/fazer:**
  - Criar arrays de dados falsos (Mock Data) que simulem o que a API vai retornar (ex: uma lista de filmes com URLs de imagens e horários).
  - Montar a **Homepage (Filmes em Cartaz e Em Breve)** e a tela de **Visualização detalhada do Filme**.
  - Montar a complexa tela de **Escolha de Poltronas**, focando na renderização do grid de assentos.
- **Meta da fase:** O fluxo visual de navegação do usuário estar completo, do catálogo até a seleção da poltrona, operando com dados fictícios.

**Fase 5: Formulários e Modais (A Camada de Interação)**

É hora de dar vida aos inputs utilizando React Hook Form e Zod.

- **O que estudar/fazer:**
  - Criar o esquema de validação (Zod) para o cadastro de usuário e para os dados de cartão de crédito.
  - Integrar o React Hook Form nesses formulários para capturar os dados corretamente e exibir erros de validação em tempo real na tela.
  - Desenvolver os modais flutuantes: **Modal de escolha Login de Registro (¹)**, **Modal de Forma de Pagamento (²)** e **Modal de Compra Confirmada (³)**.
- **Meta da fase:** Formulários blindados, impedindo submissões vazias ou incorretas, com os modais abrindo e fechando corretamente nos momentos certos.

**Fase 6: Integração Real e Refinamento**

A última etapa é trocar os dados falsos da Fase 4 e os envios "fictícios" da Fase 5 pela conexão real com a API.

- **O que estudar/fazer:**
  - Aprender a usar o TanStack Query (`useQuery` para buscar filmes e poltronas, `useMutation` para enviar formulários de registro e checkout).
  - Tratar os estados na View: Exibir um _skeleton loading_ (ou spinner) enquanto o `isLoading` do TanStack Query for verdadeiro, e exibir mensagens de erro amigáveis caso a rede falhe.
- **Meta da fase:** Aplicação web completa, consumindo dados do backend em tempo real, realizando o checkout do cinema perfeitamente e lidando bem com transições de carregamento.
