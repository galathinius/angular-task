import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './components/movies/movies.component';
import { AuthComponent } from './components/auth/auth.component';
import { FormsComponent } from './components/forms/forms.component';

const routes: Routes = [
  { path: 'log-in', component: AuthComponent },
  { path: '', component: MoviesComponent },
  { path: 'forms', component: FormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
