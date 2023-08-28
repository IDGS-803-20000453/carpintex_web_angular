import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/AuthService.component';

declare var $: any;
declare var Toastify: any;


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor( private router: Router, private authService: AuthService) {}

  data:any=[];
  total = 0;
  cantidadTotal=0;
  ngOnInit(): void {
      const dataFromLocalStorage = localStorage.getItem('data');
      if (dataFromLocalStorage !== null) {
          this.data=JSON.parse(dataFromLocalStorage);    
      }  
      this.data.forEach((dataCarrito:any )=> {
          this.total+= dataCarrito.precio * dataCarrito.cantidadAdded;
          this.cantidadTotal+= dataCarrito.cantidadAdded;
      });
      this.total =Number( this.total.toFixed(2));

    }
    comprar(){
      if(localStorage.getItem('user')=='2'){
        this.router.navigate(['pago']);
      }else{
        this.router.navigate(['login']);
        Toastify({
          text: "¡Para realizar una compra debes estar logueado!",
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
          backgroundColor: "red",
        }).showToast();
        // Swal.fire({
        //   title: 'Inciar sesión!',
        //   text: 'Para realizar una compra debes estar logueado',
        //   imageUrl: 'https://cdn-icons-png.flaticon.com/512/1680/1680012.png',
        //   imageWidth: 100,
        //   imageHeight: 100,
        //   imageAlt: 'Custom image',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        // Swal.fire({
        //   position: 'center',
        //   // icon: 'info',
        //   title: '¡Debes iniciar sesión!',

        // })
      }
    }
    agregar(id:number){
        let index = this.data.findIndex((producto: any) => producto.idProducto === id);
        if (index !== -1) {
          if(this.data[index].cantidadAdded<this.data[index].cantidadMaxima){
          this.data[index].cantidadAdded++;
          this.total+= Number((this.data[index].precio).toFixed(2));
          this.total =Number( this.total.toFixed(2));
          this.cantidadTotal+= 1;


          }
        }
        localStorage.setItem('data', JSON.stringify(this.data));
        
      }
      
    
    quitar(id:number){
      let index = this.data.findIndex((producto: any) => producto.idProducto === id);
      // console.log(index);
      if (index !== -1) {
        if(this.data[index].cantidadAdded>1){
        this.data[index].cantidadAdded--;
        this.total-= Number((this.data[index].precio).toFixed(2));
        this.total =Number( this.total.toFixed(2));
        this.cantidadTotal-= 1;

        }
      }
      localStorage.setItem('data', JSON.stringify(this.data));

    }
    eliminar(id:number){
      localStorage.removeItem('data');
      let totalEliminado=0;
      let index = this.data.findIndex((producto: any) => producto.idProducto === id);
      totalEliminado= this.data[index].precio * this.data[index].cantidadAdded;
      this.total=Number((this.total - totalEliminado).toFixed(2));
      this.cantidadTotal-= this.data[index].cantidadAdded;
      this.data.splice(index,1);
  
    $( "#txtPopupCantidad" ).empty();
    $( "#txtPopupCantidad" ).append( document.createTextNode( this.data.length.toString() ));
    
    localStorage.setItem('data', JSON.stringify(this.data));

    }
}
