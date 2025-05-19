import {Component, OnInit} from '@angular/core';
import {PostsUsingPromiseService} from '../../services/posts-using-promise.service';

@Component({
  selector: 'app-posts-using-promise',
  standalone: false,
  templateUrl: './posts-using-promise.component.html',
  styleUrl: './posts-using-promise.component.css'
})
export class PostsUsingPromiseComponent implements OnInit {
  posts: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private postsService: PostsUsingPromiseService) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    this.loading = true;
    this.error = null;

    try {
      this.posts = await this.postsService.getPosts();
    } catch (err) {
      this.error = 'Failed to load posts. Please try again later.';
      console.error('Error:', err);
    } finally {
      this.loading = false;
    }
  }
}
