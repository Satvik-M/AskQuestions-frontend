import { Component, OnInit } from '@angular/core';
import * as CommonActions from '../store/common.action';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}
  message: string;
  ngOnInit(): void {
    this.store
      .select('common')
      .pipe(map((commonState) => commonState.message))
      .subscribe((err) => (this.message = err));
  }

  onClose() {
    this.store.dispatch(CommonActions.clearMessage());
  }
}
