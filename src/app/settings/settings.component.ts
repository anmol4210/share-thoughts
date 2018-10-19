import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userDetails:any;

  updateduser = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl(''),
    password: new FormControl(''),
    url: new FormControl('')
  });

  constructor(private getData:ServicesService, private route:Router) { }

  ngOnInit() {
    

    this.getData.getCurrentUser().subscribe((data:any)=>{
     console.log("current user");
        console.log(data);
      this.userDetails=data.user
      this.updateduser.controls['username'].setValue(this.userDetails.username);
      this.updateduser.controls['email'].setValue(this.userDetails.email);
     
    });
  }

  updateUser(){
    
   this.getData.updateUser({
      user:{
        email: this.updateduser.value.email,
        bio: this.updateduser.value.bio,
        image: this.updateduser.value.image,
        username: this.updateduser.value.username,
        password: this.updateduser.value.password
      }
    }).subscribe(data=> {
      console.log(data)
    });
  }

  logout(){
    window.localStorage.removeItem("token");
    this.route.navigate(['']);
  }
}
