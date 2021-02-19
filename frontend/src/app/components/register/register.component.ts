import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private registerService:RegisterService, private router:Router) {
    this.registerForm = new FormGroup({
      name : new FormControl(''),
      surname : new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  register(){
    this.registerService.register(this.registerForm.value).subscribe(
      (res:any) => {
        localStorage.setItem('accessToken',res.token);
        this.router.navigateByUrl('profile');
      },
      (err) => console.log(err.error.message)
    )
    
  }
}
