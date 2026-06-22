import { Component, OnInit } from '@angular/core';
import { HttpBackend } from '@angular/common/http';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';

import { Paymentmethod } from 'src/app/models/paymentmethod';
import { PaimentmethodService } from 'src/app/services/paimentmethod.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-paymentmethod-index',
  templateUrl: './paymentmethod-index.component.html',
  styleUrls: ['./paymentmethod-index.component.css']
})
export class PaymentmethodIndexComponent implements OnInit {

  title = "Tipos de Pago"
  tiposdepagos: Paymentmethod;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private _paymentmethodService: PaimentmethodService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPaymentmethods();
    window.scrollTo(0,0);
  }

  getPaymentmethods(): void {
    // return this.planesService.carga_info();
    this._paymentmethodService.getPaymentmethods().subscribe(
      res =>{
        this.tiposdepagos = res;
        error => this.error = error
        console.log(this.tiposdepagos);
      }
    );
  }

  eliminarPaymentmethod(paymentmethod:Paymentmethod){
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No podras recuperarlo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._paymentmethodService.deletePaymentmethod(paymentmethod).subscribe(
          response =>{
            this.getPaymentmethods();
          }
          );
        Swal.fire(
          'Borrado!',
          'El Archivo fue borrado.',
          'success'
        )
        this.ngOnInit();
      }
    });
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
