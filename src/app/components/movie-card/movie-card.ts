import {Component, inject, input} from '@angular/core';
import {MovieBase} from '../../interfaces/movie';
import {Tooltip} from 'primeng/tooltip';
import {Router} from '@angular/router';
import {Loader} from '../../directives/loader';
import {GenrePipe} from '../../pipes/genre-pipe';
import {CountryPipe} from '../../pipes/country-pipe';
import {DurationPipe} from '../../pipes/duration-pipe';

@Component({
  selector: 'app-movie-card',
  imports: [
    Tooltip,
    Loader,
    GenrePipe,
    CountryPipe,
    DurationPipe
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  standalone: true,
})
export class MovieCard {
  movieData = input.required<MovieBase>();
  private readonly router = inject(Router);

  navigateToViewingMovie() {
    this.router.navigate([`viewing-movie/${this.movieData().id}`]);
  }
}
