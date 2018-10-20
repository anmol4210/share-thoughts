import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { TokenserviceService } from '../tokenservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles:any;
  tags:any;
  loggedin:boolean;
  range = Array(50).fill(4)
  condition:boolean;
  constructor(private getData:ServicesService, private token:TokenserviceService){}
  ngOnInit(){
this.condition=true;
    // this.getData.getCurrentUser
    // this.getData.getArticles()
    // .subscribe((data:any)=>{
    //   this.articles=data.articles;
    // });
    if(this.token.getToken()){
      this.loggedin=true;
      this.yourfeed();
      
    }
    else{
      this.globalfeed();
    }

    this.getData.getTags()
    .subscribe((data:any)=>{
      this.tags=data.tags;
   
    });
    

  }

  yourfeed(){
    console.log("your feed called")
    this.getData.getfeedArticles().subscribe((data:any)=>{
      //console.log(data);
      this.articles=data.articles;
    })
  }

  globalfeed(){
    console.log("global feed called");
    this.getData.getArticles()
    .subscribe((data:any)=>{
      this.articles=data.articles;
    });
    
  }
  filtertag(tag){
    console.log("tag:"+tag);
    this.getData.gettagArticles(tag)
    .subscribe((data:any)=>{
      this.articles=data.articles;
    });
  }
}
