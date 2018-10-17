import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as Rx from "rxjs";

const subject = new Rx.ReplaySubject(2, 100);

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
url:string;
headerDict:any;
  constructor(private http:HttpClient) { 
    this.url='https://conduit.productionready.io/api/';
  }

  updateSubject(){
    subject.next(window.localStorage.getItem('token'));
  }
  getsubject(){
    return subject;
  }

  verifyUser(user){
    return this.http.post(`${this.url}users/login`,user);
  }

  registerUser(user){
    
    return this.http.post(`${this.url}users/`,user);
  }

  getProfile(username){
    return this.http.get(`${this.url}/profiles/${username}`);
  }
  
  getArticles(){
    return this.http.get(`${this.url}articles`);
  }

  getArticle(slug){
    return this.http.get(`${this.url}articles/${slug}`);
  }

  submitArticle(article){
     this.headerDict= {
      'Content-Type': 'application/json',
      'token':window.localStorage.getItem('token')
    }
    
    return this.http.post(`${this.url}articles`,article,this.headerDict);
  }

  getTags(){
    return this.http.get(`${this.url}tags`);
  }
  getUserArticles(username){
    return this.http.get(`${this.url}articles?author=${username}`);
  }
  getuserFavouriteArticles(username){
    return this.http.get(`${this.url}articles?favorited=${username}`);
  
  }

  favouriteArticle(id){
    const headerDict = {
      'Content-Type': 'application/json',
      'token':window.localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new Headers(headerDict), 
    };
   // console.log("favourite article: "+id);
    return this.http.post(`${this.url}articles/${id}/favorite`,"",);
  }

  
}
