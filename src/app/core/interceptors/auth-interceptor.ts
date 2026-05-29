import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor
  implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token =
      this.authService.getToken();

    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          const isLoginRequest = req.url.includes('/auth/login');

          if (!isLoginRequest) {
            this.authService.logout();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => err);
      })
    );
  }
}