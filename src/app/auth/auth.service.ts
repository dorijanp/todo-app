import { Injectable } from '@angular/core';
import { Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	user$: Observable<User | null>;
	private userID?: string | null;
	private userSubscription?: Subscription;

	constructor(private fireAuth: Auth) {
		this.user$ = user(this.fireAuth);
		this.userSubscription = this.user$.subscribe((aUser: User | null) => {
			this.userID = aUser?.uid;
		});
	}

	get user() {
		return this.userID;
	}

	ngOnDestroy() {
		this.userSubscription?.unsubscribe();
	}

	login(email: string, password: string) {
		return signInWithEmailAndPassword(this.fireAuth, email, password);
	}

	register(email: string, password: string) {
		return createUserWithEmailAndPassword(this.fireAuth, email, password);
	}

	logout() {
		return signOut(this.fireAuth);
	}
}
