import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: '';
  password: '';

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.signIn(this.email, this.password);
  }
}
