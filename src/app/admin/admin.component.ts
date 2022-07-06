import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { ApibieroService } from '../Serv/apibiero.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModifComponent } from '../dialog-modif/dialog-modif.component';
import { DialogAjoutBouteilleComponent } from '../dialog-ajout-bouteille/dialog-ajout-bouteille.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUsager } from './../iusager';
import { DialogModifCellierComponent } from '../dialog-modif-cellier/dialog-modif-cellier.component';
import { DialogAjoutCellierComponent } from '../dialog-ajout-cellier/dialog-ajout-cellier.component';
import { DialogModifUsagerComponent } from '../dialog-modif-usager/dialog-modif-usager.component';
import { DialogModifMotPasseComponent } from '../dialog-modif-mot-passe/dialog-modif-mot-passe.component';
import { DialogSupprimBouteilleAdminComponent } from '../dialog-supprim-bouteille-admin/dialog-supprim-bouteille-admin.component';
import { DialogAjoutBouteilleNonListeesComponent } from '../dialog-ajout-bouteille-non-listees/dialog-ajout-bouteille-non-listees.component';
import { IProduit } from '../iproduit';
import { ICellier } from './../icellier';
import { IListeUsager } from './../iliste-usager';
import { DataService } from '../Data/data.service';
import { IUser } from '../iuser';
import { DialogImportBouteillesComponent } from '../dialog-import-bouteilles/dialog-import-bouteilles.component';



@Component({
  selector: 'app-profil',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
    usager !: IUsager;
    bouteille !: IProduit;
    usagers !: IUsager[];

    //cellierData: string;

    displayedColumnsBouteille: string[] = ["image", "nom", "pays", "type", "action"];
    dataSourceBouteille !: MatTableDataSource<IProduit>;
    
    displayedColumnsUsager: string[] = ["image","nom", "courriel", "phone", "adresse", "ville", "action"];
    dataSourceUsager !: MatTableDataSource<IUsager>;//Creer IUser
      
    @ViewChild('paginatorBouteille', { read: MatPaginator }) paginatorBouteille!: MatPaginator;
    @ViewChild('paginatorUsager', { read: MatPaginator }) paginatorUsager!: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(
        private authServ: AuthService,
        private bieroServ: ApibieroService,
        public dialog: MatDialog,
        private data: DataService,
    ) { 
        
    }

    ngOnInit(): void {
        this.getBouteilles();
        this.getUsagers();
        this.authServ.setTitre("Admin");
        this.authServ.setConnexion(true);
    }

    /** Liste tous les bouteilles */
    getBouteilles() {
        this.bieroServ.getListeBouteilles()
        .subscribe({
            next:(res)=>{
                console.log(res.data)
                this.dataSourceBouteille = new MatTableDataSource(res.data);
                this.dataSourceBouteille.paginator = this.paginatorBouteille;
                this.dataSourceBouteille.sort = this.sort;
                // console.log(this.dataSourceBouteille.sort);
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }

    /** Liste d'information d'usager */
    getUsagers() {
        this.bieroServ.getUsagers()
        .subscribe({
            next:(res)=>{
                console.log(res.data)
                this.dataSourceUsager = new MatTableDataSource(res.data);
                this.dataSourceUsager.paginator = this.paginatorUsager;
                this.dataSourceUsager.sort = this.sort;
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }
    
    /** Filtre */
    applyFilterBouteille(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceBouteille.filter = filterValue.trim().toLowerCase();

        if (this.dataSourceBouteille.paginator) {
            this.dataSourceBouteille.paginator.firstPage();
        }
    }

    /** Filtre */
    applyFilterUsager(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceUsager.filter = filterValue.trim().toLowerCase();

        if (this.dataSourceUsager.paginator) {
            this.dataSourceUsager.paginator.firstPage();
        }
    }

    /** Bouton Supprimer un cellier */
    deleteDialogBouteille(cellier:IProduit): void {
        const dialogRef = this.dialog.open(DialogSupprimBouteilleAdminComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '370px',
            data:cellier
        }).afterClosed().subscribe(res=>{
            this.getBouteilles();
        });
    }

    /** Bouton Modifier les informations de l'usager' */
    editDialogUsager(usager:IUsager): void {
        const dialogRef = this.dialog.open(DialogModifUsagerComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data:usager
        }).afterClosed().subscribe(res=>{
            this.getUsagers();
        });
        
    }

    /** Bouton Modifier le mot de passe */
    editDialogMotPasse(usager:IUsager): void {
        const dialogRef = this.dialog.open(DialogModifMotPasseComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data:usager
        }).afterClosed().subscribe(res=>{
            this.getUsagers();
        });
        
    }

    /** Importer des bouteilles de SAQ */
    importeSaqDialog(): void {
        this.dialog.open(DialogImportBouteillesComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px'
        }).afterClosed().subscribe(res => {
            this.getBouteilles();
        });
    }
}
