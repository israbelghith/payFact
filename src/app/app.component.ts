import { DataService } from './services/data.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';
import { Agent } from './model/agent.model';
import { PaiementService } from './services/paiement.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  auth = this.authService.decodeJWT();
  agt: any;
  public appPages = [
    { title: 'Acceuil', url: '/folder/:id', icon: 'home' },
    {
      title: 'Histrique Paiements',
      url: './historique-paiement',
      icon: 'archive'

    },
    { title: 'Chercher Facture', url: './facture', icon: 'search' },
  ];

  constructor(
    private dataService: DataService,
    public authService: AuthentificationService,
    private paiementService: PaiementService
  ) {
    this.dataService.init();
  }

  ngOnInit(): void {
    this.agt = this.dataService.getAgent();
  }

  deconnecter() {
    this.authService.logout();
    this.paiementService.deleteAll();
  }
}
