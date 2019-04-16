import { AuthService } from './../auth/auth.service';
import { Recipe } from './recipe.model';
// import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipesService {
  // currentRecipe = new EventEmitter<Recipe>();
  // Instead of using EventEmitter .. use Subject as an Observable & Observer
  // Used Within Components to add Data to it .next()
  // Used Within Components to subscribe() to it .. unsub there too

  constructor(private http: HttpClient, private authService: AuthService) {
    // this.resettingRecipes.next(this.recipes);
  }

  currentRecipe = new Subject();

  resettingRecipes = new Subject();

  recipes: Recipe[] = [
    new Recipe(
      'Recipe Name',
      'Some dummy description',
      'http://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-200/lowfat-vegetable-lasagna-1336994.jpg',
      [new Ingredient('Meat', 2), new Ingredient('French Fries', 10)]
    ),
    new Recipe(
      'Recipe Name 2',
      'Some dummy description 2',
      'http://bigoven-res.cloudinary.com/image/upload/d_recipe-no-image.jpg,t_recipe-200/lowfat-vegetable-lasagna-1336994.jpg',
      [new Ingredient('Eggs', 2), new Ingredient('Chocolate Bar', 20)]
    )
  ];
  getCurrentRecipe(id: number) {
    return this.recipes[id];
  }

  updateCurrentRecipe(id: number, updRecipe: Recipe) {
    this.recipes[id] = updRecipe;
    this.resettingRecipes.next(this.recipes);
  }

  addNewRecipe(newRecipe: Recipe) {
    this.recipes.push(newRecipe);
    this.resettingRecipes.next(this.recipes);
  }

  deleteRecipe(recipeID: number) {
    this.recipes.splice(recipeID, 1);
    this.resettingRecipes.next(this.recipes);
  }

  saveRecipes() {
    const token = this.authService.getToken();
    console.log('IN SAVING ' + token);
    return this.http.put(
      `https://ng-dummy-project-4d6a1.firebaseio.com/recipes.json?auth=${token}`,
      this.recipes
    );
  }
  fetchRecipes() {
    const token = this.authService.getToken();

    console.log('IN FETCHING: ' + token);

    this.http
      .get(
        `https://ng-dummy-project-4d6a1.firebaseio.com/recipes.json?auth=${token}`
      )
      .subscribe(
        (recipesArr: Recipe[]) => {
          // console.log(recipesArr);
          let brandNewRecipeArr = recipesArr.map(recipe => {
            if (!recipe.ingredients) {
              recipe.ingredients = [];
              return recipe;
            } else {
              return recipe;
            }
          });
          console.log(brandNewRecipeArr);
          this.recipes = brandNewRecipeArr;
          this.resettingRecipes.next(brandNewRecipeArr); // this is for purpose of updating them right away in the recipeList
        },
        err => console.log(err)
      );
  }
}
