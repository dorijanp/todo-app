import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { NewItemDialogComponent } from '../dialog/new-item-dialog/new-item-dialog.component';
import { TodoService } from '../todo.service';

interface Item {
  itemName: string;
  itemDescription: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private dialog: MatDialog, private todoService: TodoService) {}

  @Input() todoList$!: Observable<any>;
  items$!: Observable<any>;

  ngOnInit() {
    this.items$ = this.todoList$.pipe(
      map((todo) => {
        if (!todo) return;
        console.log(todo);
        return todo['items'];
      })
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewItemDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.todoService.createTodoItem(result, this.todoList$);
    });
  }
}
