import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAjoutCellierComponent } from '../dialog-ajout-cellier/dialog-ajout-cellier.component';
//import { ProfilComponent } from '../profil/profil.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-invitation',
    templateUrl: './dialog-invitation.component.html',
    styleUrls: ['./dialog-invitation.component.scss'],
    //providers: [ ProfilComponent ]
})
export class DialogInvitationComponent implements OnInit {

    constructor(
        public dialog: MatDialog,
        //private profil: ProfilComponent,
        private router : Router,
        public dialogRef: MatDialogRef<DialogInvitationComponent>,
    ) { }

    ngOnInit(): void {
    }

    /** Bouton Ajouter un cellier */
    creerCellier(): void {
        this.dialog.open(DialogAjoutCellierComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px'
        }).afterClosed().subscribe(res=>{
            // alert('registered');
            // this.getLoggedUser();
            this.router.navigateByUrl("/");
            this.router.navigateByUrl("/usager");
            this.dialogRef.close('');
            
        });
        
    }


}
