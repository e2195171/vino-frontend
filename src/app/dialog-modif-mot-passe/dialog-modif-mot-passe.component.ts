import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogModifMotPasseComponent>,
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

        const id = sessionStorage.id_usager;
        
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

    /** Envoi de nouvelles données du formulaire vers la base de données */
    modifierMotPasse():void{
        if(this.modifierMotPasseForm.valid){

            if (this.modifierMotPasseForm.value.mot_passe_existe === this.usager.mot_passe)
            {
                if (this.modifierMotPasseForm.value.mot_passe === this.modifierMotPasseForm.value.confirmpassword) {
                    const usager: any = {
                        'mot_passe': this.modifierMotPasseForm.value.mot_passe,
                        'id_usager': sessionStorage.id_usager
                    }

                    this.bieroServ.modifierUsager(usager).subscribe({
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
