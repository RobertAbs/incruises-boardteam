/**
 * Квиз версии 3: вопросы и правила подбора плана.
 * Все цифры берутся из презентации (content.ts) или с официального сайта inCruises.
 */
export type Option = { id: string; label: string; hint?: string; icon: string };
export type Question = { id: 'goal' | 'freq' | 'budget' | 'where'; title: string; sub?: string; multi?: boolean; options: Option[] };

export const questions: Question[] = [
  {
    id: 'goal',
    title: 'Что для вас важнее?',
    options: [
      { id: 'travel', label: 'Путешествовать выгоднее', hint: 'Круизы, отели и туры по клубным ценам', icon: 'ship' },
      { id: 'both', label: 'Путешествовать и зарабатывать', hint: 'Клуб + доход в долларах', icon: 'coins' },
      { id: 'explore', label: 'Пока просто изучаю', hint: 'Хочу понять, как это работает', icon: 'search' },
    ],
  },
  {
    id: 'freq',
    title: 'Как часто хотите путешествовать?',
    options: [
      { id: '1', label: 'Раз в год', icon: 'calendar' },
      { id: '2', label: '2–3 раза в год', icon: 'calendar' },
      { id: '4', label: 'Чаще — это мой стиль жизни', icon: 'plane' },
    ],
  },
  {
    id: 'budget',
    title: 'Бюджет поездки на двоих',
    sub: 'Примерно, на одно путешествие',
    options: [
      { id: 'low', label: 'До 2 000 $', icon: 'wallet' },
      { id: 'mid', label: '2 000 – 4 000 $', icon: 'wallet' },
      { id: 'high', label: 'От 4 000 $', icon: 'wallet' },
    ],
  },
  {
    id: 'where',
    title: 'Куда тянет?',
    sub: 'Можно выбрать несколько',
    multi: true,
    options: [
      { id: 'med', label: 'Средиземноморье', icon: 'sun' },
      { id: 'carib', label: 'Карибы и острова', icon: 'palm' },
      { id: 'asia', label: 'Азия и Эмираты', icon: 'globe' },
      { id: 'north', label: 'Скандинавия и фьорды', icon: 'mountain' },
      { id: 'any', label: 'Открыт всему', icon: 'sparkle' },
    ],
  },
];

export type Answers = { goal?: string; freq?: string; budget?: string; where: string[] };
export type PlanId = 'starter' | 'classic' | 'premium';

/** Подбор плана: бюджет задаёт уровень, частые поездки поднимают на ступень выше. */
export function pickPlan(a: Answers): PlanId {
  const order: PlanId[] = ['starter', 'classic', 'premium'];
  let i = a.budget === 'high' ? 2 : a.budget === 'mid' ? 1 : 0;
  if (a.freq === '4') i = Math.min(2, i + 1);
  return order[i];
}

export const planInfo: Record<PlanId, { name: string; letter: string; tagline: string; from: string }> = {
  starter: { name: 'Starter', letter: 'S', tagline: 'Лёгкий старт: начните копить бонусные баллы на первое путешествие', from: 'от $50 в месяц' },
  classic: { name: 'Classic', letter: 'C', tagline: 'Оптимальный план для 1–2 круизов в год', from: 'регистрация $200, далее $100 в месяц' },
  premium: { name: 'Premium', letter: 'P', tagline: 'Максимум баллов для частых и дорогих путешествий', from: 'регистрация $500, далее $250 в месяц' },
};

export const whereLabels: Record<string, string> = Object.fromEntries(questions[3].options.map((o) => [o.id, o.label]));
