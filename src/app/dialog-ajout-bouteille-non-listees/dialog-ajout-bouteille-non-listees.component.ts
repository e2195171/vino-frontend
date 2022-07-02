import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-ajout-bouteille-non-listees',
    templateUrl: './dialog-ajout-bouteille-non-listees.component.html',
    styleUrls: ['./dialog-ajout-bouteille-non-listees.component.scss']
})
    
export class DialogAjoutBouteilleNonListeesComponent implements OnInit {
    
    @Input() bouteille!:IProduit;
    newBouteilleForm!:FormGroup;
    getTypeId: any;
    types: any;
    getPaysId: any;
    pays: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogAjoutBouteilleNonListeesComponent>,
                    @Inject(MAT_DIALOG_DATA) bouteille: IProduit,
                    private bieroServ: ApibieroService,
                    private data: DataService,
                    private router: Router,
                    public dialog: MatDialog
                ) { }

    /** Modèles d'expression régulière **/
    nomRegex = /[^\s]/;
    formatRegex = /[^(?=.*\d).{3,}$]/;

    ngOnInit(): void {

        /** Obtenir des types et pays **/
        this.bieroServ.getListeTypes().subscribe((data: any) => { this.types = data.data; })
        this.bieroServ.getListePays().subscribe((data: any) => { this.pays = data.data; })

        /** Forme et validation des données saisies **/
        this.newBouteilleForm = this.formBuilder.group({
            nom: ['', [Validators.required, Validators.pattern(this.nomRegex)]],
            format: ['', [Validators.required, Validators.pattern(this.formatRegex)]],
            id_type: ['', [Validators.required]],
            id_pays: ['', [Validators.required]],
        })
    }

    /** Fonction pour ajouter une bouteille **/
    ajouterBouteilleNonListees():void{
        console.log(this.newBouteilleForm)
        if (this.newBouteilleForm.valid) {
            let bouteille = this.newBouteilleForm.value; 
            this.newBouteilleForm.value.id_type = this.getTypeId;
            this.newBouteilleForm.value.id_pays = this.getPaysId; 
            console.log(bouteille)
            this.bieroServ.ajouterBouteilleNonListees(bouteille).subscribe({
                next: (reponse) => {
                    this.dialogRef.close('add');  
                },
                error:(reponse)=>{
                    this.dialogRef.close('add');
                }
            });
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}