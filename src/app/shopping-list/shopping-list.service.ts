import { Ingredient } from '../shared/ingredient.model';
export class ShoppingListService {
  selectedIngr: Ingredient = {
    name: '',
    amount: -1
  };
  selectedIndex: number = -1;
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  addNewIngredient(newIngr: Ingredient) {
    this.ingredients.push(new Ingredient(newIngr.name, newIngr.amount));
  }

  changeIngredients(ingrs: Ingredient[]) {
    this.ingredients.push(...ingrs);
  }

  selected(ingr: Ingredient) {
    this.selectedIngr = ingr;
    const ingsArr = this.ingredients;
    ingsArr.forEach((ingrItem, index) => {
      if (ingrItem.name === ingr.name && ingrItem.amount === ingr.amount) {
        this.selectedIndex = index;
      }
    });
  }

  resetData() {
    this.selectedIngr = {
      name: '',
      amount: -1
    };
    this.selectedIndex = -1;
  }

  updateIngredient(currentIndex: number, updIngr: Ingredient) {
    this.ingredients[currentIndex] = updIngr;
  }
  deleteIngredient(selectedndex: number) {
    this.ingredients.splice(selectedndex, 1);
  }
}
