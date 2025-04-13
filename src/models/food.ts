export const enum FoodCategorie {
  FRUIT = "Fruit",
  VIANDE = "Viande",
  LEGUME = "Légume"
}

export type Food = {
  name: string,
  kcal: number,
  proteines: number,
  glucide: number,
  lipide: number,
  category: FoodCategorie,
  image: string | null
};

export type Foods = Food[];

export const FOODS: Foods = [
  {
    name: 'Pomme',
    kcal: 52,
    proteines: 0.3,
    glucide: 14,
    lipide: 0.2,
    category: FoodCategorie.FRUIT,
    image: 'https://wordpress.potagercity.fr/wp-content/uploads/2019/03/article-pomme-belle-a-croquer-5bc091e457e9a.jpg'
  },
  {
    name: 'Banane',
    kcal: 89,
    proteines: 1.1,
    glucide: 22.8,
    lipide: 0.3,
    category: FoodCategorie.FRUIT,
    image: 'https://example.com/banane.jpg'
  },
  {
    name: 'Fraise',
    kcal: 32,
    proteines: 0.7,
    glucide: 7.7,
    lipide: 0.3,
    category: FoodCategorie.FRUIT,
    image: 'https://example.com/fraise.jpg'
  },
  {
    name: 'Blanc de poulet',
    kcal: 110,
    proteines: 23,
    glucide: 0,
    lipide: 1.5,
    category: FoodCategorie.VIANDE,
    image: 'https://example.com/poulet.jpg'
  },
  {
    name: 'Steak haché 5%',
    kcal: 137,
    proteines: 20,
    glucide: 0,
    lipide: 5,
    category: FoodCategorie.VIANDE,
    image: 'https://example.com/steak.jpg'
  },
  {
    name: 'Jambon de dinde',
    kcal: 120,
    proteines: 21,
    glucide: 1,
    lipide: 3,
    category: FoodCategorie.VIANDE,
    image: 'https://example.com/jambon.jpg'
  },
  {
    name: 'Carotte crue',
    kcal: 41,
    proteines: 0.9,
    glucide: 10,
    lipide: 0.2,
    category: FoodCategorie.LEGUME,
    image: 'https://example.com/carotte.jpg'
  },
  {
    name: 'Brocoli cuit',
    kcal: 35,
    proteines: 2.4,
    glucide: 7,
    lipide: 0.4,
    category: FoodCategorie.LEGUME,
    image: 'https://example.com/brocoli.jpg'
  },
  {
    name: 'Courgette',
    kcal: 17,
    proteines: 1.2,
    glucide: 3.1,
    lipide: 0.3,
    category: FoodCategorie.LEGUME,
    image: 'https://example.com/courgette.jpg'
  },
  {
    name: 'Épinards',
    kcal: 23,
    proteines: 2.9,
    glucide: 3.6,
    lipide: 0.4,
    category: FoodCategorie.LEGUME,
    image: 'https://example.com/epinards.jpg'
  }
];
