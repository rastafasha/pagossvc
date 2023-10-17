import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { DirectorioService } from 'src/app/services/directorio.service';
import { MemberService } from 'src/app/services/member.service';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {

  @Output() directorioUser : any;

  title = "Detalles de la cuenta";
  profileForm: FormGroup;
  imagePath: string;
  error: string;
  uploadError: boolean;

  identity: any;

  user: User;
  userprofile: User;
  userdirectory: User;

  image:string;

  profileSeleccionado: User;

  directorioForm: FormGroup;

  directorio: Directorio;
  infoDirectorio: any;
  id: number | null;
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

  constructor(
    private location: Location,
    private userService: UserService,
    private directorioService: DirectorioService,
    private memberService: MemberService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.closeMenu();
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioDirectorio(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
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
        this.userdirectory = res[0];
        error => this.error = error
        // console.log(this.userdirectory);
      }
    );
  }

  iniciarFormularioPerfil(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      let id = this.user.id;
      // this.pageTitle = 'Editar Directorio';
      this.userService.getUserById(+id).subscribe(
        res => {
          this.profileForm.patchValue({
            id: res.id,
            // nombre: res.nombre,
            username: res.username,
            email: res.email,
            user_id: this.user.id,
          });
          this.imagePath = res.image;
          this.profileSeleccionado = res;
        }
      );
    }

    this.validarFormularioPerfil();

  }

  validarFormularioPerfil(){
    this.profileForm = this.fb.group({
      id: [''],
      // nombre: ['', Validators.required],
      username: ['', Validators.required],
      image: [this.image],
      user_id: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('image').setValue(file.name);
      // this.directorioForm.get('image').setValue(file);

      this.image = file.name;
    }
  }

  // get nombre() { return this.profileForm.get('nombre'); }
  get username() { return this.profileForm.get('username'); }


  updateForm() {


    const formData = new FormData();
    // formData.append('nombre', this.profileForm.get('nombre').value);
    formData.append('username', this.profileForm.get('username').value);
    formData.append('image', this.profileForm.get('image').value);

    const id = this.profileForm.get('id').value;

    if (id) {
      const data = {
        ...this.profileForm.value,
        user_id: this.user.id,
        id: this.user.id
      }
      this.userService.update(data).subscribe(
        res => {
          if (this.error) {
            // this.uploadError = res.message;
            // Swal.fire('Error', this.uploadError, 'error');
          } else {
            // this.router.navigate(['/directorio']);
            // this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          }
        },
        error => this.error = error
      );
    }

  }


  //Directorio

  iniciarFormularioDirectorio(id:number){
    if (id) {
      this.pageTitle = 'Editar Directorio';
      this.directorioService.getDirectoriobyUser(id).subscribe(
        res => {
          this.directorioForm.patchValue({
            id: res[0].directories.id,
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
            vcard: this.vCardInfo,
            user_id: res.user_id,
          });
          this.imagePath = res.image;
          this.directory = res[0].directories;
          console.log(this.directory);

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
      image: [this.image],
      user_id: [''],
      status: ['PENDING'],
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



  guardarDirectorio() {

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
        // id: this.directory.id
      }
      this.memberService.updateMemberDirectory(data, +id).subscribe(
        res => {
          if (this.errors) {
            this.errors = this.errors.error;
            Swal.fire('Error', this.errors, 'error');

          } else {
            // this.router.navigate(['/directorio']);
            this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          }
        },
        error => this.errors = error
      );
    } else {
      const data = {
        ...this.directorioForm.value,
        user_id: this.user.id,
      }
      this.memberService.createMemberDirectory(data).subscribe(
        res => {
          if (this.errors) {
            this.errors = this.errors.error;
            Swal.fire('Error', this.errors, 'error');
          } else {
            this.infoDirectorio = res;
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            // this.router.navigate(['/directorio']);
          }
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

/**
   * @method: Cambiar imagen profile
   * @author: malcolm
   * @since: 07/10/2022
   */

 public onReady( editor:any ) {
  editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
  );
}


}
