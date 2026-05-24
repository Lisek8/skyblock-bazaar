import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'feast'
  },
  {
    path: 'feast',
    loadComponent: () => import('./components/feast/feast').then(componentImport => componentImport.Feast)
  },
  {
    path: '**',
    redirectTo: 'feast'
  }
];
