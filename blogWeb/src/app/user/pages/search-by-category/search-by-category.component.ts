import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';
import { CategoryService } from '../../service/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-by-category',
  templateUrl: './search-by-category.component.html',
  styleUrls: ['./search-by-category.component.scss']
})
export class SearchByCategoryComponent {

  result: any = [];
  id: number;
  listOfCategories: any = [];
  searchForm!: FormGroup;

  constructor(private postService: PostService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {
    this.getAllCategories();
    this.searchForm = this.fb.group({
      categoryId: [null, [Validators.required]],
    })
  }

  searchPostByCategory() {
    this.postService.searchPostByCategory(this.searchForm.get("categoryId")!.value).subscribe(res => {
      this.result = res;
      console.log(this.result);
    }, error => {
      this.snackBar.open("Something Went Wrong", "Ok")
    })
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(res => {
      this.listOfCategories = res;
    })
  }

}
