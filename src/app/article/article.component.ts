import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ServicesService } from '../services.service';
import { FormControl,FormGroup } from '@angular/forms';
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
display:boolean;
comments:any;
currentUser:boolean;
userInputs = new FormGroup({
comment: new FormControl('')


});

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

    this.getData.getsubject().subscribe((data) => {
      console.log(data);
        if(data){
      //  console.log(data);
        this.display=false;
        console.log(true);
      }else{
        this.display=true;
      }
      
    
    });

    this.getData.getComments(this.slug).subscribe((data:any)=>{
      console.log(data);
      this.comments=data.comments;
    })
  }
  follow(){
    console.log("follow clicked")
  }
  articlePreference(articleSlug){
    console.log("article preference")
  }
  onSubmit(){

    this.getData.writeComment(this.slug,{
      comment: {
        body: this.userInputs.value.comment
      }
    }).subscribe((data:any)=>{console.log(data)});
   
    console.log("form submit clicked:"+this.userInputs.value.comment)
  }

}
