import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.scss']
})
    
export class ListeProduitComponent implements OnInit {
    bouteille !: IProduit;

    estEditable:boolean= false;
    
    displayedColumns: string[] = ["image", "nom", "note", "cellier_nom", "quantite", "pays", "type", "millesime", "voir"];
    dataSource !: MatTableDataSource<IProduit>;

    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;

    constructor(private authServ:AuthService, private bieroServ:ApibieroService, public dialog: MatDialog ) { 

    }

    ngOnInit(): void {
        this.getAllBouteillesUsager();

        this.authServ.setTitre("Vino");
        this.authServ.setConnexion(true);
    }

    /** Liste des bouteilles d'usager */
    getAllBouteillesUsager() {
        const id_usager = sessionStorage.getItem("id_usager");
        this.bieroServ.getAllBouteillesUsager(id_usager)
        .subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res.data);
                console.log(res.data);
                this.dataSource.paginator = this.paginator;
                               
                this.dataSource.sort = this.sort;
                console.log(this.dataSource.sort);
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
            this.getAllBouteillesUsager();
        });
        
    }

    /** Bouton Ajouter une bouteille */
    openDialog(): void {
        this.getAllBouteillesUsager();
        this.dialog.open(DialogAjoutBouteilleComponent, {
            width: '100%',
            maxWidth: '370px',
            maxHeight: '540px',
            data: this.bouteille
        }).afterClosed().subscribe(res=>{
            this.getAllBouteillesUsager();
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
            this.getAllBouteillesUsager();
        });
    }

    /** Bouton Augmenter le nombre de bouteilles */
    ajouterQuantiteBouteilleCellier(data:IProduit){
        this.bieroServ.getBouteillesCellierQuantiteAjoutee(data).subscribe({
            next:(res)=>{
                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                console.log(data);
                
            }
        })
        this.getAllBouteillesUsager();
    }

    /** Bouton Réduire le nombre de bouteilles */
    boireQuantiteBouteilleCellier(data:IProduit){
        this.bieroServ.deleteBouteillesCellierQuantiteAjoutee(data).subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res.data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                
            }
            
        });
        this.getAllBouteillesUsager();
    }
    
    // @ts-ignore
    getEtoile(moyenne, i) { /// C'est la fonnction qui affiche soit étoile soit étoile vide soit demi-etoile
        let star = 'star';
        if(moyenne >= (i)){
        star = 'star';
        }else {
            if(Math.ceil(moyenne)===i){
                star = 'star_half';
            }else{
                if(moyenne < i){
                star = 'star_border';
                }
            }
        }
    return star;
    }
}
