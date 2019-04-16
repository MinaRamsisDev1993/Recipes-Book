import { NgModule } from '@angular/core';

import { NoRecipeSelectedYetComponent } from './no-recipe-selected-yet/no-recipe-selected-yet.component';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { CommonModule } from '@angular/common';
import { RecipesRouting } from './recipes-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NoRecipeSelectedYetComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,
    RecipesRouting,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class RecipesModule {}
