import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup;
  hidePassword = true;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    this.isSubmitting = true;
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        this.isSubmitting = false;
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          }
          StorageService.saveUser(user);
          StorageService.saveToken(res.jwt);
          this.snackBar.open('Logged in successfully', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
          this.router.navigateByUrl('/user/view-all');
        } else {
          this.snackBar
            .open(
              'Bad credentials', 'Close',
              { duration: 5000, panelClass: 'error-snackbar' }
            )
        }
      },
      (error) => {
        this.isSubmitting = false;
        this.snackBar.open('An error occurred during login', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
      }
    )
  }

}

