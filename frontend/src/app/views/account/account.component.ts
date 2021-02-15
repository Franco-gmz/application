import { Component, OnInit } from '@angular/core';

declare const M:any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var el = document.querySelectorAll('.tabs');
    var instance = M.Tabs.init(el, {});
  }

}
