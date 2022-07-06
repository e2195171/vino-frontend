import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ApibieroService } from "../Serv/apibiero.service";


@Component({
    selector: 'app-dialog-import-bouteilles',
    templateUrl: './dialog-import-bouteilles.component.html',
    styleUrls: ['./dialog-import-bouteilles.component.scss']
})
    
export class DialogImportBouteillesComponent implements OnInit {
    @Input() importParametres!:any;
    title: any;
    importForm!: FormGroup;
    

    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<DialogImportBouteillesComponent>,
        @Inject(MAT_DIALOG_DATA) importParametres: any,
        private bieroServ: ApibieroService
    ) { }

    /** Modèle d'expression régulière */
    nomRegex = /^[1-9]\d*$/;
    
    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.importForm = this.formBuilder.group({
            page: ['', [Validators.required, Validators.pattern(this.nomRegex)]],
            nombre: ['', [Validators.required, Validators.pattern(this.nomRegex)]]
        })
    }
  
    onNoClick(): void {
        this.dialogRef.close();
    }
  
    submit(){
        let resultat = null;
        this.importParametres = this.importForm.value
        console.log(this.importParametres);
        
        this.bieroServ.importerDeSaq(this.importParametres).subscribe(res => {
            resultat = res;
        }, err => {
            console.log('err', err);
            this.dialogRef.close('err');
        }, () => {
            this.dialogRef.close('add');
        });
  
    }

}
