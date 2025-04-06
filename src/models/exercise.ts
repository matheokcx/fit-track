export enum muscles {
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  QUADRICEPS = 'Quadriceps',
  ABDOMINAUX = " Abdominaux",
  PECTORAUX = " Pectoraux",
  MOLLETS = 'Mollets',
  ISCHIOS = 'Ischios',
  ADDUCTEURS = 'Adducteurs',
  ABDUCTEURS = 'Abducteurs',
  FESSIERS = 'Fessiers',
  LOMBAIRES = 'Lombaires',
  GRAND_DORSAL = 'Grand dorsal',
  TRAPEZES = 'Trapèzes',
  DELTOIDES_ANTERIEURS = 'Deltoïdes antérieur',
  DELTOIDES_LATERAUX = 'Deltoïdes latéraux',
  DELTOIDES_POSTERIEURS = 'Deltoïdes postérieurs',
  AVANTS_BRAS = 'Avants-bras',
}

export type Exercise = {
  name: string,
  description: string,
  usedMuscles: string[]
}

export type Exercises = Exercise[];

export const EXERCISES: Exercises = [
  {
    name: "Développé couché",
    description: "Exercice de base pour développer les pectoraux, effectué allongé sur un banc avec une barre.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS]
  },
  {
    name: "Curl biceps",
    description: "Exercice d'isolation pour les biceps, souvent réalisé avec des haltères ou une barre.",
    usedMuscles: [muscles.BICEPS]
  },
  {
    name: "Squat",
    description: "Exercice polyarticulaire pour renforcer les jambes et les fessiers, réalisé avec ou sans charge.",
    usedMuscles: [muscles.QUADRICEPS, muscles.FESSIERS, muscles.ISCHIOS, muscles.MOLLETS]
  },
  {
    name: "Soulevé de terre",
    description: "Exercice complet qui cible principalement les ischios-jambiers, les lombaires et les fessiers.",
    usedMuscles: [muscles.ISCHIOS, muscles.FESSIERS, muscles.LOMBAIRES, muscles.GRAND_DORSAL]
  },
  {
    name: "Tractions",
    description: "Exercice au poids du corps pour développer le dos et les bras.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS, muscles.TRAPEZES, muscles.AVANTS_BRAS]
  },
  {
    name: "Élévations latérales",
    description: "Exercice d'isolation pour les épaules, réalisé avec des haltères pour cibler les deltoïdes latéraux.",
    usedMuscles: [muscles.DELTOIDES_LATERAUX]
  },
  {
    name: "Crunch",
    description: "Exercice de base pour cibler les abdominaux, réalisé au sol.",
    usedMuscles: [muscles.ABDOMINAUX]
  },
  {
    name: "Hip Thrust",
    description: "Exercice très efficace pour cibler les fessiers, effectué avec le dos appuyé sur un banc.",
    usedMuscles: [muscles.FESSIERS, muscles.ISCHIOS]
  },
  {
    name: "Presse à cuisses",
    description: "Exercice guidé pour travailler principalement les quadriceps, fessiers et mollets.",
    usedMuscles: [muscles.QUADRICEPS, muscles.FESSIERS, muscles.MOLLETS]
  },
  {
    name: "Extensions triceps à la poulie",
    description: "Exercice d'isolation pour les triceps, effectué avec une poulie haute.",
    usedMuscles: [muscles.TRICEPS]
  },
  {
    name: "Rowing barre",
    description: "Exercice de tirage horizontal pour renforcer le dos, particulièrement le grand dorsal et les trapèzes.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.TRAPEZES, muscles.BICEPS]
  },
  {
    name: "Pompes",
    description: "Exercice au poids du corps ciblant les pectoraux, les triceps et les épaules.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS]
  },
  {
    name: "Dips",
    description: "Exercice au poids du corps très efficace pour développer les triceps, les pectoraux et les épaules.",
    usedMuscles: [muscles.TRICEPS, muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS]
  },
  {
    name: "Leg curl",
    description: "Exercice d'isolation sur machine pour travailler les ischios-jambiers.",
    usedMuscles: [muscles.ISCHIOS]
  },
  {
    name: "Leg extension",
    description: "Exercice d'isolation des quadriceps effectué sur machine.",
    usedMuscles: [muscles.QUADRICEPS]
  },
  {
    name: "Élévations frontales",
    description: "Exercice avec haltères pour cibler les deltoïdes antérieurs.",
    usedMuscles: [muscles.DELTOIDES_ANTERIEURS]
  },
  {
    name: "Face Pull",
    description: "Exercice avec poulie pour travailler les deltoïdes postérieurs et les trapèzes.",
    usedMuscles: [muscles.DELTOIDES_POSTERIEURS, muscles.TRAPEZES]
  },
  {
    name: "Mollets debout",
    description: "Exercice pour renforcer les mollets, réalisé debout avec une charge.",
    usedMuscles: [muscles.MOLLETS]
  },
  {
    name: "Fentes avant",
    description: "Exercice de jambes complet ciblant quadriceps, fessiers et ischios.",
    usedMuscles: [muscles.QUADRICEPS, muscles.FESSIERS, muscles.ISCHIOS]
  },
  {
    name: "Abductions à la machine",
    description: "Exercice ciblant les abducteurs, souvent utilisé pour renforcer les hanches.",
    usedMuscles: [muscles.ABDUCTEURS]
  },
  {
    name: "Adductions à la machine",
    description: "Exercice pour renforcer les muscles adducteurs de l'intérieur des cuisses.",
    usedMuscles: [muscles.ADDUCTEURS]
  },
  {
    name: "Gainage",
    description: "Exercice statique pour renforcer la sangle abdominale et les lombaires.",
    usedMuscles: [muscles.ABDOMINAUX, muscles.LOMBAIRES]
  },
  {
    name: "Farmer walk",
    description: "Marche avec charges lourdes pour renforcer les avant-bras, les trapèzes et le gainage.",
    usedMuscles: [muscles.AVANTS_BRAS, muscles.TRAPEZES, muscles.LOMBAIRES]
  },
  {
    name: "Tirage vertical poulie",
    description: "Exercice de tirage pour le dos, particulièrement le grand dorsal.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS]
  }
];

