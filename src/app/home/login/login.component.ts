import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/AuthService.component';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
declare var Swal: any;
declare var Toastify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
username!: string;
password!: string; 

constructor(private router:Router,private authService: AuthService,private alumnosUtl:ProyectoApiService){}
isUsernameValid: boolean = true;
login(){
  if(this.username == ''||this.username==undefined
   || this.password == '' ||this.password==undefined){
    Toastify({
      text: "¡Complete todos los campos!",
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      backgroundColor: "red",
    }).showToast();
  }else{

  this.alumnosUtl.login(this.username,this.password).subscribe(
    {
      next:(response:any)=>{
        if(response.rol_id == 1){
          this.authService.setUserRole('admin');
          localStorage.setItem('user',JSON.stringify(response.rol_id));

              this.router.navigate(['materia'])
          
            }else if(response.rol_id == 2){
              this.authService.setUserRole('user');
              localStorage.setItem('user',JSON.stringify(response.rol_id));
              this.router.navigate(['inicio'])
          }
    // this.dataSource=response;
  },
  error: error=>         Swal.fire({
    title: error.error,
    text: 'verifica tu correo y contraseña',
    imageUrl: 'https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png',
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: 'Custom image',
    showConfirmButton: false,
    timer: 1500
  })});
}
}
}