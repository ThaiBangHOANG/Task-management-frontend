import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
    private translate: TranslateService
  ) {}

  login() {
    if (this.loading) return;

    if (!this.username?.trim() || !this.password) {
      this.toast.warning(this.translate.instant('USERNAME_REQUIRED'));
      return;
    }
    if (!this.password?.trim()) {
      this.toast.warning(this.translate.instant('PASSWORD_REQUIRED'));
      return;
    }

    this.loading = true;

    const data = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.toast.success(this.translate.instant('LOGIN_SUCCESSFUL'));
        this.router.navigate(['/tasks']);
        this.loading = false;
      },

      error: (err) => {
        this.loading = false;
        this.toast.error(this.translate.instant('LOGIN_FAILED'));
      },
    });
  }
}
