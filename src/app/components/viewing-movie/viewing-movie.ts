import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Movie} from '../../services/movie';
import {EMPTY, mergeMap, Observable, take} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MovieBase} from '../../interfaces/movie';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Loader} from '../../directives/loader';
import {HttpResponse} from '@angular/common/http';
import {ApiResponse} from '../../interfaces/api';
import {ViewingVideo} from '../viewing-video/viewing-video';
import {GenrePipe} from '../../pipes/genre-pipe';
import {CountryPipe} from '../../pipes/country-pipe';
import {DurationPipe} from '../../pipes/duration-pipe';

@Component({
  selector: 'app-viewing-movie',
  imports: [
    Button,
    ProgressSpinner,
    Loader,
    ViewingVideo,
    GenrePipe,
    CountryPipe,
    DurationPipe
  ],
  templateUrl: './viewing-movie.html',
  styleUrl: './viewing-movie.css',
})
export class ViewingMovie {
  isLoading = signal<boolean>(false);
  movieData = signal<MovieBase | null>(null);
  private readonly router = inject(Router);
  private readonly movieService = inject(Movie);
  private readonly destroyRef = inject(DestroyRef);
  private readonly activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.isLoading.set(true);
    this.activatedRoute.params
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(params => {
          let id = params['id'];
          if (id) {
            return this.getMovieData(id);
          }
          return EMPTY;
        })
      )
      .subscribe((res: HttpResponse<ApiResponse<MovieBase>>) => {
        if (res.ok && res.body?.data) {
          this.movieData.set(res.body!.data);
        }
        this.isLoading.set(false);
      });
  }

  private getMovieData(id: string): Observable<HttpResponse<ApiResponse<MovieBase>>> {
    return this.movieService.getMovieData(id).pipe(take(1));
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
