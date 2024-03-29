import { Component, OnInit, DoCheck } from '@angular/core';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.css']
})
export class ConfiguracionesComponent implements OnInit, DoCheck {

  title = "Configuraciones";
  error: string;

  user: User;

  constructor(
    private location: Location,
    private userService: UserService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.userService.closeMenu();
    window.scrollTo(0,0);
  }



  ngDoCheck(): void {
    this.user = this.userService.user;
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


}
