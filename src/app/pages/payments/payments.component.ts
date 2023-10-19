import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {


  title = "Pagos"

  payments: any;
  error:string;
  p: number = 1;
  count: number = 8;

  public user;
  query:string ='';



  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.userService.closeMenu();
    this.getPagos();
    window.scrollTo(0,0);
  }


  search() {
    return this.paymentService.search(this.query).subscribe(
      res=>{
        this.payments = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }


  getPagos(): void {
    this.paymentService.getAll().subscribe(
      res =>{
        this.payments = res;
        error => this.error = error
        // console.log(this.payments);
      }
    );
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
