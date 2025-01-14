import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  
})
export class HomeComponent implements OnInit{
  products: any[] = [];
  categories: any[] = [];
  subCategories: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // Appeler l'API pour récupérer les produits
    this.apiService.getProducts().subscribe((data) => {
      this.products = data;  // Assigner la réponse aux produits
    });

    this.apiService.getCategories().subscribe((data) => {
      this.categories = data;
    });

    this.apiService.getSubCategories().subscribe((data) => {
      this.subCategories = data;
    });
  }
} 

