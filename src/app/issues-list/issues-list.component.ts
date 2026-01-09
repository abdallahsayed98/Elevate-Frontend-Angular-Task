import { Component, signal, inject, OnInit, DestroyRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-issues-list',
  imports: [RouterModule],
  templateUrl: './issues-list.component.html',
  styleUrl: './issues-list.component.scss'
})
export class IssuesListComponent implements OnInit {
  posts = signal<Post[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscribition =this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/posts').subscribe({
      next: (resData) =>  {
        this.posts.set(resData.slice(0,50))
        console.log(this.posts())
      },
      error: (err)=> {
        this.error.set(err.message);
      },
      complete: ()=>{
        this.isFetching.set(false);
      }
    })
    this.destroyRef.onDestroy(()=>{
      subscribition.unsubscribe();
    })
  }
}
