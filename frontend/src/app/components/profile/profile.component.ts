import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  name:string = '';
  surname:string = '';
  points:number = 0;
  purchases:number = 0;

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      (user:any) =>{
        this.name = user.name;
        this.surname = user.surname;
        this.points = user.points;
        this.purchases = user.purchases;
      },
      (err) => {
        console.log(err);
        this.router.navigateByUrl('cuenta');
      }
    );
  }

}
