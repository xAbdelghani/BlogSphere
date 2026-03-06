import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-search-by-name',
  templateUrl: './search-by-name.component.html',
  styleUrls: ['./search-by-name.component.scss']
})
export class SearchByNameComponent {

  result: any[] = [];
  name: string = "";
  isLoading: boolean = false;
  hasSearched: boolean = false;

  constructor(private postService: PostService,
    private snackBar: MatSnackBar) { }


  searchByName() {
    if (!this.name.trim()) return;
    this.isLoading = true;
    this.hasSearched = true;
    this.postService.searchByName(this.name).subscribe(res => {
      this.isLoading = false;
      this.result = res || [];
    }, error => {
      this.isLoading = false;
      this.snackBar.open("Search failed", "Close", { duration: 5000, panelClass: 'error-snackbar' });
    })
  }

}
