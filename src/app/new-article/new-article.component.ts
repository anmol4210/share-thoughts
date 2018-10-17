import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {
  article = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl('')
  });
  constructor(private getData:ServicesService) { }

  ngOnInit() {
  }
  submitArticle(){
    this.getData.submitArticle({
      "article": {
        "title": this.article.value.title,
        "description": this.article.value.description,
        "body": this.article.value.body,
        "tagList": ["reactjs", "angularjs", "dragons"]
      }
    });
  }

}
