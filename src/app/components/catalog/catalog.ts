import {Component, inject, OnInit, signal} from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { Movie } from '../../services/movie';
import {MovieBase} from '../../interfaces/movie';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-catalog',
  imports: [
    MovieCard,
    InputText
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  standalone: true,
})
export class Catalog implements OnInit {
  movies = signal<MovieBase[]>([]);
  private readonly movieService = inject(Movie)

  ngOnInit(): void {
    this.movies.set(this.movieService.getMovies());
  }

}
