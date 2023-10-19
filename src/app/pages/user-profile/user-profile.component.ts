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
  userdirectory: User;
  error: string;
  directories: Directorio;
  directory: Directorio;
  username: Directorio = null;
  payments: Payment = null;
  userpayments: Payment = null;
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
    this.userService.closeMenu();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserRemoto(id));
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

  }

  getUserRemoto(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.userprofile = res[0];
        this.userdirectory = res[0].directories[0];
        this.userpayments = res[0].payments;
        error => this.error = error;
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
