import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-todo-home',
  templateUrl: './todo-home.component.html',
  styleUrls: ['./todo-home.component.css'],
})
export class TodoHomeComponent {
  constructor(private auth: AuthService) {}
}
