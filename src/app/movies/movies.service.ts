import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movies } from './movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiURL = "http://localhost:8000/api/movies/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
 }

 constructor(private httpClient: HttpClient) { }

 getAll(): Observable<Movies[]> {
  return this.httpClient.get<Movies[]>(this.apiURL)
  .pipe(
    catchError(this.errorHandler)
  )
}

create(movies): Observable<Movies> {
  return this.httpClient.post<Movies>(this.apiURL, JSON.stringify(movies), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

find(id): Observable<Movies> {
  return this.httpClient.get<Movies>(this.apiURL + id)
  .pipe(
    catchError(this.errorHandler)
  )
}

update(id, movies): Observable<Movies> {
  return this.httpClient.put<Movies>(this.apiURL + id, JSON.stringify(movies), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

delete(id){
  return this.httpClient.delete<Movies>(this.apiURL + id, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

errorHandler(error) {
  let errorMessage = '';
  if(error.error instanceof ErrorEvent) {
    errorMessage = error.error.message;
  } else {
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(errorMessage);
}

}
