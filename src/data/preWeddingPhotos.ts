export interface PreWeddingPhoto {
  id: number;
  url: string;
  title: string;
  quote: string;
  location: string;
}

export const PRE_WEDDING_PHOTOS: PreWeddingPhoto[] = [
  {
    id: 1,
    url: '/hero-ceremony.jpg',
    title: 'Aqui Começa o Nosso Para Sempre',
    quote: '"Aqui começa o nosso para sempre. O amor é paciente, tudo sofre, tudo crê, tudo espera, tudo suporta."',
    location: 'Cerimônia ao Ar Livre • Pôr do Sol',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    title: 'Onde Nosso Amor Floresceu',
    quote: '"Entre bilhões de pessoas no mundo, meu coração escolheu você para amar até a eternidade."',
    location: 'Jardim Botânico • Primavera',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    title: 'Sorrisos e Olhares',
    quote: '"No seu abraço encontrei a paz que sempre procurei e no seu olhar, o meu lugar favorito."',
    location: 'Campos Verdes • Tarde Romântica',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    title: 'Promessa de Eternidade',
    quote: '"Amor não é olhar um para o outro, é olhar juntos na mesma direção para sempre."',
    location: 'Serra Verde • Ensaio Pré-Wedding',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    title: 'Cúmplices no Amor',
    quote: '"Você é o meu hoje e todos os meus amanhãs."',
    location: 'Palacete Histórico • Edição Romântica',
  }
];
