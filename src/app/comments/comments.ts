import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  @Input() comments: Comment[] = [];
}