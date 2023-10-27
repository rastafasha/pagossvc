import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import { CartItemModel } from 'src/app/models/cart-item-model';
import { Currencies } from 'src/app/models/currencies';
import { Payment } from 'src/app/models/payment';
import { Plan } from 'src/app/models/plan';
import { User } from 'src/app/models/user';

import { CurrenciesService } from 'src/app/services/currencies.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { MessageService } from 'src/app/services/message.service';
import { PlanesService } from 'src/app/services/planes.service';

import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { PaymentMethod } from 'src/app/models/paymentMethod';
import { PaymentMethodService } from 'src/app/services/paymentMethod.service';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-reportar-pago',
  templateUrl: './reportar-pago.component.html',
  styleUrls: ['./reportar-pago.component.css']
})
export class ReportarPagoComponent implements OnInit {

  public PaymentRegisterForm: FormGroup;

  title= 'Realizar un Pago';


  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  Item: any[] = [];
  total= 0;

  public usuario;
  visible :boolean = false;

  metodo:string;
  error: string;
  pagoSeleccionado: Payment;
  pagoS: Payment;
  currenciesAll: Currencies;
  plan: Plan;

  uploadError: boolean;
  imagePath: string;

  paymentMethods: PaymentMethod;

  paymentSeleccionado:Payment;

  user:User;
  planes: Plan;

  public storage = environment.apiUrlMedia

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    method: 'POST',
    maxSize: '2',
    uploadAPI: {
      url: environment.apiUrl + '/payment/upload',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + this.accountService.headers

      },
      responseType: 'json',
    },
    theme: 'dragNDrop',
    selectFileBtn: 'Select Files',
    hideProgressBar: false,
    hideResetBtn: false,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Seleccionar imagen',
      resetBtn: 'Resetear',
      uploadBtn: 'Subir',
      dragNDropBox: 'Arrastre y suelte aquí',
      attachPinBtn: 'Seleccionar una imagen',
      afterUploadMsg_success: 'Se cargó correctamente el archivo !',
      afterUploadMsg_error: 'Se produjo un error al subir el archivo!',
      sizeLimit: 'Límite de tamaño 2 Megas'
    }
  };


  constructor(
    private fb: FormBuilder,
    private location: Location,
    private paymentService: PaymentService,
    private usuarioService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private storageService: StorageService,
    private planesService: PlanesService,
    private accountService: AccountService,
    private paymentMethodService: PaymentMethodService,
  ) {
    this.user = this.usuarioService.user;
  }


  ngOnInit(): void {
    window.scrollTo(0,0);
    this.visible= false;
    this.getCurrencies();
    this.getTiposdepagos();
    this.getPlanes();
    this.getUser();
    this.closeCart();
    this.validarFormulario();
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.total = this.getTotal();

  }

  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
  }


  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }


  getCurrencies(): void {
    this.currenciesService.getCurrencies().subscribe(
      res =>{
        this.currenciesAll = res;
        error => this.error = error
        // console.log(this.currenciesAll);
      }
    );
  }

  getPlanes(): void {
    // return this.planesService.carga_info();
    this.planesService.getPlanes().subscribe(
      res =>{
        this.planes = res;
        error => this.error = error
        // console.log(this.planes);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  validarFormulario(){
    this.PaymentRegisterForm = this.fb.group({
      id: [''],
      metodo: ['',Validators.required],
      bank_name: [''],
      monto: ['',Validators.required],
      currency_id: [''],
      referencia: [''],
      email: [''],
      nombre: [''],
      plan_id: [''],
      status: ['PENDING'],
      validacion: ['PENDING'],
      user_id: [''],
      fecha: [''],
      image: [''],
    })
  }



  get image() {
    return this.PaymentRegisterForm.get('image');
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.PaymentRegisterForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }


  updateForm(){

    const formData = new FormData();
    formData.append('metodo', this.PaymentRegisterForm.get('metodo').value);
    formData.append('bank_name', this.PaymentRegisterForm.get('bank_name').value);
    formData.append('monto', this.PaymentRegisterForm.get('monto').value);
    formData.append('currency_id', this.PaymentRegisterForm.get('currency_id').value);
    formData.append('referencia', this.PaymentRegisterForm.get('referencia').value);
    formData.append('nombre', this.PaymentRegisterForm.get('nombre').value);
    formData.append('email', this.PaymentRegisterForm.get('email').value);
    formData.append('plan_id', this.PaymentRegisterForm.get('plan_id').value);
    formData.append('fecha', this.PaymentRegisterForm.get('fecha').value);
    formData.append('status', 'PENDING');
    formData.append('validacion', 'PENDING');
    
    if(this.PaymentRegisterForm.value.image){
      formData.append('image', this.PaymentRegisterForm.get('image').value);
    }


    //crear
    const data = {
      ...this.PaymentRegisterForm.value,
      user_id: this.usuario.id
    }
    this.paymentService.create(data)
    .subscribe( (resp: any) =>{
      this.router.navigateByUrl(`/dashboard/historial-pagos`);
      this.pagoSeleccionado = resp;
      // console.log(this.pagoSeleccionado);
      this.emptyCart();
    })

  }


  closeCart(){
    var cartNotification = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<cartNotification.length; i++) {
        cartNotification[i].classList.remove("cart-modal--active");

      }
  }



  selectedTypeCoupon(value:any){
    this.metodo = value;
  }



  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }


  getTiposdepagos(): void {
    // return this.planesService.carga_info();
    this.paymentMethodService.getActivas().subscribe(
      res =>{
        this.paymentMethods = res;
        error => this.error = error
        // console.log(this.planes);
      }
    );
  }

}
