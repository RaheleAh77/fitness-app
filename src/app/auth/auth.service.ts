import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User | null;

  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        console.log('User registered:', result);
        this.successfulAuth();
      })
      .catch((error) => {
        console.log('Registration error:', error);
      });
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.successfulAuth();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user != null;
  }

  private successfulAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
