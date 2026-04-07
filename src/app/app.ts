import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  username: string = '';
  user: any = null;
  posts: any[] = [];
  error: boolean = false;

  constructor(private api: ApiService) {}

  searchUser() {
    this.error = false;

    this.api.getUserByUsername(this.username).pipe(
      switchMap((res: any) => {
        if (res.users.length === 0) {
          this.error = true;
          throw new Error('No existe');
        }

        this.user = res.users[0];

        return this.api.getPostsByUser(this.user.id);
      })
    ).subscribe({
      next: (postsRes: any) => {
        this.posts = postsRes.posts;

        // traer comentarios por cada post
        this.posts.forEach(post => {
          this.api.getCommentsByPost(post.id).subscribe((commentsRes: any) => {
            post.comments = commentsRes.comments;
          });
        });
      },
      error: () => {
        this.user = null;
        this.posts = [];
      }
    });
  }

  import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
  ]
})
}