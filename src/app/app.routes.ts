import { Routes } from '@angular/router';
import { IssuesListComponent } from './issues-list/issues-list.component';

export const routes: Routes = [
  {
    path: 'issues',
    component: IssuesListComponent,
    title: 'Home Page'
  },
  {
    path: '**',
    redirectTo: 'issues'
  }
];
