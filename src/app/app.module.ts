import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ArticleComponent } from './article/article.component';
import { ArticleWriterComponent } from './article-writer/article-writer.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AuthguargGuard} from './authguarg.guard'

import {FormsModule} from '@angular/forms';
import { NewArticleComponent } from './new-article/new-article.component';
import { SettingsComponent } from './settings/settings.component';
import { CommentComponent } from './comment/comment.component';

//import { from } from 'rxjs';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  
  {
      path: 'home',
      component: HomeComponent
  },
    
  {
      path: 'login',
      component: LoginComponent
  },
    
  {
      path: 'signup',
      component: SignupComponent
  },
  
  {
      path: 'article/:slug',
      component: ArticleComponent
  },
    
  {
      path: 'article-writer/:username',
      component: ArticleWriterComponent
  },
    
  {
      path: 'new-article',
      component: NewArticleComponent
  },
    {
    path: 'new-article/:slug',
    component: NewArticleComponent
    },
    
    {
          path: 'settings',
          canActivate:[AuthguargGuard],
          component: SettingsComponent
        }
  
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticlePreviewComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ArticleComponent,
    ArticleWriterComponent,
    NewArticleComponent,
    SettingsComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
