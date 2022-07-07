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
import { DialogSupprimCellierComponent } from '../dialog-supprim-cellier/dialog-supprim-cellier.component';
import { DialogAjoutBouteilleNonListeesComponent } from '../dialog-ajout-bouteille-non-listees/dialog-ajout-bouteille-non-listees.component';
import { IProduit } from '../iproduit';
import { ICellier } from './../icellier';
import { IListeUsager } from './../iliste-usager';
import { DataService } from '../Data/data.service';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
    usager !: IUsager;
    cellier !: ICellier;
    bouteille !: IProduit;

    displayedColumnsCellier: string[] = ["nom", "adresse", "action"];
    dataSourceCellier !: MatTableDataSource<ICellier>;
    
    
    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(
        private authServ: AuthService,
        private bieroServ: ApibieroService,
        public dialog: MatDialog,
        private data: DataService,
    ) { 
        
    }

    ngOnInit(): void {
        //this.data.ceCellierData.subscribe(cellierData => this.cellierData = cellierData);

        this.getMesCelliers();
        this.getMonProfil();
        this.authServ.setTitre("Vino");
        this.authServ.setConnexion(true);
    }

    //newCellierData(idCellier: string) {
    //    this.data.changeCellier(idCellier);
    //}

    /** Liste des celliers d'usager */
    getMesCelliers() {
        const id_usager = sessionStorage.getItem("id_usager");
        console.log(id_usager);
        
        this.bieroServ.getCelliers(id_usager)
        .subscribe({
            next:(res)=>{
                this.dataSourceCellier = new MatTableDataSource(res.data);
                this.dataSourceCellier.paginator = this.paginator;
                this.dataSourceCellier.sort = this.sort;
                console.log(this.dataSourceCellier.sort);
                
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }

    /** Liste d'information d'usager */
    getMonProfil() {
        const id_usager = sessionStorage.id_usager;
        this.bieroServ.getProfil(id_usager)
        .subscribe({
            next:(res)=>{
                this.usager = res.data[0];
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }
    
    /** Filtre */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceCellier.filter = filterValue.trim().toLowerCase();

        if (this.dataSourceCellier.paginator) {
            this.dataSourceCellier.paginator.firstPage();
        }
    }

    /** Bouton Modifier un cellier */
    editDialogCellier(cellier:ICellier): void {
        const dialogRef = this.dialog.open(DialogModifCellierComponent, {
            width: '100%',
            maxWidth: '370px',
            //maxHeight: '540px',
            data:cellier
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
    }

    /** Bouton Supprimer un cellier */
    deleteDialogCellier(cellier:IProduit): void {
        const dialogRef = this.dialog.open(DialogSupprimCellierComponent, {
            width: '100%',
            maxWidth: '370px',
            //maxHeight: '370px',
            data:cellier
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
    }

    /** Bouton Ajouter un cellier */
    createDialogCellier(): void {
        this.dialog.open(DialogAjoutCellierComponent, {
            width: '100%',
            maxWidth: '370px',
            //maxHeight: '540px',
            data: this.cellier
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
    }

    /** Bouton Ajouter une bouteille non listées */
    openDialogBouteilleNonListees(): void {
        this.getMesCelliers();
        this.dialog.open(DialogAjoutBouteilleNonListeesComponent, {
            width: '100%',
            maxWidth: '370px',
            //maxHeight: '800px',
            data: this.bouteille
        }).afterClosed().subscribe(res=>{
            this.getMesCelliers();
        });
    }

    /** Bouton Modifier les informations de l'usager' */
    editDialogUsager(usager:IUsager): void {
        const dialogRef = this.dialog.open(DialogModifUsagerComponent, {
            width: '100%',
            maxWidth: '370px',
            //maxHeight: '540px',
            data:usager
        }).afterClosed().subscribe(res=>{
            this.getMonProfil();
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
            this.getMonProfil();
        });
        
    }


}
