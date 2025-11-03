import {Component, inject, OnInit, signal} from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from '../../services/movie';
import {MovieBase} from '../../interfaces/movie';
import {Paginator, PaginatorState} from 'primeng/paginator';
import {take} from 'rxjs';

@Component({
  selector: 'app-catalog',
  imports: [
    MovieCard,
    Paginator,
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  standalone: true,
})
export class Catalog implements OnInit {
  movies = signal<MovieBase[]>([]);
  isLoadingPage = signal<boolean>(false);
  private readonly movieService = inject(Movie);

  ngOnInit(): void {
    this.getAllMovies();
  }

  private getAllMovies() {
    this.isLoadingPage.set(true);
    this.movieService
      .getMovies()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.movies.set(res);
        }
        this.isLoadingPage.set(false);
      });
  }

  onPageChange(event: PaginatorState) {
    console.log(event)
  }
}
