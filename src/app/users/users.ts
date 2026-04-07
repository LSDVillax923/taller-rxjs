import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
   @Input({ required: true }) user!: User;
}