import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movies } from '../movies';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  moviess: Movies[] = [];

  constructor(public MoviesService: MoviesService) { }


  ngOnInit(): void {
    this.MoviesService.getAll().subscribe((data: Movies[])=>{
      this.moviess = data;
    })
  }
}
