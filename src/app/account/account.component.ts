import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  standalone: false,
})
export class AccountComponent {
  user: any = {}; 
  orders: any[] = [];
  errorMessage: string = '';

  passwords = {
    current_password: '',
    new_password: '',
    confirm_password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this.authService.getUser().subscribe(
      response => {
        this.user = response;
        this.loadOrders();
      },
      error => {
        this.errorMessage = 'Impossible de récupérer les informations du compte.';
      }
    );
  }

  loadOrders() {
    this.authService.getOrders().subscribe(
      response => {
        this.orders = response;
      },
      error => {
        this.errorMessage = 'Impossible de récupérer les commandes.';
      }
    );
  }

  updateProfile() {
    const data = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      current_password: this.passwords.current_password,
      new_password: this.passwords.new_password,
      confirm_password: this.passwords.confirm_password
    };

    this.authService.updateUser(data).subscribe(
      () => {
        alert('Profil mis à jour avec succès !');
        this.passwords = { current_password: '', new_password: '', confirm_password: '' };
      },
      (error) => {
        this.errorMessage = "Une erreur s'est produite lors de la mise à jour.";
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.authService.logoutUser();
      this.router.navigate(['/']);
    });
  }
}
