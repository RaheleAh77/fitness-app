import { User } from './user.model';
import { AuthData } from './auth.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user!: User | null;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private fireAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private uiService:UIService
  ) {}

  registerUser(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingState.next(false);
        this.successfulAuth();
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);
        this.snackbar.open(error.message, '', {
          duration: 3000,
        });
        this.failfullAuth();
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingState.next(true);
    this.fireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        this.uiService.loadingState.next(false);
        this.successfulAuth();
      })
      .catch((error) => {
        this.uiService.loadingState.next(false);
        this.snackbar.open(error.message, '', {
          duration: 3000,
        });
      });
  }

  logout() {
    this.fireAuth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private successfulAuth() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  private failfullAuth() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/signup']);
  }
}
