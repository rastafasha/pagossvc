import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Import Angular plugin.
import { QRCodeModule } from 'angular2-qrcode';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxPaginationModule } from 'ngx-pagination';

import { HttpClientModule } from '@angular/common/http';
//Qr
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DolarTodayComponent } from './dolar-today/dolar-today.component';
import { PagosRecientesComponent } from './pagos-recientes/pagos-recientes.component';
import { UsuariosRecientesComponent } from './usuarios-recientes/usuarios-recientes.component';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ReciboFacturaComponent } from './recibo-factura/recibo-factura.component';
import { PlanesyproductosComponent } from './planesyproductos/planesyproductos.component';
import { ProductItemComponent } from './product-item/product-item.component';
import {PipesModule} from '../pipes/pipes.module';
import {ModalComponent} from './modal/modal.component';
import { DirectorioComponent } from './directorio/directorio.component';


@NgModule({
  declarations: [
    DolarTodayComponent,
    PagosRecientesComponent,
    UsuariosRecientesComponent,
    CartComponent,
    CartItemComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    ProductItemComponent,
    ModalComponent,
    DirectorioComponent,
    
  ],
  exports: [
    DolarTodayComponent,
    PagosRecientesComponent,
    UsuariosRecientesComponent,
    CartComponent,
    CartItemComponent,
    ReciboFacturaComponent,
    PlanesyproductosComponent,
    ProductItemComponent,
    ModalComponent,
    DirectorioComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PipesModule,
    QRCodeModule,
    NgxPayPalModule,
    NgxPaginationModule
    // CKEditorModule
  ]
})
export class ComponentsModule { }
