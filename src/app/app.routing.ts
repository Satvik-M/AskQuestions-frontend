import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { NewQuestionComponent } from './questions/new-question/new-question.component';
import { QuestionDetailComponent } from './questions/question-detail/question-detail.component';
import { QuestionDetailResolver } from './questions/questionDetail-resolver.service';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'questions', component: QuestionsComponent },
  {
    path: 'questions/new',
    component: NewQuestionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'questions/:id',
    component: QuestionDetailComponent,
    resolve: [QuestionDetailResolver],
    pathMatch: 'prefix',
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
