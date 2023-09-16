import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { NewItemDialogComponent } from '../new-item-dialog/new-item-dialog.component';
import { TodoItem } from '../todo-item';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
	constructor(private todoService: TodoService, private dialog: MatDialog, private _snackBar: MatSnackBar) {}

	todoList$: Observable<TodoItem[]> = this.todoService.getTodoList().pipe(
		map((itemList) => {
			return itemList.sort((a) => (a.completed ? 1 : -1));
		}),
		map((itemList) => {
			//sort items by completed status and then by creation date

			return itemList
				.filter((item) => !item.completed)
				.sort((a, b) => {
					const aDate = new Date(a.createdAt).valueOf();
					const bDate = new Date(b.createdAt).valueOf();
					return bDate - aDate;
				})
				.concat(
					itemList
						.filter((item) => item.completed)
						.sort((a, b) => {
							const aDate = new Date(a.createdAt).valueOf();
							const bDate = new Date(b.createdAt).valueOf();
							return bDate - aDate;
						})
				);
		})
	);

	isEmpty$: Observable<boolean> = this.todoList$.pipe(map((itemList) => (itemList.length == 0 ? true : false)));

	deleteTodoItem(todoItem: TodoItem) {
		this.todoService.deleteTodoItem(todoItem).then((r) => {
			this._snackBar.open(`Deleted ${todoItem.title}!`, '', {
				duration: 2000,
			});
		});
	}

	finishTodoItem(todoItem: TodoItem) {
		this.todoService.finishTodoItem(todoItem).then((r) => {
			this._snackBar.open(`${todoItem.title} is  now completed!`, '', {
				duration: 2000,
			});
		});
	}

	openNewItemDialog() {
		let dialogRef = this.dialog.open(NewItemDialogComponent);
		dialogRef.afterClosed().subscribe((res) => {
			if (!res || res.title == '' || res.description == '') return;
			const todoItem = {
				createdAt: new Date().toUTCString(),
				completed: false,
				...res,
			};
			this.todoService
				.addTodoItem(todoItem)
				.then((success) => {
					this._snackBar.open('Success adding item!', '', {
						duration: 2000,
					});
				})
				.catch((err) =>
					this._snackBar.open(err.message, '', {
						duration: 4000,
					})
				);
		});
	}
}
