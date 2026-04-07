import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsResponse } from '../modelos/comments';
import { PostsResponse } from '../modelos/post';
import { UsersResponse } from '../modelos/user';

@Injectable({
   providedIn: 'root',
})
export class ApiService {
   private readonly url = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string) {
       const safeUsername = encodeURIComponent(username);
    return this.http.get<UsersResponse>(
      `${this.url}/users/filter?key=username&value=${safeUsername}`,
    );
  }

  getPostsByUser(userId: number) {
      return this.http.get<PostsResponse>(`${this.url}/posts/user/${userId}`);
  }

  getCommentsByPost(postId: number) {
      return this.http.get<CommentsResponse>(`${this.url}/comments/post/${postId}`);
  }

}