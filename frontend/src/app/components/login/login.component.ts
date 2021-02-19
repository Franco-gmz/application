import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private loginService:LoginService,private router:Router) { 
    this.loginForm = new FormGroup({ email: new FormControl(''),password: new FormControl('')});
  }

  ngOnInit(): void {
    
  }

  login(){
    this.loginService.login(this.loginForm.value).subscribe(
      (res:any) => {
        localStorage.setItem('accessToken',res.token);
        this.router.navigateByUrl('profile');
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
