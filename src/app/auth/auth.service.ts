import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  currentToken: string;

  constructor(private router: Router) {}

  signUp(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigateByUrl('/sign-in');
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  signIn(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // Successful LOGIN
        console.log(res);
        this.router.navigateByUrl('/recipes');
        // Getting Token when Signing in successfully....
        firebase
          .auth()
          .currentUser.getIdToken()
          .then(tk => {
            console.log('Received Token: ' + tk);
            this.currentToken = tk;
          });
      })
      .catch(err => console.log(err));
  }

  getToken() {
    return this.currentToken;
  }

  isAuth() {
    return this.currentToken !== undefined ? true : false;
  }

  logout() {
    firebase.auth().signOut();
    this.currentToken = undefined;
  }
}
