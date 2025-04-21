export enum muscles {
  BICEPS = 'Biceps',
  BRACHIAL = 'Brachial',
  AVANTS_BRAS = 'Avants-bras',
  TRICEPS = 'Triceps',
  DELTOIDES_ANTERIEURS = 'Deltoïdes antérieur',
  DELTOIDES_LATERAUX = 'Deltoïdes latéraux',
  DELTOIDES_POSTERIEURS = 'Deltoïdes postérieurs',
  ABDOMINAUX = "Abdominaux",
  PECTORAUX = " Pectoraux",
  GRAND_DORSAL = 'Grand dorsal',
  TRAPEZES = 'Trapèzes',
  LOMBAIRES = 'Lombaires',
  QUADRICEPS = 'Quadriceps',
  MOLLETS = 'Mollets',
  ISCHIOS = 'Ischios',
  ADDUCTEURS = 'Adducteurs',
  ABDUCTEURS = 'Abducteurs',
  FESSIERS = 'Fessiers'
}

export const musclesList: string[] = [
  muscles.BICEPS,
  muscles.BRACHIAL,
  muscles.AVANTS_BRAS,
  muscles.TRICEPS,
  muscles.DELTOIDES_ANTERIEURS,
  muscles.DELTOIDES_LATERAUX,
  muscles.DELTOIDES_POSTERIEURS,
  muscles.ABDOMINAUX,
  muscles.PECTORAUX,
  muscles.GRAND_DORSAL,
  muscles.TRAPEZES,
  muscles.LOMBAIRES,
  muscles.QUADRICEPS,
  muscles.MOLLETS,
  muscles.ISCHIOS,
  muscles.ADDUCTEURS,
  muscles.ABDUCTEURS,
  muscles.FESSIERS
];

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
    usedMuscles: [muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 4,
    breakTime: 180,
    image: "../../assets/exercices/developpe-couche.avif",
  },
  {
    name: "Développé couché haltère",
    description: "Exercice de base pour développer les pectoraux, effectué allongé à plat sur un banc avec des haltères.",
    usedMuscles: [muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 3,
    breakTime: 150,
    image: "../../assets/exercices/developpe_couche_halteres.jpg",
  },
  {
    name: "Développé couché incliné",
    description: "Variante de l'exercice classique pour développer le haut des pectoraux, effectué allongé sur un banc incliné à 45° avec une barre de 20kg.",
    usedMuscles: [muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 4,
    breakTime: 180,
    image: "../../assets/exercices/developpe_incline.jpg",
  },
  {
    name: "Développé couché décliné",
    description: "Variante de l'exercice classique pour développer le bas des pectoraux, effectué allongé sur un banc décliné à ~45° avec une barre de 20kg.",
    usedMuscles: [muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 3,
    breakTime: 150,
    image: "../../assets/exercices/developpe_decline.jpg",
  },
  {
    name: "Écartés à la poulie haut",
    description: "Exercice avec 2 poulies en position haute, pour travailler le bas des pectoraux.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 1,
    breakTime: 90,
    image: "../../assets/exercices/ecartes_poulie_haute.png",
  },
  {
    name: "Écartés à la poulie basse",
    description: "Exercice avec 2 poulies en position basse, pour travailler le haut des pectoraux.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/ecartes-poulie_basse.png",
  },
  {
    name: "Butterfly",
    description: "Exercice en machine travaillant principalement le grand pectoral.",
    usedMuscles: [muscles.PECTORAUX],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/butterfly.webp",
  },
  {
    name: "Spider curl",
    description: "Exercice pour les biceps (courte portion), réalisé un banc contre la poitrine et avec des haltères ou une barre EZ.",
    usedMuscles: [muscles.BICEPS],
    energy: 1,
    breakTime: 120,
    image: "../../assets/exercices/spider_curl.webp",
  },
  {
    name: "Curl biceps",
    description: "Exercice classique pour les biceps, souvent réalisé avec des haltères ou une barre EZ ou droite.",
    usedMuscles: [muscles.BICEPS],
    energy: 1,
    breakTime: 120,
    image: "../../assets/exercices/curl_biceps.jpg"
  },
  {
    name: "Curl marteau",
    description: "Variante du curl biceps pour mettre l'accent sur le brachial puis les avants bras en plus des biceps. Fait avec des haltères.",
    usedMuscles: [muscles.BRACHIAL, muscles.BICEPS],
    energy: 1,
    breakTime: 90,
    image: "../../assets/exercices/curl-marteau.jpg"
  },
  {
    name: "Curl biceps incliné",
    description: "Exercice d'isolation pour les biceps (portion longue), souvent réalisé avec des haltères.",
    usedMuscles: [muscles.BICEPS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/incline-biceps_curl.jpg"
  },
  {
    name: "Squat",
    description: "Exercice polyarticulaire pour renforcer les jambes et les fessiers, réalisé avec une barre ou un haltère.",
    usedMuscles: [muscles.QUADRICEPS, muscles.FESSIERS, muscles.ISCHIOS, muscles.MOLLETS],
    energy: 4,
    breakTime: 120,
    image: "../../assets/exercices/squat.webp",
  },
  {
    name: "Soulevé de terre",
    description: "Exercice complet qui cible principalement les ischios-jambiers, les lombaires et les fessiers.",
    usedMuscles: [muscles.ISCHIOS, muscles.FESSIERS, muscles.LOMBAIRES, muscles.GRAND_DORSAL],
    energy: 4,
    breakTime: 180,
    image: "../../assets/exercices/souleve_de_terre.jpg"
  },
  {
    name: "Élévations latérales",
    description: "Exercice d'isolation pour les épaules, réalisé avec des haltères pour cibler les deltoïdes latéraux.",
    usedMuscles: [muscles.DELTOIDES_LATERAUX],
    energy: 1,
    breakTime: 90,
    image: "../../assets/exercices/elevations.avif"
  },
  {
    name: "Développer militaire",
    description: "Exercice efficace pour les épaules, réalisé avec des haltères ou une barre pour cibler les deltoïdes antérieurs, latéraux ainsi que les triceps.",
    usedMuscles: [muscles.DELTOIDES_LATERAUX, muscles.DELTOIDES_ANTERIEURS, muscles.TRICEPS],
    energy: 3,
    breakTime: 150,
    image: "../../assets/exercices/developpe-militaire.jpg"
  },
  {
    name: "Oiseau",
    description: "Exercice d'isolation pour les deltoïdes postérieurs, réalisé avec des haltères.",
    usedMuscles: [muscles.DELTOIDES_POSTERIEURS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/Oiseau-sur-Banc-.png"
  },
  {
    name: "Presse à cuisses",
    description: "Exercice guidé pour travailler principalement les quadriceps, ischios, fessiers et mollets.",
    usedMuscles: [muscles.QUADRICEPS, muscles.ISCHIOS, muscles.FESSIERS, muscles.MOLLETS],
    energy: 3,
    breakTime: 120,
    image: "../../assets/exercices/presse-a-cuisse.webp"
  },
  {
    name: "Extensions triceps à la poulie",
    description: "Exercice d'isolation pour les triceps, effectué avec une poulie en position haute.",
    usedMuscles: [muscles.TRICEPS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/extension_triceps.jpg"
  },
  {
    name: "Barre au front",
    description: "Exercice pour les triceps assez efficace, avec un banc et une barre EZ.",
    usedMuscles: [muscles.TRICEPS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/barre_au_front.jpg"
  },
  {
    name: "Rowing barre",
    description: "Exercice de tirage horizontal avec le buste incliné, qui longe les cuisses. Pour renforcer le dos, particulièrement le grand dorsal et les trapèzes.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.TRAPEZES],
    energy: 3,
    breakTime: 150,
    image: "../../assets/exercices/rowing_barre.webp"
  },
  {
    name: "Rowing bûcheron",
    description: "Exercice de tirage horizontal unilatéral avec un banc et un haltère, pour renforcer le dos, particulièrement le grand dorsal et les trapèzes.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.TRAPEZES],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/tirage-bucheron.jpg"
  },
  {
    name: "Extension lombaire",
    description: "Efficace pour travailler les lombaires, se fait avec un poid contre le torse, en pliant le corps en deux, plongeant la tête vers le bas et les jambes droites bloquées.",
    usedMuscles: [muscles.LOMBAIRES],
    energy: 2,
    breakTime: 90,
    image: "../../assets/exercices/extension_lombaires.webp"
  },
  {
    name: "Leg curl",
    description: "Exercice d'isolation sur machine pour travailler les ischios.",
    usedMuscles: [muscles.ISCHIOS],
    energy: 1,
    breakTime: 90,
    image: "../../assets/exercices/leg-curl-allonge.webp"
  },
  {
    name: "Leg extension",
    description: "Exercice d'isolation des quadriceps, effectué sur machine.",
    usedMuscles: [muscles.QUADRICEPS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/leg_extension.jpg"
  },
  {
    name: "Face Pull",
    description: "Exercice sur poulie, en position milieu pour travailler les deltoïdes postérieurs et les trapèzes.",
    usedMuscles: [muscles.DELTOIDES_POSTERIEURS, muscles.TRAPEZES],
    energy: 2,
    breakTime: 90,
    image: "../../assets/exercices/face_pull.jpg"
  },
  {
    name: "Abductions à la machine",
    description: "Exercice ciblant les abducteurs, souvent utilisé pour renforcer les hanches.",
    usedMuscles: [muscles.ABDUCTEURS],
    energy: 2,
    breakTime: 90,
    image: "../../assets/exercices/abduction.webp"
  },
  {
    name: "Adductions à la machine",
    description: "Exercice pour renforcer les muscles adducteurs de l'intérieur des cuisses.",
    usedMuscles: [muscles.ADDUCTEURS],
    energy: 1,
    breakTime: 120,
    image: "../../assets/exercices/adduction.jpg"
  },
  {
    name: "Tirage vertical poulie",
    description: "Exercice de tirage vertical pour le dos, particulièrement le grand dorsal.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/Tirage-vertical.webp"
  },
  {
    name: "Tirage horizontale poulie",
    description: "Exercice de tirage en trajectoire horizontale pour le dos, particulièrement le grand dorsal et le grand rond.",
    usedMuscles: [muscles.GRAND_DORSAL],
    energy: 2,
    breakTime: 120,
    image: "../../assets/exercices/tirage-horizontal.jpg"
  },
  {
    name: "Curl inversé",
    description: "Travaille le haut et le bas des avants-bras, avec des mouvements des poignets.",
    usedMuscles: [muscles.AVANTS_BRAS],
    energy: 2,
    breakTime: 90,
    image: "../../assets/exercices/curl_inverse.jpg"
  },
  // PDC
  {
    name: "Gainage",
    description: "Exercice statique pour renforcer la sangle abdominale et les lombaires.",
    usedMuscles: [muscles.ABDOMINAUX, muscles.LOMBAIRES],
    energy: 2,
    breakTime: 45,
    image: "../../assets/exercices/gainage.jpg"
  },
  {
    name: "Tractions",
    description: "Exercice au poids du corps pour développer le dos et les bras.",
    usedMuscles: [muscles.GRAND_DORSAL, muscles.BICEPS, muscles.TRAPEZES, muscles.AVANTS_BRAS],
    energy: 3,
    breakTime: 60,
    image: "../../assets/exercices/Traction.jpg"
  },
  {
    name: "Crunch",
    description: "Exercice de base pour cibler les abdominaux, réalisé au sol.",
    usedMuscles: [muscles.ABDOMINAUX],
    energy: 1,
    breakTime: 30,
    image: "../../assets/exercices/crunch.webp"
  },
  {
    name: "Pompes",
    description: "Exercice au poids du corps ciblant les pectoraux, les triceps et les épaules.",
    usedMuscles: [muscles.PECTORAUX, muscles.TRICEPS, muscles.DELTOIDES_ANTERIEURS],
    energy: 2,
    breakTime: 45,
    image: "../../assets/exercices/pompe.avif"
  },
  {
    name: "Dips",
    description: "Exercice au poids du corps très efficace pour développer les triceps, les pectoraux et les épaules.",
    usedMuscles: [muscles.TRICEPS, muscles.PECTORAUX, muscles.DELTOIDES_ANTERIEURS],
    energy: 3,
    breakTime: 60,
    image: "../../assets/exercices/dips.webp"
  }
];

export const BODY_WEIGHT_EXERCISES: string[] = ["Tractions", "Crunch", "Pompes", "Dips", "Mollets debout", "Gainage"];
