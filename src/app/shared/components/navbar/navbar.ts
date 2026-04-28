import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
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
    private translate: TranslateService,
  ) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.username = this.authService.getUsername?.() ?? 'User';
  }

  ngOnInit() {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      document.body.classList.add('dark');
    }

    const lang = localStorage.getItem('lang') || 'en';
    if (lang) {
      this.translate.use(lang);
    }

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

  toggleDarkMode() {
    document.body.classList.toggle('dark');

    const isDark = document.body.classList.contains('dark');

    localStorage.setItem('darkMode', isDark.toString());
  }

  changeLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
