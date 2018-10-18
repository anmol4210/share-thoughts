import { Component, OnInit } from '@angular/core';
import { TokenserviceService } from '../tokenservice.service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
display:boolean;
subject:any;
user:any;

  constructor(private tokenData:TokenserviceService,private getData:ServicesService) { 
    this.display=true;
  }

  ngOnInit() {

    this.getData.getCurrentUser().subscribe((data:any)=>{
      console.log(data.user);
      this.user=data.user.username
    });

    this.getData.getsubject().subscribe((data) => {
    if(data){
    this.display=false;
  }else{
    this.display=true;
  }
  
});


  }

}
