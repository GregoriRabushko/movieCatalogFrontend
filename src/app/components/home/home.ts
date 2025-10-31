import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Avatar} from 'primeng/avatar';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [
    RouterOutlet,
    Avatar,
    InputText,
    Button
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {

}
