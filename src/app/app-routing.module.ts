import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from './pages/posts/posts.component';
import {PostsUsingPromiseComponent} from './pages/posts-using-promise/posts-using-promise.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'posts-promise', component: PostsUsingPromiseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
