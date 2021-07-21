export type Ingredient = {
  id: string;
  title: string;
  price: number;
};

export enum CategoryTitle {
  Beverages = 'Напитки',
  Desserts = 'Десерты',
  Ingredients = 'Ингредиенты',
  HotDepartment = 'Горячий цех',
  ColdDepartment = 'Холодный цех',
}

export enum Collection {
  Desserts = 'desserts',
  ColdDepartment = 'cold_department',
  HotDepartment = 'hot_department',
  Beverages = 'beverages',
  Ingredients = 'ingredients',
}
