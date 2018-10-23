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
  showpagenumbers:boolean;
  tabStyleActive:boolean;
 notag:boolean;
 tagname:string;
  constructor(private getData:ServicesService, private token:TokenserviceService){}
  ngOnInit(){
this.condition=true;
this.notag=true;
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
    //console.log("your feed called")
    this.tabStyleActive=false;
    this.getData.getfeedArticles().subscribe((data:any)=>{
      //console.log(data);
      this.notag=true;
      this.articles=data.articles;
    })
  }

  globalfeed(){
    //console.log("global feed called");
    this.tabStyleActive=true;
    this.showpagenumbers=true;
    this.getData.getArticles()
    .subscribe((data:any)=>{
      this.articles=data.articles;
      this.notag=true;
    });
    
  }
  filtertag(tag){
    //console.log("tag:"+tag);
    this.tagname="#"+tag;
    this.notag=false;
    this.getData.gettagArticles(tag)
    .subscribe((data:any)=>{
      this.articles=data.articles;
    });
  }

  nextPage(pageNumber){
    //console.log("pageNumber:"+pageNumber)
    this.getData.getCurrentPageArticles((pageNumber-1)*20).subscribe((data:any)=>{
      this.articles=data.articles;
    })
  }
}
