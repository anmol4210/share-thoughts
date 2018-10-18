import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('review') comment:any
  date:any;
  constructor() { }

  ngOnInit() {
    
  console.log(+this.comment)
  this.date=new Date(this.comment.createdAt).toDateString();  
}


}
