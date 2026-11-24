/**
 * Основные настройки сайта. Здесь меняются контакты и ссылки —
 * всё остальное подтягивается автоматически.
 */
export const site = {
  title: 'inCruises · BoardTeam — клуб туристических вознаграждений',
  description:
    'Круизы, отели и туры по клубным ценам со скидкой до 100%. Вступайте в inCruises с командой BoardTeam — путешествуйте больше и зарабатывайте, путешествуя.',
  team: 'BoardTeam',

  /**
   * Контакты. Пустые значения скрываются автоматически.
   * whatsapp — номер в международном формате без «+» и пробелов, например 77011234567
   * telegram — имя пользователя без «@»
   * instagram — имя аккаунта без «@»
   * joinUrl — ваша персональная реферальная ссылка inCruises
   */
  contacts: {
    whatsapp: '',
    telegram: '',
    instagram: '',
    phone: '',
    joinUrl: 'https://www.incruises.com/',
  },
  whatsappText: 'Здравствуйте! Хочу узнать подробнее о клубе inCruises.',

  /**
   * Личный консультант (используется в версии 3).
   * Пока name пустое, вместо личной карточки показывается блок команды BoardTeam.
   * photo — путь к файлу в папке public, например 'owner.jpg'
   */
  owner: {
    name: '',
    role: 'Независимый партнёр inCruises',
    photo: '',
    story: '',
  },
};

export const nav = [
  { href: '#numbers', label: 'Цифры' },
  { href: '#savings', label: 'Выгода' },
  { href: '#plans', label: 'Планы' },
  { href: '#partner', label: 'Партнёрство' },
  { href: '#rewards', label: 'Бонусы' },
  { href: '#stories', label: 'Истории' },
];

export function contactLink(): string {
  const c = site.contacts;
  if (c.whatsapp) return `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(site.whatsappText)}`;
  if (c.telegram) return `https://t.me/${c.telegram}`;
  if (c.instagram) return `https://instagram.com/${c.instagram}`;
  return '#contact';
}
