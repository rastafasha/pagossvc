import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';
import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { environment } from 'src/environments/environment';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PaymentMethod } from 'src/app/models/paymentMethod';
import { PaymentMethodService } from 'src/app/services/paymentMethod.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-paymentmethod-edit',
  templateUrl: './paymentmethod-edit.component.html',
  styleUrls: ['./paymentmethod-edit.component.css']
})
export class PaymentmethodEditComponent implements OnInit {

  public planForm: FormGroup;

  public tiposdepago: PaymentMethod;

  public imgSelect : String | ArrayBuffer;
  public currenciesAll: Currencies;

  title: string;

  public planSeleccionado: PaymentMethod = null;

  imagePath: string;
  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentMethodService: PaymentMethodService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private userService: UserService,
    ) {
     }

  ngOnInit(): void {
    this.getCurrencies();
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }

  

  getplan(id:number){
    if (id !== null && id !== undefined) {
      this.title = 'Editando tipo de pago';
      this.paymentMethodService.getPagoById(+id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            sandboxMode: res.sandboxMode,
            paypalSecret: res.paypalSecret,
            clientId: res.clientId,
            ciorif: res.ciorif,
            telefono: res.telefono,
            bankAccount: res.bankAccount,
            bankName: res.bankName,
            bankAccountType: res.bankAccountType,
            email: res.email,
            user: res.user,
            type: res.type,
          });
          this.planSeleccionado = res;
          console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando plan';
    }
  }

  validarFormulario(){
    this.planForm = this.fb.group({
      id: [''],
      sandboxMode: [''],
      paypalSecret: [''],
      clientId: [''],
      bankAccount: [''],
      ciorif: [''],
      telefono: [''],
      bankName: [''],
      bankAccountType: [''],
      email: [''],
      user: [''],
      type: [''],
    })
  }
  get sandboxMode() {
    return this.planForm.get('sandboxMode');
  }

  get paypalSecret() {
    return this.planForm.get('paypalSecret');
  }
  get clientId() {
    return this.planForm.get('clientId');
  }

  get bankAccount() {
    return this.planForm.get('bankAccount');
  }
  get bankName() {
    return this.planForm.get('bankName');
  }
  get bankAccountType() {
    return this.planForm.get('bankAccountType');
  }
  get email() {
    return this.planForm.get('email');
  }
  get user() {
    return this.planForm.get('user');
  }
  get type() {
    return this.planForm.get('type');
  }
  get ciorif() {
    return this.planForm.get('ciorif');
  }
  get telefono() {
    return this.planForm.get('telefono');
  }

  editPlan(){debugger

    const formData = new FormData();
    formData.append('sandboxMode', this.planForm.get('sandboxMode').value);
    formData.append('paypalSecret', this.planForm.get('paypalSecret').value);
    formData.append('clientId', this.planForm.get('clientId').value);
    formData.append('bankAccount', this.planForm.get('bankAccount').value);
    formData.append('bankName', this.planForm.get('bankName').value);
    formData.append('bankAccountType', this.planForm.get('bankAccountType').value);
    formData.append('email', this.planForm.get('email').value);
    formData.append('ciorif', this.planForm.get('ciorif').value);
    formData.append('telefono', this.planForm.get('telefono').value);
    formData.append('user', this.planForm.get('user').value);
    formData.append('type', this.planForm.get('type').value);
    const id = this.planForm.get('id').value;
    if(id){
      //actualizar

      const data = {
        ...this.planForm.value,
        id:this.planSeleccionado.id
      }

      this.paymentMethodService.update(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', `actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/paymentmethods`);
          // console.log(this.planSeleccionado);
        });

    }else{
      //crear
      const data = {
        ...this.planForm.value,
      }
      this.paymentMethodService.create(data)
      .subscribe( (resp: any) =>{
        Swal.fire('Creado', ` creado correctamente`, 'success');
        this.router.navigateByUrl(`/dashboard/paymentmethods`);
        // this.enviarNotificacion();
      })
    }
    return false;
  }





  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }


  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
      }
    );
  }


}
