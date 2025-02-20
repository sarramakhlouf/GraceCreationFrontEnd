import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`/api/auth/register`, {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
  });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`/api/auth/login`, credentials);
  }

  logout(): Observable<any> {
    return this.http.post(`/api/auth/logout`, {}, { headers: this.getAuthHeaders() });
  }

  getUser(): Observable<any> {
    return this.http.get(`/api/auth/user`, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders() {
    const token = localStorage.getItem('client_auth_token');
    return { Authorization: `Bearer ${token}` };
  }

  saveToken(token: string) {
    localStorage.setItem('client_auth_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('client_auth_token');
  }

  logoutUser() {
    localStorage.removeItem('client_auth_token');
  }

  getOrders(): Observable<any> {
    return this.http.get(`/api/orderss`, { headers: this.getAuthHeaders() });
  }

  updateUser(data: any) {
    return this.http.put('/api/auth/update', data);
  }
  
}
