import {Injectable, signal} from '@angular/core';
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

  getRecommendations() {
    return this.get<MovieBase[]>('/recommendations');
  }

  getMovieData(id: string) {
    return this.get<MovieBase>(`/${id}`);
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

  searchMovies(name: string) {
    return this.get<MovieBase[]>(`/search?searchValue=${name}`);
  }
}
