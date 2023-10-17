import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year: number = new Date().getFullYear();
  public user: User;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.getUser();

  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));


  }
}
