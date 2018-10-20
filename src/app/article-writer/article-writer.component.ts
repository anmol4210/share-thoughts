import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { TokenserviceService } from '../tokenservice.service';
@Component({
  selector: 'app-article-writer',
  templateUrl: './article-writer.component.html',
  styleUrls: ['./article-writer.component.css']
})
export class ArticleWriterComponent implements OnInit {
  username: string;
  user: any;
  isActive: boolean;
  articles: any;
  followuser: boolean;
  currentuser: boolean;
  constructor(private routes: Router, private route: ActivatedRoute, private getData: ServicesService, private tokenService: TokenserviceService) {
    this.route.params.subscribe(params => {
      this.username = params.username;
      //console.log(this.username);
    });
  }

  ngOnInit() {
    this.isActive = true;
    this.getData.getProfile(this.username).subscribe((data: any) => {
      this.user = data.profile;
      console.log(data.profile);
      this.followuser = this.user.following;

      this.getData.getCurrentUser().subscribe((data: any) => {
        if (data.user.username == this.username) {
          this.currentuser = true;
        }
      })
    }),
      err => {
        console.log(err);
      };

    this.myArticles();



  }
  myArticles() {
    this.getData.getUserArticles(this.username).subscribe((data: any) => {
      this.articles = data.articles;
      console.log(data);
    });
  }
  favouriteArticles() {
    this.getData.getuserFavouriteArticles(this.username).subscribe((data: any) => {
      this.articles = data.articles;
      console.log(data);
    })
  }

  follow(username) {
    console.log("follow clicked");
    if (this.tokenService.getToken()) {
      this.getData.followUser(username).subscribe((data: any) => {
        console.log(data);
        this.followuser = true;
      });
    }
    else {
      this.routes.navigate(['/login'])
    }
  }

  unfollow(username) {

    console.log("unfollow clicked");
    if (this.tokenService.getToken()) {

      this.getData.unfollowUser(username).subscribe((data: any) => {
        console.log(data);
        this.followuser = false;
      });
    }
    else {
      this.routes.navigate(['/login'])
    }
  }

  editProfile() {
    console.log("edit profile clicked");
    this.routes.navigate(['/settings'])
  }
}
