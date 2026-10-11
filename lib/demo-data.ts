export const criteriaIds = ['fact', 'natural', 'grammar', 'terms', 'helpful', 'safety', 'culture', 'calque'] as const
export type CriterionId = (typeof criteriaIds)[number]

export const tagIds = ['calque', 'fact', 'morph', 'unsafe', 'culture', 'terms', 'switching'] as const
export type TagId = (typeof tagIds)[number]

export const rlhfTask = {
  id: 'KZ-RLHF-04218',
  total: 40,
  done: 17,
  prompt: 'Банкте жеке шот ашу үшін қандай құжаттар қажет?',
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
  { id: 'iin', kk: 'ЖСН', ru: 'ИИН' },
  { id: 'id', kk: 'жеке куәлік', ru: 'удостоверение личности' },
  { id: 'residence', kk: 'тұрғылықты жер', ru: 'место проживания' },
] as const

export const services = [
  { id: 'rlhf', price: 6 },
  { id: 'redteam', price: 9 },
  { id: 'localization', price: 55 },
  { id: 'corpora', price: 40 },
  { id: 'transcription', price: 45 },
] as const

export const corpusStatusIds = ['available', 'production', 'custom'] as const
export type CorpusStatusId = (typeof corpusStatusIds)[number]

export const corpora: ReadonlyArray<{
  name: string
  lang: 'kk' | 'ky' | 'mix'
  n: number | null
  unit: 'dialogs' | 'qa' | 'utterances' | 'terms'
  license: 'commercial' | 'subscription' | 'academic' | 'custom'
  status: CorpusStatusId
}> = [
  { name: 'KZ-Banking-Dialogues', lang: 'kk', n: 48000, unit: 'dialogs', license: 'commercial', status: 'available' },
  { name: 'KZ-RU Code-Switching', lang: 'mix', n: 120000, unit: 'utterances', license: 'subscription', status: 'available' },
  { name: 'KZ-Medical-Terms', lang: 'kk', n: 9800, unit: 'terms', license: 'academic', status: 'available' },
  { name: 'KG-GovServices-QA', lang: 'ky', n: 21500, unit: 'qa', license: 'commercial', status: 'production' },
  { name: 'KZ-Telecom-Support', lang: 'kk', n: null, unit: 'dialogs', license: 'custom', status: 'custom' },
]

export const heroDemo = {
  taskId: rlhfTask.id,
  prompt: rlhfTask.prompt,
  responses: [
    {
      id: 'A',
      text: 'Жеке шот ашу үшін жеке куәлігіңіз және ЖСН қажет. Кейбір банктер тұрғылықты жерді растайтын құжат сұрайды.',
    },
    {
      id: 'B',
      text: 'Жеке шотты ашу үшін сізге паспорт және ИИН қажет болады. Сонымен қатар, сіз қосымша құжаттарды ұсынуыңыз керек болуы мүмкін.',
    },
  ],
  tags: ['calque', 'terms', 'morph'] as TagId[],
  expert: { best: 'A', tags: ['calque', 'terms'] as TagId[] },
}

export const clientProjects = [
  { id: 'bank', type: 'rlhf', progress: 62, done: 3100, total: 5000, unit: 'tasks', quality: 93, status: 'inProgress' },
  { id: 'gov', type: 'redteam', progress: 38, done: 760, total: 2000, unit: 'tasks', quality: 90, status: 'inProgress' },
  { id: 'app', type: 'localization', progress: 100, done: 48, total: 48, unit: 'screens', quality: 96, status: 'delivered' },
] as const

export const invoices = [
  { id: 'INV-0042', date: '2026-10-02', amount: 12500, status: 'paid' },
  { id: 'INV-0047', date: '2026-10-09', amount: 8200, status: 'pending' },
  { id: 'INV-0051', date: '2026-10-11', amount: 3400, status: 'draft' },
] as const

export const academyModules = [
  { lessons: 6, done: 6 },
  { lessons: 8, done: 8 },
  { lessons: 10, done: 7 },
  { lessons: 7, done: 2 },
  { lessons: 30, done: 0 },
]

export const levels = [
  { name: 'Trainee', active: false, reached: true },
  { name: 'Annotator', active: true, reached: true },
  { name: 'Senior', active: false, reached: false },
  { name: 'QA Linguist', active: false, reached: false },
]

export const adminStats = [
  { value: 7, kind: 'int' },
  { value: 16, kind: 'int' },
  { value: 3842, kind: 'int' },
  { value: 91.4, kind: 'pct' },
] as const

export const team = [
  { role: 'QA Linguist', lang: 'KZ', load: 82, accuracy: 96 },
  { role: 'Senior', lang: 'KZ', load: 74, accuracy: 94 },
  { role: 'Senior', lang: 'KG', load: 61, accuracy: 93 },
  { role: 'Annotator', lang: 'KZ', load: 90, accuracy: 89 },
  { role: 'Annotator', lang: 'KG', load: 48, accuracy: 91 },
]

export const disputes = [
  { id: 'KZ-RLHF-03871', project: 'bank', agreement: 41 },
  { id: 'KG-RT-00492', project: 'gov', agreement: 33 },
  { id: 'KZ-RLHF-04012', project: 'bank', agreement: 55 },
] as const

export const auditTimes = ['14:32', '13:50', '12:05', '10:41']
