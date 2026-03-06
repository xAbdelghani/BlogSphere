import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/auth/services/storage/storage.service';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createNewPost(data: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/posts`, data, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getAllPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getMyPosts(): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/my`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + `api/posts/${id}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/${postId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  likePost(postId: number): Observable<any> {
    return this.http.put(BASIC_URL + `api/posts/${postId}/like`, {}, {
      headers: this.createAuthorizationHeader(),
    });
  }

  searchByName(name: string): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/search/${name}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  searchByTags(tags: any): Observable<any> {
    return this.http.post(BASIC_URL + `api/posts/searchByTags`, tags, {
      headers: this.createAuthorizationHeader(),
    });
  }

  searchPostByCategory(categoryId: number): Observable<any> {
    return this.http.get(BASIC_URL + `api/posts/searchByCategory/${categoryId}`, {
      headers: this.createAuthorizationHeader(),
    });
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization', 'Bearer ' + StorageService.getToken()
    )
  }

}
