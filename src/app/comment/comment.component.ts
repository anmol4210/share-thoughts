import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { TokenserviceService } from '../tokenservice.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('review') comment:any;
  @Input('currentUser') currentUser:any;
  @Output() commentid=new EventEmitter();
  date:any;
  user:boolean;
  constructor(private tokenData:TokenserviceService) { }

  ngOnInit() {
  //    console.log("printing comment")
  //  console.log(this.comment)
  // console.log("comment current user");
  // console.log(this.currentUser);
  if(this.comment.author.username==this.tokenData.getusername()){
    this.user=true;
  }
  this.date=new Date(this.comment.createdAt).toDateString();  
}
delete(id){
  console.log("delete clicked:"+id)
  this.commentid.emit(`${id}`);
}


}
