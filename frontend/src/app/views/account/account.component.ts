import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

declare const M:any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {});
  }

  getUserData(){
    this.userService.getUserData();
  }

}
