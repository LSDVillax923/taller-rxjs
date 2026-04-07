import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment';
import { Post, Reactions } from '../models/post';
import { Comments } from '../comments/comments';

export interface PostWithComments extends Post {
  comments: Comment[];
}

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, Comments],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
   @Input() posts: PostWithComments[] = [];
   getLikes(reactions: number | Reactions): number {
    return typeof reactions === 'number' ? reactions : reactions.likes;
  }
}
