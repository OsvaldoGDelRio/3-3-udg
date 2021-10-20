import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', redirectTo: 'movies/index', pathMatch: 'full'},
  { path: 'movies', redirectTo: 'movies/index', pathMatch: 'full'},
  { path: 'movies/index', component: IndexComponent },
  { path: 'movies/create', component: CreateComponent },
  { path: 'movies/edit/:idMovies', component: EditComponent },
  { path: 'movies/movie/:idMovies', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
