import { RecipesService } from './../recipes.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isNewRecipe: boolean = false;
  recipe: Recipe;
  recipeID: number;
  recipeForm: FormGroup;
  ingrControls: any[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      // '/recipes/:id/edit'
      if (params.id) {
        this.recipe = this.recipesService.getCurrentRecipe(parseInt(params.id));
        this.recipeID = parseInt(params.id);
      } else {
        this.isNewRecipe = true;
        this.recipe = null;
        this.recipeID = null;
        this.ingrControls = [];
      }
      this.initForm();
    });
    console.log(this.recipeID);
  }
  initForm() {
    if (!this.isNewRecipe) {
      if (this.recipe.ingredients) {
        this.ingrControls = this.recipe.ingredients.map(
          ingr =>
            new FormGroup({
              name: new FormControl(ingr.name, Validators.required),
              amount: new FormControl(ingr.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]?$/)
              ])
            })
        );
        console.log(this.ingrControls);
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(
        this.isNewRecipe ? '' : this.recipe.name,
        Validators.required
      ),
      imagePath: new FormControl(
        this.isNewRecipe ? '' : this.recipe.imagePath,
        Validators.required
      ),
      description: new FormControl(
        this.isNewRecipe ? '' : this.recipe.description,
        Validators.required
      ),
      ingredients: new FormArray(this.isNewRecipe ? [] : this.ingrControls)
      // ingredients: new FormArray(this.ingrControls)
    });
  }
  onAddNewIngr() {
    const ingrFormControl = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]?$/)
      ])
    });
    if (this.isNewRecipe) {
      (<FormArray>this.recipeForm.controls.ingredients).push(ingrFormControl);
      this.ingrControls.push(ingrFormControl);
    } else {
      (<FormArray>this.recipeForm.controls.ingredients).push(ingrFormControl);
    }
  }

  onSubmit() {
    console.log(this.recipeForm);
    const name = this.recipeForm.controls.name.value;
    const description = this.recipeForm.controls.description.value;
    const imagePath = this.recipeForm.controls.imagePath.value;
    const ingredients = this.recipeForm.controls.ingredients.value;
    const newRecipe: Recipe = {
      name,
      description,
      imagePath,
      ingredients
    };

    if (this.isNewRecipe) {
      this.recipesService.addNewRecipe(newRecipe);
    } else {
      this.recipesService.updateCurrentRecipe(this.recipeID, newRecipe);
    }
    //Redirect to '/recipes'
    this.router.navigateByUrl('/recipes');
  }

  onCancel() {
    //Redirect to '/recipes'
    this.router.navigateByUrl('/recipes');
  }

  onDeleteIngredient(ingrID: number) {
    (<FormArray>this.recipeForm.controls.ingredients).removeAt(ingrID);
  }
}
