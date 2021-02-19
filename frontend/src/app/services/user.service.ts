import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL:string = 'http://localhost:3000/api/users/user';

  constructor(private http:HttpClient) { }

  getUserData(){
    let accessToken = localStorage.getItem('accessToken');
    let headers = new HttpHeaders({
      Authorization:'Bearer '+ accessToken
    });
  
    return this.http.get(this.URL,{headers:headers});
  }
}
