import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogModifComponent } from '../dialog-modif/dialog-modif.component';
import { DialogAjoutBouteilleComponent } from '../dialog-ajout-bouteille/dialog-ajout-bouteille.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfilComponent } from '../profil/profil.component';
import { Observable } from 'rxjs';
import { IListeProduit } from '../iliste-produit';
import { DataService } from '../Data/data.service';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';


@Component({
  selector: 'app-cellier',
  templateUrl: './cellier.component.html',
  styleUrls: ['./cellier.component.scss']
})
    
export class CellierComponent implements OnInit {
    bouteille !: IProduit;
    cellierData!: string;
    id!: string;

    estEditable:boolean= false;
    
    displayedColumns: string[] = ["image","nom","quantite","pays", "type", "millesime", "voir", "action" ];
    dataSource !: MatTableDataSource<IProduit>;

    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(
        private authServ: AuthService,
        private bieroServ: ApibieroService,
        public dialog: MatDialog,
        private data: DataService,
        private route: ActivatedRoute
    ) { 

    }

    ngOnInit(): void {
        this.data.ceCellierData.subscribe(cellierData => this.cellierData = cellierData);
        console.log(this.cellierData);

        this.route.params.subscribe(
            (params: Params) => {
                console.log(params['id']);
                this.id = params['id'];
            }
        );
        this.cellierData = this.id;
        this.newCellierData(this.cellierData);
        this.getCeCellier();
        this.authServ.setTitre("Mon cellier");
    }


    newCellierData(cellierData: string) {
        this.data.changeCellier(cellierData);
    }


    /** Liste des bouteilles du cellier */
    getCeCellier() {
        const id_usager = sessionStorage.getItem("id_usager");
        this.bieroServ.getCellierParIdEtUsager(this.cellierData, id_usager)
        .subscribe({
            next:(res)=>{
                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },
            error:(err)=>{
                alert("erreur")
            }
        })
    }

    /** Filtre */
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /** Bouton Modifier la bouteille */
    editDialog(bouteille:IProduit): void {
        const dialogRef = this.dialog.open(DialogModifComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data:bouteille
        }).afterClosed().subscribe(res=>{
            this.getCeCellier();
        });
        
    }

    /** Bouton Ajouter une bouteille */
    openDialog(): void {
        this.getCeCellier();
        this.dialog.open(DialogAjoutBouteilleComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data: this.bouteille
        }).afterClosed().subscribe(res=>{
            this.getCeCellier();
        });
    }

    /** Bouton Supprimer la bouteille */
    deleteDialog(bouteille:IProduit): void {
        const dialogRef = this.dialog.open(DialogDeleteComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data:bouteille
        }).afterClosed().subscribe(res=>{
            this.getCeCellier(); //ici
        });
    }

    /** Bouton Augmenter le nombre de bouteilles */
    ajouterQuantiteBouteilleCellier(data: IProduit) {
        console.log(data);
        
        this.bieroServ.getBouteillesCellierQuantiteAjoutee(data).subscribe({
        next:(res)=>{
            this.dataSource = new MatTableDataSource(res.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    })
    this.getCeCellier();
    }

    /** Bouton Réduire le nombre de bouteilles */
    boireQuantiteBouteilleCellier(data:IProduit){
        this.bieroServ.deleteBouteillesCellierQuantiteAjoutee(data).subscribe({
        next:(res)=>{
            this.dataSource = new MatTableDataSource(res.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        }
    })
    this.getCeCellier();
    }

    
}
