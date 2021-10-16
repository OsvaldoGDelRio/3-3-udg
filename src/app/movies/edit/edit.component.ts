import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Movies } from '../movies';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  form!: FormGroup;
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
  
    this.form = new FormGroup({
      title:  new FormControl('', [ Validators.required]),
      synopsis: new FormControl('', [ Validators.required]),
      year: new FormControl('', [ Validators.required]),
      cover: new FormControl('', [ Validators.required])
    });

    

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.MoviesService.update(this.id, this.form.value).subscribe(res => {
         console.log('Movie updated successfully!');
         this.router.navigateByUrl('movies/index');
    })
  }

}
