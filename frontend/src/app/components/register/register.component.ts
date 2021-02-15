import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor() {
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

  register(){}
}
