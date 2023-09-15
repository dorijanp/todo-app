import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import {
  Firestore,
  Query,
  addDoc,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private firestore: Firestore) {}

  getUserLists(uuid: string) {
    const userLists = collection(this.firestore, uuid);
    return collectionData(userLists);
  }

  createGroup(groupName: string, uuid: string) {
    const userLists = collection(this.firestore, uuid);

    return addDoc(userLists, { listName: groupName, items: [] });
  }

  createTodoItem(item: { title: string; description: string }, todoList: any) {
    //todo: implement document item array update with the new todo item
  }
}
