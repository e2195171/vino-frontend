import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from '../iuser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

    // getBouteilleId: any;

    constructor(
                    private formBuilder: FormBuilder,
                    private http : HttpClient,
                    private router : Router,
                    private authServ : AuthService,
                    public dialogRef: MatDialogRef<DialogLoginComponent>,
                    // private authServ: AuthService
                ) { }

    /** Modèles d'expression régulière */
    courrielRegex = /^\S+$/;
    // passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   

    ngOnInit(): void {
        /** Obtenir une nomenclature des bouteilles importées de la SAQ */
        // this.authServ.getLoggedUser().subscribe((data: any) => { this.loggedUser = data.data; })
        this.authServ.statut().subscribe(bLogin=>{
            this.estConnecte = bLogin;
        })
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
                    // sessionStorage.setItem("connecte","true");
                    return a.courriel === this.loginForm.value.courriel && a.mot_passe === this.loginForm.value.mot_passe
                })
                // .afterClosed().subscribe(()=>{
                //     this.authServ.setConnexion(this.estConnecte);
                //     this.onNoClick();
                // });
                console.log(user);
                
                if(user){
                    //changer l'etat de la connexion dans le service
                    this.authServ.setConnexion(!this.estConnecte);
                    this.loginForm.reset();
                    sessionStorage.setItem("id_usager", user.id);
                    // console.log(sessionStorage.id_usager);
                    
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

    connect():boolean{
        return this.authServ.getConnexion();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
