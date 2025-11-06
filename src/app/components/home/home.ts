import {Component, DestroyRef, ElementRef, inject, OnInit, signal, viewChild} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {MovieBase} from '../../interfaces/movie';
import {catchError, debounce, EMPTY, interval, take} from 'rxjs';
import {Movie} from '../../services/movie';
import {Tooltip} from 'primeng/tooltip';
import {ProgressSpinner} from 'primeng/progressspinner';
import {MessageService} from 'primeng/api';
import {Loader} from '../../directives/loader';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteLazyLoadEvent,
  AutoCompleteSelectEvent
} from 'primeng/autocomplete';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    Button,
    RouterLink,
    Tooltip,
    ProgressSpinner,
    Loader,
    ReactiveFormsModule,
    AutoComplete
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home implements OnInit {
  searchResult = signal<MovieBase[]>([]);
  isLoading = signal<boolean>(false);
  recommendations = signal<MovieBase[]>([]);
  myForm = new FormGroup({
    search: new FormControl(''),
  });
  private readonly router = inject(Router);
  private readonly movieService = inject(Movie);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);

  ngOnInit() {
    this.getRecommendations();
    this.changeSearch();
  }

  private changeSearch() {
    this.myForm.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounce(() => interval(1000)),
        catchError(() => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Нет подключения к интернету или проблемы с сервером',
          });
          return EMPTY;
        }),
      )
      .subscribe(value => {
        if (value.search && value.search.length >= 3) {
          this.movieService.searchMovies(value.search)
            .pipe(take(1))
            .subscribe(res => {
              if (res.ok && res.body?.data) {
                this.searchResult.set(res.body!.data!);
              }
            })
        }
      });
  }

  private getRecommendations() {
    this.isLoading.set(true);
    this.movieService
      .getRecommendations()
      .pipe(
        take(1),
        catchError(() => {
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
          this.recommendations.set(res.body!.data!);
        }
        this.isLoading.set(false);
      })
    ;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  navigateToViewingMovie(event: AutoCompleteSelectEvent) {
    this.searchResult.set([]);
    this.myForm.patchValue({
      search: '',
    });
    this.router.navigate([`viewing-movie/${event.value.id}`]);
  }
}
