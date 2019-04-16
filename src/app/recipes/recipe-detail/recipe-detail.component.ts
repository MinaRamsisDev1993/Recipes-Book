import { RecipesService } from './../recipes.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: any;
  ingredients: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private s_l_service: ShoppingListService
  ) {}
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.recipe = this.recipesService.getCurrentRecipe(this.id);
      console.log('Current RECIPE: ');
      console.log(this.recipe);
    });
  }

  sendIngrsToSL(ingrs: Ingredient[]) {
    this.s_l_service.changeIngredients(ingrs);
  }
  onDelete() {
    if (confirm('Are You sure you wanna delete that recipe?')) {
      this.recipesService.deleteRecipe(parseInt(this.id));
      this.router.navigateByUrl('/recipes');
    }
  }
}
