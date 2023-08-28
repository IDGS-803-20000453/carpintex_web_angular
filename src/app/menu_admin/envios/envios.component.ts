import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.css']
})
export class EnviosComponent {
  constructor(public alumnosUtl:ProyectoApiService,public router:Router){}

  displayedColumns: string[] = ['id', 'idPedido', 'cantidad', 'totalPrecio', 'fechaRealizado','noSeguimiento','estatus'];
  dataSource = new MatTableDataSource<any>([]);
  
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  
  @ViewChild(MatPaginator, { static: true })
	paginator!: MatPaginator;
  

  getEnvios(){
    this.alumnosUtl.getEnvios().subscribe(
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
this.getEnvios();

    this.dataSource.paginator = this.paginator;
  }

  actualizarPedido(id: number) {
    this.alumnosUtl.updateEnvios(id, 2).subscribe(
      {
        next: response => {
          this.getEnvios();
          // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          //   this.router.navigate(['/envios']);
          // });
        },
        error: error => console.log( error)
      }
    );
  }

}
