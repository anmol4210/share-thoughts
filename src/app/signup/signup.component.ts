import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ServicesService } from "../services.service";
import { TokenserviceService } from "../tokenservice.service";
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  user = new FormGroup({
    email: new FormControl(""),
    username: new FormControl(""),
    password: new FormControl("")
  });

  constructor(
    private getData: ServicesService,
    private tokenData: TokenserviceService,
    private route: Router,
    private active: ActivatedRoute
  ) {}

  ngOnInit() {}

  registerUser() {
    this.getData
      .registerUser({
        user: {
          username: this.user.value.username,
          email: this.user.value.email,
          password: this.user.value.password
        }
      })
      .subscribe(
        (data: any) => {
          // console.log(data);
          this.tokenData.saveToken(data.user.token);
          this.route.navigate(["/"]);
        },
        err => {
          console.log(err);
        }
      );
  }
}
