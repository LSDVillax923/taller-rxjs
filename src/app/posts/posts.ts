import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comments } from '../comments/comments';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, Comments],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
  @Input() posts: any[] = [];
}

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: number;
}