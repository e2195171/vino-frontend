import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { IUser } from '../iuser';
import { Router } from '@angular/router';
import { DialogInvitationComponent } from '../dialog-invitation/dialog-invitation.component';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
    loggedUser!:IUser;
    estConnecte!:boolean;
    sTitre!: string;
    

    constructor(
        private authServ: AuthService,
        public dialog: MatDialog,
        private router: Router,
        
        ) {
    
   }

    ngOnInit(): void {
            this.authServ.setTitre("Vino");
            this.authServ.statut().subscribe(bLogin=>{
            this.estConnecte = bLogin;
        })
        
        this.authServ.getTitre().subscribe(leTitre =>{
        this.sTitre = leTitre;
        })
    }

    /** Connexion */
    openLogin(): void {
        sessionStorage['estConnecte'] = false;
        this.dialog.open(DialogLoginComponent, {
            width: '90%',
            maxWidth: '300px',
            data: this.loggedUser
        }).afterClosed().subscribe(() => {
            
            if (sessionStorage['estConnecte'] === 'true') {
                
                //alert('logged in');
                // this.getLoggedUser();
                this.dialog.open(DialogInvitationComponent, {
                    width: '100%',
                    maxWidth: '370px',
                    maxHeight: '540px'
                }).afterClosed().subscribe(res => {
                    this.router.navigateByUrl("/accueil", { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/usager']);
                    });
                });
            }
        });
    }

    /** Enregistrement */
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

