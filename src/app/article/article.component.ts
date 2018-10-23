import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServicesService } from "../services.service";
import { FormControl, FormGroup } from "@angular/forms";
import { TokenserviceService } from '../tokenservice.service';
@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  slug: string;
  article: any;
  date: string;
  articlefavorite: boolean;
  display: boolean;
  comments: any;
  currentUser: boolean;
  loginUserName: string;
  followuser: boolean;
  loggedIn:boolean;
  id:number;
  
  userInputs = new FormGroup({
    comment: new FormControl("")
  });

  constructor(private route: ActivatedRoute, private routes: Router, private getData: ServicesService, private tokenService: TokenserviceService) {

    this.route.params.subscribe(params => {
      this.slug = params.slug;
      
    });
  }

  ngOnInit() {
    this.id=-1;
    //console.log("ng on init called");
    this.getData.getArticle(this.slug).subscribe((data: any) => {
      this.article = data.article;
      this.date = new Date(this.article.createdAt).toDateString();
      //console.log("following")
      this.followuser = this.article.author.following;
      this.getData.getCurrentUser().subscribe((data: any) => {
        //console.log("loggedIn getting current user")
        this.loggedIn=true;
        this.loginUserName = data.user.username;
        //console.log("check name:"+this.article.author.username+" "+data.user.username)
        if (this.article.author.username == data.user.username) {
          //console.log("true called")
          this.currentUser = true;
        }


        this.getData.getUserFavoriteArticle(data.user.username).subscribe((data: any) => {
          for (let entry of data.articles) {
            if (entry.slug == this.article.slug) {
              this.articlefavorite = true;
            }
            //console.log(article.title); // 1, "string", false
          }
        })
      },
      err=>{
       this.loggedIn=false;
        // console.log(err);
      });
    });

    this.getData.getsubject().subscribe(data => {
      //console.log(data);
      if (data) {
        this.display = false;
        //console.log(true);
      } else {
        this.display = true;
      }
    });

    this.getData.getComments(this.slug).subscribe((data: any) => {
      // console.log(data);
      this.comments = data.comments;
    });
  }
  followUser(username) {
    console.log("follow clicked");
    if (this.tokenService.getToken()) {
      this.getData.followUser(username).subscribe((data: any) => {
        console.log(data);
        this.followuser = true;
      });
    }
    else {
      this.routes.navigate(['/login']);
    }
  }

  unfollowUser(username) {

    console.log("unfollow clicked");
    if (this.tokenService.getToken()) {

      this.getData.unfollowUser(username).subscribe((data: any) => {
        console.log(data);
        this.followuser = false;
      });
    }
    else {
      this.routes.navigate(['/login']);
    }
  }
  favorite(slug) {
    if (this.tokenService.getToken()) {

      this.getData.favouriteArticle(slug).subscribe((data: any) => {
        console.log(data);
        this.articlefavorite = true;
        this.article.favoritesCount += 1;
      })
    }
    else {
      this.routes.navigate(['/login']);
    }
  }


  unfavorite(slug) {
    if (this.tokenService.getToken()) {

      this.getData.unfavouriteArticle(slug).subscribe((data: any) => {
        console.log(data);
        this.articlefavorite = false;
        this.article.favoritesCount -= 1;
      })
    }
    else {
      this.routes.navigate(['/login']);
    }
  }

  edit(slug) {
    if (this.tokenService.getToken()) {

      this.routes.navigate([`/new-article/${slug}`])
    }
    else {
      this.routes.navigate(['/login']);
    }
  }




  delete(slug) {
    if (this.tokenService.getToken()) {

      this.getData.deleteArticle(slug).subscribe((data: any) => {

        console.log("comment deleted");
        console.log(data);
        this.routes.navigate(['']);
      });
    }
    else {
      this.routes.navigate(['/login']);

    }
  }


  catchid($e:any){
    //console.log($e.event)
    //console.log("emitted id:")
    
    this.getData.deletecomment(this.article.slug,$e.event.id).subscribe((data:any)=>{
      //console.log("delete data")
      //console.log(data)
      this.id=$e.event.id;
      this.routes.navigate([`article/${this.slug}`]);
      
      const index: number = this.comments.indexOf($e.event);
      if (index !== -1) {
        console.log("index:"+index)
          this.comments.splice(index, 1);
      }

    },
    err=>{
      console.log(err);
    })      
    
  }

  onSubmit() {
    this.getData
      .writeComment(this.slug, {
        comment: {
          body: this.userInputs.value.comment
        }
      })
      .subscribe((data: any) => {
        console.log("comment")
        console.log(data);
        this.comments.push(data.comment)
        this.routes.navigate([`article/${this.slug}`]);
      });

    console.log("form submit clicked:" + this.userInputs.value.comment);
  }
}
