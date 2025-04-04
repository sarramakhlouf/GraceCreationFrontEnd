import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {

  constructor(private http: HttpClient) {}

  envoyerEmail(contactData: any): Observable<any> {
    return this.http.post('/api/contact', contactData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
