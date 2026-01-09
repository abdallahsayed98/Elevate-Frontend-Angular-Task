import { Component, signal, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-issue',
  imports: [ReactiveFormsModule],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.scss'
})
export class CreateIssueComponent {
  error = signal('');
  isLoading = signal(false);
  isSuccess = signal(false)

  private httpClient = inject(HttpClient);

  private fb = inject(FormBuilder);
  postForm: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required]]
  });

  constructor(private router: Router) {}

  onSubmit() {
    if (this.postForm.valid) {
      this.isLoading.set(true);
      this.httpClient.post('https://jsonplaceholder.typicode.com/posts',{userId:1, ...this.postForm.value}).subscribe({
      next: async() =>  {
        this.isSuccess.set(true);
        await new Promise(f => setTimeout(f, 2000));
        this.router.navigate(['/issues'])
      },
      error: (err)=> {
        this.error.set(err.message);
        this.isLoading.set(false);
      },
      complete: ()=>{
        this.isLoading.set(false);
      }
    })
    }
  }

}
