export type Service = {
  num: string;
  cat: string;
  name: string;
  short: string;
  desc: string;
  tags: string[];
  icon: string;
  accent: string;
  glow: string;
  focus: string;
  audience: string;
  marker: string;
};

export const services: Service[] = [
  {
    num: '01', cat: 'Traumatologia', name: 'Fisioteràpia Traumatològica', short: 'Traumatològica',
    desc: 'Tractament de lesions musculoesquelètiques: lumbàlgies, cervicàlgies, esquinços lligamentosos, trencaments musculars i rehabilitació postquirúrgica integral.',
    tags: ['Lumbàlgia', 'Cervicàlgia', 'Post-cirurgia', 'Lesions'],
    icon: 'bone',
    accent: 'oklch(0.72 0.18 38)',
    glow: 'linear-gradient(135deg, oklch(0.72 0.18 38 / 0.42), oklch(0.34 0.1 28 / 0.1))',
    focus: 'Recuperació musculoesquelètica i postquirúrgica',
    audience: 'Dolor articular, contractures i lesions de teixits tous',
    marker: 'Rehabilitació guiada',
  },
  {
    num: '02', cat: 'Esport', name: 'Fisioteràpia Esportiva', short: 'Esportiva',
    desc: 'Prevenció i recuperació de lesions esportives per accelerar la curació i retornar al rendiment màxim. Adaptat a atletes amateur i professionals.',
    tags: ['Prevenció', 'Recuperació', 'Rendiment'],
    icon: 'activity',
    accent: 'oklch(0.77 0.19 155)',
    glow: 'linear-gradient(135deg, oklch(0.77 0.19 155 / 0.34), oklch(0.27 0.09 165 / 0.12))',
    focus: 'Retorn progressiu a l’activitat i al rendiment',
    audience: 'Esportistes amateurs, federats i readaptació de càrregues',
    marker: 'Focus rendiment',
  },
  {
    num: '03', cat: 'Neurologia', name: 'Fisioteràpia Neurològica', short: 'Neurològica',
    desc: 'Atenció especialitzada a patologies del sistema nerviós central i perifèric: ictus, Parkinson, esclerosi múltiple, ELA i lesions medul·lars.',
    tags: ['Ictus', 'Parkinson', 'ELA', 'Esclerosi'],
    icon: 'brain',
    accent: 'oklch(0.71 0.17 290)',
    glow: 'linear-gradient(135deg, oklch(0.71 0.17 290 / 0.34), oklch(0.3 0.08 285 / 0.12))',
    focus: 'Treball neuromotor, coordinació i funcionalitat',
    audience: 'Patologies neurològiques centrals i perifèriques',
    marker: 'Abordatge funcional',
  },
  {
    num: '04', cat: 'Aquàtica', name: 'Fisioteràpia Aquàtica', short: 'Aquàtica',
    desc: 'Rehabilitació en medi aquàtic aprofitant la flotabilitat per reduir la càrrega articular. Ideal per a recuperació postoperatòria i hèrnies discals.',
    tags: ['Hidroteràpia', 'Post-op', 'Hèrnia discal'],
    icon: 'waves',
    accent: 'oklch(0.76 0.13 230)',
    glow: 'linear-gradient(135deg, oklch(0.76 0.13 230 / 0.36), oklch(0.3 0.09 220 / 0.12))',
    focus: 'Mobilitat assistida amb descàrrega de pes articular',
    audience: 'Postoperatori, hèrnies discals i dolor amb càrrega',
    marker: 'Medi aquàtic',
  },
  {
    num: '05', cat: 'Reumatologia', name: 'Reumatologia', short: 'Reumatologia',
    desc: 'Tractament de malalties del sistema locomotor causades per afeccions reumàtiques: artritis, espondilitis anquilosant i altres patologies inflamatòries.',
    tags: ['Artritis', 'Espondilitis', 'Dolor crònic'],
    icon: 'sparkles',
    accent: 'oklch(0.78 0.12 80)',
    glow: 'linear-gradient(135deg, oklch(0.78 0.12 80 / 0.34), oklch(0.35 0.08 62 / 0.1))',
    focus: 'Dolor crònic, rigidesa i control inflamatori',
    audience: 'Pacients amb afectacions reumàtiques o autoimmunes',
    marker: 'Gestió del dolor',
  },
  {
    num: '06', cat: 'Geriatria', name: 'Fisioteràpia Geriàtrica', short: 'Geriàtrica',
    desc: 'Cura especialitzada per a persones grans centrada en el manteniment de la mobilitat, l\'autonomia, la força muscular i el treball de l\'equilibri i la marxa.',
    tags: ['Mobilitat', 'Equilibri', 'Autonomia'],
    icon: 'shield',
    accent: 'oklch(0.74 0.14 120)',
    glow: 'linear-gradient(135deg, oklch(0.74 0.14 120 / 0.34), oklch(0.31 0.07 130 / 0.12))',
    focus: 'Autonomia, estabilitat i confiança en la marxa',
    audience: 'Persones grans que volen mantenir mobilitat i seguretat',
    marker: 'Equilibri i marxa',
  },
  {
    num: '07', cat: 'Pediatria', name: 'Fisioteràpia Pediàtrica', short: 'Pediàtrica',
    desc: 'Tractament de patologies musculoesquelètiques i rehabilitació neurològica en nens i adolescents amb tècniques adaptades a cada edat i necessitat.',
    tags: ['Nens', 'Adolescents', 'Neuromotor'],
    icon: 'toy',
    accent: 'oklch(0.8 0.16 15)',
    glow: 'linear-gradient(135deg, oklch(0.8 0.16 15 / 0.34), oklch(0.33 0.1 350 / 0.1))',
    focus: 'Moviment, desenvolupament i estímuls adaptats a cada edat',
    audience: 'Nens i adolescents amb necessitats musculoesquelètiques o neuromotores',
    marker: 'Intervenció adaptada',
  },
  {
    num: '08', cat: 'Maxil·lofacial', name: 'Fisioteràpia ATM', short: 'ATM',
    desc: 'Tractament de disfuncions de l\'articulació temporomandibular, bruxisme, cefalees d\'origen muscular i alteracions del sistema masticatori.',
    tags: ['ATM', 'Bruxisme', 'Cefalees'],
    icon: 'mouth',
    accent: 'oklch(0.73 0.15 350)',
    glow: 'linear-gradient(135deg, oklch(0.73 0.15 350 / 0.34), oklch(0.31 0.09 330 / 0.1))',
    focus: 'Descàrrega mandibular, tensió cervical i cefalea muscular',
    audience: 'Bruxisme, dolor facial i disfuncions temporomandibulars',
    marker: 'ATM i cervicals',
  },
  {
    num: '09', cat: 'Massoteràpia', name: 'Massoteràpia', short: 'Massoteràpia',
    desc: 'Tècniques de massatge terapèutic professional per alliberar tensions musculars, millorar la circulació sanguínia i limfàtica i afavorir la recuperació.',
    tags: ['Drenatge', 'Tensió muscular', 'Relaxació'],
    icon: 'hand',
    accent: 'oklch(0.79 0.11 55)',
    glow: 'linear-gradient(135deg, oklch(0.79 0.11 55 / 0.32), oklch(0.33 0.08 45 / 0.1))',
    focus: 'Descàrrega manual, circulació i recuperació tissular',
    audience: 'Sobrecàrrega muscular, estrès físic i necessitat de drenatge',
    marker: 'Teràpia manual',
  },
  {
    num: '10', cat: 'A domicili', name: 'Fisioteràpia a Domicili', short: 'Domicili',
    desc: 'Atenció fisioterapèutica al domicili del pacient per a persones amb mobilitat reduïda o que necessitin tractament sense desplaçament a la clínica.',
    tags: ['Domicili', 'Mobilitat reduïda', 'Post-op'],
    icon: 'house',
    accent: 'oklch(0.75 0.12 195)',
    glow: 'linear-gradient(135deg, oklch(0.75 0.12 195 / 0.34), oklch(0.31 0.08 210 / 0.1))',
    focus: 'Continuïtat assistencial sense desplaçament',
    audience: 'Mobilitat reduïda, convalescència i necessitats especials',
    marker: 'Desplaçament clínic',
  },
  {
    num: '11', cat: 'Escola d\'esquena', name: 'Escola d\'Esquena · Pilates', short: 'Pilates',
    desc: 'Programa actiu d\'educació postural i estabilitat de la columna vertebral. Pilates individual adaptat a cada pacient per a la prevenció i millora del dolor.',
    tags: ['Pilates', 'Postura', 'Columna'],
    icon: 'pilates',
    accent: 'oklch(0.76 0.14 260)',
    glow: 'linear-gradient(135deg, oklch(0.76 0.14 260 / 0.34), oklch(0.3 0.08 250 / 0.1))',
    focus: 'Control postural, estabilitat i educació del moviment',
    audience: 'Dolor d’esquena, prevenció i treball actiu personalitzat',
    marker: 'Core i postura',
  },
];

export const PHONE = '+34972662467';
export const PHONE_DISPLAY = '972 66 24 67';
export const EMAIL = 'neusfp@globalfisio.cat';
export const ADDRESS = 'Av. Torre Valentina, 13 · 17252 Sant Antoni de Calonge, Girona';
