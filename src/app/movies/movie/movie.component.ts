import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movies } from '../movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id!: number;
  movies!: Movies;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public MoviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idMovies'];
    this.MoviesService.find(this.id).subscribe((data: Movies)=>{
    this.movies = data;
    console.log(this.movies);
    });
  }

}
