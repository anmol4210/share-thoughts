import { Component, OnInit } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import { ServicesService } from "../services.service";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  slug: string;
  article: any;
  date: string;
  articlefavorite:boolean;
  display: boolean;
  comments: any;
  currentUser: boolean;
  loginUserName:string;
  followuser:boolean;
  userInputs = new FormGroup({
    comment: new FormControl("")
  });

  constructor(private route: ActivatedRoute,private routes:Router, private getData: ServicesService) {
   
    this.route.params.subscribe(params => {
      this.slug = params.slug;
    });
  }

  ngOnInit() {
    this.getData.getArticle(this.slug).subscribe((data: any) => {
      this.article = data.article;
      this.date = new Date(this.article.createdAt).toDateString();
      //console.log("following")
      this.followuser=this.article.author.following;
      this.getData.getCurrentUser().subscribe((data: any) => {
        this.loginUserName=data.user.username;
//console.log("check name:"+this.article.author.username+" "+data.user.username)
        if (this.article.author.username == data.user.username) {
          console.log("true called")
          this.currentUser = true;
        }


        this.getData.getUserFavoriteArticle(data.user.username).subscribe((data:any)=>{
          for (let entry of data.articles) {
            if(entry.slug==this.article.slug){
              this.articlefavorite=true;
            }
            //console.log(article.title); // 1, "string", false
        }
        })
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
    this.getData.followUser(username).subscribe((data:any)=>{
      console.log(data);
      this.followuser=true;
    });
  }

  unfollowUser(username){

    console.log("unfollow clicked");
    this.getData.unfollowUser(username).subscribe((data:any)=>{
      console.log(data);
      this.followuser=false;
    })
  }
  favorite(slug) {
    this.getData.favouriteArticle(slug).subscribe((data:any)=>{
      console.log(data);
      this.articlefavorite=true;
      this.article.favoritesCount += 1;
    })
   
  }


  unfavorite(slug) {
    this.getData.unfavouriteArticle(slug).subscribe((data:any)=>{
      console.log(data);
      this.articlefavorite=false;
      this.article.favoritesCount -= 1;
    })
   
  }

  edit(slug){
    this.routes.navigate([`/new-article/${slug}`])
  }


  
  
  delete(slug){
    this.getData.deleteArticle(slug).subscribe((data:any)=>{
      this.routes.navigate(['']);
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
        console.log(data);
      });

    console.log("form submit clicked:" + this.userInputs.value.comment);
  }
}
