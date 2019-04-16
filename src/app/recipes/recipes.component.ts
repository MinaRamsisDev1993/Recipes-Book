import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  recipeSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    this.recipeSubscription = this.recipesService.currentRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
