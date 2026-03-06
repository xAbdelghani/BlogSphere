import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PostService } from '../../service/post.service';
import { CategoryService } from '../../service/category.service';
import * as EasyMDE from 'easymde';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements AfterViewInit, OnDestroy {

  postForm!: FormGroup;
  tags: string[] = [];
  listOfCategories: any[] = [];
  isSubmitting: boolean = false;
  private easyMDE!: EasyMDE;

  constructor(private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private postService: PostService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
      categoryId: [null, [Validators.required]],
    });
    this.getAllCategories();
  }

  ngAfterViewInit() {
    this.easyMDE = new EasyMDE({
      element: document.getElementById('easymde-editor') as HTMLTextAreaElement,
      placeholder: 'Write your amazing article using Markdown...',
      spellChecker: false,
      autofocus: false,
      status: ['lines', 'words'],
      toolbar: [
        'bold', 'italic', 'strikethrough', '|',
        'heading-1', 'heading-2', 'heading-3', '|',
        'quote', 'unordered-list', 'ordered-list', '|',
        'link', 'image', 'code', 'table', '|',
        'preview', 'side-by-side', 'fullscreen', '|',
        'guide'
      ],
      previewClass: ['editor-preview', 'markdown-body'],
      minHeight: '320px',
    });

    // Sync EasyMDE changes to the reactive form
    this.easyMDE.codemirror.on('change', () => {
      this.postForm.get('content')?.setValue(this.easyMDE.value());
    });
  }

  ngOnDestroy() {
    if (this.easyMDE) {
      this.easyMDE.toTextArea();
      this.easyMDE = null!;
    }
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    });
  }

  add(event: any) {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: any) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createPost() {
    if (this.postForm.invalid) return;

    this.isSubmitting = true;
    const data = this.postForm.value;
    data.tags = this.tags;

    this.postService.createNewPost(data).subscribe(res => {
      this.isSubmitting = false;
      this.snackBar.open('Post Created Successfully', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
      this.router.navigateByUrl('/user/view-all');
    }, error => {
      this.isSubmitting = false;
      this.snackBar.open('Failed to create post', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
    });
  }
}
