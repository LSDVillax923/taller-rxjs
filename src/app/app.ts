import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

import { Posts } from './posts/posts';
import { ApiService } from './services/api';
import { Users } from './users/users';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Users, Posts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  username = '';
  user: any = null;
  posts: any[] = [];
  //error: boolean = false;
  error = false;

  constructor(private api: ApiService) {}

  searchUser() {
    this.error = false;

    this.api
      .getUserByUsername(this.username)
      .pipe(
        switchMap((res: any) => {
          if (res.users.length === 0) {
            this.error = true;
            throw new Error('No existe');
          }

          this.user = res.users[0];
          return this.api.getPostsByUser(this.user.id);
        }),
      )
      .subscribe({
        next: (postsRes: any) => {
          this.posts = postsRes.posts;

          this.posts.forEach((post) => {
            this.api.getCommentsByPost(post.id).subscribe((commentsRes: any) => {
              post.comments = commentsRes.comments;
            });
          });

                 },
        error: () => {
          this.user = null;
          this.posts = [];
        },
      });
  }
}