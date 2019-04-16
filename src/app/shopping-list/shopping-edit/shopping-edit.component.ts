import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, DoCheck {
  @ViewChild('formRef') formRef: NgForm;
  editMode: boolean = false;
  selectedIndex: number = -1;
  name: string = '';
  amount: number = 0;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    console.log(this.selectedIndex);
  }

  onClear() {
    // Resetting the form anyway after Update OR Add
    this.name = '';
    this.amount = 0;
    this.editMode = false;
    this.selectedIndex = -1;
  }

  onSubmit() {
    console.log(this.formRef);
    if (!this.editMode) {
      const newIngr = {
        name: this.name,
        amount: this.amount
      };
      this.shoppingListService.addNewIngredient(newIngr);
    } else {
      const updIngr = {
        name: this.name,
        amount: this.amount
      };
      this.shoppingListService.updateIngredient(this.selectedIndex, updIngr);
    }
    // Resetting the form anyway after Update OR Add
    this.onClear();
  }

  onDelete() {
    console.log('Selected Index: ' + this.selectedIndex);
    this.shoppingListService.deleteIngredient(this.selectedIndex);
    // Resetting form again after Deletion
    this.onClear();
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    const ingr = this.shoppingListService.selectedIngr;
    const selectedIndex = this.shoppingListService.selectedIndex;
    if (ingr.amount !== -1 && selectedIndex !== -1) {
      this.name = ingr.name;
      this.amount = ingr.amount;
      this.editMode = true;
      this.selectedIndex = selectedIndex;
      // Reset Ingr in shoppingList Service Also selectedIndex
      this.shoppingListService.resetData();

      console.log(ingr);
    }
  }
}
