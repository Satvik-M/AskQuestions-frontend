import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private router: Router) {}
  isAuthenticated = false;
  onLogin() {
    this.router.navigate(['/login']);
  }

  toQuestions() {
    this.router.navigate(['/questions']);
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onLogout() {
    this.store.dispatch(AuthActions.Logout());
  }

  ngOnInit(): void {
    this.store
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
}
