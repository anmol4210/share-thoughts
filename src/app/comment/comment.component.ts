import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('review') comment:any
  @Output() commentid=new EventEmitter();
  date:any;
  constructor() { }

  ngOnInit() {
    console.log("printing comment")
  console.log(this.comment)
  this.date=new Date(this.comment.createdAt).toDateString();  
}
delete(id){
  console.log("delete clicked:"+id)
  this.commentid.emit(`${id}`);
}


}
