import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
slug:string;
article:any;
date:string;
preference:string;
  constructor(private route:ActivatedRoute,private getData:ServicesService) {
    this.preference="Favourite";
    this.route.params.subscribe(params =>{
      this.slug=params.slug;
    });
   }

  ngOnInit() {
    ///api/articles/:slug
    console.log(this.slug);
    this.getData.getArticle(this.slug).subscribe((data:any)=>{
      this.article=data.article;
      this.date=new Date(this.article.createdAt).toDateString();
      console.log(this.article);
   
    });
  }
  follow(){
    console.log("follow clicked")
  }
  articlePreference(articleSlug){
    console.log("article preference")
  }

}
