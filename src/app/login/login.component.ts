import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();

    this.authService.login(this.credentials).subscribe(
      response => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/profile']);
      },
      error => {
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    );
  }

  closePopup() {
    this.router.navigate(['/']);
  }
}
