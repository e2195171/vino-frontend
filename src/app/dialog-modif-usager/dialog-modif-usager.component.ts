import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsager } from './../iusager';

@Component({
  selector: 'app-dialog-modif-usager',
  templateUrl: './dialog-modif-usager.component.html',
  styleUrls: ['./dialog-modif-usager.component.scss']
})
export class DialogModifUsagerComponent implements OnInit {
    @Input() usager!:IUsager;
    modifierProfilForm!: FormGroup;
    getVilleId: any;
    villes: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifUsagerComponent>,
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

        const id = sessionStorage.id_usager;
        
        this.bieroServ.getListeVilles().subscribe((data: any) => { this.villes = data.data; })
        
        const id_usager = sessionStorage.id_usager;
        this.bieroServ.getProfil(id_usager)
        .subscribe({
            next: (res) => {
                this.usager = res.data[0];
                
                console.log(this.usager);
                /** Affecter des données dans un formulaire */
                this.modifierProfilForm = this.formBuilder.group({
                    nom: [this.usager.nom_usager],
                    prenom: [this.usager.prenom],
                    courriel: [this.usager.courriel],
                    phone: [this.usager.phone],
                    adresse: [this.usager.adresse_usager],
                    id_ville: [this.usager.id_ville]
                })
                console.log(this.modifierProfilForm.value);
            },
            error:(err)=>{
                alert("erreur")
            }
        })

    }

    /** Envoi de nouvelles données du formulaire vers la base de données */
    modifierUsager():void{
        if(this.modifierProfilForm.valid){
            let usager: IUsager = this.modifierProfilForm.value;  
            usager.id_usager = sessionStorage.id_usager;
            console.log(usager);
            
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
