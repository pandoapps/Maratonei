
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
    image: 'https://i.pravatar.cc/300?u=expert1',
    bio: 'Fundador do Grupo Primo e do canal O Primo Rico.'
  },
  { 
    id: 'expert-2', 
    name: 'Matheus Tomoto', 
    role: 'Educação Internacional', 
    image: 'https://i.pravatar.cc/300?u=expert2',
    bio: 'Especialista em bolsas de estudo e oportunidades no exterior.'
  },
  { 
    id: 'expert-3', 
    name: 'Paulo Muzi', 
    role: 'Medicina e Performance', 
    image: 'https://i.pravatar.cc/300?u=expert3',
    bio: 'Médico ortopedista e referência em fisiologia do exercício.'
  },
  { 
    id: 'expert-4', 
    name: 'Felipe Deschamps', 
    role: 'Tecnologia', 
    image: 'https://i.pravatar.cc/300?u=expert4',
    bio: 'Desenvolvedor e entusiasta de tecnologia com foco em carreira.'
  }
];

export const TRILHAS: Trilha[] = [
  { id: 't-1', name: 'Ganhar dinheiro', description: 'Aprenda as bases da riqueza', thumbnail: 'https://loremflickr.com/800/600?lock=10' },
  { id: 't-2', name: 'Abrir empresa', description: 'Do zero ao primeiro faturamento', thumbnail: 'https://loremflickr.com/800/600?lock=20' },
  { id: 't-3', name: 'Morar no exterior', description: 'Conquiste sua vaga global', thumbnail: 'https://loremflickr.com/800/600?lock=30' },
  { id: 't-4', name: 'Falar Inglês', description: 'Fluência acelerada', thumbnail: 'https://loremflickr.com/800/600?lock=40' }
];

export const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/embed/31GZfsFrBRM';

const IMAGE_BASE = 'https://loremflickr.com/800/600';

export const VIDEOS: Video[] = [
  {
    id: 'v-1',
    title: 'Como investir seu primeiro real',
    description: 'Um guia completo para quem está começando agora no mundo dos investimentos com pouco dinheiro.',
    thumbnail: `${IMAGE_BASE}?lock=1`,
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
    thumbnail: `${IMAGE_BASE}?lock=2`,
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
    thumbnail: `${IMAGE_BASE}?lock=3`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-3',
    category: 'Emagrecimento',
    views: 45000
  },
  {
    id: 'v-4',
    title: 'Clean Code na prática',
    description: 'Como escrever códigos que seus colegas de trabalho não vão odiar daqui a 6 meses.',
    thumbnail: `${IMAGE_BASE}?lock=4`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-4',
    category: 'Programação',
    views: 12000
  },
  {
    id: 'v-5',
    title: 'O Poder do networking',
    description: 'Saiba como construir conexões que valem ouro na sua carreira profissional.',
    thumbnail: `${IMAGE_BASE}?lock=5`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-1',
    category: 'Empreendedorismo',
    views: 3200
  },
  {
    id: 'v-6',
    title: 'Inglês para viagens rápidas',
    description: 'As frases essenciais para você não passar perrengue no airport ou hotel.',
    thumbnail: `${IMAGE_BASE}?lock=6`,
    embedUrl: DEFAULT_YOUTUBE_URL,
    expertId: 'expert-2',
    category: 'Inglês',
    trilhaId: 't-4',
    views: 15600
  }
];
