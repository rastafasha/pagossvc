import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';



import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { DirectorioService } from 'src/app/services/directorio.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  imagePath: string;
  error: string;
  uploadError: boolean;

  identity: any;

  user: User = null;
  userprofile: User = null;
  profileSeleccionado: User = null;

  directorioForm: FormGroup;
  passwordForm: FormGroup;

  directorio: Directorio = null;
  userdirectory: Directorio = null;
  infoDirectorio: any;
  id: number | null;
  idDirecotory: number | null;
  idPerfil: number | null;
  pageTitle: string;
  directory: Directorio;


  //vcard
  vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href? : string;
  vcard: string;
  errors:any = null;

  public formSumitted = false;

  public storage = environment.apiUrlMedia

  public afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .gif, .jpeg',
    method: 'POST',
    maxSize: '2',
    uploadAPI: {
      url: environment.apiUrl + '/member/upload',
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
    private location: Location,
    private userService: UserService,
    private accountService: AccountService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private directorioService: DirectorioService,
    private fb: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.userService.closeMenu();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));

  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log(this.user);
  }

  getUserServer(id:number){
    this.userService.getUserById(id).subscribe(
      res =>{
        this.userprofile = res[0];
        this.userdirectory = res[0].directories[0];
        error => this.error = error
      }
    );


    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPassword(id));
    if (!id == null || !id == undefined || id) {
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioDirectorio(id));

    }else{
      alert('Agrega info a tu durectorio!');
    }
  }

  //Directorio

  iniciarFormularioDirectorio(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (!id == null || !id == undefined || id) {
      // let id = this.directory.id;
      this.pageTitle = 'Editar Directorio';
      this.memberService.getMemberDirectoryById(id).subscribe(
        res => {
          this.directorioForm.patchValue({
            id: res.id,
            nombre: res.nombre,
            surname: res.surname,
            especialidad: res.especialidad,
            org: res.org,
            universidad: res.universidad,
            ano: res.ano,
            website: res.website,
            email: res.email,
            direccion: res.direccion,
            direccion1: res.direccion1,
            estado: res.estado,
            ciudad: res.ciudad,
            telefonos: res.telefonos,
            tel1: res.tel1,
            telhome: res.telhome,
            telmovil: res.telmovil,
            telprincipal: res.telprincipal,
            facebook: res.facebook,
            instagram: res.instagram,
            twitter: res.twitter,
            linkedin: res.linkedin,
            user_id: res.user_id,
            status: res.status,
            vcard: this.vCardInfo,
          });
          this.infoDirectorio = res;
          // console.log(this.infoDirectorio);

        }

      );
    } else {
      this.pageTitle = 'Crear Directorio';
    }


    this.validarFormularioDirectorio();

  }

  validarFormularioDirectorio(){
    this.directorioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      surname: ['', Validators.required],
      especialidad: ['', Validators.required],
      universidad: ['', Validators.required],
      ano: [''],
      org: ['SVCBMF'],
      website: [''],
      email: ['', Validators.required],
      direccion: ['', Validators.required],
      direccion1: [''],
      estado: [''],
      ciudad: [''],
      telefonos: [''],
      tel1: [''],
      telhome: [''],
      telmovil: [''],
      telprincipal: ['', Validators.required],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      vcard: [this.vCardInfo],
      image: [''],
      user_id: [this.user.id],
      status: ['PENDING'],
    });
  }

  avatarUpload(datos) {
    const data = JSON.parse(datos.response);
    this.directorioForm.controls['image'].setValue(data.image);//almaceno el nombre de la imagen
  }

  deleteFotoPerfil(){
    this.memberService.deleteFoto(this.directorioForm.value['id']).subscribe(response => {
      Swal.fire(response['msg']['summary'], response['msg']['detail'], 'success');
      this.ngOnInit();
    }, error => {
      Swal.fire('Error al eliminar', 'Intente de nuevo', 'error');
    });
  }


  get nombre() { return this.directorioForm.get('nombre'); }
  get surname() { return this.directorioForm.get('surname'); }
  get especialidad() { return this.directorioForm.get('especialidad'); }
  get universidad() { return this.directorioForm.get('universidad'); }
  get org() { return this.directorioForm.get('org'); }
  get ano() { return this.directorioForm.get('ano'); }
  get website() { return this.directorioForm.get('website'); }
  get email() { return this.directorioForm.get('email'); }
  get direccion() { return this.directorioForm.get('direccion'); }
  get direccion1() { return this.directorioForm.get('direccion1'); }
  get estado() { return this.directorioForm.get('estado'); }
  get ciudad() { return this.directorioForm.get('ciudad'); }
  get telefonos() { return this.directorioForm.get('telefonos'); }
  get tel1() { return this.directorioForm.get('tel1'); }
  get telhome() { return this.directorioForm.get('telhome'); }
  get telmovil() { return this.directorioForm.get('telmovil'); }
  get telprincipal() { return this.directorioForm.get('telprincipal'); }
  get facebook() { return this.directorioForm.get('facebook'); }
  get instagram() { return this.directorioForm.get('instagram'); }
  get twitter() { return this.directorioForm.get('twitter'); }
  get linkedin() { return this.directorioForm.get('linkedin'); }
  get user_id() { return this.directorioForm.get('user_id'); }
  get image() { return this.directorioForm.get('image'); }
  

  guardarDirectorio() {debugger
    this.formularioVcardGe();

    const formData = new FormData();
    formData.append('nombre', this.directorioForm.get('nombre')?.value);
    formData.append('surname', this.directorioForm.get('surname')?.value);
    formData.append('especialidad', this.directorioForm.get('especialidad')?.value);
    formData.append('universidad', this.directorioForm.get('universidad')?.value);
    formData.append('org', this.directorioForm.get('org')?.value);
    formData.append('ano', this.directorioForm.get('ano')?.value);
    formData.append('website', this.directorioForm.get('website')?.value);
    formData.append('email', this.directorioForm.get('email')?.value);
    formData.append('direccion', this.directorioForm.get('direccion')?.value);
    formData.append('direccion1', this.directorioForm.get('direccion1')?.value);
    formData.append('estado', this.directorioForm.get('estado')?.value);
    formData.append('ciudad', this.directorioForm.get('ciudad')?.value);
    formData.append('telefonos', this.directorioForm.get('telefonos')?.value);
    formData.append('tel1', this.directorioForm.get('tel1')?.value);
    formData.append('telhome', this.directorioForm.get('telhome')?.value);
    formData.append('telmovil', this.directorioForm.get('telmovil')?.value);
    formData.append('telprincipal', this.directorioForm.get('telprincipal')?.value);
    formData.append('facebook', this.directorioForm.get('facebook')?.value);
    formData.append('instagram', this.directorioForm.get('instagram')?.value);
    formData.append('twitter', this.directorioForm.get('twitter')?.value);
    formData.append('linkedin', this.directorioForm.get('linkedin')?.value);
    
    if(this.directorioForm.value.image){
      formData.append('image', this.directorioForm.get('image').value);
    }
      
    formData.append('vcard', this.vCardInfo);


    const id = this.directorioForm.get('id').value;

    if (id) {
      const data = {
        ...this.directorioForm.value,
        user_id: this.user.id,
        vcard: this.vCardInfo,
        // id: this.directory.id
      }
      this.memberService.updateMemberDirectory(data, +id).subscribe(
        res => {
          this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            this.ngOnInit();
        },
        error => this.errors = error
      );
    } else {
      const data = {
        ...this.directorioForm.value,
        vcard: this.vCardInfo,
        user_id: this.user.id,
      }
      this.memberService.createMemberDirectory(data).subscribe(
        res => {
          this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.ngOnInit();
        },
        error => this.errors = error
      );
    }
      this.generateQRCode();

  }

  /**
   * @method: Permite crear el qr
   * @author: malcolm
   * @since: 11/07/2022
   */

 formularioVcardGe(){
  let {nombre, surname , org , website , facebook, instagram,
    linkedin , twitter , email , image , especialidad , direccion, direccion1,
    tel1 , telhome , telmovil , telprincipal} = this.directorioForm.getRawValue();

    this.vCardInfo = `BEGIN:VCARD
VERSION:3.0
N:${surname};${nombre}
FN:${surname} ${nombre}
ORG:${org}
URL:${website}
URL:${facebook}
URL:${instagram}
URL:${linkedin}
URL:${twitter}
EMAIL:${email}
PHOTO:${image}
TITLE:${especialidad}
ADR;TYPE=work:${direccion}
ADR;TYPE=home:${direccion1}
TEL;TYPE=voice,work,oref:${tel1}
TEL;TYPE=voice,home,oref:${telhome}
TEL;TYPE=voice,mobile,oref:${telmovil}
TEL;TYPE=voice,first,oref:${telprincipal}
END:VCARD
    `
    // console.log(this.vCardInfo);
}
  /**
   * @method: Descarga la imagen del qr
   * @author: malcolm
   * @since: 11/07/2022
   */

  downloadImage(){

    const box = document.getElementById('box');
    box?.parentElement?.classList.add('parent')

    box?.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img')?.src;

    // console.log('img', this.href);
  }

  /**
 * @method: Genera la imagen del qr
 * @author: malcolm
 * @since: 11/07/2022
 */

generateQRCode(){
  if( this.directorioForm.valid){
    this.display = true;
    // alert("Please enter the name");
  }
  return false;

}

hideQRCode(){
  if( this.directorioForm.valid){
    this.display = false;
    // alert("Please enter the name");
  }
  return false;

}


iniciarFormularioPassword(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (!id == null || !id == undefined || id) {

      this.memberService.getMemberDirectoryById(id).subscribe(
        res => {
          this.passwordForm.patchValue({
            id: res.id,
            email: res.email,
          });
        }
      );
    } else {
      this.pageTitle = 'Crear Directorio';
    }
    this.validarFormularioPassword();

  }

  validarFormularioPassword(){
    this.passwordForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
    //   password: ['', Validators.required],
    // password2: ['', Validators.required],
    }, {
      // validators: this.passwordsIguales('password', 'password2')

    });
  }

  passwordNoValido(){
    const pass1 = this.passwordForm.get('password').value;
    const pass2 = this.passwordForm.get('password2').value;

    if((pass1 !== pass2) && this.formSumitted){
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

cambiarPassword(){
  this.formSumitted = true;

  const {email } = this.passwordForm.value;

  if(this.userprofile){
    //actualizar
    const data = {
      ...this.passwordForm.value,
      id: this.userprofile.id
    }
    this.accountService.resetPassword(data).subscribe(
      resp =>{
        Swal.fire('Cambiado', `Enlace para restablecer su contraseña ha sido enviado a su correo electrónico`, 'success');
      });

  }

}

}
