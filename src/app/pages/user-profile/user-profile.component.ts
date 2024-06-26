import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { DirectorioService } from 'src/app/services/directorio.service';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  title = "Detalles de la cuenta";
  user: User;
  userprofile: User;
  error: string;
  directories: Directorio;
  directory: Directorio;
  payments: Payment;
  userpayment: Payment;
  userdirectories: Directorio;
  id:number;

  rolesSelected:number;

  p: number = 1;
  count: number = 8;

  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private alertService: AlertService,
    private directorioService: DirectorioService,

  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

  }

  getUserRemoto(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.userprofile = res[0];
        this.userpayment = res[0].payments;
        this.userdirectories = res[0].directories;
        error => this.error = error
        console.log(this.userprofile);
        console.log(this.userpayment);
        console.log(this.userdirectories);
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  updateUser(user: User){
    this.userService.update(user).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.enviarNotificacion();

      }
    )
  }

  enviarNotificacion(): void {
    this.alertService.success("Mensaje de Usuario","Usuario verificado, Nuevo Miembro!");
  }




}
