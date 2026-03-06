import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-view-my-posts',
  templateUrl: './view-my-posts.component.html',
  styleUrls: ['./view-my-posts.component.scss']
})
export class ViewMyPostsComponent {

  allPosts: any;

  constructor(private postService: PostService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getMyPosts();
  }

  getMyPosts() {
    this.postService.getMyPosts().subscribe(res => {
      console.log(res);
      this.allPosts = res;
    }, error => {
      this.snackBar.open("Something Went Wrong", "Ok")
    })
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe((res) => {
      this.snackBar.open('Post deleted successfully', 'Close', {
        duration: 5000
      });
      this.getMyPosts();
    }, error => {
      this.snackBar.open("Something Went Wrong", "Ok")
    })
  }

}

