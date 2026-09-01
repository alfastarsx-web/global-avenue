import type { L } from './site';

export type ProjectStatus = 'building' | 'selling' | 'done' | 'soon';
export type PlanStatus = 'available' | 'reserved' | 'sold';

export interface Plan {
  id: string;
  rooms: number; // 0 = studiya
  area: number; // m²
  floor: number;
  price: number; // so'm
  status: PlanStatus;
  /** SVG planirovka chizmasi (public/img/plans/...) */
  image: string;
}

export interface Stage {
  label: L;
  date: L;
  done: boolean;
}

export interface Project {
  slug: string;
  name: string;
  tagline: L;
  status: ProjectStatus;
  district: L;
  districtKey: string;
  address: L;
  pricePerSqm: number;
  handover: L;
  handoverYear: number;
  floors: number;
  apartments: number;
  blocks: number;
  roomOptions: number[];
  cover: string;
  gallery: string[];
  description: L;
  highlights: L[];
  infrastructure: { name: L; distance: L }[];
  plans: Plan[];
  schedule: Stage[];
  passport: { label: L; value: L }[];
  geo: { lat: number; lng: number };
  featured: boolean;
}

const st = (uz: string, ru: string): L => ({ uz, ru });

function plans(prefix: string, base: number, config: [number, number, number, PlanStatus][]): Plan[] {
  return config.map(([rooms, area, floor, status], i) => ({
    id: `${prefix}-${i + 1}`,
    rooms,
    area,
    floor,
    price: Math.round((area * base) / 1000) * 1000,
    status,
    image: `/img/plans/plan-${rooms === 0 ? 's' : rooms}.svg`,
  }));
}

export const projects: Project[] = [
  {
    slug: 'twinera',
    name: 'TwinEra',
    tagline: st(
      "Ikki minora — bitta zamonaviy hayot maydoni",
      'Две башни — единое пространство современной жизни',
    ),
    status: 'building',
    district: st('Samarqand shahri, markaz', 'г. Самарканд, центр'),
    districtKey: 'center',
    address: st("Samarqand shahri, Amir Temur ko'chasi", 'г. Самарканд, улица Амира Темура'),
    pricePerSqm: 9_800_000,
    handover: st('2027-yil IV chorak', 'IV квартал 2027 г.'),
    handoverYear: 2027,
    floors: 16,
    apartments: 384,
    blocks: 2,
    roomOptions: [0, 1, 2, 3, 4],
    cover: '/img/projects/twinera.jpg',
    gallery: [
      '/img/projects/twinera.jpg',
      '/img/projects/twinera-2.jpg',
      '/img/projects/twinera-3.jpg',
      '/img/projects/twinera-4.jpg',
      '/img/projects/twinera-5.jpg',
    ],
    description: st(
      "TwinEra — Global Avenue'ning eng yirik loyihasi: shahar markazida ko'tarilayotgan ikkita 16 qavatli minora. Majmuada yopiq hovli, yer osti avtoturargoh, bolalar maydonchasi va birinchi qavatlarda tijorat maydonlari joylashgan. Fasad ventilyatsiyalanadigan tizim asosida, panoramali oynalar bilan bezatilgan.",
      'TwinEra — крупнейший проект Global Avenue: две 16-этажные башни в центре города. В комплексе закрытый двор, подземный паркинг, детская площадка и коммерческие помещения на первых этажах. Фасад — вентилируемая система с панорамным остеклением.',
    ),
    highlights: [
      st('Yopiq hovli — avtomobilsiz hudud', 'Закрытый двор без автомобилей'),
      st('Yer osti avtoturargoh, 180 o’rin', 'Подземный паркинг на 180 мест'),
      st('Panoramali oynalar', 'Панорамное остекление'),
      st('24/7 videokuzatuv va qo’riqlash', 'Видеонаблюдение и охрана 24/7'),
      st('Markaziy isitish va individual hisoblagichlar', 'Центральное отопление с индивидуальными счётчиками'),
      st('Birinchi qavatda tijorat maydonlari', 'Коммерческие помещения на первом этаже'),
    ],
    infrastructure: [
      { name: st('Maktab №26', 'Школа №26'), distance: st('350 m', '350 м') },
      { name: st('Bolalar bog’chasi', 'Детский сад'), distance: st('200 m', '200 м') },
      { name: st('Siyob bozori', 'Рынок Сиёб'), distance: st('1,2 km', '1,2 км') },
      { name: st('Registon maydoni', 'Площадь Регистан'), distance: st('1,8 km', '1,8 км') },
      { name: st('Poliklinika', 'Поликлиника'), distance: st('600 m', '600 м') },
      { name: st('Avtobus bekati', 'Автобусная остановка'), distance: st('120 m', '120 м') },
    ],
    plans: plans('twinera', 9_800_000, [
      [0, 34, 4, 'available'],
      [1, 46, 6, 'available'],
      [1, 48, 11, 'reserved'],
      [2, 62, 3, 'available'],
      [2, 68, 9, 'available'],
      [2, 66, 14, 'sold'],
      [3, 84, 5, 'available'],
      [3, 91, 12, 'available'],
      [4, 112, 15, 'available'],
      [4, 118, 16, 'reserved'],
    ]),
    schedule: [
      { label: st('Poydevor ishlari', 'Фундаментные работы'), date: st('2025-yil III chorak', 'III квартал 2025'), done: true },
      { label: st('Karkas qurilishi', 'Возведение каркаса'), date: st('2026-yil I–III chorak', 'I–III квартал 2026'), done: true },
      { label: st('Fasad va oynalar', 'Фасад и остекление'), date: st('2026-yil IV chorak', 'IV квартал 2026'), done: false },
      { label: st('Muhandislik tarmoqlari', 'Инженерные сети'), date: st('2027-yil I chorak', 'I квартал 2027'), done: false },
      { label: st('Ichki pardozlash', 'Внутренняя отделка'), date: st('2027-yil II–III chorak', 'II–III квартал 2027'), done: false },
      { label: st('Obodonlashtirish va topshirish', 'Благоустройство и сдача'), date: st('2027-yil IV chorak', 'IV квартал 2027'), done: false },
    ],
    passport: [
      { label: st('Qurilish texnologiyasi', 'Технология строительства'), value: st('Monolit temir-beton karkas', 'Монолитный железобетонный каркас') },
      { label: st('Tashqi devorlar', 'Наружные стены'), value: st('G’isht + mineral vata + ventilyatsiyalanuvchi fasad', 'Кирпич + минеральная вата + вентфасад') },
      { label: st('Oynalar', 'Окна'), value: st('Ikki kamerali energiya tejovchi paket', 'Двухкамерный энергосберегающий стеклопакет') },
      { label: st('Liftlar', 'Лифты'), value: st('Har blokda 2 ta yo’lovchi + 1 ta yuk lifti', 'В каждом блоке 2 пассажирских + 1 грузовой') },
      { label: st('Isitish', 'Отопление'), value: st('Markaziy, individual hisoblagich bilan', 'Центральное, с индивидуальным счётчиком') },
      { label: st('Xavfsizlik', 'Безопасность'), value: st('Yong’in signalizatsiyasi, videodomofon, qo’riqlash', 'Пожарная сигнализация, видеодомофон, охрана') },
      { label: st('Pardoz holati', 'Состояние отделки'), value: st('Oq quti (kelishuv bo’yicha to’liq pardoz)', 'Белая коробка (полная отделка по договорённости)') },
    ],
    geo: { lat: 39.6612, lng: 66.9612 },
    featured: true,
  },

  {
    slug: 'izmir',
    name: 'IZMIR',
    tagline: st('O’rta yer dengizi uslubidagi premium turar-joy', 'Премиальное жильё в средиземноморском стиле'),
    status: 'selling',
    district: st('Samarqand shahri, Bog’ishamol', 'г. Самарканд, Богишамол'),
    districtKey: 'bogishamol',
    address: st("Samarqand shahri, Bog'ishamol mavzesi", 'г. Самарканд, массив Богишамол'),
    pricePerSqm: 11_500_000,
    handover: st('2027-yil II chorak', 'II квартал 2027 г.'),
    handoverYear: 2027,
    floors: 9,
    apartments: 216,
    blocks: 4,
    roomOptions: [1, 2, 3, 4],
    cover: '/img/projects/izmir.jpg',
    gallery: [
      '/img/projects/izmir.jpg',
      '/img/projects/izmir-2.jpg',
      '/img/projects/izmir-3.jpg',
      '/img/projects/izmir-4.jpg',
      '/img/projects/izmir-5.jpg',
    ],
    description: st(
      "IZMIR — kompaniyaning premium segmentdagi loyihasi. Past qavatli, o'rta yer dengizi arxitekturasidan ilhomlangan to'rtta blok, keng terassalar va yashil hovli. Har bir xonadonda balkon yoki lodjiya mavjud, yuqori qavatlarda terrasali penthouslar taklif etiladi.",
      'IZMIR — премиальный проект компании. Четыре малоэтажных блока в средиземноморской архитектуре, просторные террасы и зелёный двор. В каждой квартире балкон или лоджия, на верхних этажах — пентхаусы с террасами.',
    ),
    highlights: [
      st('Premium segment, past qavatlilik', 'Премиум-сегмент, малоэтажность'),
      st('Keng terassalar va lodjiyalar', 'Просторные террасы и лоджии'),
      st('Yashil hovli va fontan zonasi', 'Зелёный двор и зона фонтана'),
      st('Yer usti va yer osti avtoturargoh', 'Наземный и подземный паркинг'),
      st('Fitnes va bolalar xonasi', 'Фитнес-зал и детская комната'),
      st('Penthouslar — 5-ta xonadon', 'Пентхаусы — 5 квартир'),
    ],
    infrastructure: [
      { name: st('Xalqaro maktab', 'Международная школа'), distance: st('900 m', '900 м') },
      { name: st('Bog’ishamol xiyoboni', 'Парк Богишамол'), distance: st('300 m', '300 м') },
      { name: st('Supermarket', 'Супермаркет'), distance: st('250 m', '250 м') },
      { name: st('Xususiy klinika', 'Частная клиника'), distance: st('1,1 km', '1,1 км') },
      { name: st('Sport majmuasi', 'Спорткомплекс'), distance: st('1,5 km', '1,5 км') },
      { name: st('Aeroport', 'Аэропорт'), distance: st('6 km', '6 км') },
    ],
    plans: plans('izmir', 11_500_000, [
      [1, 52, 2, 'available'],
      [1, 54, 5, 'sold'],
      [2, 72, 3, 'available'],
      [2, 76, 7, 'available'],
      [3, 96, 4, 'reserved'],
      [3, 104, 8, 'available'],
      [4, 128, 9, 'available'],
      [4, 142, 9, 'available'],
    ]),
    schedule: [
      { label: st('Poydevor ishlari', 'Фундаментные работы'), date: st('2025-yil I chorak', 'I квартал 2025'), done: true },
      { label: st('Karkas qurilishi', 'Возведение каркаса'), date: st('2025-yil III chorak', 'III квартал 2025'), done: true },
      { label: st('Fasad ishlari', 'Фасадные работы'), date: st('2026-yil II chorak', 'II квартал 2026'), done: true },
      { label: st('Muhandislik tarmoqlari', 'Инженерные сети'), date: st('2026-yil IV chorak', 'IV квартал 2026'), done: false },
      { label: st('Pardozlash va obodonlashtirish', 'Отделка и благоустройство'), date: st('2027-yil I chorak', 'I квартал 2027'), done: false },
      { label: st('Kalit topshirish', 'Передача ключей'), date: st('2027-yil II chorak', 'II квартал 2027'), done: false },
    ],
    passport: [
      { label: st('Qurilish texnologiyasi', 'Технология строительства'), value: st('Monolit-g’isht', 'Монолитно-кирпичная') },
      { label: st('Tashqi devorlar', 'Наружные стены'), value: st('Issiqlik izolyatsiyali dekorativ shtukatur fasad', 'Утеплённый фасад с декоративной штукатуркой') },
      { label: st('Oynalar', 'Окна'), value: st('Panoramali, ikki kamerali', 'Панорамные, двухкамерные') },
      { label: st('Liftlar', 'Лифты'), value: st('Har blokda 1 ta yo’lovchi lifti', 'По 1 пассажирскому лифту в блоке') },
      { label: st('Isitish', 'Отопление'), value: st('Individual gaz qozoni', 'Индивидуальный газовый котёл') },
      { label: st('Xavfsizlik', 'Безопасность'), value: st('Yopiq hudud, videokuzatuv, videodomofon', 'Закрытая территория, видеонаблюдение, видеодомофон') },
      { label: st('Pardoz holati', 'Состояние отделки'), value: st('To’liq pardozli variant mavjud', 'Доступен вариант с полной отделкой') },
    ],
    geo: { lat: 39.6801, lng: 66.9421 },
    featured: true,
  },

  {
    slug: 'marocco',
    name: 'Marocco',
    tagline: st('Sharq naqshlari va zamonaviy qulaylik', 'Восточные мотивы и современный комфорт'),
    status: 'building',
    district: st('Samarqand shahri, Sattepo', 'г. Самарканд, Саттепо'),
    districtKey: 'sattepo',
    address: st('Samarqand shahri, Sattepo mavzesi', 'г. Самарканд, массив Саттепо'),
    pricePerSqm: 8_600_000,
    handover: st('2026-yil IV chorak', 'IV квартал 2026 г.'),
    handoverYear: 2026,
    floors: 12,
    apartments: 264,
    blocks: 3,
    roomOptions: [1, 2, 3],
    cover: '/img/projects/marocco.jpg',
    gallery: [
      '/img/projects/marocco.jpg',
      '/img/projects/marocco-2.jpg',
      '/img/projects/marocco-3.jpg',
      '/img/projects/marocco-4.jpg',
      '/img/projects/marocco-5.jpg',
    ],
    description: st(
      "Marocco — sharqona bezak elementlari bilan boyitilgan fasad va yorug' ichki hovli loyihasi. Oilaviy xaridorlar uchun mo'ljallangan: xonadonlarning aksariyati 2 va 3 xonali, bolalar maydonchalari va sport zonasi kengaytirilgan.",
      'Marocco — проект с фасадом, обогащённым восточными декоративными элементами, и светлым внутренним двором. Ориентирован на семейных покупателей: большинство квартир — 2- и 3-комнатные, расширенные детские и спортивные зоны.',
    ),
    highlights: [
      st('Oilaviy xaridorlar uchun planirovkalar', 'Планировки для семейных покупателей'),
      st('Kengaytirilgan bolalar maydonchalari', 'Расширенные детские площадки'),
      st('Sport va yugurish zonasi', 'Спортивная и беговая зона'),
      st('Yer usti avtoturargoh', 'Наземный паркинг'),
      st('Sharqona dekorativ fasad', 'Восточный декоративный фасад'),
      st('Qulay narx segmenti', 'Доступный ценовой сегмент'),
    ],
    infrastructure: [
      { name: st('Maktab', 'Школа'), distance: st('400 m', '400 м') },
      { name: st('Bolalar bog’chasi', 'Детский сад'), distance: st('150 m', '150 м') },
      { name: st('Bozor', 'Рынок'), distance: st('700 m', '700 м') },
      { name: st('Oilaviy poliklinika', 'Семейная поликлиника'), distance: st('850 m', '850 м') },
      { name: st('Avtobus bekati', 'Автобусная остановка'), distance: st('100 m', '100 м') },
    ],
    plans: plans('marocco', 8_600_000, [
      [1, 44, 3, 'available'],
      [1, 47, 8, 'available'],
      [2, 64, 2, 'sold'],
      [2, 69, 6, 'available'],
      [2, 71, 10, 'available'],
      [3, 88, 5, 'available'],
      [3, 94, 11, 'reserved'],
    ]),
    schedule: [
      { label: st('Poydevor ishlari', 'Фундаментные работы'), date: st('2024-yil IV chorak', 'IV квартал 2024'), done: true },
      { label: st('Karkas qurilishi', 'Возведение каркаса'), date: st('2025-yil II chorak', 'II квартал 2025'), done: true },
      { label: st('Fasad ishlari', 'Фасадные работы'), date: st('2025-yil IV chorak', 'IV квартал 2025'), done: true },
      { label: st('Muhandislik tarmoqlari', 'Инженерные сети'), date: st('2026-yil II chorak', 'II квартал 2026'), done: true },
      { label: st('Pardozlash', 'Отделка'), date: st('2026-yil III chorak', 'III квартал 2026'), done: false },
      { label: st('Topshirish', 'Сдача'), date: st('2026-yil IV chorak', 'IV квартал 2026'), done: false },
    ],
    passport: [
      { label: st('Qurilish texnologiyasi', 'Технология строительства'), value: st('Monolit-karkas', 'Монолитно-каркасная') },
      { label: st('Tashqi devorlar', 'Наружные стены'), value: st('G’isht, issiqlik izolyatsiyali', 'Кирпич с утеплением') },
      { label: st('Oynalar', 'Окна'), value: st('Ikki kamerali paket', 'Двухкамерный стеклопакет') },
      { label: st('Liftlar', 'Лифты'), value: st('Har blokda 2 ta lift', 'По 2 лифта в блоке') },
      { label: st('Isitish', 'Отопление'), value: st('Individual gaz qozoni', 'Индивидуальный газовый котёл') },
      { label: st('Xavfsizlik', 'Безопасность'), value: st('Videokuzatuv, domofon', 'Видеонаблюдение, домофон') },
      { label: st('Pardoz holati', 'Состояние отделки'), value: st('Oq quti', 'Белая коробка') },
    ],
    geo: { lat: 39.6489, lng: 66.9331 },
    featured: true,
  },

  {
    slug: 'ashgabad',
    name: 'Ashgabad',
    tagline: st('Oq fasadlar, keng hovli va tinch mahalla', 'Белые фасады, просторный двор и тихий район'),
    status: 'selling',
    district: st('Samarqand shahri, Ashgabad', 'г. Самарканд, Ашхабад'),
    districtKey: 'ashgabad',
    address: st('Samarqand shahri, Ashgabad mavzesi', 'г. Самарканд, массив Ашхабад'),
    pricePerSqm: 8_200_000,
    handover: st('2026-yil III chorak', 'III квартал 2026 г.'),
    handoverYear: 2026,
    floors: 9,
    apartments: 180,
    blocks: 3,
    roomOptions: [1, 2, 3],
    cover: '/img/projects/ashgabad.jpg',
    gallery: [
      '/img/projects/ashgabad.jpg',
      '/img/projects/ashgabad-2.jpg',
      '/img/projects/ashgabad-3.jpg',
      '/img/projects/ashgabad-4.jpg',
      '/img/projects/ashgabad-5.jpg',
    ],
    description: st(
      "Ashgabad — tinch mahallada joylashgan, oq marmar tusli fasadlarga ega to'qqiz qavatli majmua. Keng hovli, katta yashil maydon va aholiga qulay narx darajasi loyihaning asosiy ustunliklari.",
      'Ashgabad — девятиэтажный комплекс в тихом районе с фасадами в белых мраморных тонах. Просторный двор, большая зелёная зона и доступный уровень цен — главные преимущества проекта.',
    ),
    highlights: [
      st('Tinch, shovqinsiz mahalla', 'Тихий, спокойный район'),
      st('Keng yashil hovli', 'Просторный зелёный двор'),
      st('Qulay narx', 'Доступная цена'),
      st('Yaqin atrofda maktab va bog’cha', 'Школа и детсад рядом'),
      st('Yer usti avtoturargoh', 'Наземный паркинг'),
    ],
    infrastructure: [
      { name: st('Maktab', 'Школа'), distance: st('250 m', '250 м') },
      { name: st('Bolalar bog’chasi', 'Детский сад'), distance: st('180 m', '180 м') },
      { name: st('Do’konlar', 'Магазины'), distance: st('120 m', '120 м') },
      { name: st('Poliklinika', 'Поликлиника'), distance: st('900 m', '900 м') },
      { name: st('Park', 'Парк'), distance: st('600 m', '600 м') },
    ],
    plans: plans('ashgabad', 8_200_000, [
      [1, 42, 2, 'available'],
      [1, 45, 7, 'available'],
      [2, 61, 4, 'available'],
      [2, 66, 8, 'reserved'],
      [3, 82, 3, 'available'],
      [3, 87, 9, 'available'],
    ]),
    schedule: [
      { label: st('Poydevor ishlari', 'Фундаментные работы'), date: st('2024-yil II chorak', 'II квартал 2024'), done: true },
      { label: st('Karkas qurilishi', 'Возведение каркаса'), date: st('2024-yil IV chorak', 'IV квартал 2024'), done: true },
      { label: st('Fasad ishlari', 'Фасадные работы'), date: st('2025-yil II chorak', 'II квартал 2025'), done: true },
      { label: st('Muhandislik tarmoqlari', 'Инженерные сети'), date: st('2025-yil IV chorak', 'IV квартал 2025'), done: true },
      { label: st('Pardozlash', 'Отделка'), date: st('2026-yil II chorak', 'II квартал 2026'), done: false },
      { label: st('Topshirish', 'Сдача'), date: st('2026-yil III chorak', 'III квартал 2026'), done: false },
    ],
    passport: [
      { label: st('Qurilish texnologiyasi', 'Технология строительства'), value: st('Karkas-g’isht', 'Каркасно-кирпичная') },
      { label: st('Tashqi devorlar', 'Наружные стены'), value: st('G’isht, issiqlik izolyatsiyali', 'Кирпич с утеплением') },
      { label: st('Oynalar', 'Окна'), value: st('Ikki kamerali paket', 'Двухкамерный стеклопакет') },
      { label: st('Liftlar', 'Лифты'), value: st('Har blokda 1 ta lift', 'По 1 лифту в блоке') },
      { label: st('Isitish', 'Отопление'), value: st('Individual gaz qozoni', 'Индивидуальный газовый котёл') },
      { label: st('Xavfsizlik', 'Безопасность'), value: st('Videokuzatuv, domofon', 'Видеонаблюдение, домофон') },
      { label: st('Pardoz holati', 'Состояние отделки'), value: st('Oq quti', 'Белая коробка') },
    ],
    geo: { lat: 39.6702, lng: 66.9885 },
    featured: false,
  },

  {
    slug: 'nrg-qorasuv',
    name: 'NRG Qorasuv',
    tagline: st('Qorasuv bo’yida yangi turar-joy klasteri', 'Новый жилой кластер на берегу Карасу'),
    status: 'soon',
    district: st('Samarqand viloyati, Qorasuv', 'Самаркандская область, Карасу'),
    districtKey: 'qorasuv',
    address: st('Samarqand viloyati, Qorasuv hududi', 'Самаркандская область, район Карасу'),
    pricePerSqm: 7_400_000,
    handover: st('2028-yil II chorak', 'II квартал 2028 г.'),
    handoverYear: 2028,
    floors: 7,
    apartments: 156,
    blocks: 4,
    roomOptions: [1, 2, 3],
    cover: '/img/projects/nrg.jpg',
    gallery: [
      '/img/projects/nrg.jpg',
      '/img/projects/nrg-2.jpg',
      '/img/projects/nrg-3.jpg',
      '/img/projects/nrg-4.jpg',
      '/img/projects/nrg-5.jpg',
    ],
    description: st(
      "NRG Qorasuv — suv bo'yida, tabiatga yaqin joylashgan yangi turar-joy klasteri. Past qavatli bloklar, keng piyoda zonalari va sohil bo'ylab yurish yo'lakchasi rejalashtirilgan. Loyiha hozircha tayyorgarlik bosqichida — dastlabki narxlar bo'yicha bron ochilgan.",
      'NRG Qorasuv — новый жилой кластер у воды, рядом с природой. Запланированы малоэтажные блоки, широкие пешеходные зоны и прогулочная набережная. Проект на стадии подготовки — открыто бронирование по стартовым ценам.',
    ),
    highlights: [
      st('Suv bo’yi va tabiat yaqinligi', 'Близость воды и природы'),
      st('Past qavatli bloklar', 'Малоэтажные блоки'),
      st('Sohil bo’ylab piyoda yo’lakcha', 'Прогулочная набережная'),
      st('Start narxlar bo’yicha bron', 'Бронирование по стартовым ценам'),
      st('Keng hovli va rekreatsiya zonasi', 'Просторный двор и зона отдыха'),
    ],
    infrastructure: [
      { name: st('Maktab (rejalashtirilgan)', 'Школа (запланирована)'), distance: st('500 m', '500 м') },
      { name: st('Qorasuv sohili', 'Берег Карасу'), distance: st('150 m', '150 м') },
      { name: st('Shahar markazi', 'Центр города'), distance: st('12 km', '12 км') },
      { name: st('Yo’l chorrahasi', 'Транспортная развязка'), distance: st('2 km', '2 км') },
    ],
    plans: plans('nrg', 7_400_000, [
      [1, 40, 2, 'available'],
      [1, 43, 5, 'available'],
      [2, 58, 3, 'available'],
      [2, 63, 6, 'available'],
      [3, 79, 4, 'available'],
      [3, 85, 7, 'available'],
    ]),
    schedule: [
      { label: st('Loyihalash', 'Проектирование'), date: st('2026-yil I–II chorak', 'I–II квартал 2026'), done: true },
      { label: st('Ruxsatnomalar', 'Разрешительные документы'), date: st('2026-yil III chorak', 'III квартал 2026'), done: false },
      { label: st('Poydevor ishlari', 'Фундаментные работы'), date: st('2026-yil IV chorak', 'IV квартал 2026'), done: false },
      { label: st('Karkas qurilishi', 'Возведение каркаса'), date: st('2027-yil I–IV chorak', 'I–IV квартал 2027'), done: false },
      { label: st('Pardozlash va topshirish', 'Отделка и сдача'), date: st('2028-yil I–II chorak', 'I–II квартал 2028'), done: false },
    ],
    passport: [
      { label: st('Qurilish texnologiyasi', 'Технология строительства'), value: st('Karkas-g’isht', 'Каркасно-кирпичная') },
      { label: st('Qavatlilik', 'Этажность'), value: st('7 qavat, 4 blok', '7 этажей, 4 блока') },
      { label: st('Oynalar', 'Окна'), value: st('Ikki kamerali paket', 'Двухкамерный стеклопакет') },
      { label: st('Isitish', 'Отопление'), value: st('Individual gaz qozoni', 'Индивидуальный газовый котёл') },
      { label: st('Xavfsizlik', 'Безопасность'), value: st('Yopiq hudud, videokuzatuv', 'Закрытая территория, видеонаблюдение') },
      { label: st('Pardoz holati', 'Состояние отделки'), value: st('Oq quti', 'Белая коробка') },
    ],
    geo: { lat: 39.7455, lng: 66.8412 },
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const districts = Array.from(
  new Map(projects.map((p) => [p.districtKey, p.district])).entries(),
).map(([key, label]) => ({ key, label }));

export function minPrice(p: Project): number {
  const available = p.plans.filter((x) => x.status !== 'sold');
  const pool = available.length ? available : p.plans;
  return Math.min(...pool.map((x) => x.price));
}
