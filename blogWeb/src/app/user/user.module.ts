import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewAllComponent } from './pages/view-all/view-all.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { SearchByNameComponent } from './pages/search-by-name/search-by-name.component';
import { AngularMaterialModule } from '../AngularMaterialModule';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewMyPostsComponent } from './pages/view-my-posts/view-my-posts.component';
import { SearchByTagsComponent } from './pages/search-by-tags/search-by-tags.component';
import { SearchByCategoryComponent } from './pages/search-by-category/search-by-category.component';
import { MarkdownModule } from 'ngx-markdown';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    CreatePostComponent,
    ViewAllComponent,
    ViewPostComponent,
    SearchByNameComponent,
    ViewMyPostsComponent,
    SearchByTagsComponent,
    SearchByCategoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forChild(),
    MatTabsModule
  ]
})
export class UserModule { }
