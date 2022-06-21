import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class GardienConnexionGuard implements CanActivate {
  etatLogin:boolean = false;
  
  constructor(private authServ:AuthService, private router:Router){
    this.authServ.statut().subscribe((bLogin)=>{
      this.etatLogin = bLogin;
      if(this.etatLogin == false){
        this.router.navigate([""]);
      }
    })

  }
  


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let res: boolean = false;
      if(this.etatLogin){
        res = true;
      }
      return res;//this.authServ.getConnexion();
    
    //return false;
  }
  
}
