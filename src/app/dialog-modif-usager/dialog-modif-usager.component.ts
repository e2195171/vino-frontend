import {Component, Inject, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-dialog-modif-usager',
  templateUrl: './dialog-modif-usager.component.html',
  styleUrls: ['./dialog-modif-usager.component.scss']
})
export class DialogModifUsagerComponent implements OnInit {

    @Input() bouteille!:IProduit;
    modifierBouteilleForm!:FormGroup;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifUsagerComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: IProduit,
                    private bieroServ: ApibieroService
                ) { }
    
    /** Modèles d'expression régulière */
    dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    nombreEntierRegex = /^\d+$/;
    nombreFlottantRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;
    anneeRegex = /^(18|19|20)[\d]{2,2}$/;

    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.modifierBouteilleForm = this.formBuilder.group({
            date_achat: ['', [Validators.pattern(this.dateRegex)]],
            garde_jusqua: ['', [Validators.pattern(this.dateRegex)]],
            notes: ['', [Validators.pattern(this.nombreEntierRegex)]],
            prix: ['', [Validators.pattern(this.nombreFlottantRegex)]],
            quantite : ['', [Validators.pattern(this.nombreEntierRegex)]],
            millesime : ['', [Validators.pattern(this.anneeRegex)]]
        });

        /** Affectation des données du formulaire aux valeurs à envoyer à la base de données */
        if(this.editData){
            this.modifierBouteilleForm.controls['date_achat'].setValue(this.editData.date_achat);
            this.modifierBouteilleForm.controls['garde_jusqua'].setValue(this.editData.garde_jusqua);
            this.modifierBouteilleForm.controls['notes'].setValue(this.editData.notes);
            this.modifierBouteilleForm.controls['prix'].setValue(this.editData.prix);
            this.modifierBouteilleForm.controls['quantite'].setValue(this.editData.quantite);
            this.modifierBouteilleForm.controls['millesime'].setValue(this.editData.millesime);
        }
    }

    /** Envoi de nouvelles données du formulaire vers la base de données */
    modifierBiere():void{
        if(this.modifierBouteilleForm.valid){
            let bouteille: IProduit = this.modifierBouteilleForm.value;  
            bouteille.id = this.editData.id_cellier;
            this.bieroServ.modifierBouteille(bouteille).subscribe({
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
