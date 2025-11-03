import {Injectable, signal} from '@angular/core';
import {actorsDb, db} from '../../assets/db/db';
import {MovieBase} from '../interfaces/movie';
import {of} from 'rxjs';
import {Actor} from '../interfaces/actor';

@Injectable({
  providedIn: 'root',
})
export class Movie {
  actors = signal<Actor[]>([]);
  movies = signal<MovieBase[]>([]);
  recommendations = signal<MovieBase[]>([]);
  constructor() {
    this.movies.set(JSON.parse(JSON.stringify(db)));
    this.actors.set(JSON.parse(JSON.stringify(actorsDb)));
  }

  getMovies() {
    return of(this.movies());
  }

  getRecommendations() {
    this.recommendations.set(this.movies().filter(movie => movie.rating! > 7));
    return of(this.recommendations());
  }

  getMovieData(id: string) {
    const result = this.movies().find(movie => movie.id === id);
    return of(result ? result : null);
  }

  getActorData(actorID: string) {
    const result = this.actors().find(actor => actor.id === actorID);
    return of(result ? result : null);
  }
}
