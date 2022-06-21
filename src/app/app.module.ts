import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import { EnteteComponent } from './entete/entete.component';
import { NonTrouveComponent } from './non-trouve/non-trouve.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAjoutBouteilleComponent } from './dialog-ajout-bouteille/dialog-ajout-bouteille.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogModifComponent } from './dialog-modif/dialog-modif.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { CellierComponent } from './cellier/cellier.component';
import { ProfilComponent } from './profil/profil.component';
import { DialogModifCellierComponent } from './dialog-modif-cellier/dialog-modif-cellier.component';
import { DialogModifMotPasseComponent } from './dialog-modif-mot-passe/dialog-modif-mot-passe.component';
import { DialogAjoutCellierComponent } from './dialog-ajout-cellier/dialog-ajout-cellier.component';
import { DialogModifUsagerComponent } from './dialog-modif-usager/dialog-modif-usager.component';
import { DialogSupprimCellierComponent } from './dialog-supprim-cellier/dialog-supprim-cellier.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { DialogRegisterComponent } from './dialog-register/dialog-register.component';


@NgModule({
    declarations: [
        AppComponent,
        AccueilComponent,
        ListeProduitComponent,
        EnteteComponent,
        NonTrouveComponent,
        DetailsProduitComponent,
        DialogAjoutBouteilleComponent,
        DialogModifComponent,
        CellierComponent,
        ProfilComponent,
        DialogModifCellierComponent,
        DialogModifMotPasseComponent,
        DialogAjoutCellierComponent,
        DialogModifUsagerComponent,
        DialogSupprimCellierComponent,
        DialogDeleteComponent,
        DialogLoginComponent,
        DialogRegisterComponent
    ],
    entryComponents:[DialogAjoutBouteilleComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatSortModule,
        MatPaginatorModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatListModule
    ],

    
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
