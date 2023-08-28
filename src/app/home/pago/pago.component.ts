import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/AuthService.component';
import { Pedido } from 'src/app/interfaces/Home.Interface';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
// import Swal from 'sweetalert2'

declare var Swal: any;
declare var Toastify: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent {
  constructor( private router: Router, private authService: AuthService,private alumnosutl:ProyectoApiService) {}
data:any=[];
user:any=[];
nombre!:string;
direccion!:string;
ciudad!:string;
codigoPostal!:string;
telefono!:string;
nombreTitular!:string;
numeroCuenta!:string;
ccv!:string;
mes!:string;
anio!:string;


pedido:Pedido={
  cantidad:0,
  Totalprecio:0,
  estatusPedido:0,
  producto_id:0,
  user_id:0,
  fechaRealizado:new Date()
}
  showBankingForm = false;
  total = 0;
  cantidadTotal=0;
  ngOnInit(): void {
    const dataFromLocalStorage = localStorage.getItem('data');
    const user = localStorage.getItem('user');


    if (dataFromLocalStorage  && user) {
      this.data=JSON.parse(dataFromLocalStorage);  
      this.user=JSON.parse(user);  
  }  
  this.data.forEach((dataCarrito:any )=> {
    this.total+= dataCarrito.precio * dataCarrito.cantidadAdded;
    this.cantidadTotal+= dataCarrito.cantidadAdded;
});
this.total =Number( this.total.toFixed(2));

  }
 
  showBanking(){
    if(this.nombre==undefined ||this.nombre=="" 
    ||this.direccion==undefined ||this.direccion=="" 
    ||this.ciudad==undefined ||this.ciudad==""
    ||this.codigoPostal==undefined ||this.codigoPostal==""
    ||this.telefono==undefined ||this.telefono==""){

      Toastify({
        text: "¡Complete todos los campos!",
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        backgroundColor: "red",
      }).showToast();
    }else{
      this.showBankingForm = true;

     
    }
  }


  comprar(){
    if(this.nombreTitular==undefined ||this.nombreTitular=="" 
    ||this.numeroCuenta==undefined ||this.numeroCuenta=="" 
    ||this.ccv==undefined ||this.ccv==""
    ||this.mes==undefined ||this.mes==""
    ||this.anio==undefined ||this.anio==""){

      Toastify({
        text: "¡Complete todos los campos!",
        offset: {
          x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        backgroundColor: "red",
      }).showToast();
    }else{
      this.data.forEach((dataCarrito:any )=> {
        this.pedido={
          cantidad: dataCarrito.cantidadAdded,
          Totalprecio: dataCarrito.precio * dataCarrito.cantidadAdded,
          estatusPedido: 1,
          producto_id: dataCarrito.idProducto,
          user_id: this.user.id,
          fechaRealizado: new Date()
        };    
        
        this.alumnosutl.agregarPedido(this.pedido).subscribe({
          next:()=>  console.log("agregado correctamente"),
          error:(e)=> console.error(e),
          complete:()=>console.info()})
    })




      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Compra realizada con éxito',
        showConfirmButton: false,
        timer: 1500
      }).then((result: any) => {
        localStorage.removeItem('data');
        this.router.navigate(['carrito']);      
      })

    }







  
  }

   
}
