import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    public MoviesService: MoviesService,
    private router: Router
  ) { }

  ngOnInit(): void {

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
    this.MoviesService.create(this.form.value).subscribe(res => {
         console.log('Movie created successfully!');
         this.router.navigateByUrl('movies/index');
    })
  }

}
