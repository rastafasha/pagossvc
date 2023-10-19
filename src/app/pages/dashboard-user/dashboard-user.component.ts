import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  title = 'Admin Usuario';
  public user: User =null;
  public userprofile: User =null;
  public userdirectory: User =null;

  error: string;

  id:any;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.userService.closeMenu();
    this.getUser();
    window.scrollTo(0,0);
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));

  }

  getUserProfile(id:any){
    id  = this.user.id
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        this.userdirectory = res[0].directories;
        error => this.error = error;
      }
    );
  }

}
