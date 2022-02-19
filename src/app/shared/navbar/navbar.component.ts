import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  isAuthenticated = false;
  userSub: Subscription = null;
  onLogin() {
    this.router.navigate(['/login']);
  }

  toQuestions() {
    this.router.navigate(['/questions']);
  }

  toNewQuestions() {
    this.router.navigate(['/questions', 'new']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
  }

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          console.log(authState);
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
      });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
