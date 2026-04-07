import { Component } from '@angular/core';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent {
  @Input() user: any;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}