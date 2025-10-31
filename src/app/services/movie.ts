import {Injectable, signal} from '@angular/core';
import {db} from '../../assets/db/db';
import {MovieBase} from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  movies = signal<MovieBase[]>([]);

  getMovies() {
    const data: MovieBase[] = JSON.parse(JSON.stringify(db));
    this.movies.set(data);
    return this.movies();
  }
}
