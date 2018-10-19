import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  tags=new Array<string>()
  editArticle:any;
  slug:string;
  article = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    taglist:new FormControl('')
  });
  constructor(private getData:ServicesService,private routes:ActivatedRoute,private route:Router) { }

  ngOnInit() {
    this.routes.params.subscribe(params =>{
      console.log("slug:"+params.slug)
      this.slug=params.slug;
      if(this.slug){
      this.getData.getArticle(params.slug).subscribe((data:any)=>{
        console.log(data)
        this.article.controls['title'].setValue(data.article.title);
        this.article.controls['description'].setValue(data.article.description);
        this.article.controls['body'].setValue(data.article.body);

      });
    }
      
  });
  }

  addTags(tag){
    this.tags.push(tag)
    console.log("tag:"+tag);
  }
  submitArticle(){
    console.log("submit called")
    if(this.slug){

      this.getData.updateArticle({
        article: {
          title: this.article.value.title,
          description: this.article.value.description,
          body: this.article.value.body,
          tagList: ["reactjs", "angularjs", "dragons"]
        }
      },this.slug).subscribe((data:any)=>{
        console.log(data);
      },
      err=>{
        console.log(err);
      });

    }
    else{
    this.getData.submitArticle({
      article: {
        title: this.article.value.title,
        description: this.article.value.description,
        body: this.article.value.body,
        tagList: ["reactjs", "angularjs", "dragons"]
      }
    }).subscribe((data:any)=>{
      console.log(data);
    },
    err=>{
      console.log(err);
    });
  }
  this.route.navigate(['']);
}

}
