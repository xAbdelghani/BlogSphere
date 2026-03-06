import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

    resetForm!: FormGroup;
    isSubmitting = false;
    hidePassword = true;
    hideConfirm = true;
    token = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.token = this.route.snapshot.queryParamMap.get('token') || '';
        this.resetForm = this.fb.group(
            {
                newPassword: [null, [Validators.required, Validators.minLength(6)]],
                confirmPassword: [null, Validators.required]
            },
            { validators: this.passwordsMatch }
        );
    }

    passwordsMatch(group: FormGroup) {
        const pw = group.get('newPassword')?.value;
        const cpw = group.get('confirmPassword')?.value;
        return pw === cpw ? null : { mismatch: true };
    }

    onSubmit(): void {
        if (this.resetForm.invalid || !this.token) return;
        this.isSubmitting = true;
        this.authService.resetPassword(this.token, this.resetForm.value.newPassword).subscribe({
            next: () => {
                this.isSubmitting = false;
                this.snackBar.open('Password reset successfully! Please log in.', 'Close', {
                    duration: 5000,
                    panelClass: 'success-snackbar'
                });
                this.router.navigateByUrl('/login');
            },
            error: (err) => {
                this.isSubmitting = false;
                this.snackBar.open(
                    err?.error || 'Token expired or invalid. Please request a new reset link.',
                    'Close',
                    { duration: 6000, panelClass: 'error-snackbar' }
                );
            }
        });
    }
}
