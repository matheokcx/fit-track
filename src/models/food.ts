export type Food = {
  name: string,
  kcal: number,
  proteines: number,
  glucide: number,
  lipide: number,
  image: string | null
};

export type Foods = Food[];

export const FOODS: Foods = [
  {
    name: 'Pâtes',
    kcal: 131,
    proteines: 5.15,
    glucide: 24.93,
    lipide: 1.05,
    image: null
  },
  {
    name: 'Riz blanc',
    kcal: 129,
    proteines: 2.66,
    glucide: 27.9,
    lipide: 0.28,
    image: null
  },
  {
    name: 'Pommes de terre',
    kcal: 93,
    proteines: 2.5,
    glucide: 21.0,
    lipide: 0.1,
    image: null
  },
  {
    name: 'Bœuf',
    kcal: 217,
    proteines: 26.1,
    glucide: 0,
    lipide: 11.8,
    image: null
  },
  {
    name: 'Dinde',
    kcal: 147,
    proteines: 29.0,
    glucide: 0,
    lipide: 2.1,
    image: null
  },
  {
    name: 'Poulet',
    kcal: 165,
    proteines: 31.0,
    glucide: 0,
    lipide: 3.6,
    image: null
  },
  {
    name: 'Saumon',
    kcal: 146,
    proteines: 21.62,
    glucide: 0,
    lipide: 5.93,
    image: null
  },
  {
    name: 'Fromage blanc',
    kcal: 77,
    proteines: 7.2,
    glucide: 3.9,
    lipide: 3.6,
    image: null
  },
  {
    name: 'Carotte',
    kcal: 40,
    proteines: 0.9,
    glucide: 9.6,
    lipide: 0.2,
    image: null
  },
  {
    name: 'Haricots verts',
    kcal: 31,
    proteines: 1.8,
    glucide: 7.0,
    lipide: 0.2,
    image: null
  },
  {
    name: 'Thon',
    kcal: 108,
    proteines: 23.38,
    glucide: 0,
    lipide: 0.95,
    image: null
  },
  {
    name: 'Banane',
    kcal: 89,
    proteines: 1.09,
    glucide: 22.84,
    lipide: 0.33,
    image: null
  }
];
