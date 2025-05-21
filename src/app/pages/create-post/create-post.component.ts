import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostsService} from '../../services/posts.service';
import {Router} from '@angular/router';
import {CreatePostDto} from '../../models/create-post-dto';

@Component({
  selector: 'app-create-post',
  standalone: false,
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})

export class CreatePostComponent implements OnInit {
  postForm: FormGroup = new FormGroup({});
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private apiService: PostsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(20)]],
      userId: [1] // Default user ID (in a real app, this might come from auth)
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.success = false;

    const postData: CreatePostDto = this.postForm.value;

    this.apiService.createPost(postData).subscribe({
      next: (response) => {
        this.success = true;
        this.loading = false;
        // Reset form after successful submission
        this.postForm.reset();
        // Navigate to post list after 2 seconds
        setTimeout(() => this.router.navigate(['/posts']), 2000);
      },
      error: (err) => {
        this.error = 'Failed to create post. Please try again.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  get title() { return this.postForm.get('title'); }
  get body() { return this.postForm.get('body'); }
}
