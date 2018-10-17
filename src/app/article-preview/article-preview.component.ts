import { Component, OnInit ,Input} from '@angular/core';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
@Input('task') article:any
date:string;  
constructor(private getData:ServicesService) { }

  ngOnInit() {
   // console.log(this.article)
   this.date=new Date(this.article.createdAt).toDateString();
  }
  favouriteArticle(id){
  this.getData.favouriteArticle(id);
  }

}
