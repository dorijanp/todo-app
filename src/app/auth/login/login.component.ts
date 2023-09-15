import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  disableButton = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onLoginClick(email: string | null, password: string | null) {
    this.disableButton = true;
    if (!email || !password) return;

    this.auth
      .login(email, password)
      .then(() => {
        this.router.navigateByUrl('home');
      })
      .catch((err) => {
        console.log(err);
        this.disableButton = false;
        this._snackBar.open(err.message, 'OK', {
          duration: 4000,
        });
      });
  }
}
