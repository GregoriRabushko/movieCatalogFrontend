import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Actor} from '../../interfaces/actor';
import {Movie} from '../../services/movie';
import {take} from 'rxjs';

@Component({
  selector: 'app-viewing-actor',
  imports: [],
  templateUrl: './viewing-actor.html',
  styleUrl: './viewing-actor.css',
  standalone: true,
})
export class ViewingActor implements OnInit {
  actorID = input.required<string>();
  isLoading = signal<boolean>(false);
  actorData = signal<Actor | null>(null);
  private readonly movieService = inject(Movie);

  ngOnInit() {
    this.getActorData(this.actorID());
  }

  private getActorData(actorID: string) {
    this.isLoading.set(true);
    this.movieService
      .getActorData(actorID)
      .pipe(take(1))
      .subscribe(res => {
        if (res) {
          this.actorData.set(res);
        }
        this.isLoading.set(false);
      });
  }
}
