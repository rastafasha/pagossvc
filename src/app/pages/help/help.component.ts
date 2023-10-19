import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  title = "Ayuda | FAQ"
  constructor(
    private userService: UserService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.userService.closeMenu();
    window.scrollTo(0,0);
  }

  

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
