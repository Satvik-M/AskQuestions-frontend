import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionDetailResolver } from './questions/questionDetail-resolver.service';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  {
    path: 'questions/:id',
    component: QuestionDetailComponent,
    resolve: [QuestionDetailResolver],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
