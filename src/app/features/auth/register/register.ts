import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => alert('Register success'),
      error: err => console.error(err)
    });
  }
}