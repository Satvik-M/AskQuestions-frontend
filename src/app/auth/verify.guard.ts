import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { CommonService } from '../shared/common.service';

@Injectable({ providedIn: 'root' })
export class VerifyGuard implements CanActivate {
  constructor(
    private http: HttpClient,
    private router: Router,
    private commonservice: CommonService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const url = state.url;
    console.log(url);
    this.http
      .get('http://localhost:3000/users' + url)
      .pipe(
        map((res) => {
          this.commonservice.addMessage('Account verfied');
        }),
        catchError((err) => {
          console.log(err);
          return of(this.commonservice.addMessage(err.error.message));
        })
      )
      .subscribe();
    return true;
  }
}
