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
