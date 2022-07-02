import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApibieroService } from '../Serv/apibiero.service';


@Component({
    selector: 'app-dialog-admin',
    templateUrl: './dialog-admin.component.html',
    styleUrls: ['./dialog-admin.component.scss']
})
    
export class DialogAdminComponent implements OnInit {
    @Input() user!:IUser;
    adminForm!:FormGroup;
    loggedUser: any;
    getVilleId: any;
    estConnecte!:boolean;
    villes: any;

    constructor(
                    private formBuilder: FormBuilder,
                    private http : HttpClient,
                    private router:Router,
                    public dialogRef: MatDialogRef<DialogAdminComponent>,
                    private authServ: AuthService,
                    private bieroServ: ApibieroService,
                    public dialog: MatDialog
                ) { }

    /** Modèles d'expression régulière */
 
    courrielRegex = /[^\s]/;
  


    ngOnInit(): void {
        
        /** Forme et validation des données saisies */
        this.adminForm = this.formBuilder.group({
            courriel: ['', [Validators.required, Validators.pattern(this.courrielRegex)]],
        })
    }

    admin():void{
        if (this.adminForm.valid) {
            let user:IUser = this.adminForm.value;
            this.http.get<any>("http://127.0.0.1:8000/webservice/php/usager/login/").subscribe(res=>{
                let conn = 'false';
                const user = res.data.find((a:any)=>{
                    return a.courriel === this.adminForm.value.courriel;
                })
    
                if (user) {
                    console.log(user);
                    //changer l'etat de la connexion dans le service
                    this.authServ.setConnexion(!this.estConnecte);
                    this.adminForm.reset();
                    sessionStorage.setItem("id_usager", user.id);
                    this.authServ.setTitre('Mon cellier');
                    this.router.navigateByUrl("/usager");
                    this.onNoClick();
                } else {
                    alert("Utilisateur non trouvé")
                }
            },err=>{
                alert("Erreur de traitement")
            })
           
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
