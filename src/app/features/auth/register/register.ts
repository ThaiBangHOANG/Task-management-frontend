import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr'; 
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  username = '';
  password = '';

  constructor(
    private authService: AuthService, 
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  register() {
    this.authService.register({
      username: this.username,
      password: this.password
    }).subscribe({
      next: () => this.toastr.success(this.translate.instant('REGISTER_SUCCESSFUL')),
      error: err => {
        this.toastr.error(this.translate.instant('REGISTER_FAILED'));
        console.error(err);
      } 
    });
  }
}