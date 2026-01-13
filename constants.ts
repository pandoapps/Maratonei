
import { Expert, Video, Trilha } from './types';

export const ASSUNTOS = [
  'Empreendedorismo',
  'Inglês',
  'Programação',
  'Emagrecimento',
  'Conheça outros assuntos'
];

export const EXPERTS: Expert[] = [
  { 
    id: 'expert-1', 
    name: 'Thiago Nigro', 
    role: 'Finanças e Negócios', 
    image: 'https://picsum.photos/seed/nigro/400/400',
    bio: 'Fundador do Grupo Primo e do canal O Primo Rico.'
  },
  { 
    id: 'expert-2', 
    name: 'Matheus Tomoto', 
    role: 'Educação Internacional', 
    image: 'https://picsum.photos/seed/tomoto/400/400',
    bio: 'Especialista em bolsas de estudo e oportunidades no exterior.'
  },
  { 
    id: 'expert-3', 
    name: 'Paulo Muzi', 
    role: 'Medicina e Performance', 
    image: 'https://picsum.photos/seed/muzi/400/400',
    bio: 'Médico ortopedista e referência em fisiologia do exercício.'
  },
  { 
    id: 'expert-4', 
    name: 'Felipe Deschamps', 
    role: 'Tecnologia', 
    image: 'https://picsum.photos/seed/deschamps/400/400',
    bio: 'Desenvolvedor e entusiasta de tecnologia com foco em carreira.'
  }
];

export const TRILHAS: Trilha[] = [
  { id: 't-1', name: 'Ganhar dinheiro', description: 'Aprenda as bases da riqueza', thumbnail: 'https://picsum.photos/seed/trilha1/1200/630' },
  { id: 't-2', name: 'Abrir empresa', description: 'Do zero ao primeiro faturamento', thumbnail: 'https://picsum.photos/seed/trilha2/1200/630' },
  { id: 't-3', name: 'Morar no exterior', description: 'Conquiste sua vaga global', thumbnail: 'https://picsum.photos/seed/trilha3/1200/630' },
  { id: 't-4', name: 'Falar Inglês', description: 'Fluência acelerada', thumbnail: 'https://picsum.photos/seed/trilha4/1200/630' }
];

// Refined URL to avoid Error 153 by using a clean version of the embed link
export const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/embed/31GZfsFrBRM';

const PICSUM_BASE = 'https://picsum.photos/1200/630';

export const VIDEOS: Video[] = [
  {
    id: 'v-1',
    title: 'Como investir seu primeiro real',
    description: 'Um guia completo para quem está começando agora no mundo dos investimentos com pouco dinheiro.',
    thumbnail: `${PICSUM_BASE}?seed=v1`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-1',
    category: 'Empreendedorismo',
    trilhaId: 't-1',
    views: 12500
  },
  {
    id: 'v-2',
    title: 'Harvard: O segredo para entrar',
    description: 'Descubra o que as maiores universidades do mundo buscam em um candidato brasileiro.',
    thumbnail: `${PICSUM_BASE}?seed=v2`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-2',
    category: 'Educação',
    trilhaId: 't-3',
    views: 8900
  },
  {
    id: 'v-3',
    title: 'Mitos do emagrecimento',
    description: 'Dr. Paulo Muzi explica por que dietas restritivas costumam falhar no longo prazo.',
    thumbnail: `${PICSUM_BASE}?seed=v3`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-3',
    category: 'Emagrecimento',
    views: 45000
  },
  {
    id: 'v-4',
    title: 'Clean Code na prática',
    description: 'Como escrever códigos que seus colegas de trabalho não vão odiar daqui a 6 meses.',
    thumbnail: `${PICSUM_BASE}?seed=v4`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-4',
    category: 'Programação',
    views: 12000
  },
  {
    id: 'v-5',
    title: 'O Poder do networking',
    description: 'Saiba como construir conexões que valem ouro na sua carreira profissional.',
    thumbnail: `${PICSUM_BASE}?seed=v5`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-1',
    category: 'Empreendedorismo',
    views: 3200
  },
  {
    id: 'v-6',
    title: 'Inglês para viagens rápidas',
    description: 'As frases essenciais para você não passar perrengue no airport ou hotel.',
    thumbnail: `${PICSUM_BASE}?seed=v6`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-2',
    category: 'Inglês',
    trilhaId: 't-4',
    views: 15600
  }
];
