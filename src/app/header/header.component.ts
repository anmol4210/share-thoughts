import { Component, OnInit } from '@angular/core';
import { TokenserviceService } from '../tokenservice.service';
import { ServicesService } from '../services.service';
import * as Rx from "rxjs";

// const subject = new Rx.ReplaySubject(2, 100);

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
display:boolean;
subject:any;

// subscriber 1

  constructor(private tokenData:TokenserviceService,private getData:ServicesService) { 
    this.display=true;
  }

  ngOnInit() {
  this.getData.getsubject().subscribe((data) => {
  console.log(data);
    if(data){
  //  console.log(data);
    this.display=false;
    console.log(true);
  }else{
    this.display=true;
  }
  //console.log('Subscriber A:', data);

});

// setInterval(() => {
//   subject.next(this.tokenData.getToken()), 200
// });

  
   // this.display=false;
  }

}
