import { Injectable } from '@angular/core';
import { IProduit } from '../iproduit';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListeProduit } from '../iliste-produit';
import { ICellier } from '../icellier';
import { IUsager } from '../iusager';
import { IListeCellier } from '../iliste-cellier';
import { IListeUsager } from '../iliste-usager';
import { IUser } from '../iuser';


@Injectable({
    providedIn: 'root'
})
export class ApibieroService {

    /** L'adresse URL du webservice  */
    url: string = "http://127.0.0.1:8000/webservice/php/";
    
    constructor(private http: HttpClient) { }
    
    /** GET requête pour afficher les bouteilles du cellier */
    register(data: IUser): Observable<IUser>{
        console.log(data);
        return this.http.put<IUser>(this.url+'usager/register', data);
    }

    /** GET requête pour se connecter*/
    login(data: IUser): Observable<IUser>{
        console.log(data);
        
        return this.http.get<IUser>(this.url+'usager/login');
    }

    /** GET requête pour afficher les bouteilles du cellier */
    getBouteillesCellier(): Observable<IListeProduit>{
        return this.http.get<IListeProduit>(this.url+'bouteille');
    }

    /** ---- DMITRIY --- GET requête pour afficher les bouteilles du cellier */
    getCellierParIdEtUsager(id_cellier: any, id_usager: any): Observable<IListeProduit>{
        return this.http.get<IListeProduit>(this.url+'cellier/cellier/'+id_cellier+'/'+id_usager);
    }

    /** ---- DMITRIY --- GET requête pour afficher les celliers */
    getCelliers(id:any): Observable<IListeCellier>{
        return this.http.get<IListeCellier>(this.url+'usager/cellier/'+id);
    }

    /** GET requête pour afficher le profil */
    getProfil(id:any):Observable<IUsager>{
        return this.http.get<IUsager>(this.url+'usager/usager/'+id);
    }

    /** POST requête pour modifier la bouteille dans le cellier */
    modifierBouteille(data: IProduit): Observable<any>{
        console.log(data);
        
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type': 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })
        };
        return this.http.post<IProduit>(this.url+'cellier/cellier/'+data.id_cellier+'/bouteille/'+data.date_achat+'/usager/'+ data.id_usager, data, httpOption);
    }

    /** ---- Louis-Etienne, Vsevolod ---- DELETE requête pour supprimer la bouteille dans le cellier */
    effacerBouteille(id_bouteille:string, id_cellier:string):Observable<any>{
        return this.http.delete<IProduit>(this.url+'cellier/cellier/'+id_cellier+'/'+id_bouteille+'/suppression');
    }

    /** ---- DMITRIY --- PUT requête pour ajouter la bouteille dans le cellier */
    ajouterBouteille(data: IProduit): Observable<any>{
        console.log(data);
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })
        };
                
        return this.http.put<IProduit>(this.url+'cellier/cellier/'+data.id_cellier+'/ajout', data, httpOption);
    }
    
    /** ---- DMITRIY --- PUT requête pour ajouter le cellier */
    ajouterCellier(data: ICellier): Observable<any>{
        console.log(data);
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })
        };
                
        return this.http.put<IProduit>(this.url+'cellier/cellier/ajout', data, httpOption);
    }

    /** GET requête pour afficher la gamme de bouteilles importées de la SAQ */
    getListeBouteilles():Observable<IListeProduit>{
        return this.http.get<IListeProduit>(this.url+'bouteille/bouteilles');
    }

    /** PUT requête pour augmanter la quantité de bouteilles avec le même id dans le cellier */
    getBouteillesCellierQuantiteAjoutee(data:IProduit):Observable<IListeProduit>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })                                                                                                    
        };                                                                                                                  
        return this.http.put<IListeProduit>(this.url+'cellier/cellier/'+data.id_cellier+"/"+data.id_bouteille+"/"+data.id_achats+"/quantite/",httpOption);
    }

    /** PUT requête pour reduire la quantité de bouteilles avec le même id dans le cellier */
    deleteBouteillesCellierQuantiteAjoutee(data:IProduit):Observable<IListeProduit>{
        let httpOption = {
            headers : new HttpHeaders({
                'Content-type' : 'application/json',
                'Authorization' : 'Basic '+ btoa("biero:biero")
            })                                                                                               
        };                                                                                                                 
        return this.http.delete<IListeProduit>(this.url+'cellier/cellier/'+data.id_cellier+"/"+data.id_bouteille+"/"+data.id_achats+"/quantite/",httpOption);
    }

    /** GET requête pour afficher la bouteille */
    getBouteille(id:number|string):Observable<IProduit>{
        return this.http.get<IProduit>(this.url+'bouteille/'+id);
    }

}
