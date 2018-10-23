import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from '../services.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userDetails: any;
  errorarr=[];
  updateduser = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl(''),
    password: new FormControl(''),
    url: new FormControl('')
  });

  constructor(private getData: ServicesService, private route: Router) { }

  ngOnInit() {


    this.getData.getCurrentUser().subscribe((data: any) => {
     // console.log("current user");
      //console.log(data);
      this.userDetails = data.user
      this.updateduser.controls['username'].setValue(this.userDetails.username);
      this.updateduser.controls['email'].setValue(this.userDetails.email);

    });
  }

  updateUser() {

    this.getData.updateUser({
      user: {
        email: this.updateduser.value.email,
        bio: this.updateduser.value.bio,
        image: this.updateduser.value.image,
        username: this.updateduser.value.username,
        password: this.updateduser.value.password
      }
    }).subscribe(data => {

     // console.log(data)
      this.getData.updateSubject();
      this.route.navigate(['']);
    },
    err =>{
      const errors = err.error.errors;
      for(var key in errors){
        const msgs = errors[key];
        // cons
        if(errors.hasOwnProperty(key)){
          for(let i=0;i<msgs.length;i++){
            this.errorarr.push(`${key} : ${msgs[i]}`);
          }
        }
      }
    }
);
  }

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    this.getData.updateSubject();
    this.route.navigate(['']);
  }
}
