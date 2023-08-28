import { Component } from '@angular/core';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']  
})
export class PedidosComponent {
user:any=[];
data:any=[];
constructor(private alumnosutl:ProyectoApiService) {}
ngOnInit() {
  const user = localStorage.getItem('user');
  if (user) {
    this.user = JSON.parse(user);  
  }
    this.alumnosutl.getPedidos(this.user.id).subscribe(
    {
      next: response=>{

    this.data=response;
    console.log(this.data)

  },
  error: error=>console.log(error)
}
  );


}

  }


