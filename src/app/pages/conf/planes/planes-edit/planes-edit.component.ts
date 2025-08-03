import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import { NgForm } from '@angular/forms';
import { Currencies } from 'src/app/models/currencies';
import { Plan } from 'src/app/models/plan';
import { CurrenciesService } from 'src/app/services/currencies.service';
import { PlanesService } from 'src/app/services/planes.service';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-planes-edit',
  templateUrl: './planes-edit.component.html',
  styleUrls: ['./planes-edit.component.css']
})
export class PlanesEditComponent implements OnInit {

  public planForm: FormGroup;

  public plan: Plan;

  public imgSelect : String | ArrayBuffer;
  public currenciesAll: Currencies;

  title: string;

  public planSeleccionado: Plan;


  imagePath: string;
  error: string;
  uploadError: string;
  public storage = environment.apiUrlMedia

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    method: 'POST',
    maxSize: '2',
    uploadAPI: {
      url: environment.apiUrl + '/plan/upload',
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
    private router: Router,
    private planService: PlanesService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private currenciesService: CurrenciesService,
    private accountService: AccountService,
    ) { }

  ngOnInit(): void {
    this.getCurrencies();
    this.validarFormulario();
    this.activatedRoute.params.subscribe( ({id}) => this.getplan(id));
  }

  getplan(id){
    if (id !== null && id !== undefined) {
      this.title = 'Editando plan';
      this.planService.getPlan(+id).subscribe(
        res => {
          this.planForm.patchValue({
            id: res.id,
            name: res.name,
            price: res.price,
            currency_id: this.currenciesAll.id,
            status: res.status,
          });
          this.planSeleccionado = res;
          // console.log(this.planSeleccionado);
        }
      );
    } else {
      this.title = 'Creando plan';
    }
  }

  validarFormulario(){
    this.planForm = this.fb.group({
      id: [''],
      name: [''],
    price: [''],
    currency_id: [''],
    status: [''],
    image: [''],
    })
  }
  get name() {
    return this.planForm.get('name');
  }

  get price() {
    return this.planForm.get('price');
  }
  get currency_id() {
    return this.planForm.get('currency_id');
  }

  get status() {
    return this.planForm.get('status');
  }
  get image() {
    return this.planForm.get('image');
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.planForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.planService.deleteFotoPerfil(this.planForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }



  editPlan(){

    const formData = new FormData();
    formData.append('name', this.planForm.get('name').value);
    formData.append('price', this.planForm.get('price').value);
    formData.append('currency_id', this.planForm.get('currency_id').value);
    formData.append('status', this.planForm.get('status').value);
    formData.append('image', this.planForm.get('image').value);
    const id = this.planForm.get('id').value;
    if(id){
      //actualizar

      this.planService.updatePlan(this.planForm.value, this.planForm.controls['id'].value).subscribe(
        resp =>{
          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'actualizado correctamente',
                            showConfirmButton: false,
                            timer: 1500,
                          });
          this.router.navigateByUrl(`/dashboard/planes`);
          // console.log(this.planSeleccionado);
        });

    }else{
      //crear
      this.planService.createPlan(formData)
      .subscribe( (resp: any) =>{
        Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'creado correctamente',
                          showConfirmButton: false,
                          timer: 1500,
                        });
        this.router.navigateByUrl(`/dashboard/planes`);
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




