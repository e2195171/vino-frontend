import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { IProduit } from '../iproduit';

@Component({
    selector: 'app-dialog-delete',
    templateUrl: './dialog-delete.component.html',
    styleUrls: ['./dialog-delete.component.scss']
})

export class DialogDeleteComponent implements OnInit {
    
    bouteille!:IProduit

    constructor(
        public dialogRef: MatDialogRef<DialogDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public editData: IProduit,
        private bieroServ: ApibieroService,
    ) {}
    
    ngOnInit(): void {

    }

    /** Supprime toutes les données de bouteille de la cellier */
    effacerBouteille():void{
        let id_bouteille = this.editData.id_bouteille;
        let id_cellier = this.editData.id_cellier;
        console.log(id_cellier)
        console.log(id_bouteille)

        this.bieroServ.effacerBouteille(id_bouteille, id_cellier).subscribe({
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