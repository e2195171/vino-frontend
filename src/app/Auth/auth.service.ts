import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../iuser';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:string = "http://127.0.0.1:8000/webservice/php/usager/";

  etatConnexion:boolean = false;

  estConnecte:BehaviorSubject<boolean>;
  estConnecte$:Observable<boolean>;
  
  titrePage:BehaviorSubject<string>;
  titrePage$:Observable<string>;
  
  constructor(private http:HttpClient) {
    this.estConnecte = new BehaviorSubject<boolean>(false);
    this.estConnecte$ = this.estConnecte.asObservable();

    this.titrePage = new BehaviorSubject<string>("");
    this.titrePage$ = this.titrePage.asObservable();

    if(sessionStorage.getItem("estConnecte") === "true"){
      this.estConnecte.next(true);
    }
  }
  

  statut():Observable<boolean>{
    return this.estConnecte;
  }

//   /** GET requête pour afficher les bouteilles du cellier */
//   getLoggedUser():Observable<IUser>{
//     return this.http.get<IUser>(this.url);
// }

  setConnexion(etatConnexion:boolean):void {
      this.etatConnexion = etatConnexion;
              
      sessionStorage.setItem("estConnecte", this.etatConnexion.toString());
      
      console.log(sessionStorage);
      this.estConnecte.next(etatConnexion);
  }

  getConnexion():boolean {
    return this.etatConnexion;
  }

  setTitre(titre:string):void{
    this.titrePage.next(titre);
  }

  getTitre():Observable<string>{
    return this.titrePage;
  }

}
