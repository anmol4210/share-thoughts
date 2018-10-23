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

  updateHeader(){
    
this.tokenVal=window.localStorage.getItem('token');
this.headers=new HttpHeaders({
   'Content-Type': 'application/json',
   'Authorization':'Token '+this.tokenVal
});
 this.options={headers:this.headers};

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
    if(window.localStorage.getItem('token')){
      return this.http.get(`${this.url}/profiles/${username}`,this.options);
 
    }
    else{
    return this.http.get(`${this.url}/profiles/${username}`);
    }
  }
  getfeedArticles(){
    return this.http.get(`${this.url}articles/feed`,this.options);
  }
  getArticles(){
    if(window.localStorage.getItem('token')){
    
    return this.http.get(`${this.url}articles`,this.options);
  }
  else{
    return this.http.get(`${this.url}articles`);
    
  }

}

  getArticle(slug){
    if(window.localStorage.getItem('token')){
     // console.log("with header called");
    return this.http.get(`${this.url}articles/${slug}`,this.options);
  }
    else{
      console.log("without header called")
      return this.http.get(`${this.url}articles/${slug}`);
    }
  }

  getUserFavoriteArticle(username){
    return this.http.get(`${this.url}articles/?favorited=${username}`);
    
  }

  getCurrentPageArticles(pagenumber){
    //?offset=pagenumber
    return this.http.get(`${this.url}articles/?offset=${pagenumber}`);
  }


  submitArticle(article){
   
    return this.http.post(`${this.url}articles`,article,this.options);

  }

  updateArticle(article,slug){
    return this.http.put(`${this.url}articles/${slug}`,article,this.options);

  }
  deleteArticle(slug){
  
    return this.http.delete(`${this.url}article/${slug}`,this.options);
  }

  writeComment(slug,comment){
  return this.http.post(`${this.url}articles/${slug}/comments`,comment,this.options);
}

getComments(slug){
  return this.http.get(`${this.url}articles/${slug}/comments`,this.options);
}
deletecomment(slug,id){
  ///api/articles/:slug/comments/:id
console.log("delete called")
  return this.http.delete(`${this.url}articles/${slug}/comments/${id}`,this.options);
  
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


  gettagArticles(tag){
    return this.http.get(`${this.url}articles/?tag=${tag}`);
  }

  favouriteArticle(slug){
    
    return this.http.post(`${this.url}articles/${slug}/favorite`,{},this.options);
  }

  unfavouriteArticle(slug){
    
    return this.http.delete(`${this.url}articles/${slug}/favorite`,this.options);
  }

  followUser(username){
    return this.http.post(`${this.url}profiles/${username}/follow`,{},this.options);
  }

  unfollowUser(username){
    return this.http.delete(`${this.url}profiles/${username}/follow`,this.options);
  }
  
}
