import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-search-by-tags',
  templateUrl: './search-by-tags.component.html',
  styleUrls: ['./search-by-tags.component.scss']
})
export class SearchByTagsComponent {

  result: any = [];
  name: any = "";
  tags: string[] = [];

  constructor(private postService: PostService,
    private snackBar: MatSnackBar) { }


  searchByTags() {
    this.postService.searchByTags(this.tags).subscribe(res => {
      this.result = res;
      console.log(this.result);
    }, error => {
      this.snackBar.open("Something Went Wrong", "Ok")
    })
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

}
