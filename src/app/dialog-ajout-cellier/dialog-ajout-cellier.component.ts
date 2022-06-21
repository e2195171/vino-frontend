import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApibieroService } from "../Serv/apibiero.service";
import { DataService } from '../Data/data.service';
import { ICellier } from '../icellier';

@Component({
  selector: 'app-dialog-ajout-cellier',
  templateUrl: './dialog-ajout-cellier.component.html',
  styleUrls: ['./dialog-ajout-cellier.component.scss']
})
    
export class DialogAjoutCellierComponent implements OnInit {
    @Input() cellier!:ICellier;
    title: any;
    cellierForm!: FormGroup;
    celliers: any;
    cellierData: string;
  
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogAjoutCellierComponent>,
        @Inject(MAT_DIALOG_DATA) cellier: any,
        private data: DataService,
        private bieroServ: ApibieroService
    ) { }
  
    /** Modèles d'expression régulière */
    ngOnInit(): void {
        
             
        /** Forme et validation des données saisies */
        this.cellierForm = this.formBuilder.group({
            nom: ['', [Validators.required]],
            adresse: ['', [Validators.required]]
        })
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    submit(){
        let resultat = null;
        let cellier: any = this.cellierForm.value
        cellier.id_usager = sessionStorage.id_usager;

        this.bieroServ.ajouterCellier(cellier).subscribe(res => {
            resultat = res;
        }, err => {
            console.log('err', err);
        }, () => {
            this.dialogRef.close('add');
        });
  
    }

}
