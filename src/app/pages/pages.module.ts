import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//componentes
import { DashboardComponent } from './dashboard/dashboard.component';

//modulos

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//helpers
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

import {PagesComponent} from './pages.component';
import { ConfModule } from './conf/conf.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';

// paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import {ScrollingModule} from '@angular/cdk/scrolling';

//paypal
import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";

import { ContactComponent } from './contact/contact.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';

// angular file uploader
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { DirectoryModule } from './directorio/directory.module';
//Qr
import { QRCodeModule } from 'angular2-qrcode';
import { CKEditorModule } from 'ckeditor4-angular';
import { InstallPwaComponent } from './install-pwa/install-pwa.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DashboardAdminComponent,
    PagesComponent,
    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    UserProfileComponent,
    PagesComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    InstallPwaComponent
  ],
  exports: [
    DashboardComponent,
    DashboardAdminComponent,
    ProfileComponent,
    UserDetailsComponent,
    UsersComponent,
    UserHistorialpagosComponent,
    HelpComponent,
    ContactComponent,
    DashboardUserComponent,
    UserProfileComponent,
    PagesComponent,
    PlanesPageComponent,
    PlanComponent,
    PaymentDetailsComponent,
    PaymentsComponent,
    PaymentEditComponent,
    ReportarPagoComponent,
    InstallPwaComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
    ConfModule,
    ComponentsModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AngularFileUploaderModule,
    DirectoryModule,
    QRCodeModule,
    ScrollingModule,
    CKEditorModule

  ],
  providers: [
  ],
})
export class PagesModule { }
