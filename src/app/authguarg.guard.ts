import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenserviceService} from './tokenservice.service'
@Injectable({
  providedIn: 'root'
})
export class AuthguargGuard implements CanActivate {
  constructor(private service:TokenserviceService,private route:Router,private active:ActivatedRoute){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authenticate();
  }
  authenticate(){
    if(this.service.getToken()){
      return true
    }
    else{
      this.route.navigate(['/login']);
      return false
    }
  }
}
