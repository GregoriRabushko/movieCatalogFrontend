import {Injectable, signal} from '@angular/core';
import {actorsDb, db} from '../../assets/db/db';
import {MovieBase} from '../interfaces/movie';
import {Observable, of, take} from 'rxjs';
import {Actor} from '../interfaces/actor';
import {Base} from './base';
import {HttpResponse} from '@angular/common/http';
import {ApiResponse} from '../interfaces/api';

@Injectable({
  providedIn: 'root',
})
export class Movie extends Base {
  endpoint = '/movies';
  actors = signal<Actor[]>([]);
  // movies = signal<MovieBase[]>([]);
  // recommendations = signal<MovieBase[]>([]);
  //
  // retrieveMovies(limit?: number, offset?: number) {
  //   this.getMoviesByPagination(limit, offset)
  //     .pipe(take(1))
  //     .subscribe(res => {
  //       if (res.ok && res.body?.data) {
  //         this.movies.update(m => {
  //           m = [...m, ...res.body!.data!];
  //           return m;
  //         })
  //       }
  //     });
  // }

  getRecommendations() {
    return this.get<MovieBase[]>('/recommendations');
  }

  getMovieData(id: string) {
    return this.get<MovieBase>(`/${id}`);
  }

  getActorData(actorID: string) {
    //TODO
    const result = this.actors().find(actor => actor.id === actorID);
    return of(result ? result : null);
  }

  getMoviesByPagination(
    limit?: number,
    offset?: number,
  ): Observable<HttpResponse<ApiResponse<MovieBase[]>>> {
    if (limit && !offset) {
      return this.get<MovieBase[]>('?limit=' + limit);
    }
    if (offset && !limit) {
      return this.get<MovieBase[]>('?offset=' + offset);
    }
    if (limit && offset) {
      return this.get<MovieBase[]>('?limit=' + limit + '&offset=' + offset);
    }
    return this.get<MovieBase[]>();
  }
}
