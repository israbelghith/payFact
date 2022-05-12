import { DataService } from './services/data.service';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Acceuil', url: '/folder/:id', icon: 'home' },
    { title: 'Login', url: './authentification', icon: 'log-in' },
    { title: 'Histrique Paiements', url: './historique-paiement', icon: 'archive' },
    { title: 'Chercher Facture', url: './facture', icon: 'search' },
    { title: 'Logout', url: '/folder/Favorites', icon: 'log-out' },

  ];
 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private  dataService: DataService) {
    this.dataService.init();
  }

}
