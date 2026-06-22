import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  public payment: Payment;
  public paymentuser: Payment;
  error: string;

  public paymentForm: FormGroup;
  public paymentSeleccionado: Payment;
  public usuario: User;
  public user: any;
  public payment_id: number;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      this.payment_id = resp.id;
     })
     this.getPagoById(this.payment_id);

    // this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));

    this.validarFormulario();
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  
 

  getPagoById(payment_id:number){
    this.paymentService.getPagoById(payment_id).subscribe(
      (res:any)=>{
        this.paymentuser = res;
        // console.log(this.paymentuser);
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


  updatePago(){

    const {
      status, 
      validacion 
    } = this.paymentForm.value;

    const data = {
      ...this.paymentForm.value,
      user_id: this.user.id,
      // payment: this.paymentSeleccionado,
      id: this.payment_id
    }
    this.paymentService.update(data).subscribe(
      (resp:any) =>{
        Swal.fire('Actualizado', ` actualizado correctamente`, 'success');
        console.log(resp);
        this.router.navigateByUrl(`/dashboard/payments`);
      });

    }

}
