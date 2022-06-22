import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from "../Serv/apibiero.service";
import { ICellier } from '../icellier';

@Component({
  selector: 'app-dialog-supprim-cellier',
  templateUrl: './dialog-supprim-cellier.component.html',
  styleUrls: ['./dialog-supprim-cellier.component.scss']
})
    
export class DialogSupprimCellierComponent implements OnInit {
    cellier!: ICellier;
    
    constructor(
        public dialogRef: MatDialogRef<DialogSupprimCellierComponent>,
        @Inject(MAT_DIALOG_DATA) public editData: ICellier,
        private bieroServ: ApibieroService,
    ) { }

    ngOnInit(): void {
        
    }

    supprimerCellier(): void{
        console.log(this.editData);
        
        const id_cellier = this.editData.cellier_id_cellier;
        console.log(id_cellier)

        this.bieroServ.effacerCellier(id_cellier).subscribe({
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
