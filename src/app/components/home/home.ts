import {Component, inject, OnInit, signal} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {MovieBase} from '../../interfaces/movie';
import {take} from 'rxjs';
import {Movie} from '../../services/movie';
import {Tooltip} from 'primeng/tooltip';
import {ProgressSpinner} from 'primeng/progressspinner';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    InputText,
    Button,
    RouterLink,
    Tooltip,
    ProgressSpinner
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home implements OnInit {
  isLoading = signal<boolean>(false);
  recommendations = signal<MovieBase[]>([]);
  private readonly router = inject(Router);
  private readonly movieService = inject(Movie);

  ngOnInit() {
    this.getRecommendations();
  }

  private getRecommendations() {
    this.isLoading.set(true);
    this.movieService
      .getRecommendations()
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.recommendations.set(res);
        }
        this.isLoading.set(false);
      })
    ;
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
