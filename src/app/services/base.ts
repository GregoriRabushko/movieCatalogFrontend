import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApiResponse, HttpReturningResponse} from '../interfaces/api';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class Base {
  protected abstract endpoint: string;
  readonly #http: HttpClient = inject(HttpClient);
  API_BASE_URL = environment.API_BASE_URL;

  get<OutputApi>(
    url?: string,
    httpOptions: HttpReturningResponse<OutputApi> = {observe: 'response'},
  ): Observable<HttpResponse<ApiResponse<OutputApi>>> {
    return this.#http
      .get<ApiResponse<OutputApi>>(this.createUrl(url), httpOptions);
  }

  private createUrl(url: string = ''): string {
    return `${this.API_BASE_URL}${this.endpoint}${url}`;
  }
}
