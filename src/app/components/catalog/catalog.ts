import {Component, inject, OnInit, signal} from '@angular/core';
import {MovieCard} from '../movie-card/movie-card';
import {Movie} from '../../services/movie';
import {MovieBase} from '../../interfaces/movie';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {catchError, EMPTY, take} from 'rxjs';
import {ProgressSpinner} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-catalog',
  imports: [
    MovieCard,
    Paginator,
    ProgressSpinner,
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  standalone: true,
})
export class Catalog implements OnInit {
  movies = signal<MovieBase[]>([]);
  isLoading = signal<boolean>(false);
  private readonly movieService = inject(Movie);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.getMovies();
  }

  private getMovies() {
    this.isLoading.set(true);
    this.movieService
      .getMoviesByPagination()
      .pipe(
        take(1),
        catchError(err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Нет подключения к интернету или проблемы с сервером',
          });
          return EMPTY;
        }),
      )
      .subscribe(res => {
        if (res.ok && res.body?.data) {
          this.movies.set(res.body!.data!);
        }
        this.isLoading.set(false);
      });
  }

  onPageChange(event: PaginatorState) {
    console.log(event)
  }
}
