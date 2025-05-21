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
  createdPost: any = null;

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
    this.createdPost = null;

    this.apiService.createPost(this.postForm.value).subscribe({
      next: () => {
        // Response is already handled by the service's observable
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to create post';
        this.loading = false;
      }
    });

    // Subscribe to new posts
    this.apiService.newPost$.subscribe(post => {
      this.createdPost = post;
    });
  }


  get title() { return this.postForm.get('title'); }
  get body() { return this.postForm.get('body'); }
}
