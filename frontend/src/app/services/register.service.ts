import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private URL:string = 'http://localhost:3000/api/users/register';

  constructor(private http:HttpClient) { }

  register(user:RegisterRequest){
    return this.http.post(this.URL,user,{responseType: 'json' });
  }
}
