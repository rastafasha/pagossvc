import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

//activacion y uso de jquery, con la adaptacion del archivo main.js
declare var $:any;
declare function HOMEINIT([]):any;
// declare function customInitFunctions(); //llamammos a la funcion que carga los js
//activacion y uso de jquery


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  year = new Date().getFullYear();

  public user: User;
  id:number;


  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { 
    //activacion y uso de jquery
    setTimeout(()=>{
      // customInitFunctions();
      HOMEINIT($);
    },50);
    //activacion y uso de jquery
  }

  ngOnInit(): void {
    // this.getUser();
  }




}
