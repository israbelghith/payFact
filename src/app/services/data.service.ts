import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage';
import { Observable } from 'rxjs';
import { Facture } from '../model/facture.model';
const STORAGE_KEY = 'myFactureListe';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiURL?: string = 'http://localhost:8080/caisses/facture';

  constructor(private storage: Storage,private http: HttpClient) {
  this.init();
  }

 async  init(){
    console.log('init');
   // await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
    console.log('done');
  }

  getData()
  {
    console.log('get data');
    return this.storage.get(STORAGE_KEY) || [];
  }

  async addData(item){
    const storedData= await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }
  async addPaiement(value: any)
  {
    // eslint-disable-next-line prefer-const
    let id = await this.storage.length() + 1;
    await this.storage.set(id.toString(), value);
  }
  async removeData(index){
    const storedData= await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY, storedData);
  }


  chercherParSecteur(secteur: string): Observable<Facture[]>{
  return this.http.get<Facture[]>(this.apiURL+'/secteur/'+secteur,httpOptions);
  }



  async delete(fact: Facture)
  {

    const storedData= await this.storage.get(STORAGE_KEY) || [];
    this.storage.forEach((v,k) => {

          for(let i=0; i<v.lenght; i++)
          {
            if(v[i]=== fact)
                {
                  console.log('la facture avant la suppression',i);
                  storedData.splice(i,1);
                }
          }
          return this.storage.set(STORAGE_KEY, storedData);

     });
   // this.storage.remove(key);
  }
 async  setData(listData: any) {
    // Store the value under "my-key"
    this.storage.set(STORAGE_KEY ,listData);
  /* const storedData= await this.storage.get(STORAGE_KEY) || [];
   this.storage.forEach((v,k) => {

         for(let i=0; i<v.lenght; i++)
         {
           if(v[i]=== fact[i])
               {
                 console.log('la facture est modifiée',i);
                 storedData.set(v[i].etat,'payé');
               }
         }
         return this.storage.set(STORAGE_KEY, storedData);

    });*/

}

/*
  async updateStudent(key){

    const request = this.storage.get(STORAGE_KEY);
    this.storage.set
    request.onsuccess = ()=> {

        const student = request.result;

        // Change the name property
        student.name = 'Fulanito';

        // Create a request to update
        const updateRequest = this.storage.update(student);

        updateRequest.onsuccess = () => {

            console.log(`Estudent updated, email: ${updateRequest.result}`)

        }
    }
}*/

}
