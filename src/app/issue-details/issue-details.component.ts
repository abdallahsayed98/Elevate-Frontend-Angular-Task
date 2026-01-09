import { Component, input, signal, inject, OnInit, DestroyRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Post } from '../post.model';
import { Comment } from '../comment.model';


@Component({
  selector: 'app-issue-details',
  imports: [RouterModule],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss'
})
export class IssueDetailsComponent implements OnInit {
  id = input.required<string>();

  post = signal<Post | undefined>(undefined);
  comments = signal<Comment[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.isFetching.set(true);
    let subscribition =this.httpClient.get<Post>(`https://jsonplaceholder.typicode.com/posts/${this.id()}`).subscribe({
      next: (resData) =>  {
        this.post.set(resData);

        this.isFetching.set(true);
        subscribition =this.httpClient.get<Comment[]>(`https://jsonplaceholder.typicode.com/posts/${this.id()}/comments`).subscribe({
          next: (comments) =>  {
            this.comments.set(comments);

          },
          error: (err)=> {
            this.error.set(err.message);
          },
          complete: ()=>{
            this.isFetching.set(false);
          }
        })

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
