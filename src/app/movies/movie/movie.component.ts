import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movies } from '../movies';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id!: number;
  movies!: Movies;
  closeModal?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public MoviesService: MoviesService,
    private modalService: NgbModal
  ) { }

  triggerModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      if(res == 'Delete')
      {
        this.deleteMovies();
      }
          
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idMovies'];
    this.MoviesService.find(this.id).subscribe((data: Movies)=>{
    this.movies = data;
    console.log(this.movies);
    });
  }

  deleteMovies(){
    this.MoviesService.delete(this.movies.id).subscribe(res => {
      this.router.navigate(['/movies/index'])
    })
  }

}
