import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Movie} from '../../services/movie';
import {take} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MovieBase} from '../../interfaces/movie';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-viewing-movie',
  imports: [
    Button,
    ProgressSpinner
  ],
  templateUrl: './viewing-movie.html',
  styleUrl: './viewing-movie.css',
})
export class ViewingMovie implements OnInit {
  isLoading = signal<boolean>(false);
  movieId = signal<string | null>(null);
  movieData = signal<MovieBase | null>(null);
  private readonly movieService = inject(Movie);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.movieId.set(params['id']);
    });
    // effect(() => {
    //   if (this.movieId()) {
    //     this.ngOnInit();
    //   }
    // });
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.movieService
    .getMovieData(this.movieId()!)
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.movieData.set(res);
        }
        this.isLoading.set(false);
      });
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
