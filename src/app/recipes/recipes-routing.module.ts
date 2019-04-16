import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { NoRecipeSelectedYetComponent } from './no-recipe-selected-yet/no-recipe-selected-yet.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { AuthGuard } from '../auth/auth-guard.service';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Route[] = [
  // The Following Paths will be loaded lazily .. dynamically when being visited
  // Handled in app-routing.module.ts
  {
    path: '',
    component: RecipesComponent,
    // These Children Components are inside 'RecipesComponent' but dep. on a condition
    // they appear OR not within <router-outlet> within that 'RecipesComponent'
    // both '/new' AND '/:id/edit' Render the same Component different actions
    children: [
      { path: '', component: NoRecipeSelectedYetComponent },
      { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeDetailComponent },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRouting {}
