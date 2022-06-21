import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { IUser } from '../iuser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-entete',
    templateUrl: './entete.component.html',
    styleUrls: ['./entete.component.scss']
})
    
export class EnteteComponent implements OnInit {
    estConnecte!:boolean;
    sTitre!:string;
    bouteille!:IProduit;
    @Input() loggedUser:boolean=true;


    constructor(private authServ:AuthService, private route:Router, private bieroServ:ApibieroService, public dialog: MatDialog) {
    }

    ngOnInit(): void {

        // this.loggedUser = 'false';
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
            width: '30%',
            data: this.loggedUser
        }).afterClosed().subscribe(res=>{
            // alert('logged in');
            // this.getLoggedUser();
        });
    }

    /** Bouton Ajouter une bouteille */
    openRegister(): void {
        this.dialog.open(DialogRegisterComponent, {
            width: '30%',
            data: this.loggedUser
        }).afterClosed().subscribe(res=>{
            // alert('registered');
            // this.getLoggedUser();
        });
    }

    logout():boolean{
        this.authServ.setConnexion(!this.estConnecte);
        this.authServ.setTitre('Accueil');
        this.route.navigateByUrl("");
        return this.authServ.getConnexion();
    }

    connect():boolean{
        return this.authServ.getConnexion();
    }


    // getLoggedUser(): any{
    //     let user:IUser;
    //     this.authServ.getLoggedUser().subscribe({
    //         next:(res)=>{
    //             user: res;
    //         },
    //         error:(err)=>{
    //             alert("erreur")
    //         }
    //     })
    //     return user;
    // }

}
