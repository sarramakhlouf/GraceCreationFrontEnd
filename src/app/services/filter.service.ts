import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private apiUrl = 'http://localhost:8000/api/filters/color';

  constructor(private http: HttpClient) {}

  getFiltersForColor(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
