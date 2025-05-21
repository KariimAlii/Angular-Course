import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsUsingPromiseComponent } from './pages/posts-using-promise/posts-using-promise.component';
import { ObservablesDemoComponent } from './pages/demo/observables-demo/observables-demo.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PostsUsingPromiseComponent,
    ObservablesDemoComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
