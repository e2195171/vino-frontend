import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogInvitationComponent } from '../dialog-invitation/dialog-invitation.component';
import { DialogAdminComponent } from '../dialog-admin/dialog-admin.component';


@Component({
    selector: 'app-dialog-login',
    templateUrl: './dialog-login.component.html',
    styleUrls: ['./dialog-login.component.scss']
})
    
export class DialogLoginComponent implements OnInit {
    @Input() user!:IUser;
    loginForm!:FormGroup;
    loggedUser: any;
    estConnecte!:boolean;
    sTitre!:string;

    constructor(
                    private formBuilder: FormBuilder,
                    private http : HttpClient,
                    private route : Router,
                    private authServ : AuthService,
                    public dialogRef: MatDialogRef<DialogLoginComponent>,
                    public dialog: MatDialog,
                    // private authServ: AuthService
                ) { }
    /** Modèles d'expression régulière */
    courrielRegex = /^\S+$/;
    // passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   

    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.loginForm = this.formBuilder.group({
            courriel : ['', [Validators.required, Validators.pattern(this.courrielRegex)]],
            mot_passe : ['', []]
        })
        this.authServ.getTitre().subscribe(leTitre =>{
            this.sTitre = leTitre;
        })
    }

    /** Fonction pour ajouter une bouteille au cellier */
    login():void{
        if (this.loginForm.valid) {
   
            this.http.get<any>("http://127.0.0.1:8000/webservice/php/usager/login/").subscribe(res=>{
                console.log(res.data)
                const user = res.data.find((a:any)=>{
                    
                    let conn = false;
                    if(this.loginForm.value.courriel==='LeMonarch' && this.loginForm.value.mot_passe === '54321'){
                        sessionStorage.setItem("connecte","admin");
                        conn = true;
                        
                    } else {
                        sessionStorage.setItem("connecte","true");
                        conn = a.courriel === this.loginForm.value.courriel && a.mot_passe === this.loginForm.value.mot_passe;
                    }
                    return conn;
                })
              
                if (sessionStorage.getItem("connecte") === "true") {
                    console.log(user);
                    //changer l'etat de la connexion dans le service
                    this.authServ.setConnexion(!this.estConnecte);
                    this.loginForm.reset();
                    sessionStorage.setItem("id_usager", user.id);
                    // console.log(sessionStorage.id_usager);
                    
                    this.authServ.setTitre('Mon cellier');
                    this.route.navigateByUrl("/usager");

                    this.onNoClick();
                    this.invite();
                } else if (sessionStorage.getItem("connecte") === "admin") {
                    this.onNoClick();
                    this.openAdmin();
                } else {
                    alert("Utilisateur non trouvé")
                }
            },err=>{
                alert("Erreur de traitement")
            })
        }
    }

    openAdmin(): void {
        this.dialog.open(DialogAdminComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px'
        }).afterClosed().subscribe(res=>{});
    }

    connect():boolean{
        return this.authServ.getConnexion();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

   
    invite(): void {
        this.dialog.open(DialogInvitationComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px'
        }).afterClosed().subscribe(res => {
            this.route.navigateByUrl("/accueil", { skipLocationChange: true }).then(() => {
                this.route.navigate(['/usager']);
            });
        });
    }
            
       
}
