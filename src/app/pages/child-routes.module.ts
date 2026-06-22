import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReciboFacturaComponent } from '../components/recibo-factura/recibo-factura.component';
import { ConfiguracionesComponent } from './conf/configuraciones/configuraciones.component';
import { CurrenciesEditComponent } from './conf/currencies/currencies-edit/currencies-edit.component';
import { CurrenciesIndexComponent } from './conf/currencies/currencies-index/currencies-index.component';
import { PlanesEditComponent } from './conf/planes/planes-edit/planes-edit.component';
import { PlanesIndexComponent } from './conf/planes/planes-index/planes-index.component';
import { RolesViewComponent } from './conf/roles/roles-view/roles-view.component';
import { ContactComponent } from './contact/contact.component';

//pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { DirectorioEditComponent } from './directorio/directorio-edit/directorio-edit.component';
import { DirectorioIndexComponent } from './directorio/directorio-index/directorio-index.component';
import { DirectorioViewPublicComponent } from './directorio/directorio-view-public/directorio-view-public.component';
import { DirectorioViewComponent } from './directorio/directorio-view/directorio-view.component';
import { HelpComponent } from './help/help.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments/payments.component';
import { ReportarPagoComponent } from './payments/reportar-pago/reportar-pago.component';
import { PlanComponent } from './planes/plan/plan.component';
import { PlanesPageComponent } from './planes/planes-page/planes-page.component';
import { UserHistorialpagosComponent } from './user-historialpagos/user-historialpagos.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentmethodEditComponent } from './conf/paymentmethod/paymentmethod-edit/paymentmethod-edit.component';
import { PaymentmethodIndexComponent } from './conf/paymentmethod/paymentmethod-index/paymentmethod-index.component';




const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //configuraciones
    { path: 'configuraciones',  component: ConfiguracionesComponent, data:{title:'Configuraciones'} },

    { path: 'rolesconf', component: RolesViewComponent, data:{title:'Planes'} },

    { path: 'planes', component: PlanesIndexComponent, data:{title:'Planes'} },
    { path: 'plan/:id', component: PlanComponent, data:{title:'Plan'} },
    { path: 'planes/create', component: PlanesEditComponent, data:{title:'Crear Plan'} },
    { path: 'plan/edit/:id', component: PlanesEditComponent, data:{title:'Editar Plan'} },
    { path: 'planes/all', component: PlanesPageComponent, data:{title:'Planes'} },
    { path: 'planes/plan', component: PlanComponent, data:{title:'Planes'} },

    { path: 'currencies', component: CurrenciesIndexComponent, data:{title:'Monedas'} },
    { path: 'currency/:id', component: CurrenciesIndexComponent, data:{title:'Moneda'} },
    { path: 'currencies/create', component: CurrenciesEditComponent, data:{title:'Crear Moneda'} },
    { path: 'currency/edit/:id', component: CurrenciesEditComponent, data:{title:'Editar Moneda'} },

    { path: 'paymentmethods', component: PaymentmethodIndexComponent, data:{title:'Metodo de Pago'} },
    { path: 'paymentmethod/:id', component: PaymentmethodIndexComponent, data:{title:'Metodo de Pago'} },
    { path: 'paymentmethod/create', component: PaymentmethodEditComponent, data:{title:'Crear Metodo de Pago'} },
    { path: 'paymentmethod/edit/:id', component: PaymentmethodEditComponent, data:{title:'Editar Metodo de Pago'} },

    //admin
    { path: 'payments',   component: PaymentsComponent, data:{title:'Pagos'} },
    { path: 'payment-detail/:id', component: PaymentDetailsComponent, data:{title:'Detalle Pago'} },
    { path: 'payment/edit/:id', component: PaymentEditComponent, data:{title:'Editar Pago'} },
    { path: 'factura/:id', component: ReciboFacturaComponent, data:{title:'Buscar'} },
    { path: 'realizar-pago', component: ReportarPagoComponent, data:{title:'Relizar Pago'} },
    //user
    { path: 'users', component: UsersComponent, data:{title:'Usuarios'} },
    { path: 'user/:id', component: UserProfileComponent, data:{title:'Detalle Usuario'} },
    { path: 'user/edit/:id', component: UserProfileComponent, data:{title:'Editar Usuario'} },
    // { path: 'user/edit/:id', component: UserDetailsComponent, data:{title:'Editar Usuario'} },
    { path: 'historial-pagos', component: UserHistorialpagosComponent, data:{title:'Historial Pagos'} },
    { path: 'profile/:id',  component: ProfileComponent, data:{title:'Perfil'} },
    //directorio
    { path: 'directorio',  component: DirectorioIndexComponent, data:{title:'Directorio'} },
    { path: 'directorio/create', component: DirectorioEditComponent, data:{title:'Directorio Crear'} },
    { path: 'directorio/edit/:id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/member/edit/:user_id', component: DirectorioEditComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view/:id', component: DirectorioViewComponent, data:{title:'Directorio Editar'} },
    { path: 'directorio/view-public/:id', component: DirectorioViewPublicComponent, data:{title:'Directorio Publico'} },

    { path: 'search/:searchItem', component: UsersComponent, data:{title:'Buscar'} },
    { path: 'help', component: HelpComponent, data:{title:'Ayuda'} },
    { path: 'contact', component: ContactComponent, data:{title:'Contacto'} },


    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ]
})
export class ChildRoutesModule { }
