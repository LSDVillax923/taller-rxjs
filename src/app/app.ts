import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of, switchMap, tap } from 'rxjs';

import { PostWithComments, Posts } from './posts/posts';
import { ApiService } from './services/api';
import { Users } from './users/users';
import { User } from './modelos/user';
import { CommentsResponse } from './modelos/comments';
import { PostsResponse } from './modelos/post';

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
  errorMessage = '';
  loading = false;

  constructor(
    private api: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  searchUser() {
    const cleanUsername = this.username.trim().replace(/^@/, '').toLowerCase();

    this.error = false;
    this.errorMessage = '';
    this.user = null;
    this.posts = [];

    if (!cleanUsername) {
      this.error = true;
      this.errorMessage = 'Debes ingresar un username para buscar.';
      return;
    }

    this.loading = true;

    this.api

    .getUserByUsername(cleanUsername)
      .pipe(


        tap(() => console.info('[API] Consulta de usuario realizada correctamente.')),
        switchMap((res) => {
          if (res.users.length === 0) {
            this.error = true;
            this.errorMessage = `No se encontró el usuario "${cleanUsername}".`;
            return of([] as PostWithComments[]);
          }

          const foundUser = res.users[0];
          this.user = foundUser;

          return this.api.getPostsByUser(foundUser.id).pipe(
             catchError(() =>
              of({ posts: [], total: 0, skip: 0, limit: 0 } as PostsResponse),
            ),
            switchMap((postsRes) => {
              if (postsRes.posts.length === 0) {
                return of([] as PostWithComments[]);
              }

              const requests = postsRes.posts.map((post) =>
                this.api.getCommentsByPost(post.id).pipe(
                  catchError(() =>
                    of({ comments: [], total: 0, skip: 0, limit: 0 } as CommentsResponse),
                  ),
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
          this.errorMessage =
            'Hubo un error al consultar la API. Verifica tu conexión o intenta nuevamente.';
          return of(null);
        }),
      )
      .subscribe({
        next: (posts) => {
          this.posts = posts ?? [];
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = true;
          this.errorMessage = 'Error inesperado al procesar la búsqueda.';
          this.loading = false;
          this.cdr.detectChanges();
        },
      });
  }
}