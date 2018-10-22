import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TokenserviceService {
url:string;
  constructor(private http:HttpClient) {
    this.url='https://conduit.productionready.io/api/';
   }

   saveToken(token){
     window.localStorage.setItem('token',token);
   }

   getToken(){
    return window.localStorage.getItem('token');
   }

   saveusername(username){
     console.log("username:"+username)
     window.localStorage.setItem('username',username);
   }
   getusername(){
     return window.localStorage.getItem('username');
   }

}
