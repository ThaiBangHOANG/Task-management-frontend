import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
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
  ) {}

  login() {
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }
    this.loading = true;

    const data = {
      username: this.username,
      password: this.password,
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.toast.success('Login successful');
        this.router.navigate(['/tasks']);
      },

      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Login failed');
      },
    });
  }
}
