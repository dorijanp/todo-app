import { Injectable } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { TodoItem } from './todo-item';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TodoService {
	constructor(private firestore: Firestore, private authService: AuthService) {}

	private userID = this.authService.user;
	private userListRef = collection(this.firestore, this.userID!);

	getTodoList(): Observable<TodoItem[]> {
		return collectionData(this.userListRef) as Observable<TodoItem[]>;
	}

	addTodoItem(todoItem: TodoItem) {
		return addDoc(this.userListRef, todoItem);
	}

	async finishTodoItem(todoItem: TodoItem) {
		const todoItemReference = await this.getDocReference(todoItem);
		todoItem.completed = true;
		return updateDoc(todoItemReference, todoItem);
	}

	async deleteTodoItem(todoItem: TodoItem) {
		const todoItemReference = await this.getDocReference(todoItem);
		return deleteDoc(todoItemReference);
	}

	private async getDocReference(todoItem: TodoItem): Promise<any> {
		const { createdAt, completed, title, description } = todoItem;
		const _query = query(this.userListRef, where('title', '==', title), where('description', '==', description), where('createdAt', '==', createdAt), where('completed', '==', completed));

		const querySnapshot = await getDocs(_query);
		let docId = querySnapshot.docs[0].id;

		return doc(this.firestore, this.userID!, docId);
	}
}
