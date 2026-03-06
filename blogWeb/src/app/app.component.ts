import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blogWeb';

  isUserLoggedIn: boolean = StorageService.isUserLoggedIn();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      this.isUserLoggedIn = StorageService.isUserLoggedIn();
    })
  }

  logout() {
    StorageService.signOut();
    this.router.navigateByUrl('/login');
  }

}
