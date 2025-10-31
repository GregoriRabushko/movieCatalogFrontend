import {Component, input, OnInit} from '@angular/core';
import { Card } from 'primeng/card';
import {MovieBase} from '../../interfaces/movie';

@Component({
  selector: 'app-movie-card',
  imports: [
    Card
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
