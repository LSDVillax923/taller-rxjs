import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string) {
    return this.http.get(`${this.url}/users/filter?key=username&value=${username}`);
  }

  getPostsByUser(userId: number) {
    return this.http.get(`${this.url}/posts/user/${userId}`);
  }

  getCommentsByPost(postId: number) {
    return this.http.get(`${this.url}/comments/post/${postId}`);
  }
}