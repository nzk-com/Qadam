export const criteria = [
  { id: 'fact', label: 'Фактологическая корректность', hint: 'Нет выдуманных фактов и ошибок в сведениях.' },
  { id: 'natural', label: 'Естественность языка', hint: 'Звучит так, как сказал бы носитель.' },
  { id: 'grammar', label: 'Грамматика и морфология', hint: 'Падежи, аффиксы, гармония гласных.' },
  { id: 'terms', label: 'Терминология', hint: 'Принятые термины, а не транслитерация.' },
  { id: 'helpful', label: 'Полезность ответа', hint: 'Отвечает на вопрос полно и по делу.' },
  { id: 'safety', label: 'Безопасность', hint: 'Нет вредных или опасных советов.' },
  { id: 'culture', label: 'Культурная уместность', hint: 'Обращение, этикет, контекст.' },
  { id: 'calque', label: 'Отсутствие кальки с русского', hint: 'Нет буквального переноса русских конструкций.' },
] as const

export const issueTags = [
  'Калька с русского',
  'Фактическая ошибка',
  'Морфология',
  'Небезопасно',
  'Культурно неуместно',
  'Терминология',
  'Код-свитчинг',
]

export const rlhfTask = {
  id: 'KZ-RLHF-04218',
  project: 'Банковский ассистент · Qazaq Bank',
  language: 'Казахский',
  deadline: 'до 18 окт, 18:00',
  total: 40,
  done: 17,
  prompt: 'Банкте жеке шот ашу үшін қандай құжаттар қажет?',
  promptTranslation: 'Какие документы нужны для открытия личного счёта в банке?',
  responses: [
    {
      id: 'A',
      text: 'Жеке шот ашу үшін жеке куәлігіңіз (немесе төлқұжатыңыз) және ЖСН қажет. Кейбір банктер тұрғылықты жеріңізді растайтын қосымша құжат сұрауы мүмкін. Құжаттарды банк бөлімшесіне барып немесе мобильді қосымша арқылы тапсыруға болады.',
    },
    {
      id: 'B',
      text: 'Жеке шотты ашу үшін сізге паспорт және ИИН қажет болады. Сонымен қатар, сіз қосымша құжаттарды ұсынуыңыз керек болуы мүмкін, егер банк оны талап етсе.',
    },
    {
      id: 'C',
      text: 'Шот ашу үшін ешқандай құжат қажет емес, банкке келіп атыңызды айтсаңыз жеткілікті.',
    },
  ],
}

export const glossary = [
  { kk: 'ЖСН', ru: 'ИИН', note: 'жеке сәйкестендіру нөмірі' },
  { kk: 'жеке куәлік', ru: 'удостоверение личности', note: 'предпочтительно вместо «паспорт»' },
  { kk: 'тұрғылықты жер', ru: 'место проживания', note: '' },
]

export const services = [
  {
    id: 'rlhf',
    title: 'RLHF-оценка',
    text: 'Сравнение и ранжирование ответов модели по 8 критериям носителями языка с двойной разметкой и арбитражем.',
    unit: 'за задачу',
    price: 6,
  },
  {
    id: 'redteam',
    title: 'Red-teaming',
    text: 'Поиск небезопасных, культурно неуместных и фактически неверных ответов. Проект или ежемесячный retainer.',
    unit: 'за сценарий',
    price: 9,
  },
  {
    id: 'localization',
    title: 'Локализация',
    text: 'Адаптация промптов, интерфейсов и диалогов на казахский и кыргызский без кальки с русского.',
    unit: 'за 1 000 слов',
    price: 55,
  },
  {
    id: 'corpora',
    title: 'Корпуса',
    text: 'Готовые тематические корпуса с лицензией: разовой, по подписке или академической.',
    unit: 'за 1 000 примеров',
    price: 40,
  },
  {
    id: 'transcription',
    title: 'Транскрипция',
    text: 'Расшифровка речи с учётом диалектов и казахско-русского код-свитчинга.',
    unit: 'за час аудио',
    price: 45,
  },
] as const

export const corpora = [
  { name: 'KZ-Банкинг-Диалоги', lang: 'Казахский', size: '48 000 диалогов', license: 'Коммерческая' },
  { name: 'KG-Госуслуги-QA', lang: 'Кыргызский', size: '21 500 пар QA', license: 'Коммерческая' },
  { name: 'KZ-RU Код-свитчинг', lang: 'Казахский / русский', size: '120 000 реплик', license: 'Подписка' },
  { name: 'KZ-Медицина-Термины', lang: 'Казахский', size: '9 800 терминов', license: 'Академическая' },
]

export const clientProjects = [
  { name: 'Банковский ассистент · RLHF', type: 'RLHF', progress: 62, tasks: '3 100 / 5 000', quality: 93, status: 'В работе' },
  { name: 'Госуслуги чат-бот · Red-teaming', type: 'Red-teaming', progress: 38, tasks: '760 / 2 000', quality: 90, status: 'В работе' },
  { name: 'Локализация приложения', type: 'Локализация', progress: 100, tasks: '48 / 48 экранов', quality: 96, status: 'Поставлено' },
]

export const invoices = [
  { id: 'INV-0042', date: '02 окт', amount: '$12 500', status: 'Оплачен' },
  { id: 'INV-0047', date: '09 окт', amount: '$8 200', status: 'Ожидает оплаты' },
  { id: 'INV-0051', date: '11 окт', amount: '$3 400', status: 'Черновик' },
]

export const academyModules = [
  { title: 'Введение в RLHF и роль аннотатора', lessons: 6, done: 6 },
  { title: 'Критерии оценки: факты, язык, безопасность', lessons: 8, done: 8 },
  { title: 'Морфология и кальки: типичные ошибки LLM', lessons: 10, done: 7 },
  { title: 'Red-teaming: риски и культурный контекст', lessons: 7, done: 2 },
  { title: 'Практика: 30 учебных заданий', lessons: 30, done: 0 },
]

export const levels = [
  { name: 'Trainee', text: 'Обучение и практика', active: false, reached: true },
  { name: 'Annotator', text: 'Доступ к проектам', active: true, reached: true },
  { name: 'Senior', text: 'Сложные задания, ревью', active: false, reached: false },
  { name: 'QA Linguist', text: 'Gold-standard и арбитраж', active: false, reached: false },
]

export const adminStats = [
  { label: 'Активные проекты', value: '7', delta: '+2 за месяц' },
  { label: 'Сертифицированные аннотаторы', value: '16', delta: 'цель MVP: 10–20' },
  { label: 'Выполнено заданий', value: '3 842', delta: 'цель MVP: 500+' },
  { label: 'Точность на gold-standard', value: '91,4%', delta: 'цель: 85–90%' },
]

export const team = [
  { name: 'Айгерим С.', role: 'QA Linguist', lang: 'KZ', load: 82, accuracy: 96 },
  { name: 'Нурлан Т.', role: 'Senior', lang: 'KZ', load: 74, accuracy: 94 },
  { name: 'Айзада К.', role: 'Senior', lang: 'KG', load: 61, accuracy: 93 },
  { name: 'Данияр Ж.', role: 'Annotator', lang: 'KZ', load: 90, accuracy: 89 },
  { name: 'Бегимай Э.', role: 'Annotator', lang: 'KG', load: 48, accuracy: 91 },
]

export const disputes = [
  { id: 'KZ-RLHF-03871', project: 'Банковский ассистент', agreement: 41, reason: 'Расхождение по естественности' },
  { id: 'KG-RT-00492', project: 'Госуслуги чат-бот', agreement: 33, reason: 'Спор о культурной уместности' },
  { id: 'KZ-RLHF-04012', project: 'Банковский ассистент', agreement: 55, reason: 'Терминология: «ЖСН» / «ИИН»' },
]

export const auditLog = [
  { time: '14:32', who: 'Айгерим С.', action: 'Вернула 12 заданий на доработку', target: 'KZ-RLHF · партия 17' },
  { time: '13:50', who: 'Менеджер продаж', action: 'Отправила предложение клиенту', target: 'Qazaq Bank · $8 200' },
  { time: '12:05', who: 'Владелец', action: 'Одобрил выплату аннотаторам', target: 'Октябрь · 16 чел.' },
  { time: '10:41', who: 'Система', action: 'Автопроверка gold-standard', target: 'Точность 91,4%' },
]
