import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { IUser } from '../iuser';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  loggedUser!:IUser;
  estConnecte!:boolean;
  sTitre!:string;

  constructor(private authServ:AuthService, public dialog: MatDialog) {
    
   }

  ngOnInit(): void {
    this.authServ.setTitre("Accueil");
    this.authServ.statut().subscribe(bLogin=>{
      this.estConnecte = bLogin;
  })
  
  this.authServ.getTitre().subscribe(leTitre =>{
  this.sTitre = leTitre;
  })
  }

   /** Bouton Ajouter une bouteille */
   openLogin(): void {
    this.dialog.open(DialogLoginComponent, {
        width: '90%',
        data: this.loggedUser
    }).afterClosed().subscribe(res=>{
        // alert('logged in');
        // this.getLoggedUser();
    });
}

/** Bouton Ajouter une bouteille */
openRegister(): void {
    this.dialog.open(DialogRegisterComponent, {
        width: '90%',
        data: this.loggedUser
    }).afterClosed().subscribe(res=>{
        // alert('registered');
        // this.getLoggedUser();
    });
}

connect():boolean{
  return this.authServ.getConnexion();
}

}

