import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as Rx from "rxjs";

const subject = new Rx.ReplaySubject(2, 100);

const name= new Rx.ReplaySubject(2, 100);

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

url:string;
headerDict:any;
  
tokenVal=window.localStorage.getItem('token');
 headers=new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':'Token '+this.tokenVal
});
  options={headers:this.headers};
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

  getCurrentUser(){
   
      console.log("getting current user");
      return this.http.get(`${this.url}user`,this.options)
  }

  updateUser(user){
    if(user.user.password==''){
      
      delete user.user.password;
    }
    return this.http.put(`${this.url}user`,user,this.options);
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
   
//     let tokenVal=window.localStorage.getItem('token').trim();
//     let headers=new HttpHeaders({
//   'Content-Type': 'application/json',
//        'Authorization':'Token '+tokenVal
// });
// let options={headers:headers}
    
    return this.http.post(`${this.url}articles`,article,this.options);

  }
writeComment(slug,comment){
  return this.http.post(`${this.url}articles/${slug}/comments`,comment,this.options);
}
getComments(slug){
  return this.http.get(`${this.url}articles/${slug}/comments`,this.options);
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
