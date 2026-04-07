import { Component } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html'
})
export class CommentsComponent {
  @Input() comments: any[];
}

@Component({
  selector: 'app-comments',
  imports: [],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {}
export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    username: string;
  };
}