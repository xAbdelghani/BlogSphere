import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../service/comment.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent {

  postId = this.activatedRoute.snapshot.params['id'];
  post: any;
  comments: any;

  commentForm!: FormGroup;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  constructor(private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private commentService: CommentService) { }

  ngOnInit() {
    this.getPostById();

    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    })
  }

  publishComment() {
    if (this.commentForm.invalid) return;

    this.isSubmitting = true;
    const content = this.commentForm.get('content')?.value;

    this.commentService.createComment(this.postId, content).subscribe(res => {
      this.isSubmitting = false;
      this.matSnackBar.open("Comment Published Successfully", "Close", { duration: 3000, panelClass: 'success-snackbar' });
      this.commentForm.reset();
      this.getCommentsByPost();
    }, error => {
      this.isSubmitting = false;
      this.matSnackBar.open("Failed to publish comment", "Close", { duration: 5000, panelClass: 'error-snackbar' });
    })
  }

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(res => {
      this.comments = res;
    }, error => {
      this.matSnackBar.open("Failed to load comments", "Close", { duration: 5000, panelClass: 'error-snackbar' })
    })
  }

  getPostById() {
    this.isLoading = true;
    this.postService.getPostById(this.postId).subscribe(res => {
      this.isLoading = false;
      this.post = res;
      this.getCommentsByPost();
    }, error => {
      this.isLoading = false;
      this.matSnackBar.open("Failed to load post", "Close", { duration: 5000, panelClass: 'error-snackbar' })
    })
  }

  toggleLike() {
    this.postService.likePost(this.postId).subscribe({
      next: (response) => {
        this.post.likeCount = response.likeCount;
        this.post.liked = response.liked;
      },
      error: () => {
        this.matSnackBar.open("Something went wrong", "Ok");
      }
    });
  }

}
