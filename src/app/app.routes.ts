import { Routes } from '@angular/router';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';

export const routes: Routes = [
  {
    path: 'issues',
    component: IssuesListComponent,
    title: 'list'
  },
  {
    path: 'issues/:id',
    component: IssueDetailsComponent,
    title: 'details'
  },
  {
    path: '**',
    redirectTo: 'issues'
  }
];
