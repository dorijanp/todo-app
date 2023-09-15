import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoHomeComponent } from './todo-home/todo-home.component';


@NgModule({
  declarations: [
    TodoHomeComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
