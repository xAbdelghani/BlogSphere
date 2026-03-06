import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent {

  allPosts: any[] = [];
  isLoading: boolean = true;

  constructor(private postService: PostService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.isLoading = true;
    this.postService.getAllPosts().subscribe(
      res => {
        this.isLoading = false;
        this.allPosts = res || [];
      },
      error => {
        this.isLoading = false;
        this.snackBar.open("Failed to load posts", "Close", { duration: 5000, panelClass: 'error-snackbar' });
      }
    )
  }

}
