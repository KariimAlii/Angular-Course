import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, delay, Observable, retry, throwError} from 'rxjs';
import {Post} from '../models/post';
import {CreatePostDto} from '../models/create-post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer your-token' // Add auth token if needed
    })
  };
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new post
   * @param postData The post data to create
   * @returns Observable with the created post data including its ID
   */
  createPost(postData: CreatePostDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, postData).pipe(
      catchError(error => {
        console.error('Error creating post:', error);
        return throwError(() => new Error('Failed to create post'));
      })
    );
  }
}
