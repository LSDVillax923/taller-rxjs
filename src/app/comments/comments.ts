import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  @Input() comments: any[] = [];
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: {
    username: string;
  };
}