import {Component, inject, input, OnInit} from '@angular/core';
import {MovieBase} from '../../interfaces/movie';
import {Tooltip} from 'primeng/tooltip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [
    Tooltip
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  standalone: true,
})
export class MovieCard implements OnInit {
  movie = input.required<MovieBase>();
  private readonly router = inject(Router);

  ngOnInit(): void {
    // console.log(this.movie())
  }

  navigateToViewingMovie() {
    this.router.navigate([`viewing-movie/${this.movie().id}`]);
  }
}
