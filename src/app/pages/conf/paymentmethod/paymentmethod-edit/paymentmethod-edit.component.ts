import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';

import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Paymentmethod } from 'src/app/models/paymentmethod';
import { PaimentmethodService } from 'src/app/services/paimentmethod.service';
import { Currencies } from 'src/app/models/currencies';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-paymentmethod-edit',
  templateUrl: './paymentmethod-edit.component.html',
  styleUrls: ['./paymentmethod-edit.component.css']
})
export class PaymentmethodEditComponent implements OnInit {

  title : string;

  public paymentmethodForm: FormGroup;
  public paymentmethod: Paymentmethod;
  public usuario: User;
  paymentmethods: Paymentmethod;
  error: string;

  idpaymentmethod:any;
  public currenciesAll: Currencies;

  public paymentmethodSeleccionado: Paymentmethod;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private _paymentmethodService: PaimentmethodService,
    private currenciesService: CurrenciesService,
  ) {
    this.usuario = usuarioService.user;
    const base_url = environment.apiUrl;
  }

  ngOnInit(): void {
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPaymentmethod(id));
    window.scrollTo(0,0);
  }

  cargarPaymentmethod(id: number){
    if (id !== null && id !== undefined) {
      this.title = 'Editando Tipo de Pago';
      this._paymentmethodService.getPaymentmethod(+id).subscribe(
        (res:any) => {
          this.paymentmethodForm.patchValue({
            id: res.id,
            name: res.name,
            bankAccount: res.bankAccount,
            bankAccountType: res.bankAccountType,
            bankName: res.bankName,
            status: res.status,
            type: res.type,
            
          });
          this.paymentmethodSeleccionado = res;
          console.log(this.paymentmethodSeleccionado);
        }
      );
    } else {
      this.title = 'Creando Tipo de Pago';
    }

  }

  validarFormulario(){
    this.paymentmethodForm = this.fb.group({
      id: [''],
      name: ['',Validators.required],
      type: ['',Validators.required],
      bankName: ['',Validators.required],
      bankAccountType: ['',Validators.required],
      bankAccount: ['',Validators.required],
      status: [''],
      telefono: [''],
    })
  }

  get name() {
    return this.paymentmethodForm.get('name');
  }
  get type() {
    return this.paymentmethodForm.get('type');
  }
  get bankAccountType() {
    return this.paymentmethodForm.get('bankAccountType');
  }
  get bankName() {
    return this.paymentmethodForm.get('bankName');
  }
  get bankAccount() {
    return this.paymentmethodForm.get('bankAccount');
  }
  get status() {
    return this.paymentmethodForm.get('status');
  }
  get telefono() {
    return this.paymentmethodForm.get('telefono');
  }



  updatePaymentmethod(){

    const formData = new FormData();
    formData.append('name', this.paymentmethodForm.get('name').value);
    formData.append('type', this.paymentmethodForm.get('type').value);
    formData.append('bankName', this.paymentmethodForm.get('bankName').value);
    formData.append('bankAccountType', this.paymentmethodForm.get('bankAccountType').value);
    formData.append('bankAccount', this.paymentmethodForm.get('bankAccount').value);
    formData.append('status', this.paymentmethodForm.get('status').value);
    formData.append('telefono', this.paymentmethodForm.get('telefono').value);

    const id = this.paymentmethodForm.get('id').value;

    if(id){
      //actualizar
      const data = {
        ...this.paymentmethodForm.value,
        id: this.paymentmethodSeleccionado.id
      }
      this._paymentmethodService.updatePaymentmethod(data, +id).subscribe(
        resp =>{
          Swal.fire('Actualizado', `Actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/paymentmethods`);
          console.log(this.paymentmethodSeleccionado);
        });

    }else{
      //crear
      this._paymentmethodService.createPaymentmethod(this.paymentmethodForm.value)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', `Creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/paymentmethods`);
        // this.enviarNotificacion();
      })
    }

  }

  // enviarNotificacion(): void {
  //   this.alertService.success("Mensaje de Monedas","Se ha creado una nueva moneda!");
  // }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
