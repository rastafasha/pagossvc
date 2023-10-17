import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  payment: Payment;
  error: string;

  user:any = null;

  pagoSeleccionado: Payment;

  public paymentForm: FormGroup;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
    this.user = this.userService.user
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPayment(id));
    this.validarFormulario();
    this.getUser();
  }
  getUserPayment(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.payment = res;
        error => this.error = error
        // console.log(this.payment);
      }
    );
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  getPagoById(id:number){
    this.paymentService.getPagoById(+id).subscribe(
      res=>{
        this.payment = res;
      }
    )
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  validarFormulario(){
    this.paymentForm = this.fb.group({
      status: ['',Validators.required],
      validacion: ['',Validators.required],
      user_id: [''],
    })
  }

  cargarPayment(id: number){
    if (id !== null && id !== undefined) {
      this.paymentService.getPagoById(+id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res._id,
            status: res.status,
            validacion: res.validacion,
          });
          this.pagoSeleccionado = res;
          // console.log(this.pagoSeleccionado);
        }
      );
    }

  }

  get status() {
    return this.paymentForm.get('status');
  }
  get validacion() {
    return this.paymentForm.get('validacion');
  }

  updatePago(){

    const {status, validacion } = this.paymentForm.value;

    if(this.pagoSeleccionado){
      //actualizar
      const data = {
        ...this.paymentForm.value,
        user_id: this.pagoSeleccionado.user_id,
        id: this.pagoSeleccionado.id
      }
      this.paymentService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', ` actualizado correctamente`, 'success');
          this.ngOnInit();
        });

    }else{
      return;
    }

  }

  

}
