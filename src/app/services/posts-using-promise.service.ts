import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsUsingPromiseService {

  constructor() { }
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  async getPosts(): Promise<any[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async getPostById(id: number): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`Post with id ${id} not found`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  }
}
