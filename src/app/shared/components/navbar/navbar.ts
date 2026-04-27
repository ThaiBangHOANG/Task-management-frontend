import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: 'navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  username: string | null = null;
  isLoggedIn = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.username = this.authService.getUsername?.() ?? 'User';
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.username = this.authService.getUsername();
      }
    }); 
  }
  logout() {
    if (!this.authService.isLoggedIn$) {
      return;
    }

    this.authService.logout();
    this.toastr.success('Logout successful');
    this.router.navigate(['/login']);
  }
}
