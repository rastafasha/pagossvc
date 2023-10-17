import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';
import { PlanesService } from 'src/app/services/planes.service';
import { PaymentMethod } from 'src/app/models/paymentMethod';
import { PaymentMethodService } from 'src/app/services/paymentMethod.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paymentmethod-index',
  templateUrl: './paymentmethod-index.component.html',
  styleUrls: ['./paymentmethod-index.component.css']
})
export class PaymentmethodIndexComponent implements OnInit {

  title = "Tipos de Pago"
  tiposdepagos: PaymentMethod;
  user: User;
  p: number = 1;
  count: number = 8;
  error: string;
  msm_error: string;
  loading = false;

  constructor(
    private location: Location,
    private paymentMethodService: PaymentMethodService,
    handler: HttpBackend
  ) {
   }

  ngOnInit(): void {
    this.getPlanes();
    window.scrollTo(0,0);
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.paymentMethodService.getAll().subscribe(
      res =>{
        this.tiposdepagos = res;
        error => this.error = error
        // console.log(this.planes);
      }
    );
  }

  eliminarPlan(paymentMethod:PaymentMethod){
    

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
          this.paymentMethodService.delete(paymentMethod).subscribe(
            response =>{
              this.getPlanes();
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

  cambiarStatus(paymentMethod:PaymentMethod){
    this.paymentMethodService.updateStatus(paymentMethod).subscribe(
      resp =>{ console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.ngOnInit();
      }
    )
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
