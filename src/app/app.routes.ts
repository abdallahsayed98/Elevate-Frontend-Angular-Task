import { Routes } from '@angular/router';
import { IssuesListComponent } from './issues-list/issues-list.component';
import { IssueDetailsComponent } from './issue-details/issue-details.component';
import { CreateIssueComponent } from './create-issue/create-issue.component';

export const routes: Routes = [
  {
    path: 'issues',
    component: IssuesListComponent,
    title: 'list'
  },
  {
    path: 'issues/new',
    component: CreateIssueComponent,
    title: 'create'
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
