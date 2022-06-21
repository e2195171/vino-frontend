import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';
import { DataService } from '../Data/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dialog-ajout-bouteille',
    templateUrl: './dialog-ajout-bouteille.component.html',
    styleUrls: ['./dialog-ajout-bouteille.component.scss']
})
    
export class DialogAjoutBouteilleComponent implements OnInit {
    @Input() bouteille!:IProduit;
    creerBouteilleForm!:FormGroup;
    bouteilles: any;
    getBouteilleId: any;
    cellierData: string;
    id_cellier: string;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogAjoutBouteilleComponent>,
                    @Inject(MAT_DIALOG_DATA) bouteille: IProduit,
                    private bieroServ: ApibieroService,
                    private data: DataService,
                    private router: Router
                ) { }

    /** Modèles d'expression régulière */
    dateRegex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;
    nombreEntierRegex = /^\d+$/;
    nombreFlottantRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;
    anneeRegex = /^(18|19|20)[\d]{2,2}$/;

    ngOnInit(): void {
        this.data.ceCellierData.subscribe(cellierData => this.cellierData = cellierData);
        /** Obtenir une nomenclature des bouteilles importées de la SAQ */
        this.bieroServ.getListeBouteilles().subscribe((data: any) => { this.bouteilles = data.data; })
        
        //this.data.ceCellierData.subscribe(cellierData => this.id_cellier = cellierData);
        console.log(this.cellierData);
        
        /** Forme et validation des données saisies */
        this.creerBouteilleForm = this.formBuilder.group({
            id_bouteille: ['', [Validators.required]],
            date_achat: ['', [Validators.required, Validators.pattern(this.dateRegex)]],
            garde_jusqua: ['', [Validators.required, Validators.pattern(this.dateRegex)]],
            notes: ['', [Validators.required, Validators.pattern(this.nombreEntierRegex)]],
            prix: ['', [Validators.required, Validators.pattern(this.nombreFlottantRegex)]],
            quantite : ['', [Validators.required, Validators.pattern(this.nombreEntierRegex)]],
            millesime : ['', [Validators.required, Validators.pattern(this.anneeRegex)]]
        })
    }

    /** Fonction pour ajouter une bouteille au cellier */
    ajouterBouteille(): void{   
        this.id_cellier = this.cellierData;
        console.log(this.id_cellier);
        
        if (this.creerBouteilleForm.valid) {
            this.creerBouteilleForm.value.id_bouteille = this.getBouteilleId;
            let bouteilles: any = this.creerBouteilleForm.value;
            bouteilles.id_cellier = this.id_cellier;
            let id_cellier = bouteilles.id_cellier
            console.log(bouteilles);
            
            this.bieroServ.ajouterBouteille(bouteilles).subscribe({
                next: (reponse) => {
                    //this.router.navigateByUrl('cellier/'.this.id_cellier);
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
