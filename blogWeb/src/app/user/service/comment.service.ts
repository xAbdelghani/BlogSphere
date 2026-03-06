import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  createComment(postId: number, content: string): Observable<any> {
    return this.http.post<any>(BASIC_URL + `api/comments/create/${postId}`, content, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllCommentsByPost(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/comments/${postId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
