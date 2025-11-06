
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
  rows = signal<number>(20);
  first = signal<number>(0);
  movies = signal<MovieBase[]>([]);
  isLoading = signal<boolean>(false);
  totalRecords = signal<number>(0);
  private readonly movieService = inject(Movie);
  private readonly messageService = inject(MessageService);

  ngOnInit(): void {
    this.getMovies(this.rows(), 0);
  }

  private getMovies(limit: number, offset: number) {
    this.isLoading.set(true);
    this.movieService
      .getMoviesByPagination(limit, offset)
      .pipe(
        take(1),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Нет подключения к интернету или проблемы с сервером',
          });
          this.isLoading.set(false);
          return EMPTY;
        }),
      )
      .subscribe(res => {
        if (res.ok && res.body?.data) {
          this.movies.set(res.body.data);
          if (res.body.data.length > 0) {
            this.totalRecords.set(res.body.data[0].countAll);
          }
        }
        this.isLoading.set(false);
      });
  }

  onPageChange(event: PaginatorState) {
    if (event.rows === undefined || event.first === undefined) return;
    this.first.set(event.first);
    this.rows.set(event.rows);
    this.getMovies(event.rows, event.first);
  }
}
