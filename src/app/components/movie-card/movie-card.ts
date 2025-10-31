import {Component, input, OnInit} from '@angular/core';
import { Card } from 'primeng/card';
import {MovieBase} from '../../interfaces/movie';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-movie-card',
  imports: [
    Card,
    Tooltip
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
  standalone: true,
})
export class MovieCard implements OnInit {
  movie = input.required<MovieBase>();

  ngOnInit(): void {
    console.log(this.movie())
  }

}
