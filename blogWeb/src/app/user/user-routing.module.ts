import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { ViewMyPostsComponent } from './pages/view-my-posts/view-my-posts.component';
import { SearchByTagsComponent } from './pages/search-by-tags/search-by-tags.component';
import { SearchByCategoryComponent } from './pages/search-by-category/search-by-category.component';

const routes: Routes = [
  { path: 'create-post', component: CreatePostComponent },
  { path: 'view-all', component: ViewAllComponent },
  { path: 'search-by-name', component: SearchByNameComponent },
  { path: 'search-by-tags', component: SearchByTagsComponent },
  { path: 'search-by-category', component: SearchByCategoryComponent },
  { path: 'view-post/:id', component: ViewPostComponent },
  { path: 'view-my-posts', component: ViewMyPostsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
