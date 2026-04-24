import type { Category, Product } from '../types/store';

export const MOCK_CATEGORIES: Category[] = [
  { id: 0, name: 'Todos',   image_url: null },
  { id: 1, name: 'Rosto',   image_url: null },
  { id: 2, name: 'Corpo',   image_url: null },
  { id: 3, name: 'Cabelo',  image_url: null },
  { id: 4, name: 'Pacotes', image_url: null },
  { id: 5, name: 'Rituais', image_url: null },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Limpeza de Pele Profunda',     description: 'Remoção de impurezas e renovação celular com técnicas avançadas.',              price_points: 350, image_url: null, category_id: 1 },
  { id: 2, name: 'Peeling Enzimático',            description: 'Esfoliação suave com enzimas naturais para pele luminosa e uniforme.',           price_points: 280, image_url: null, category_id: 1 },
  { id: 3, name: 'Massagem Relaxante',            description: 'Técnica sueca para alívio profundo de tensões musculares.',                      price_points: 420, image_url: null, category_id: 2 },
  { id: 4, name: 'Hidratação Corporal Intensiva', description: 'Tratamento com manteigas e óleos essenciais de origem natural.',                 price_points: 320, image_url: null, category_id: 2 },
  { id: 5, name: 'Cronograma Capilar',            description: 'Diagnóstico e tratamento personalizado para a saúde dos seus fios.',             price_points: 380, image_url: null, category_id: 3 },
  { id: 6, name: 'Ritual Completo',               description: 'Experiência integrada de rosto, corpo e cabelo — um dia só para você.',          price_points: 890, image_url: null, category_id: 4 },
  { id: 7, name: 'Microagulhamento',              description: 'Estimulação da produção de colágeno para pele renovada e firme.',                price_points: 600, image_url: null, category_id: 1 },
  { id: 8, name: 'Drenagem Linfática',            description: 'Melhora da circulação e redução de inchaço com toque especializado.',            price_points: 360, image_url: null, category_id: 2 },
  { id: 9, name: 'Ritual dos Sentidos',           description: 'Imersão sensorial com aromaterapia, calor e massagem integrativa.',              price_points: 750, image_url: null, category_id: 5 },
];

export const HERO_TEXT: Record<number, { title: string; sub: string }> = {
  0: { title: 'Bem-vinda à personnalité',  sub: 'Cuidado intencional para cada detalhe de você. Serviços pensados para quem valoriza o resultado.' },
  1: { title: 'Cuidados para o Rosto',     sub: 'Tratamentos faciais com técnicas de alta performance para uma pele que fala por si.' },
  2: { title: 'Rituais para o Corpo',      sub: 'Da cabeça aos pés — hidratação, relaxamento e renovação com ingredientes naturais.' },
  3: { title: 'Tratamentos Capilares',     sub: 'Cronogramas e rituais personalizados para fios saudáveis e radiantes.' },
  4: { title: 'Pacotes Especiais',         sub: 'Combine serviços e potencialize seus resultados com condições exclusivas.' },
  5: { title: 'Rituais Exclusivos',        sub: 'Experiências sensoriais completas para quem merece um momento só seu.' },
};

export const CAT_GRADIENTS = [
  'linear-gradient(150deg,#d4c4a8,#b09070)',
  'linear-gradient(150deg,#c4bcb0,#a09080)',
  'linear-gradient(150deg,#b8c4b8,#88a480)',
  'linear-gradient(150deg,#d0c4b0,#b0a070)',
  'linear-gradient(150deg,#c0b8c8,#9088a8)',
  'linear-gradient(150deg,#c8c0a8,#a09060)',
];

export const PROD_GRADIENTS = [
  'linear-gradient(155deg,#cec0a8,#a88860)',
  'linear-gradient(155deg,#c0ccc0,#80a880)',
  'linear-gradient(155deg,#c8c0b8,#a08878)',
  'linear-gradient(155deg,#d0c8a0,#b0a060)',
  'linear-gradient(155deg,#b8c0cc,#8898b0)',
  'linear-gradient(155deg,#ccc0a8,#a89060)',
  'linear-gradient(155deg,#c4b8c8,#988098)',
  'linear-gradient(155deg,#c8d0c4,#90a888)',
  'linear-gradient(155deg,#d4c0a4,#b09068)',
];
