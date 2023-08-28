import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

declare var Toastify: any;

@Component({
  selector: 'app-',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
    // EL CSS LO TOMA DE assets/css/templatemo-574-mexant
})
export class SignupComponent {
  regUsuario = {
    id: 0,
    name: '',
    email: '',
    calle: '',
    codigopostal: '',
    estado: '',
    ciudad: '',
    activo: true,
    passwordUsuario: '',
    rol_id: 2 // Valor por defecto para rol_id
  }

  constructor(private usuario: ProyectoApiService, private router: Router) { }

  signup() {
    const hasUppercase = /[A-Z]/.test(this.regUsuario.passwordUsuario);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.regUsuario.passwordUsuario);

 
   if(this.regUsuario.name == ''||this.regUsuario.name==undefined
   || this.regUsuario.email == '' ||this.regUsuario.email==undefined
   || this.regUsuario.passwordUsuario == '' ||this.regUsuario.passwordUsuario==undefined
   || this.regUsuario.calle == '' ||this.regUsuario.calle==undefined
   || this.regUsuario.codigopostal == '' ||this.regUsuario.codigopostal==undefined
   || this.regUsuario.estado == '' ||this.regUsuario.estado==undefined
   || this.regUsuario.ciudad == '' ||this.regUsuario.ciudad==undefined){    
    Toastify({
      text: 'rellene todos los campos',
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      backgroundColor: "red",
    }).showToast();
  }   else if (!hasUppercase || !hasSpecialCharacter || this.regUsuario.passwordUsuario.length < 8) {
    Toastify({
      text: 'la contraseña debe contener minimo una mayuscula, un caracter especial y debe ser mayor a 8 caracteres',
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      backgroundColor: "red",
    }).showToast();
  }
  
  
  else{

    this.usuario.agregarNuevoUsuario(this.regUsuario).subscribe({
      
      next: () => {
        this.router.navigate(['/login']); // Navega a la página de inicio de sesión
      },
      error: error => console.error('Error al registrar usuario', error),
      complete: () => console.log('Registro completado')
    });
  }
  }
 
}