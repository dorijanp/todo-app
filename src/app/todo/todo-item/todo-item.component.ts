import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../todo-item';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
	@Input() item!: TodoItem;
	@Output() deleteItem: EventEmitter<TodoItem> = new EventEmitter();
	@Output() closeItem: EventEmitter<TodoItem> = new EventEmitter();
}
