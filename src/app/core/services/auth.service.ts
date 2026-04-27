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

  constructor(private http: HttpClient) {}

  private loggedIn =
    new BehaviorSubject<boolean>(
      !!this.getToken()
    );

  isLoggedIn$ =
    this.loggedIn.asObservable();
  
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
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
