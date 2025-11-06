import { Routes } from '@angular/router';
import {Home} from './components/home/home';
import {Catalog} from './components/catalog/catalog';
import {ViewingMovie} from './components/viewing-movie/viewing-movie';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: Catalog,
      },
      {
        path: 'viewing-movie/:id',
        component: ViewingMovie,
      },
    ],
  }
];
