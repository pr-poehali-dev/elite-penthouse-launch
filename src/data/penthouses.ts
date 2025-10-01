export interface Penthouse {
  id: string;
  city: 'moscow' | 'spb';
  name: string;
  slug: string;
  address: string;
  district: string;
  area: number;
  floor: string;
  ceilingHeight: number;
  rooms: number;
  bathrooms: number;
  terrace: boolean;
  terraceArea?: number;
  view: string[];
  parking: boolean;
  finishing: string;
  price: string;
  status: 'available' | 'reserved' | 'sold';
  altaiOffer: boolean;
  images: string[];
  description: string;
  coordinates: { lat: number; lng: number };
}

export const penthouses: Penthouse[] = [
  {
    id: '1',
    city: 'moscow',
    name: 'Пентхаус на Остоженке',
    slug: 'penthouse-ostozhenka',
    address: 'ул. Остоженка, 25',
    district: 'Хамовники',
    area: 330,
    floor: '25/26',
    ceilingHeight: 4.2,
    rooms: 4,
    bathrooms: 3,
    terrace: true,
    terraceArea: 120,
    view: ['Москва-река', 'Кремль', 'Храм Христа Спасителя'],
    parking: true,
    finishing: 'Дизайнерская отделка',
    price: 'По запросу',
    status: 'available',
    altaiOffer: true,
    images: ['/img/79790d18-8aa0-40e1-9b1a-8ac342af3eef.jpg'],
    description: 'Уникальный пентхаус с панорамным видом на исторический центр Москвы. Терраса по периметру, камин, высокие потолки. Полностью меблирован в современном стиле. Закрытая территория с консьерж-сервисом.',
    coordinates: { lat: 55.7423, lng: 37.5936 }
  },
  {
    id: '2',
    city: 'moscow',
    name: 'Пентхаус в Пресненском',
    slug: 'penthouse-presnensky',
    address: 'Пресненская набережная, 12',
    district: 'Пресненский',
    area: 420,
    floor: '58/60',
    ceilingHeight: 5.0,
    rooms: 5,
    bathrooms: 4,
    terrace: true,
    terraceArea: 180,
    view: ['Москва-Сити', 'Деловой центр', 'Набережная'],
    parking: true,
    finishing: 'Авторская отделка',
    price: 'По запросу',
    status: 'available',
    altaiOffer: true,
    images: ['/img/79790d18-8aa0-40e1-9b1a-8ac342af3eef.jpg'],
    description: 'Роскошный двухуровневый пентхаус в самом сердце делового центра. Впечатляющие виды 360°, собственный бассейн на террасе, винный погреб. Система умного дома премиум-класса.',
    coordinates: { lat: 55.7490, lng: 37.5389 }
  },
  {
    id: '3',
    city: 'moscow',
    name: 'Пентхаус на Арбате',
    slug: 'penthouse-arbat',
    address: 'Новый Арбат, 36',
    district: 'Арбат',
    area: 285,
    floor: '32/33',
    ceilingHeight: 3.8,
    rooms: 3,
    bathrooms: 2,
    terrace: true,
    terraceArea: 90,
    view: ['Новый Арбат', 'МГУ', 'Городская панорама'],
    parking: true,
    finishing: 'Премиальная отделка',
    price: 'По запросу',
    status: 'available',
    altaiOffer: false,
    images: ['/img/79790d18-8aa0-40e1-9b1a-8ac342af3eef.jpg'],
    description: 'Элегантный пентхаус с видом на легендарный Арбат и силуэт МГУ. Просторная гостиная с панорамным остеклением, три спальни с гардеробными. VIP-паркинг и круглосуточная охрана.',
    coordinates: { lat: 55.7520, lng: 37.5831 }
  },
  {
    id: '4',
    city: 'spb',
    name: 'Пентхаус на Петроградской',
    slug: 'penthouse-petrogradskaya',
    address: 'Петроградская набережная, 18',
    district: 'Петроградская сторона',
    area: 310,
    floor: '18/19',
    ceilingHeight: 4.0,
    rooms: 4,
    bathrooms: 3,
    terrace: true,
    terraceArea: 100,
    view: ['Нева', 'Петропавловская крепость', 'Исторический центр'],
    parking: true,
    finishing: 'Итальянская отделка',
    price: 'По запросу',
    status: 'available',
    altaiOffer: true,
    images: ['/img/a6d1def0-d5d4-4735-ad5a-daa482d0b87f.jpg'],
    description: 'Изысканный пентхаус с видом на Неву и Петропавловскую крепость. Мраморные полы, итальянская сантехника, панорамные окна в пол. Собственная сауна и винная комната.',
    coordinates: { lat: 59.9564, lng: 30.3118 }
  },
  {
    id: '5',
    city: 'spb',
    name: 'Пентхаус на Крестовском',
    slug: 'penthouse-krestovsky',
    address: 'Крестовский остров, Южная дорога, 5',
    district: 'Крестовский остров',
    area: 380,
    floor: '22/23',
    ceilingHeight: 4.5,
    rooms: 5,
    bathrooms: 4,
    terrace: true,
    terraceArea: 150,
    view: ['Финский залив', 'Стадион', 'Парковая зона'],
    parking: true,
    finishing: 'Премиальная отделка',
    price: 'По запросу',
    status: 'available',
    altaiOffer: true,
    images: ['/img/a6d1def0-d5d4-4735-ad5a-daa482d0b87f.jpg'],
    description: 'Грандиозный пентхаус на берегу Финского залива. Просторная терраса с зоной барбекю, панорамные виды на воду и зелень. Фитнес-зал, кабинет, пять спален master bedroom.',
    coordinates: { lat: 59.9723, lng: 30.2363 }
  },
  {
    id: '6',
    city: 'spb',
    name: 'Пентхаус в историческом центре',
    slug: 'penthouse-center',
    address: 'Английская набережная, 28',
    district: 'Адмиралтейский',
    area: 295,
    floor: '8/9',
    ceilingHeight: 3.9,
    rooms: 3,
    bathrooms: 2,
    terrace: true,
    terraceArea: 85,
    view: ['Нева', 'Исаакиевский собор', 'Адмиралтейство'],
    parking: true,
    finishing: 'Классическая отделка',
    price: 'По запросу',
    status: 'reserved',
    altaiOffer: false,
    images: ['/img/a6d1def0-d5d4-4735-ad5a-daa482d0b87f.jpg'],
    description: 'Исторический пентхаус в самом сердце Петербурга с видом на главные достопримечательности. Лепнина, паркет из редких пород дерева, камин XIX века. Уникальная атмосфера старого города.',
    coordinates: { lat: 59.9343, lng: 30.2975 }
  }
];

export const getMoscowPenthouses = () => penthouses.filter(p => p.city === 'moscow');
export const getSpbPenthouses = () => penthouses.filter(p => p.city === 'spb');
export const getPenthouseBySlug = (slug: string) => penthouses.find(p => p.slug === slug);
export const getAvailablePenthouses = () => penthouses.filter(p => p.status === 'available');
export const getFeaturedPenthouses = () => penthouses.filter(p => p.altaiOffer).slice(0, 6);
