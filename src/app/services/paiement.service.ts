import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model';
import { Paiement } from '../model/paiement.model';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class PaiementService {


  constructor( private storage: Storage) {
    this.init();
  }

//fct create paiement
async init(){
  await this.storage.create();
}
//agregarConKey
async addDataKey(key: string, value: string)//add data to storage
{
await this.storage.set(key, value);
}
//agregar
async addPaiement(value: any)
{
  // eslint-disable-next-line prefer-const
  let id = await this.storage.length() + 1;
  await this.storage.set(id.toString(), value);
}//attention le const est annulé en haut de la page

//rescatar
async rescue()
{
  return await this.storage.get('myFactureListe');
}

lister(){
  // eslint-disable-next-line prefer-const
  let listPaiement= [];
  this.storage.forEach((v,k) => {
    if(k!== 'myFactureListe')
    {
      listPaiement.push(v);
    }
   });
  return listPaiement;
}

  async delete(fact: Facture)
{

  const storedData= await this.storage.get('myFactureListe') || [];
  this.storage.forEach((v,k) => {
    if(k === 'myFactureListe')
    {
        for(let i=0; i<v.lenght; i++)
        {
          if(v[i]=== fact)
              {
                console.log('la facture avant la suppression',i);
                storedData.splice(i,1);
              }
        }
    }
   });
 // this.storage.remove(key);
}

}
