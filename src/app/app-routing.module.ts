import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { GardienConnexionGuard } from './Auth/gardien-connexion.guard';
import { DialogAjoutBouteilleComponent } from './dialog-ajout-bouteille/dialog-ajout-bouteille.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogModifComponent } from './dialog-modif/dialog-modif.component';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { ProfilComponent } from './profil/profil.component';
import { CellierComponent } from './cellier/cellier.component';

const routes: Routes = [
    { path : "", component:AccueilComponent },
    { path: "liste", component: ListeProduitComponent , canActivate:[GardienConnexionGuard] },
    { path: "cellier/:id", component: CellierComponent , canActivate:[GardienConnexionGuard] },
    { path: "usager", component: ProfilComponent , canActivate:[GardienConnexionGuard] },
    { path : "produit/:id", component:DetailsProduitComponent, canActivate:[GardienConnexionGuard] },
    { path : "", component:DialogAjoutBouteilleComponent, canActivate:[GardienConnexionGuard] },
    { path : "modifier/:id", component:DialogModifComponent, canActivate:[GardienConnexionGuard] },
    {path : "delete/:id", component:DialogDeleteComponent, canActivate:[GardienConnexionGuard]},
    { path : "**", component:NonTrouveComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

