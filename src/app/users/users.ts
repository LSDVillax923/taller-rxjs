import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  @Input() user: any;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}