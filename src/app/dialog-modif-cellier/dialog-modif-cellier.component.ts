import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICellier } from '../icellier';

@Component({
  selector: 'app-dialog-modif-cellier',
  templateUrl: './dialog-modif-cellier.component.html',
  styleUrls: ['./dialog-modif-cellier.component.scss']
})
export class DialogModifCellierComponent implements OnInit {
    @Input() cellier!:ICellier;
    modifierCellierForm!:FormGroup;
    
    //id_cellier: any;
    //title: any;
    //cellierForm!: FormGroup;
    //celliers: any;
  
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogModifCellierComponent>,
        @Inject(MAT_DIALOG_DATA) public editData: ICellier,
        private bieroServ: ApibieroService
    ) {
        //this.id_cellier = data.id_cellier;
        //console.log(this.id_cellier);
        
    }
  
    /** Modèles d'expression régulière */
    ngOnInit(): void {
      /** Forme et validation des données saisies */
        this.modifierCellierForm = this.formBuilder.group({
            nom: ['', [Validators.required]],
            adresse: ['', [Validators.required]]
        });
        //console.log(this.editData);
        
        /** Affectation des données du formulaire aux valeurs à envoyer à la base de données */
        if(this.editData){
            this.modifierCellierForm.controls['nom'].setValue(this.editData.nom);
            this.modifierCellierForm.controls['adresse'].setValue(this.editData.cellier_adresse);
        }
    }

    submit() {
        console.log(this.editData.cellier_id_cellier);
         
        if (this.modifierCellierForm.valid) {
            const cellier: ICellier = this.modifierCellierForm.value;  
            cellier.cellier_id_cellier = this.editData.cellier_id_cellier;
            this.bieroServ.modifierCellier(cellier).subscribe({
            next:(reponse)=>{
                this.dialogRef.close('mod');  
            },
            error:(reponse)=>{
                this.dialogRef.close('mod');
            }
            });
        }
    }
}
