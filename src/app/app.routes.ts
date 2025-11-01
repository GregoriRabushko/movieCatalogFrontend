import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/catalog/catalog').then(m => m.Catalog),
      },
      {
        path: 'viewing-movie/:id',
        loadComponent: () => import('./components/viewing-movie/viewing-movie').then(m => m.ViewingMovie),
      },
    ],
  }
];
