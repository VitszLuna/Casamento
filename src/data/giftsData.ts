export interface GiftItem {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'funny' | 'honeymoon' | 'home' | 'experience';
  image: string;
  popular?: boolean;
}

export const GIFTS_DATA: GiftItem[] = [
  {
    id: 'gift-1',
    title: 'Pague a Primeira Terapia do Casal',
    description: 'Para resolvermos quem deixou a tampa do vaso aberta com auxilio profissional e sem arremesso de pratos.',
    price: 180.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'gift-2',
    title: 'Massagem para a Noiva Apos Trabalho Cansativo',
    description: 'Salvação para as costas da noiva e garantia de paz absoluta para o noivo por pelo menos uma hora.',
    price: 150.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'gift-3',
    title: 'Estoque de Paciencia para o Noivo',
    description: 'Contribuição para o noivo respirar fundo e sorrir quando a noiva disser que falta so cinco minutinhos.',
    price: 99.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-4',
    title: 'Kit Sobrevivencia Anti Ressaca Pos Festa',
    description: 'Energetico, analgésico e óculos escuros para os noivos sobreviverem ao dia seguinte do casamento.',
    price: 85.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-5',
    title: 'Uber para o Noivo Nao Atrasar no Altar',
    description: 'Garantia absoluta de que o noivo estara la pontualmente esperando a noiva chegar.',
    price: 60.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-6',
    title: 'Balde de Pipoca e Vinho para Maratonar Series',
    description: 'Para o nosso domingo perfeito de pijama no sofa sem discutir quem vai escolher o filme.',
    price: 120.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-7',
    title: 'Curso de Culinaria para Quem Cozinhar Pior',
    description: 'Para evitar comida queimada e garantir refeições comestíveis na casa nova.',
    price: 200.00,
    category: 'funny',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-8',
    title: 'Jantar Romantico na Lua de Mel',
    description: 'Um jantar a luz de velas sob o luar com muito vinho e sobremesas deliciosas.',
    price: 280.00,
    category: 'honeymoon',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    popular: true,
  },
  {
    id: 'gift-9',
    title: 'Passeio de Barco ao Por do Sol',
    description: 'Para navegarmos juntinhos assistindo ao por do sol inesquecivel da lua de mel.',
    price: 350.00,
    category: 'honeymoon',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-10',
    title: 'Cafe da Manha Completo na Cama',
    description: 'Croissants crocantes, frutas frescas e cafe quentinho servido na bandeja.',
    price: 140.00,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-11',
    title: 'Robo Aspirador Salva Casamento',
    description: 'O melhor amigo da paz conjugal! Mantem a casa limpa enquanto nos relaxamos.',
    price: 450.00,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'gift-12',
    title: 'Vinho Especial para Celbrar 1 Ano de Casados',
    description: 'Uma garrafa especial selada que abriremos juntos nas nossas Bodas de Papel.',
    price: 160.00,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
  }
];
