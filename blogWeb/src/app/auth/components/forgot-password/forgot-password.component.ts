import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    forgotForm!: FormGroup;
    isSubmitting = false;
    successMessage = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.forgotForm = this.fb.group({
            email: [null, [Validators.required, Validators.email]]
        });
    }

    onSubmit(): void {
        if (this.forgotForm.invalid) return;
        this.isSubmitting = true;
        this.authService.forgotPassword(this.forgotForm.value.email).subscribe({
            next: (msg) => {
                this.isSubmitting = false;
                this.successMessage = msg;
            },
            error: () => {
                this.isSubmitting = false;
                this.snackBar.open('Something went wrong. Please try again.', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
            }
        });
    }
}
