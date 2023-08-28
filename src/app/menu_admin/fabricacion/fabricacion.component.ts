import { Component,OnInit, ViewChild } from '@angular/core';
import {ProyectoApiService} from '../../proyecto-api.service';
import { fabricacionProducto } from 'src/app/interfaces/fabricacionProducto.Interface';

import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-fabricacion',
  templateUrl: './fabricacion.component.html',
  styleUrls: ['./fabricacion.component.css']
})
export class FabricacionComponent implements OnInit{

  displayedColumns: string[] = ['Producto', 'cantidad','estatus', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<fabricacionProducto>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  selectProducto: any;

  regFabricacion: fabricacionProducto = {
    id: 0,
    producto_Id: 0,
    cantidad: 0,
  }

  regFabricacionGet: fabricacionProducto = {
    id: 0,
    producto_Id: 0,
    cantidad: 0,
  }

  dataSourceProducto: any = [];

  constructor(public fabricacionService: ProyectoApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<fabricacionProducto>([]);
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.ObtenerDatosFabricacion();
  }

  ObtenerDatosFabricacion(){
    this.fabricacionService.getFabricacionProducto().subscribe(
      {
        next: response=>{
          const DataFabricacion = response;

          const fabricacionProducto: fabricacionProducto[] = DataFabricacion.map((DataFabricacion: any)=>(
            {
              id: DataFabricacion.id,
              producto_Id: DataFabricacion.producto_Id,
              cantidad: DataFabricacion.cantidad,
            }));
          this.dataSource.data = fabricacionProducto;
        },
        error: error=>console.log(error)
      }
    );

    this.fabricacionService.getProducto().subscribe(
      {
        next: response=>{
          const DataProducto = response;

          const producto: any[] = DataProducto.map((DataProducto: any)=>(
            {
              id: DataProducto.id,
              nombre: DataProducto.nombre,
              imagen: DataProducto.imagen,
            }));
          this.dataSourceProducto = producto;
          this.selectProducto = producto[0].id;
        },
        error: error=>console.log(error)
      }
    ); 
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  FabricacionProductoGet(producto: any){
    this.selectProducto = producto.id;
    this.regFabricacionGet = {
      id: producto.id,
      producto_Id: producto.producto_Id,
      cantidad: producto.cantidad,
    }
  }

  AgregarFabricacionProducto(){
    this.regFabricacion.producto_Id = Number(this.selectProducto);
    this.fabricacionService.agregarFabricacionProducto(this.regFabricacion).subscribe(
      {
        next:(response:any)=>{
          console.log(response.message);
      if(response.message == "Producto agregado correctamente"){
      this.dataSource.data.push(this.regFabricacion);
      this.regFabricacion = {
        id: 0,
        producto_Id: 0,
        cantidad: 0,
      }
      document.getElementById('closeAddModal')?.click();
      
      this.dataSource.data = this.dataSource.data;
      }
        },
      error:(e)=> console.error(e),
      complete:()=>console.info()})
      // 

  } 

  eliminarFabricacionProducto(fabricacionProducto: any){
    this.fabricacionService.eliminarFabricacionProducto(fabricacionProducto.id).subscribe(
      {
        next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})

      const index = this.dataSource.data.findIndex((item:any) => item.id === fabricacionProducto.id);
     
      if(index !== -1){
        this.dataSource.data.splice(index,1);
      }
        
      this.dataSource.data = this.dataSource.data;
      document.getElementById('closeDeleteModal')?.click();
  }


}
