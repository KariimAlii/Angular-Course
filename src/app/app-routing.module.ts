import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {PostsUsingPromiseComponent} from './pages/posts-using-promise/posts-using-promise.component';
import {ObservablesDemoComponent} from './pages/demo/observables-demo/observables-demo.component';
import {CreatePostComponent} from './pages/create-post/create-post.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'posts/create', component: CreatePostComponent },
  { path: 'posts-promise', component: PostsUsingPromiseComponent },
  { path: 'observables-demo', component: ObservablesDemoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
