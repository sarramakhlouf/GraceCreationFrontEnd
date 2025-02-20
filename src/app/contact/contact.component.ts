import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: false,
})
export class ContactComponent {
  contact = {
    nom: '',
    email: '',
    telephone: '',
    message: ''
  };

  constructor(private contactService: ContactService) {}

  envoyerMessage() {
    this.contactService.envoyerEmail(this.contact).subscribe(
      response => {
        alert('Message envoyé avec succès !');
        this.contact = { nom: '', email: '', telephone: '', message: '' }; 
      },
      error => {
        alert('Erreur lors de l’envoi du message.');
      }
    );
  }

}
