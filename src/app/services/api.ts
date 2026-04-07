import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsResponse } from '../models/comment';
import { PostsResponse } from '../models/post';
import { UsersResponse } from '../models/user';

@Injectable({
   providedIn: 'root',
})
export class ApiService {
   private readonly url = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string) {
      return this.http.get<UsersResponse>(`${this.url}/users/filter?key=username&value=${username}`);
  }

  getPostsByUser(userId: number) {
      return this.http.get<PostsResponse>(`${this.url}/posts/user/${userId}`);
  }

  getCommentsByPost(postId: number) {
      return this.http.get<CommentsResponse>(`${this.url}/comments/post/${postId}`);
  }

}