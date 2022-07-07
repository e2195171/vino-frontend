import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUsager } from './../iusager';
import { ConfigurableFocusTrapFactory } from '@angular/cdk/a11y';

@Component({
  selector: 'app-dialog-modif-mot-passe',
  templateUrl: './dialog-modif-mot-passe.component.html',
  styleUrls: ['./dialog-modif-mot-passe.component.scss']
})
export class DialogModifMotPasseComponent implements OnInit {
    @Input() usager!:IUsager;
    modifierMotPasseForm!: FormGroup; 
    motPasseModif: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifMotPasseComponent>,
                    @Inject(MAT_DIALOG_DATA) public editData: any,
                    private bieroServ: ApibieroService
                )
                { }

    /** Test version */
    passwordRegex = /[^\s]/;   
    
    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.modifierMotPasseForm = this.formBuilder.group({
            mot_passe_existe: ['', [Validators.pattern(this.passwordRegex)]],
            mot_passe: ['', [Validators.pattern(this.passwordRegex)]],
            confirmpassword: ['', [Validators.pattern(this.passwordRegex)]]
        });

        // if (this.editData) {

        //     this.modifierMotPasseForm.controls['mot_passe_existe'].setValue(this.editData.nom_usager);
        //     this.modifierMotPasseForm.controls['mot_passe'].setValue(this.editData.prenom);
            
        //     console.log(this.modifierMotPasseForm.value);
            
        // }

        if (this.editData) {
            this.usager = this.editData;
            console.log(this.editData);
            
        } else {
            const id_usager = sessionStorage.id_usager;
            this.bieroServ.getProfil(id_usager)
            .subscribe({
                next: (res) => {
                    this.usager = res.data[0];
                },
                error:(err)=>{
                    alert("erreur")
                }
            })
        }
        
        
    }

    /** Envoi de nouvelles données du formulaire vers la base de données */
    modifierMotPasse():void{
        if(this.modifierMotPasseForm.valid){
            console.log(sessionStorage.id_usager);
            
            if (this.modifierMotPasseForm.value.mot_passe_existe === this.usager.mot_passe)
            {
                if (this.modifierMotPasseForm.value.mot_passe === this.modifierMotPasseForm.value.confirmpassword) {
                    if (this.editData) {
                        this.motPasseModif = {
                            'mot_passe': this.modifierMotPasseForm.value.mot_passe,
                            'id_usager': this.usager.id_usager
                        }
                    } else {
                        this.motPasseModif = {
                            'mot_passe': this.modifierMotPasseForm.value.mot_passe,
                            'id_usager': sessionStorage.id_usager
                        }
                    }
                    
                    console.log(this.motPasseModif);
                    
                    this.bieroServ.modifierUsager(this.motPasseModif).subscribe({
                        next:(res)=>{
                            this.modifierMotPasseForm.reset();
                            this.onNoClick();
                        },
                        error:(err)=>{
                            alert("erreur")
                        }
                    });
                }
                else
                {
                    alert('mot de passe ne correspond pas')
                }
            }
            else
            {
                alert('mot de passe ne correspond pas')
            }
            
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
