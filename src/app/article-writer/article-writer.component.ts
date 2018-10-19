import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-article-writer',
  templateUrl: './article-writer.component.html',
  styleUrls: ['./article-writer.component.css']
})
export class ArticleWriterComponent implements OnInit {
  username:string;
  user:any;
  isActive:boolean;
  articles:any;
  followuser:boolean;
  currentuser:boolean;
  constructor(private route:ActivatedRoute,private getData:ServicesService) { 
    this.route.params.subscribe(params =>{
      this.username=params.username;
      //console.log(this.username);
    });
  }

  ngOnInit() {
this.isActive=true;
  this.getData.getProfile(this.username).subscribe((data:any)=>{
    this.user=data.profile;
    console.log(data.profile);
    this.followuser=this.user.following;

    this.getData.getCurrentUser().subscribe((data:any)=>{
      if(data.user.username==this.username){
          this.currentuser=true;
      }
    })
  }),
  err=>{
    console.log(err);
  };

  this.myArticles();



  }
  myArticles(){
    this.getData.getUserArticles(this.username).subscribe((data:any)=>{
      this.articles=data.articles;
      console.log(data);
    });
  }
  favouriteArticles(){
    this.getData.getuserFavouriteArticles(this.username).subscribe((data:any)=>{
      this.articles=data.articles;
      console.log(data);
    })
  }

  follow(username) {
    console.log("follow clicked");
    this.getData.followUser(username).subscribe((data:any)=>{
      console.log(data);
      this.followuser=true;
    });
  }

  unfollow(username){

    console.log("unfollow clicked");
    this.getData.unfollowUser(username).subscribe((data:any)=>{
      console.log(data);
      this.followuser=false;
    })
  }

  editProfile(){
    console.log("edit profile clicked");
  }
}
