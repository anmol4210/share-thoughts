import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles:any;
  tags:any;
  constructor(private getData:ServicesService){}
  ngOnInit(){
    this.getData.getArticles()
    .subscribe((data:any)=>{
      this.articles=data.articles;
    });
    
    this.getData.getTags()
    .subscribe((data:any)=>{
      this.tags=data.tags;
   
    });
    

  }
}
