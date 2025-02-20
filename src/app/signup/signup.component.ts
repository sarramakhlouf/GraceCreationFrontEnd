import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = { name: '', email: '', password: '', password_confirmation: '', agree: false };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(event: Event) {
    event.preventDefault(); // ⛔️ Empêche le rechargement de la page

    if (!this.user.agree) {
      this.errorMessage = 'Vous devez accepter les conditions.';
      return;
    }

    this.authService.register(this.user).subscribe(
      () => {
        this.router.navigate(['/login']); // ✅ Redirige vers la page de connexion après inscription
      },
      error => {
        this.errorMessage = 'Erreur lors de l’inscription.';
      }
    );
  }

  closePopup() {
    this.router.navigate(['/']); // Ferme la popup
  }
}
