/** Все тексты и цифры сайта — по утверждённой презентации. */

export const stats = [
  { value: 21000, suffix: '+', label: 'Доступные варианты круизов', icon: 'ship' },
  { value: 350000, suffix: '+', label: 'Доступные варианты туров inTours', icon: 'compass' },
  { value: 193, suffix: '', label: 'Обслуживаемые страны', icon: 'globe' },
  { value: 300000, suffix: '+', label: 'Доступные варианты размещения inStays', icon: 'hotel' },
] as const;

export const guests = { value: 803438, label: 'Гостей забронировано с июля 2016 г.' };

export const registrations = [
  { seal: 'ca', state: 'Калифорнии', prep: 'в', number: '2146142-50' },
  { seal: 'fl', state: 'Флориде', prep: 'во', number: 'ST-42861' },
  { seal: 'wa', state: 'Вашингтоне', prep: 'в', number: '604-762-223' },
] as const;

export const savings = [
  {
    word: 'Доступными',
    prefix: 'до',
    from: null,
    to: 17,
    caption: 'по Insider цене',
    title: 'Моментальная экономия 17%',
    text: 'на бронирование круиза для активных членов клуба',
    visual: 'insider',
  },
  {
    word: 'Выгодными',
    prefix: 'до',
    from: 25,
    to: 50,
    caption: 'с активной картой',
    title: 'Экономия 25–50%',
    text: 'на бронирование круиза благодаря бонусным баллам',
    visual: 'rp',
  },
  {
    word: 'Прибыльными',
    prefix: 'до',
    from: null,
    to: 100,
    caption: 'с чёрной картой',
    title: 'Путешествия за счёт компании',
    text: 'плюс дополнительный доход',
    visual: 'black',
  },
] as const;

export const platform = [
  {
    brand: 'Cruises',
    tab: 'Круизы',
    value: 21000,
    pre: '',
    headline: 'уникальных вариантов круизных путешествий со всего мира ждут вас',
    fields: [
      { label: 'Круизное направление', value: 'Средиземное море' },
      { label: 'Круизная линия', value: 'MSC, Royal Caribbean…' },
      { label: 'Дата отправления', value: 'Июнь 2026' },
    ],
    color: '#0a2244',
  },
  {
    brand: 'Stays',
    tab: 'Отели',
    value: 150000,
    pre: 'Более',
    headline: 'международных направлений для отдыха',
    fields: [
      { label: 'Направление или отель', value: 'Дубай, ОАЭ' },
      { label: 'Даты', value: '12 — 19 марта' },
      { label: 'Гости', value: '2 взрослых' },
    ],
    color: '#0e6b5c',
  },
  {
    brand: 'Tours',
    tab: 'Туры',
    value: 300000,
    pre: 'Более',
    headline: 'туров и экскурсий по всему миру',
    fields: [
      { label: 'Направление', value: 'Стамбул, Турция' },
      { label: 'С', value: '04.05.2026' },
      { label: 'По', value: '10.05.2026' },
    ],
    color: '#0f5fb5',
  },
] as const;

export const whyMember = [
  'Путешествовать на клубных условиях',
  'Заранее планировать свой отдых',
  'Открывать новые страны',
  'Проводить больше времени с семьёй в путешествиях',
  'Находить друзей, которые тоже любят путешествовать',
];

export const whyPartner = [
  'Получить возможность дополнительного заработка',
  'Развивать своё дело, совмещая с основной работой',
  'Строить международную команду',
  'Учиться общаться, продавать и быть лидером',
  'Получать вознаграждения за результаты по условиям компании',
];

export type PlanStep = { label: string; usd: number; bb: number };
export type Plan = {
  id: 'classic' | 'premium';
  name: string;
  letter: string;
  cruise: number;
  steps: PlanStep[];
  bbTotal: number;
  usdInMembership: number;
  cashPart: number;
  own: number;
  benefit: number;
};

const monthly = (n: number, usd: number, bb: number): PlanStep[] =>
  Array.from({ length: n }, (_, i) => ({ label: `${i + 1}-й месяц`, usd, bb }));

export const plans: Plan[] = [
  {
    id: 'classic',
    name: 'Classic',
    letter: 'C',
    cruise: 2700,
    steps: [{ label: 'Регистрация', usd: 200, bb: 350 }, ...monthly(5, 100, 200)],
    bbTotal: 1350,
    usdInMembership: 700,
    cashPart: 1350,
    own: 2050,
    benefit: 650,
  },
  {
    id: 'premium',
    name: 'Premium',
    letter: 'P',
    cruise: 4600,
    steps: [{ label: 'Регистрация', usd: 500, bb: 800 }, ...monthly(3, 250, 500)],
    bbTotal: 2300,
    usdInMembership: 1250,
    cashPart: 2300,
    own: 3550,
    benefit: 1050,
  },
];

export const partnerTiers = [
  { id: 'starter', name: 'Starter', letter: 'S', base: 50, total: 145 },
  { id: 'classic', name: 'Classic', letter: 'C', base: 200, total: 295 },
  { id: 'premium', name: 'Premium', letter: 'P', base: 500, total: 595 },
] as const;

export const earnings = ['Ежедневно', 'Еженедельно', 'Ежемесячно', 'Круизы с экономией до 50% и 100%'];

export const bonuses = [
  { name: 'Бонус активации', range: 'от 20$ – 50$' },
  { name: 'Еженедельный бонус', range: 'от 60$' },
  { name: 'Ежемесячный бонус', range: 'от 20$ – 100$' },
  { name: 'Командный лидерский бонус', range: 'от 300$ – 305 000$', highlight: true },
  { name: 'Рекуррентный доход', range: 'от 5$ – 12$' },
  { name: 'Фундамент бизнеса', range: 'от 200$ – 30 000$' },
  { name: 'Быстрый старт-бонус', range: 'от 200$ для MD' },
];

export const perks = [
  { name: 'Бесплатное членство', value: '200 ББ', icon: 'gift' },
  { name: 'Чёрная карта', value: '100% экономия на круизы', icon: 'card' },
  { name: 'Мировой рейтинг', value: 'до 500 ББ', icon: 'trophy' },
  {
    name: 'GLS саммит',
    value: '5★ отель на двоих + авиаперелёт, встреча с руководством inCruises и топ-лидерами со всего мира',
    icon: 'plane',
  },
];

export const payouts = ['inPay', 'PayQuicker', 'Hyperwallet', 'Payoneer', 'i-payout'];

/**
 * Командный лидерский бонус. Подписи колонок в презентации не указаны —
 * если нужно, впишите их в leadershipColumns (пустые строки не показываются).
 */
export const leadershipColumns = ['', '', '', ''];
export const leadership = [
  { rank: 'Board of Directors', color: '#3b2bd6', values: ['$550 000', '$110 000', '$55 000', 'от $5 до $10'], crown: true },
  { rank: 'Executive Director', color: '#2b2f36', values: ['$250 000', '$50 000', '$25 000', 'от $5 до $10'] },
  { rank: 'International Director', color: '#7b3fc4', values: ['$100 000', '$20 000', '$10 000', 'от $5 до $10'] },
  { rank: 'National Director', color: '#e0174f', values: ['$50 000', '$10 000', '$5 000', 'от $5 до $10'] },
  { rank: 'Regional Director', color: '#f59a0b', values: ['$25 000', '$5 000', '$2 500', 'от $5 до $6'] },
  { rank: 'Senior Marketing Director', color: '#1877c9', values: ['$10 000', '$2 000', '$1 000', '$5'] },
  { rank: 'Marketing Director', color: '#6aa628', values: ['$3 000', '$600', '$300', '$5'] },
];

export const disclaimer =
  'Данная информация предоставлена лишь с одной целью — показать, как работает Компенсационный план inCruises. Успех Независимых Партнёров inCruises будет зависеть только от результативных продаж и усилий по формированию команды, что предполагает усердную работу, целеустремлённость и лидерские качества.';
