import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
    ]),
  });

  onRegisterClick(email: string | null, password: string | null) {
    if (!email || !password) return;
    this.auth
      .register(email, password)
      .then(() => {
        this._snackBar.open('Success! Redirecting to home page...', undefined, {
          duration: 2000,
        });
        this.router.navigate(['home']);
      })
      .catch((err) => {
        this._snackBar.open(err.message, 'OK', {
          duration: 5000,
        });
      });
  }
}
