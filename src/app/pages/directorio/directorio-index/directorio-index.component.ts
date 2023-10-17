import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Directorio } from 'src/app/models/directorio';
import { User } from 'src/app/models/user';
import { DirectorioService } from 'src/app/services/directorio.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-directorio-index',
  templateUrl: './directorio-index.component.html',
  styleUrls: ['./directorio-index.component.css']
})
export class DirectorioIndexComponent implements OnInit {

  title = "Directorio"

  loading = false;
  usersCount = 0;
  usuarios: User[]=[];
  user: User;
  directory: Directorio;
  
  p: number = 1;
  count: number = 8;
  
  error: string;
  msm_error: string;
  directories: any;
  query:string ='';


  ServerUrl = environment.apiUrl;

  constructor(
    private directorioService: DirectorioService,
    private location: Location,
    private http: HttpClient,
    private userService: UserService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    this.userService.closeMenu();
    this.getDirectorios();
    window.scrollTo(0,0);
  }

  getDirectorios(): void {
    this.directorioService.getDirectorios().subscribe(
      res =>{
        this.directories = res;
        error => this.error = error;
        // console.log(this.directories);
      }
    );
  }


  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  eliminarDirectory(id:number){
    this.directorioService.deleteDirectorio(+id).subscribe(
      res=>{
        Swal.fire('Eliminado', 'directorio eliminado', 'success');
        this.getDirectorios();
      }
    )
  }

  cambiarStatus(directory: Directorio){
    this.directorioService.update(directory).subscribe(
      resp =>{ 
        // console.log(resp);
        Swal.fire('Actualizado', `actualizado correctamente`, 'success');
        this.getDirectorios();
      }
    )
  }

  search() {
    return this.directorioService.search(this.query).subscribe(
      res=>{
        this.directories = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

}
