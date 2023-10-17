import { Component, OnInit } from '@angular/core';
import { DirectorioService } from '../../services/directorio.service';
import { Directorio } from '../../models/directorio';
import { HttpClient, HttpErrorResponse, HttpBackend } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  directorios: Directorio = null;

  error: string;
  doctores: any = null;

  private http: HttpClient;

  ServerUrl = environment.apiUrl;
  imagenSerUrl = environment.apiUrlMedia;

  p: Number = 1;
  count: Number = 8;

  classApplied = true;

  heroes = Directorio;
  selectedHero?: Directorio;

  vCardInfo:string;
  value: string;
  display = false;
  elementType: 'url' | 'canvas' | 'img' = 'url';
  href : string;

  public user: User;

  directories: any = [];
  directoriesActivos: any = [];
  query:string ='';

  constructor(
    public directorioService: DirectorioService,
    private userService: UserService,
    handler: HttpBackend) {
    this.http = new HttpClient(handler);
    this.user = userService.user;
   }

  ngOnInit() {
    this.getPublicados();
    this.getDirectorios();
    this.getUser();
    window.scrollTo(0,0);

  }

  getPublicados(){
    this.directorioService.getDirectoriosPublicados().subscribe(
      res =>{
        this.directoriesActivos = res;
        error => this.error = error
        // console.log(this.directories);
      }
    );
  }

  getDirectorios(): void {
    this.directorioService.getDirectorios().subscribe(
      res =>{
        this.directories = res;
        error => this.error = error;
      }
    );
  }

  toggleClass(id: number){
    this.classApplied = !this.classApplied;
  }



  /**
   * @method: Descarga la imagen del qr
   * @author: malcolm
   * @since: 11/07/2022
   */


   vcard: string;

  downloadImage(){

    const box = document.getElementById('box');
    box.parentElement.classList.add('parent')

    box.hasAttribute('img');

    this.href = document.getElementsByClassName('parent')[0].querySelector('img').src;

    console.log('img', this.href);

    this.vcard = this.href;
    console.log('vcard', this.vcard);
  }


  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }

  getUserProfile(id){
    this.userService.getUserById(id).subscribe((data: any) => {
      this.user = data;
      console.log(this.user)
    });
  }


  search() {
    return this.directorioService.search(this.query).subscribe(
      res=>{
        this.directories = res;
        if(!this.query){
          this.ngOnInit();
        }
        console.log(res);
      });
  }

  searchActivos() {
    return this.directorioService.search(this.query).subscribe(
      res=>{
        this.directoriesActivos = res;
        if(!this.query){
          this.ngOnInit();
        }
        console.log(res);
      });
  }

}
