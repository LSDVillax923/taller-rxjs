import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';

import { PostWithComments, Posts } from './posts/posts';
import { ApiService } from './services/api';
import { Users } from './users/users';
import { User } from './modelos/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Users, Posts],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  username = '';
  user: User | null = null;
  posts: PostWithComments[] = [];
  error = false;
  loading = false;

  constructor(private api: ApiService) {}

  searchUser() {
    const cleanUsername = this.username.trim();

    this.error = false;
    this.user = null;
    this.posts = [];

    if (!cleanUsername) {
      this.error = true;
      return;
    }

    this.loading = true;

    this.api
    .getUserByUsername(cleanUsername)
      .pipe(

        switchMap((res) => {
          if (res.users.length === 0) {
            this.error = true;
             return of(null);
          }

           const foundUser = res.users[0];
          this.user = foundUser;

          return this.api.getPostsByUser(foundUser.id).pipe(
            switchMap((postsRes) => {
              if (postsRes.posts.length === 0) {
                return of([] as PostWithComments[]);
              }

              const requests = postsRes.posts.map((post) =>
                this.api.getCommentsByPost(post.id).pipe(
                  map((commentsRes) => ({
                    ...post,
                    comments: commentsRes.comments,
                  })),
                ),
              );

              return forkJoin(requests);
            }),
          );
        }),
        catchError(() => {
          this.error = true;
          return of(null);
        }),
      )
      .subscribe({
         next: (posts) => {
          this.posts = posts ?? [];
          this.loading = false;
        },
        error: () => {
           this.error = true;
          this.loading = false;
        },
      });
  }
}