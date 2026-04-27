import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr'; 

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

  constructor(private authService: AuthService, private toastr: ToastrService) {}

  register() {
    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => this.toastr.success('Register success'),
      error: err => {
        this.toastr.error('Failed to register');
        console.error(err);
      } 
    });
  }
}