import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProyectoApiService } from 'src/app/proyecto-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent implements OnInit {
  constructor(public alumnosUtl:ProyectoApiService,public router:Router){}

  displayedColumns: string[] = ['id', 'producto_id', 'cantidad', 'totalPrecio', 'fechaRealizado','estatus'];
  dataSource = new MatTableDataSource<any>([]);
  
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  
  @ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
  

getAllPedidos(){
  this.alumnosUtl.getAllPedidos().subscribe(
    {
      next: response=>{
        console.log(response);
    this.dataSource.data=response;
  },
  error: error=>console.log(error)
}
  );
}

  ngOnInit() {
   this.getAllPedidos();
    this.dataSource.paginator = this.paginator;
  }

  actualizarPedido(id: number) {
    this.alumnosUtl.updatePedido(id, 2).subscribe(
      {
        next: response => {
          this.getAllPedidos();
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/pedidosAdmin']);
          // });
        },
        error: error => console.log( error)
      }
    );
  }
  
  
}
