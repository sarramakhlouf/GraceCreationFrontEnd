import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: false,
})
export class SearchComponent implements OnInit {
  searchResults: any[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchService.searchProducts('').subscribe(results => {
      this.searchResults = results; 
    });
  }
}
