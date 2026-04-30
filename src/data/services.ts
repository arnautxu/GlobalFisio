export type Service = {
  num: string;
  cat: string;
  name: string;
  short: string;
  desc: string;
  tags: string[];
};

export const services: Service[] = [
  {
    num: '01', cat: 'Traumatologia', name: 'Fisioteràpia Traumatològica', short: 'Traumatològica',
    desc: 'Tractament de lesions musculoesquelètiques: lumbàlgies, cervicàlgies, esquinços lligamentosos, trencaments musculars i rehabilitació postquirúrgica integral.',
    tags: ['Lumbàlgia', 'Cervicàlgia', 'Post-cirurgia', 'Lesions'],
  },
  {
    num: '02', cat: 'Esport', name: 'Fisioteràpia Esportiva', short: 'Esportiva',
    desc: 'Prevenció i recuperació de lesions esportives per accelerar la curació i retornar al rendiment màxim. Adaptat a atletes amateur i professionals.',
    tags: ['Prevenció', 'Recuperació', 'Rendiment'],
  },
  {
    num: '03', cat: 'Neurologia', name: 'Fisioteràpia Neurològica', short: 'Neurològica',
    desc: 'Atenció especialitzada a patologies del sistema nerviós central i perifèric: ictus, Parkinson, esclerosi múltiple, ELA i lesions medul·lars.',
    tags: ['Ictus', 'Parkinson', 'ELA', 'Esclerosi'],
  },
  {
    num: '04', cat: 'Aquàtica', name: 'Fisioteràpia Aquàtica', short: 'Aquàtica',
    desc: 'Rehabilitació en medi aquàtic aprofitant la flotabilitat per reduir la càrrega articular. Ideal per a recuperació postoperatòria i hèrnies discals.',
    tags: ['Hidroteràpia', 'Post-op', 'Hèrnia discal'],
  },
  {
    num: '05', cat: 'Reumatologia', name: 'Reumatologia', short: 'Reumatologia',
    desc: 'Tractament de malalties del sistema locomotor causades per afeccions reumàtiques: artritis, espondilitis anquilosant i altres patologies inflamatòries.',
    tags: ['Artritis', 'Espondilitis', 'Dolor crònic'],
  },
  {
    num: '06', cat: 'Geriatria', name: 'Fisioteràpia Geriàtrica', short: 'Geriàtrica',
    desc: 'Cura especialitzada per a persones grans centrada en el manteniment de la mobilitat, l\'autonomia, la força muscular i el treball de l\'equilibri i la marxa.',
    tags: ['Mobilitat', 'Equilibri', 'Autonomia'],
  },
  {
    num: '07', cat: 'Pediatria', name: 'Fisioteràpia Pediàtrica', short: 'Pediàtrica',
    desc: 'Tractament de patologies musculoesquelètiques i rehabilitació neurològica en nens i adolescents amb tècniques adaptades a cada edat i necessitat.',
    tags: ['Nens', 'Adolescents', 'Neuromotor'],
  },
  {
    num: '08', cat: 'Maxil·lofacial', name: 'Fisioteràpia ATM', short: 'ATM',
    desc: 'Tractament de disfuncions de l\'articulació temporomandibular, bruxisme, cefalees d\'origen muscular i alteracions del sistema masticatori.',
    tags: ['ATM', 'Bruxisme', 'Cefalees'],
  },
  {
    num: '09', cat: 'Massoteràpia', name: 'Massoteràpia', short: 'Massoteràpia',
    desc: 'Tècniques de massatge terapèutic professional per alliberar tensions musculars, millorar la circulació sanguínia i limfàtica i afavorir la recuperació.',
    tags: ['Drenatge', 'Tensió muscular', 'Relaxació'],
  },
  {
    num: '10', cat: 'A domicili', name: 'Fisioteràpia a Domicili', short: 'Domicili',
    desc: 'Atenció fisioterapèutica al domicili del pacient per a persones amb mobilitat reduïda o que necessitin tractament sense desplaçament a la clínica.',
    tags: ['Domicili', 'Mobilitat reduïda', 'Post-op'],
  },
  {
    num: '11', cat: 'Escola d\'esquena', name: 'Escola d\'Esquena · Pilates', short: 'Pilates',
    desc: 'Programa actiu d\'educació postural i estabilitat de la columna vertebral. Pilates individual adaptat a cada pacient per a la prevenció i millora del dolor.',
    tags: ['Pilates', 'Postura', 'Columna'],
  },
];

export const PHONE = '+34972662467';
export const PHONE_DISPLAY = '972 66 24 67';
export const EMAIL = 'neusfp@globalfisio.cat';
export const ADDRESS = 'Av. Torre Valentina, 13 · 17252 Sant Antoni de Calonge, Girona';
