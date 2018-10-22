import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import { TokenserviceService } from '../tokenservice.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  login = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private getData:ServicesService, private tokenData:TokenserviceService,
              private route:Router,private active:ActivatedRoute) { }

  ngOnInit() {
  }
  authenticateUser(){

    
    this.getData.verifyUser({
      user:{
        email:this.login.value.email,
        password:this.login.value.password
      }
    }).subscribe((data:any)=>{
      console.log(data);
    this.tokenData.saveToken(data.user.token);
    this.tokenData.saveusername(data.user.username);
      this.getData.updateHeader();
     this.getData.updateSubject();
    //this.getData.updateSubjectName();
    this.route.navigate(['']);
    
  },
    err=>{
      console.log(err);
    });
    
      

  }
}
