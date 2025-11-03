import {Component, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-viewing-video',
  imports: [],
  templateUrl: './viewing-video.html',
  styleUrl: './viewing-video.css',
  standalone: true,
})
export class ViewingVideo  {
  videoURL = input.required<string>();

}
