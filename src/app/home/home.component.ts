import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../Auth/AuthService.component';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  // EL CSS LO TOMA DE assets/css/templatemo-574-mexant
  // encapsulation: ViewEncapsulation.None // Remove encapsulation

  
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}
  public login = true;
  public logout = false;
  public pedidos = false;
   cantidadAdded = 0;
   counter=0;

  // ecomServices!=string;
   dataFromLocalStorage = localStorage.getItem('data');
   ecomServices: any; // Replace 'any' with the actual type of your 'ecomServices' variable
  shoppingCart: boolean = true; // You can set this value based on your logic


  ngOnInit() {
    if (this.dataFromLocalStorage !== null) {
      this.ecomServices = JSON.parse(this.dataFromLocalStorage) ;
      // $.each(this.ecomServices, (index: number, value : any) => {
        this.counter+= this.ecomServices.length;
      // })
    }
   
    (document.body.style as any)['margin-left'] = '0px'; // Explicitly cast to 'any' to avoid the error
    if(localStorage.getItem('user')=='2'){
  this.login = false;
    this.logout = true;
    this.pedidos = true;
}
}
exit(){
  this.authService.setUserRole('');
  this.login = true;
  this.logout = false;
  this.pedidos = false;
  localStorage.removeItem('user');
  this.router.navigate(['login']);
}

goShopping(){
      this.router.navigate(['carrito']);
}

popoverContent!: string
// popoverContent: string = "<span id='txtPopupCantidad' class='text-white badge rounded-pill badge-notification bg-danger'>0</span> articulos añadidos";
ngAfterViewInit() {
  let content = ''; // Start of popover content

  if (this.dataFromLocalStorage !== null && this.dataFromLocalStorage!='[]') {
    
          this.ecomServices = JSON.parse(this.dataFromLocalStorage) ;
          $.each(this.ecomServices, (index: number, value : any) => {
            content += '<div class="container mt-2">';
            content += '<div class="row">';

            content += '<div class="col-2">';
            content+='<img src="'+value.imagen+'" class="card-img" alt="..." style="height: 30px; width: 30px; ">    '

            content += '</div>' 

            content += '<div class="col-6">';
            content += '<label for="total">' + value.nombreProducto + '</label>';
            content += '</div>';
            content += '<div class="col-4">';
            content += '<input type="text" class="form-control" value="x' + value.cantidadAdded + '" readonly>';
            content += '</div>';
            content += '</div>';
            content += '</div>';          
          });
  } else{
    content = "<span id='txtPopupCantidad' class='text-white badge rounded-pill badge-notification bg-danger'>0</span> articulos añadidos";

  }
  $('[data-toggle="popover"]').popover({
    container: 'body',
    title: 'Cesta',
    html: true,
    placement: 'bottom',
    sanitize: false,
    trigger: 'hover',
    content: () => content // Use a function to provide the popover content dynamically
  });
}

}

