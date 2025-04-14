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
  BRACHIAL = 'Brachial',
}

export type Exercise = {
  name: string,
  description: string,
  usedMuscles: string[],
  energy: number,
  breakTime: number, // in seconds
  image: string | null
};

export type Exercises = Exercise[];

export const EXERCISES: Exercises = [
  {
    name: "Développé couché",
    description: "Exercice de base pour développer les pectoraux, effectué allongé à plat sur un banc avec une barre de 20kg.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 4,
    breakTime: 180,
    image: null,
  },
  {
    name: "Développé couché haltère",
    description: "Exercice de base pour développer les pectoraux, effectué allongé à plat sur un banc avec des haltères.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 3,
    breakTime: 150,
    image: null,
  },
  {
    name: "Développé couché incliné",
    description: "Variante de l'exercice classique pour développer le haut des pectoraux, effectué allongé sur un banc incliné à 45° avec une barre de 20kg.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 4,
    breakTime: 180,
    image: null,
  },
  {
    name: "Développé couché décliné",
    description: "Variante de l'exercice classique pour développer le bas des pectoraux, effectué allongé sur un banc décliné à ~45° avec une barre de 20kg.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 3,
    breakTime: 150,
    image: null,
  },
  {
    name: "Écartés à la poulie haut",
    description: "Exercice avec 2 poulies en position haute, pour travailler le bas des pectoraux.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 1,
    breakTime: 90,
    image: null,
  },
  {
    name: "Écartés à la poulie milieu",
    description: "Exercice avec 2 poulies en position milieu, pour travailler les pectoraux.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 1,
    breakTime: 120,
    image: null,
  },
  {
    name: "Écartés à la poulie basse",
    description: "Exercice avec 2 poulies en position basse, pour travailler le haut des pectoraux.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 2,
    breakTime: 120,
    image: null,
  },
  {
    name: "Spider curl",
    description: "Exercice pour les biceps (courte portion), réalisé un banc contre la poitrine et avec des haltères ou une barre EZ.",
    usedMuscles: [muscles.BICEPS],
    energy: 1,
    breakTime: 120,
    image: null
  },
  {
    name: "Curl biceps",
    description: "Exercice classique pour les biceps, souvent réalisé avec des haltères ou une barre EZ ou droite.",
    usedMuscles: [muscles.BICEPS],
    energy: 1,
    breakTime: 120,
    image: null
  },
  {
    name: "Curl marteau",
    description: "Variante du curl biceps pour mettre l'accent sur le brachial puis les avants bras en plus des biceps. Fait avec des haltères.",
    usedMuscles: [muscles.BICEPS, muscles.BRACHIAL],
    energy: 1,
    breakTime: 90,
    image: null
  },
  {
    name: "Curl biceps alongé",
    description: "Exercice d'isolation pour les biceps (portion longue), souvent réalisé avec des haltères.",
    usedMuscles: [muscles.BICEPS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Squat",
    description: "Exercice polyarticulaire pour renforcer les jambes et les fessiers, réalisé avec une barre ou un haltère.",
    usedMuscles: [muscles.QUADRICEPS, muscles.FESSIERS, muscles.ISCHIOS, muscles.MOLLETS],
    energy: 4,
    breakTime: 120,
    image: null
  },
  {
    name: "Soulevé de terre",
    description: "Exercice complet qui cible principalement les ischios-jambiers, les lombaires et les fessiers.",
    usedMuscles: [muscles.ISCHIOS, muscles.FESSIERS, muscles.LOMBAIRES, muscles.GRAND_DORSAL],
    energy: 4,
    breakTime: 180,
    image: null
  },
  {
    name: "Élévations latérales",
    description: "Exercice d'isolation pour les épaules, réalisé avec des haltères pour cibler les deltoïdes latéraux.",
    usedMuscles: [muscles.DELTOIDES_LATERAUX],
    energy: 1,
    breakTime: 90,
    image: null
  },
  {
    name: "Développer militaire",
    description: "Exercice efficace pour les épaules, réalisé avec des haltères ou une barre pour cibler les deltoïdes antérieurs, latéraux ainsi que les triceps.",
    usedMuscles: [muscles.DELTOIDES_LATERAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 3,
    breakTime: 150,
    image: null
  },
  {
    name: "Oiseau",
    description: "Exercice d'isolation pour les deltoïdes postérieurs, réalisé avec des haltères.",
    usedMuscles: [muscles.DELTOIDES_POSTERIEURS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Presse à cuisses",
    description: "Exercice guidé pour travailler principalement les quadriceps, ischios, fessiers et mollets.",
    usedMuscles: [muscles.QUADRICEPS, muscles.ISCHIOS, muscles.FESSIERS, muscles.MOLLETS],
    energy: 3,
    breakTime: 120,
    image: null
  },
  {
    name: "Extensions triceps à la poulie",
    description: "Exercice d'isolation pour les triceps, effectué avec une poulie en position haute.",
    usedMuscles: [muscles.TRICEPS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Barre au front",
    description: "Exercice pour les triceps assez efficace, avec un banc et une barre EZ.",
    usedMuscles: [muscles.TRICEPS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Rowing barre",
    description: "Exercice de tirage horizontal avec le buste incliné, qui longe les cuisses. Pour renforcer le dos, particulièrement le grand dorsal et les trapèzes.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.TRAPEZES],
    energy: 3,
    breakTime: 150,
    image: null
  },
  {
    name: "Extension lombaire",
    description: "Efficace pour travailler les lombaires, se fait avec un poid contre le torse, en pliant le corps en deux, plongeant la tête vers le bas et les jambes droites bloquées.",
    usedMuscles: [muscles.LOMBAIRES],
    energy: 2,
    breakTime: 90,
    image: null
  },
  {
    name: "Leg curl",
    description: "Exercice d'isolation sur machine pour travailler les ischios.",
    usedMuscles: [muscles.ISCHIOS],
    energy: 1,
    breakTime: 90,
    image: null
  },
  {
    name: "Leg extension",
    description: "Exercice d'isolation des quadriceps, effectué sur machine.",
    usedMuscles: [muscles.QUADRICEPS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Face Pull",
    description: "Exercice sur poulie, en position milieu pour travailler les deltoïdes postérieurs et les trapèzes.",
    usedMuscles: [muscles.DELTOIDES_POSTERIEURS, muscles.TRAPEZES],
    energy: 2,
    breakTime: 90,
    image: null
  },
  {
    name: "Abductions à la machine",
    description: "Exercice ciblant les abducteurs, souvent utilisé pour renforcer les hanches.",
    usedMuscles: [muscles.ABDUCTEURS],
    energy: 2,
    breakTime: 90,
    image: null
  },
  {
    name: "Adductions à la machine",
    description: "Exercice pour renforcer les muscles adducteurs de l'intérieur des cuisses.",
    usedMuscles: [muscles.ADDUCTEURS],
    energy: 1,
    breakTime: 120,
    image: null
  },
  {
    name: "Tirage vertical poulie",
    description: "Exercice de tirage vertical pour le dos, particulièrement le grand dorsal.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS],
    energy: 2,
    breakTime: 120,
    image: null
  },
  {
    name: "Tirage horizontale poulie",
    description: "Exercice de tirage en trajectoire horizontale pour le dos, particulièrement le grand dorsal et le grand rond.",
    usedMuscles: [muscles.GRAND_DORSAL],
    energy: 2,
    breakTime: 120,
    image: null
  },
  // PDC
  {
    name: "Mollets debout",
    description: "Exercice pour renforcer les mollets, réalisé debout.",
    usedMuscles: [muscles.MOLLETS],
    energy: 1,
    breakTime: 30,
    image: null
  },
  {
    name: "Gainage",
    description: "Exercice statique pour renforcer la sangle abdominale et les lombaires.",
    usedMuscles: [muscles.ABDOMINAUX, muscles.LOMBAIRES],
    energy: 2,
    breakTime: 45,
    image: null
  },
  {
    name: "Tractions",
    description: "Exercice au poids du corps pour développer le dos et les bras.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS, muscles.TRAPEZES, muscles.AVANTS_BRAS],
    energy: 3,
    breakTime: 60,
    image: null
  },
  {
    name: "Crunch",
    description: "Exercice de base pour cibler les abdominaux, réalisé au sol.",
    usedMuscles: [muscles.ABDOMINAUX],
    energy: 1,
    breakTime: 30,
    image: null
  },
  {
    name: "Pompes",
    description: "Exercice au poids du corps ciblant les pectoraux, les triceps et les épaules.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 2,
    breakTime: 45,
    image: null
  },
  {
    name: "Dips",
    description: "Exercice au poids du corps très efficace pour développer les triceps, les pectoraux et les épaules.",
    usedMuscles: [muscles.TRICEPS, muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS],
    energy: 3,
    breakTime: 60,
    image: null
  }
];

export const BODY_WEIGHT_EXERCISES: string[] = ["Tractions", "Crunch", "Pompes", "Dips", "Mollets debout", "Gainage"];
