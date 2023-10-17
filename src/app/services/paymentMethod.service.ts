import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';
import { PaymentMethod } from '../models/paymentMethod';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  public tiposdepagos: PaymentMethod;
  public tiposdepago: PaymentMethod;
  public tipodepago: PaymentMethod;

  info:any = {};
  cargada:boolean = false;

  //datos
  // payments = 'assets/dataSimulada/pago.json';

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token');
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }

  get type(): 'paypal' | 'transferencia' |'pagomovil' {
    return this.tiposdepago.type!;
  }
  get status(): 'ACTIVE' | 'INACTIVE'  {
    return this.tiposdepago.status!;
  }
  get bankAccountType(): 'ahorro' | 'corriente'|'cheques'  {
    return this.tiposdepago.bankAccountType!;
  }



  getAll(){
    const url = `${baseUrl}/paymentmethods`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, tiposdepagos: PaymentMethod}) => resp.tiposdepagos)
      )
  }

  getPagoById(id:number): Observable<any> {
    const url = `${baseUrl}/paymentmethods/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, tipodepago: PaymentMethod}) => resp.tipodepago)
        );
  }

  getActivas() {
    const url = `${baseUrl}/paymentmethods/activos`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, tiposdepagos: PaymentMethod}) => resp.tiposdepagos)
      )
  }

  create(data:PaymentMethod): Observable<any> {
    const url = `${baseUrl}/paymentmethods/store`;
    return this.http.post(url, data, this.headers);
  }

  update(tiposdepago:PaymentMethod): Observable<any> {
   const url = `${baseUrl}/paymentmethods/update/${tiposdepago.id}`;
    return this.http.put(url, tiposdepago, this.headers);
  }


  deleteFoto(id) {
    return this.http.delete(baseUrl + '/paymentmethods/delete-foto/' + id);
  }


  delete(id): Observable<any> {
    const url = `${baseUrl}/paymentmethods/destroy/${id}`;
    return this.http.delete(url, this.headers);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByReference(title): Observable<any> {
    return this.http.get(`${baseUrl}/paymentmethods/?title=${title}`);
  }

  getPagosbyUser(id:number): Observable<any> {

    const url = `${baseUrl}/paymentmethods/pagosbyUser/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, tiposdepagos: PaymentMethod}) => resp.tiposdepagos)
        );
  }

   getRecientes(): Observable<any> {
    const url = `${baseUrl}/paymentmethods/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, tiposdepagos: PaymentMethod}) => resp.tiposdepagos)
      )
  }

  search(query=''){
    return this.http.get(`${baseUrl}/paymentmethods/search`, {params: {buscar: query}})

  }

  updateStatus(tiposdepago:PaymentMethod) {
    const url = `${baseUrl}/paymentmethods/update/status/${tiposdepago.id}`;
    return this.http.put(url, tiposdepago, this.headers);

  }

}
