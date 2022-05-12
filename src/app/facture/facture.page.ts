/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
import { PaiementService } from './../services/paiement.service';
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Facture } from '../model/facture.model';
import { ModalController } from '@ionic/angular';
import { PaiementPage } from '../paiement/paiement.page';
import { FactureService } from '../services/facture.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.page.html',
  styleUrls: ['./facture.page.scss'],
})
export class FacturePage implements OnInit {
  listData = [];
  list = [];
  reference: number;
  factlist = [];
  // indexList: any [];
  secteur: string;
  dataReturned: any;
  listeReference: any[];
  selectedReference;
  factures = [];
  constructor(
    private dataService: DataService,
    public modalController: ModalController,
    private paiementService: PaiementService,
    private factureService: FactureService,
    private router: Router
  ) {
    this.listeReference = [
      { label: 'Référence Facture', value: 1, isSelected: false },
      { label: 'Référence Client', value: 2, isSelected: false },
      { label: 'Référence Contrat', value: 3, isSelected: false },
    ];
  }

  ngOnInit() {
    this.addData();
  }
  async chercher() {
    this.listData = await this.dataService.getData(); //paiementService.rescue('myFactureListe');
  }
  async addData() {
    this.dataService.chercherParSecteur('ghardeya').subscribe((arg) => {
      this.list = arg;
      console.log(arg);
    });
    for (const i of this.list) {
      await this.dataService.addData(i);
      console.log('la liste :' + i);
    }

    this.chercher();
  }

  async removeData(index) {
    this.dataService.removeData(index);
    this.listData.splice(index, 1);
  }

  async openModal() {
    this.factlist = this.listData.filter((x) => x.isselected === true);

    let indexList = this.factlist.findIndex((x) => x.referenceFact);
    // let index = a.findIndex(x => x.LastName === "Skeet");
    console.log(this.factlist);
    console.log(indexList);
    const modal = await this.modalController.create({
      component: PaiementPage,
      componentProps: {
        //      totalMt: this.mts,
        paramTitle: this.factlist,
        indexList: this.listData,
      },
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data === 'ok') {
        console.log(dataReturned.data);
        this.modifierFacture();
      }
    });

    return await modal.present();
  }

  async modifierFacture() {
    for (let i = 0; i < this.listData.length; i++) {
      //  let indexList = this.listData.findIndex((x) => x === this.factlist[i]);
      //await this.dataService.removeData(i);
      for (let j = 0; j < this.factlist.length; j++) {
        if (this.listData[i] === this.factlist[j]) {
          this.listData[i].etat = 'payé';
        }
      }
    }
    await this.dataService.setData(this.listData);
    this.router.navigate(['/facture']).then(()=>{
      window.location.reload();
    });

  }

  chercherfacture() {
    console.log('le référence selectionné', this.selectedReference);
    console.log(this.reference);
    const listchercher = [];
    if (this.selectedReference === '1') {
      for (let i = 0; i < this.listData.length; i++) {
        console.log(
          'this.listData[i].referenceFact',
          this.listData[i].referenceFact
        );
        if (this.listData[i].referenceFact === this.reference) {
          listchercher.push(this.listData[i]);
        }
      }
    } else if (this.selectedReference === '2') {
      for (let i = 0; i < this.listData.length; i++) {
        console.log(
          'this.listData[i].client.referenceClient',
          this.listData[i].client.referenceClient
        );
        if (this.listData[i].client.referenceClient === this.reference) {
          listchercher.push(this.listData[i]);
        }
      }
    } else if (this.selectedReference === '3') {
      for (let i = 0; i < this.listData.length; i++) {
        console.log(
          'this.listData[i].contrat.referenceContrat',
          this.listData[i].contrat.referenceContrat
        );
        if (this.listData[i].contrat.referenceContrat === this.reference) {
          listchercher.push(this.listData[i]);
        }
      }
    }
    console.log('la liste: ', listchercher);
    this.listData = listchercher;
  }
}
