import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  isAuthenticated = false;
  onLogin() {
    this.store.dispatch(AuthActions.Login());
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
