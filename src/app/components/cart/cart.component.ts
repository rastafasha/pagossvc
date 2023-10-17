import { Component, OnInit, Input } from '@angular/core';

import { CartItemModel } from '../../models/cart-item-model';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
//pluggins
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from "ngx-spinner";

import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { AlertService } from 'src/app/services/alert.service';
import { PaymentService } from 'src/app/services/payment.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  @Input() cartItem: CartItemModel;

  cartItems=[];
  total= 0;
  value: string;
  id:number;

  product:Plan;

  public payPalConfig ? : IPayPalConfig;



  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private router: Router,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private alertService: AlertService,

    ) {

    }

  ngOnInit(): void {
    this.initConfig();//paypal
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }


  private initConfig(): void {

    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientId,
      // clientId: 'sb',
      createOrderOnClient: (data) => < ICreateOrderRequest > <unknown>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.getTotal().toString(),
              }
            }
          },
          items: this.getItemsList(),
        }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
          this.spinner.show();
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details: any) => {
              console.log('onApprove - you can get full order details inside onApprove: ', details);
              data.orderID
          });

      },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
            JSON.stringify(data));
            this.openModal(
              data.purchase_units[0].items,
              data.purchase_units[0].amount.value,
              data.id,
              // data.purchase_units[0],
              data.payer.email_address,
              data.payer.name.given_name,
              data.payer.name.surname,
              data.status,
              data.purchase_units[0].items[0],
              data.create_time,

            );
            this.emptyCart();

            this.spinner.hide();
            // this.procesarPagoPaypal();


        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);

        },
    };
}

  getItem():void{
    this.messageService.getMessage().subscribe((product:Plan)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product.id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);

      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);

    });
  }


  getItemsList(): any[]{

    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel)=>{
      item = {

        name: it.productName,
        quantity: it.quantity,
        category: 'DIGITAL_GOODS',
        description: it.description,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
      };
      items.push(item);
    });
    return items;
  }




  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  emptyCart():void{
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deletItem(i:number):void{
    if(this.cartItems[i].quantity > 1){
      this.cartItems[i].quantity--;

    }else{
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }







  openModal(items, amount, reference, email, name, surname, status, planid, created): void{
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.reference = reference;
    modalRef.componentInstance.email = email;
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.surname = surname;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.items[0] = planid;
    modalRef.componentInstance.created = created;

  }







}
