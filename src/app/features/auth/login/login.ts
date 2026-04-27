import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    if (!this.username || !this.password) {
    alert('Please enter username and password');
    return;
  }

    const data = {
      username: this.username,
      password: this.password
    };

    this.authService.login(data).subscribe({
      next: (res: any) => {

        // save token
        localStorage.setItem('token', res.token);

        alert('Login success');

        // redirect
        this.router.navigate(['/tasks']);
      },

      error: (err) => {
        console.error(err);
        alert('Login failed');
      }
    });

  }

}