import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	constructor(private auth: AuthService, private router: Router) {}

	user$ = this.auth.user$;

	logout() {
		this.auth.logout().then((r) => {
			this.router.navigateByUrl('auth');
		});
	}
}
