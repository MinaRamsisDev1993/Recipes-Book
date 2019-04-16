import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyDPVIlvEi8yEy3sJ0_WpVBRhJWYOEkNJzk',
      authDomain: 'ng-dummy-project-4d6a1.firebaseapp.com'
    });
  }
}
