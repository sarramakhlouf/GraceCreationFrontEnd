import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  envoyerMessage() {
    if (this.contactForm.valid) {
      this.contactService.envoyerEmail(this.contactForm.value).subscribe(
        (response) => {
          alert('Message envoyé avec succès !');
          this.contactForm.reset();
        },
        (error) => {
          alert('Erreur lors de l’envoi du message.');
        }
      );
    }
  }
}
