import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';
import { IUser } from '../iuser';
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
    ceUsager: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifUsagerComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: IUsager,
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
        const id = sessionStorage.id_usager;
        /** Forme et validation des données saisies */
        this.bieroServ.getListeVilles().subscribe((data: any) => { this.villes = data.data; })
        
        const id_usager = sessionStorage.id_usager;
        this.bieroServ.getProfil(id_usager)
        .subscribe({
            next: (res) => {
                this.usager = res;
                console.log(this.usager);
                this.modifierProfilForm.patchValue({
                    courriel: this.usager.courriel,
                    
                    
                  });console.log(this.modifierProfilForm.value);
            },
            error:(err)=>{
                alert("erreur")
            }
        })


        this.modifierProfilForm = this.formBuilder.group({
            nom_usager: ['', [Validators.pattern(this.nomRegex)]],
            prenom: ['', [Validators.pattern(this.prenomRegex)]],
            courriel: ['', [Validators.pattern(this.courrielRegex)]],
            phone: ['', [Validators.pattern(this.phoneRegex)]],
            adresse_usager: ['', [Validators.pattern(this.adresseRegex)]],
            id_ville: ['', [Validators.required]],
        });

        /** Affectation des données du formulaire aux valeurs à envoyer à la base de données */
        //if(this.editData){
            
            this.modifierProfilForm.controls['nom_usager'].patchValue(this.usager.nom_usager);
            this.modifierProfilForm.controls['prenom'].patchValue(this.editData.prenom);
            this.modifierProfilForm.controls['courriel'].patchValue(this.editData.courriel);
            this.modifierProfilForm.controls['phone'].patchValue(this.editData.phone);
            this.modifierProfilForm.controls['adresse_usager'].patchValue(this.editData.adresse_usager);
            this.modifierProfilForm.controls['id_ville'].patchValue(this.editData.id_ville);
        //}
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
