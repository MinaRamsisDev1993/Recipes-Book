import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { RecipesService } from './../recipes/recipes.service';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth: boolean = false;

  constructor(
    private recipesService: RecipesService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAuth = this.authService.isAuth();
    console.log(this.isAuth);
  }

  saveRecipes() {
    this.recipesService.saveRecipes().subscribe(
      recipesArr => {
        console.log(recipesArr);
      },
      err => console.log(err)
    );
  }

  fetchRecipes() {
    this.recipesService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/sign-in');
  }
}
