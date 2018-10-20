import { Component, OnInit ,Input} from '@angular/core';
import { ServicesService } from '../services.service';
import {TokenserviceService} from '../tokenservice.service'
import { ActivatedRoute,Router } from "@angular/router";
@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
@Input('task') article:any
date:string;  
articlefavorite:boolean;
count:number;
constructor(private getData:ServicesService, private tokenService:TokenserviceService,private routes:Router) { }

  ngOnInit() {
    //console.log(this.article)
    this.articlefavorite=this.article.favorited
   this.count=this.article.favoritesCount;
    this.date=new Date(this.article.createdAt).toDateString();
  }
  

  favouriteArticle(slug) {
    if(this.tokenService.getToken()){
    this.getData.favouriteArticle(slug).subscribe((data:any)=>{
      console.log(data);
      this.articlefavorite=true;
      this.count += 1;
    });
   
  }
  else{
    this.routes.navigate([`/login`])
  }

}


  unfavouriteArticle(slug) {
    if(this.tokenService.getToken()){
    this.getData.unfavouriteArticle(slug).subscribe((data:any)=>{
      console.log(data);
      this.articlefavorite=false;
      this.count -= 1;
    })
   
  }
  else{
    this.routes.navigate([`/login`])
  }


}
  
}
