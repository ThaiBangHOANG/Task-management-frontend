import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    const token = this.getToken();

    console.log('AuthService init token:', token);
    console.log('Token expired:', token ? this.isTokenExpired() : 'no token');

    if (token && this.isTokenExpired()) {
      this.logout();
    }
  }

  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  isLoggedIn$ = this.loggedIn.asObservable();

  isTokenExpired(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const now = Date.now() / 1000;

      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  getUsername(): string | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    const decoded: any = jwtDecode(token);

    return decoded.sub;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    console.trace('Logging out');


    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
