import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { ApibieroService } from '../Serv/apibiero.service';


@Component({
    selector: 'app-dialog-register',
    templateUrl: './dialog-register.component.html',
    styleUrls: ['./dialog-register.component.scss']
})
    
export class DialogRegisterComponent implements OnInit {
    @Input() user!:IUser;
    registerForm!:FormGroup;
    loggedUser: any;

    constructor(
                    private formBuilder: FormBuilder,
                    private http : HttpClient,
                    private router:Router,
                    public dialogRef: MatDialogRef<DialogRegisterComponent>,
                    public dialogRefLogin: MatDialogRef<DialogLoginComponent>,
                    private authServ: AuthService,
                    private bieroServ: ApibieroService,
                    public dialog: MatDialog
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
        /** Obtenir une nomenclature des bouteilles importées de la SAQ */
        // this.authServ.getLoggedUser().subscribe((data: any) => { this.loggedUser = data.data; })

        /** Forme et validation des données saisies */
        this.registerForm = this.formBuilder.group({
            nom: ['', [Validators.required, Validators.pattern(this.nomRegex)]],
            prenom: ['', [Validators.required, Validators.pattern(this.prenomRegex)]],
            courriel: ['', [Validators.required, Validators.pattern(this.courrielRegex)]],
            phone: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
            adresse: ['', [Validators.required, Validators.pattern(this.adresseRegex)]],
            mot_passe: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
            confirmpassword: ['',  [Validators.required, Validators.pattern(this.confirmRegex)]],
        })
    }

    /** Fonction pour ajouter une bouteille au cellier */
    registerUser():void{
        if (this.registerForm.valid) {
            let user:IUser = this.registerForm.value;
            // this.authServ.register(user).subscribe({
            //     next:(reponse)=>{
            //         this.dialogRef.close("vous êtes inscrit");  
            //     },
            //     error:(reponse)=>{
            //         this.dialogRef.close("erreur");
            //     }
            // });
            console.log(this.registerForm.value.mot_passe)
            console.log(this.registerForm.value.confirmpassword)

            if (this.registerForm.value.mot_passe == this.registerForm.value.confirmpassword) {
                let data = this.registerForm.value;
                this.bieroServ.register(data)
                .subscribe({
                    next:(res)=>{
                        this.registerForm.reset();
                        this.onNoClick();
                        this.openLogin();
                    },
                    error:(err)=>{
                        alert("erreur")
                    }
                })
            } else {
                alert('mot de passe ne correspond pas')
            }
            
            // if(this.registerForm.value.mot_passe == this.registerForm.value.confirmpassword){
            //     this.http.put<any>("http://127.0.0.1:8000/webservice/php/usager/register/",this.registerForm.value).subscribe(res=>{
            //         // alert("Inscrit!");
            //         this.registerForm.reset();
            //         this.onNoClick();
            //         this.openLogin();
            //     },err=>{
            //         alert("erreur");
            //     })
            // } else {
            //     alert('mot de passe ne correspond pas')
            // }
            

        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    openLogin(): void {
        this.dialog.open(DialogLoginComponent, {
            width: '90%',
            data: this.loggedUser
        }).afterClosed().subscribe(res=>{
            // alert('logged in')
            // this.getLoggedUser();
        });
    }

}
