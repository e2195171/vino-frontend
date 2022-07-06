import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from "../Serv/apibiero.service";
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-dialog-supprim-bouteille-admin',
  templateUrl: './dialog-supprim-bouteille-admin.component.html',
  styleUrls: ['./dialog-supprim-bouteille-admin.component.scss']
})
    
export class DialogSupprimBouteilleAdminComponent implements OnInit {
    bouteille!: IProduit;
    
    constructor(
        public dialogRef: MatDialogRef<DialogSupprimBouteilleAdminComponent>,
        @Inject(MAT_DIALOG_DATA) public editData: IProduit,
        private bieroServ: ApibieroService,
    ) { }

    ngOnInit(): void {
        
    }

    supprimerBouteille(): void{
        console.log(this.editData);
        
        const id_bouteille = this.editData.id_bouteille;
        console.log(id_bouteille)

        this.bieroServ.effacerBouteilleAdmin(id_bouteille).subscribe({
        next:(reponse)=>{
            this.dialogRef.close('del');  
            console.log('supprimé')
        },
        error:(reponse)=>{
            this.dialogRef.close('del');
        }
        });

    }
}
