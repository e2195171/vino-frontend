import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsager } from './../iusager';
import { IProduit } from '../iproduit';

@Component({
  selector: 'app-dialog-modif-usager',
  templateUrl: './dialog-modif-usager.component.html',
  styleUrls: ['./dialog-modif-usager.component.scss']
})
export class DialogModifUsagerComponent implements OnInit {
    @Input() usager!:any;
    modifierProfilForm!: FormGroup;
    getVilleId: any;
    villes: any;
    id_usager: number;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifUsagerComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: any,
                    private bieroServ: ApibieroService
                ) { }
    
    /** Modèles d'expression régulière */
    //courrielRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    //passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //confirmRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    
    /** Test version */
    nomRegex = /[^\s]/;
    prenomRegex = /[^\s]/;
    courrielRegex = /[^\s]/;
    phoneRegex = /[^\s]/;
    adresseRegex = /[^\s]/;
    passwordRegex = /[^\s]/;   
    confirmRegex = /[^\s]/;

    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.modifierProfilForm = this.formBuilder.group({
            nom: ['', [Validators.pattern(this.nomRegex)]],
            prenom: ['', [Validators.pattern(this.prenomRegex)]],
            courriel: ['', [Validators.pattern(this.courrielRegex)]],
            phone: ['', [Validators.pattern(this.phoneRegex)]],
            adresse: ['', [Validators.pattern(this.adresseRegex)]],
            id_ville: ['', [Validators.required]],
        });
        console.log(this.editData);
           
        /** Affectation des données du formulaire aux valeurs à envoyer à la base de données */
        
        if (this.editData) {
            this.bieroServ.getListeVilles().subscribe((data: any) => {
                this.villes = data.data;
                console.log(data.data);
            });
            this.modifierProfilForm.controls['nom'].setValue(this.editData.nom_usager);
            this.modifierProfilForm.controls['prenom'].setValue(this.editData.prenom);
            this.modifierProfilForm.controls['courriel'].setValue(this.editData.courriel);
            this.modifierProfilForm.controls['phone'].setValue(this.editData.phone);
            this.modifierProfilForm.controls['adresse'].setValue(this.editData.adresse_usager);
            this.modifierProfilForm.controls['id_ville'].setValue(this.editData.id_ville);
            console.log(this.modifierProfilForm.value);
            
        }
        else {
            this.id_usager = sessionStorage.id_usager;
            this.bieroServ.getProfil(this.id_usager)
            .subscribe({
                next: (res) => {
                    this.usager = res.data[0];
                    
                    console.log(res.data);
                    /** Affecter des données dans un formulaire */
                    this.modifierProfilForm = this.formBuilder.group({
                        nom: [this.usager.nom_usager],
                        prenom: [this.usager.prenom],
                        courriel: [this.usager.courriel],
                        phone: [this.usager.phone],
                        adresse: [this.usager.adresse],
                        id_ville: [this.usager.id_ville]
                    })
                    console.log(this.modifierProfilForm.value);
                },
                error:(err)=>{
                    alert("erreur")
                }
            })

        }
               

    }

    modifierUsager():void{
        if(this.modifierProfilForm.valid){
            let usager: IUsager = this.modifierProfilForm.value;  
            
            if (this.editData) {
                let usager: IUsager = this.modifierProfilForm.value;
                usager.id_usager = this.editData.id_usager;
                console.log(usager);
            } else {
                let usager: IUsager = this.modifierProfilForm.value;
                usager.id_usager = sessionStorage.id_usager;
            }
            
            this.bieroServ.modifierUsager(usager).subscribe({
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
