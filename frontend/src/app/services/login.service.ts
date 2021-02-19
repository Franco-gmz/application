import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL:string = 'http://localhost:3000/api/users/login';

  constructor(private http:HttpClient) { }

  login(user:LoginRequest){
    return this.http.post(this.URL,user);
  }
}
