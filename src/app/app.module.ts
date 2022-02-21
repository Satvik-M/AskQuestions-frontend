import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { AppRoutingModule } from './app.routing';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { QuestionEffects } from './questions/store/question.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthEffects } from './auth/store/auth.effects';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { NewQuestionComponent } from './questions/new-question/new-question.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ModalComponent } from './shared/modal/modal.component';
import { ErrorComponent } from './error/error.component';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    QuestionsComponent,
    QuestionDetailComponent,
    LoginComponent,
    RegisterComponent,
    NewQuestionComponent,
    LoaderComponent,
    ModalComponent,
    ErrorComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([QuestionEffects, AuthEffects]),
    FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
