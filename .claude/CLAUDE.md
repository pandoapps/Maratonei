# CLAUDE.md - Maratonei!

## Visao Geral do Projeto

Maratonei! e uma plataforma de streaming de videos educacionais construida com React 19, TypeScript e Vite. O projeto utiliza Tailwind CSS para estilizacao e React Router para navegacao.

## Stack Tecnologica

- **React 19** - Framework frontend
- **TypeScript 5.8** - Tipagem estatica
- **Vite 6** - Build tool e dev server
- **React Router 7** - Roteamento (HashRouter)
- **Lucide React** - Icones
- **Tailwind CSS** - Estilizacao (via classes utilitarias)

## Comandos Principais

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de producao
npm run preview  # Visualiza build de producao
```

## Estrutura do Projeto

```
/
├── components/     # Componentes reutilizaveis (Layout)
├── pages/          # Paginas da aplicacao
│   ├── Landing.tsx    # Pagina inicial publica
│   ├── Auth.tsx       # Login/Registro
│   ├── Home.tsx       # Dashboard do usuario
│   ├── Explore.tsx    # Exploracao por categoria/expert/trilha
│   ├── VideoDetails.tsx # Detalhes do video
│   └── Admin.tsx      # Painel administrativo
├── types.ts        # Definicoes de tipos TypeScript
├── constants.ts    # Dados mockados (videos, experts, trilhas)
├── App.tsx         # Componente raiz com rotas
└── index.tsx       # Ponto de entrada
```

## Convencoes de Codigo

### Componentes React

- Usar `React.FC` para tipagem de componentes funcionais
- Props devem ser definidas em interfaces separadas
- Manter componentes pequenos e focados em uma responsabilidade

```tsx
interface ComponentProps {
  user: User;
  onAction: () => void;
}

const Component: React.FC<ComponentProps> = ({ user, onAction }) => {
  // ...
};
```

### Estilizacao

- Usar classes Tailwind CSS diretamente nos elementos
- Paleta de cores: `zinc-*` para tons neutros, `red-600` como cor de destaque
- Fundo escuro padrao: `bg-black` ou `bg-zinc-950`
- Bordas sutis: `border-zinc-800` ou `border-zinc-900`

### Estado e Persistencia

- `localStorage` e usado para persistir dados do usuario e historico
- Chaves de storage: `maratonei_user`, `maratonei_history`
- Estado global gerenciado via props drilling a partir do App.tsx

### Rotas

- Usar `HashRouter` para compatibilidade com deploy estatico
- Rotas protegidas devem redirecionar para `/auth` se nao autenticado
- Admin requer `user.role === 'admin'`

## Tipos Principais

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  expertId: string;
  category: string;
  trilhaId?: string;
  views: number;
}

interface Expert {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

interface Trilha {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}
```

## Boas Praticas

### Ao Adicionar Novos Componentes

1. Criar em `/components` se for reutilizavel, em `/pages` se for uma pagina
2. Definir interface de props no inicio do arquivo
3. Usar Tailwind para estilizacao seguindo a paleta existente
4. Tipar corretamente com TypeScript

### Ao Modificar Rotas

1. Atualizar `App.tsx` com a nova rota
2. Verificar se precisa de autenticacao
3. Adicionar links de navegacao no `Layout.tsx` se necessario

### Ao Adicionar Dados

1. Definir o tipo em `types.ts`
2. Adicionar dados mockados em `constants.ts`
3. Exportar com `export const`

### Performance

- Usar `useState` com funcao inicializadora para leitura de localStorage
- Evitar re-renders desnecessarios com dependencias corretas no `useEffect`
- Lazy loading de imagens quando possivel

## Padroes de UI

- Cards com `rounded-xl` e `hover:scale-105` para interatividade
- Transicoes suaves: `transition-all duration-300`
- Gradientes de overlay: `bg-gradient-to-t from-black`
- Botoes primarios: `bg-red-600 hover:bg-red-700`
- Texto secundario: `text-zinc-400`