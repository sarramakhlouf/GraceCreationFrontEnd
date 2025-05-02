import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status',
  standalone: false,  
})
export class StatusPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'En attente';
      case 1:
        return 'Validée';
      case 2:
        return 'Annulée';
      default:
        return 'Inconnu';
    }
  }
}
