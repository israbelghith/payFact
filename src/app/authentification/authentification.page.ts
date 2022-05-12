import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';

import { Utilisateur } from '../model/utilisateur.model';
import { Role } from '../model/Role';
import { UtilisateurService } from '../services/utilisateur.service';
import { Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {
  utilisateur = new Utilisateur();
  u=new Utilisateur();
  err= 0;
  display = false;
  r=new Role(1,'admin');


  clickAlert(){
    this.display = false;
 }


  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(private router: Router,
    private authentifierService: AuthentificationService,
    private utilisateurService: UtilisateurService)
     { }

  ngOnInit(): void {
  }

  connection()
{
    this.authentifierService.connection(this.utilisateur).subscribe((data)=> {
    const jwToken = data.headers.get('Authorization');
    this.authentifierService.saveToken(jwToken);
    this.utilisateurService.chercherParEmail(this.utilisateur.email).
    subscribe( agt =>{ this.u = agt;

    if(this.u.role.role==='agent'){
      this.router.navigate(['/folder/:id']);
      //console.log("in if",this.u.role.role);
    }

  else{
      this.router.navigate(['/authentification']);
      //console.log("in else",this.u.role.role);
  }
  console.log(this.u.role);

  }) ;


});
}



}
