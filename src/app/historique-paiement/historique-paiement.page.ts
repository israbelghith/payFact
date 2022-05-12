import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PaiementService } from '../services/paiement.service';

@Component({
  selector: 'app-historique-paiement',
  templateUrl: './historique-paiement.page.html',
  styleUrls: ['./historique-paiement.page.scss'],
})
export class HistoriquePaiementPage implements OnInit {
  listePaiement = [];
listeData=[];
  constructor(
    private paiementService: PaiementService,
    private toast: ToastController,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.listePaiement = this.paiementService.lister();

  }

}
