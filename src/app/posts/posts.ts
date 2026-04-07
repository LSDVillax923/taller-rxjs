import { Component } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html'
})
export class PostsComponent {
  @Input() posts: any[];
}

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {}
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  reactions: number;
}