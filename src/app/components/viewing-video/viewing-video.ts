import {Component, input} from '@angular/core';
import {Loader} from '../../directives/loader';

@Component({
  selector: 'app-viewing-video',
  imports: [
    Loader
  ],
  templateUrl: './viewing-video.html',
  standalone: true,
})
export class ViewingVideo  {
  videoURL = input.required<string>();
}
