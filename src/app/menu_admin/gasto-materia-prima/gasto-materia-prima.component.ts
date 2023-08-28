import { Component,OnInit, ViewChild } from '@angular/core';
import {ProyectoApiService} from '../../proyecto-api.service';
import { GastoMateriaPrima } from 'src/app/interfaces/gastoMateriaPrima.Interface';

import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-gasto-materia-prima',
  templateUrl: './gasto-materia-prima.component.html',
  styleUrls: ['./gasto-materia-prima.component.css']
})
export class GastoMateriaPrimaComponent implements OnInit{


  displayedColumns: string[] = ['producto','materiaPrima','cantidad', 'costo', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<GastoMateriaPrima>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  selectMateriaPrima:any;
  selectProducto:any;

  regGastoMateriaPrima:GastoMateriaPrima = {
    id:0,
    cantidad:0,
    costo:0,
    materiaPrima_Id:0,
    producto_Id:0,
  }

  regGastoMateriaPrimaGet:GastoMateriaPrima = {
    id:0,
    cantidad:0,
    costo:0,
    materiaPrima_Id:0,
    producto_Id:0,
  }

  dataSourceMateriaPrima:any=[];
  dataSourceProducto:any=[];

  constructor(public gastoMateriaPrimaService:ProyectoApiService,private router:Router){
    this.dataSource = new MatTableDataSource<GastoMateriaPrima>([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosGastoMateriaPrima();
  }

  obtenerDatosGastoMateriaPrima(){
    this.gastoMateriaPrimaService.getGastoMateriaPrima().subscribe(
      {
        next: response =>{
          const DataGastoMateriaPrima = response;

          const gastoMateriaPrima:GastoMateriaPrima[] = DataGastoMateriaPrima.map(
            (DataGastoMateriaPrima:any)=>({
              id:DataGastoMateriaPrima.id,
              cantidad:DataGastoMateriaPrima.cantidad,
              costo:DataGastoMateriaPrima.costo,
              materiaPrima_Id:DataGastoMateriaPrima.materiaPrima_id,
              producto_Id:DataGastoMateriaPrima.producto_id
            }));
            this.dataSource.data = gastoMateriaPrima;
    },
    error: err => console.log(err)
  }
  );

  this.gastoMateriaPrimaService.getMateriaPrima().subscribe(
    {
      next: response =>{
        const DataMateriaPrima = response;

        const materiaPrima:any[] = DataMateriaPrima.map(
          (DataMateriaPrima:any)=>({
            id:DataMateriaPrima.id,
            nombre:DataMateriaPrima.nombre,
            costo:DataMateriaPrima.costo,
          }));
          this.dataSourceMateriaPrima = materiaPrima;
          this.selectMateriaPrima = materiaPrima[0].id;

  },
  error: err => console.log(err)
}
);

this.gastoMateriaPrimaService.getProducto().subscribe(
  {
    next: response =>{
      const DataProducto = response;

      const producto:any[] = DataProducto.map(
        (DataProducto:any)=>({
          id:DataProducto.id,
          nombre:DataProducto.nombre,
        }));
        this.dataSourceProducto = producto;
        this.selectProducto = producto[0].id;

},
error: err => console.log(err)
  }
);
}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GastoMateriaPrimaGet(gastoMateriaPrima:any){
    console.log(gastoMateriaPrima);
    this.selectMateriaPrima = gastoMateriaPrima.materiaPrima_Id;
    this.selectProducto = gastoMateriaPrima.producto_Id;
    this.regGastoMateriaPrimaGet = gastoMateriaPrima;
  }

  agregarGastoMateriaPrima(){
    this.regGastoMateriaPrima.materiaPrima_Id = Number(this.selectMateriaPrima);
    this.regGastoMateriaPrima.producto_Id = Number(this.selectProducto);
    for(let i = 0; i < this.dataSourceMateriaPrima.length; i++){
      if(this.dataSourceMateriaPrima[i].id == Number(this.selectMateriaPrima)){
        console.log(this.dataSourceMateriaPrima[i].id);
        this.regGastoMateriaPrima.costo = this.dataSourceMateriaPrima[i].costo * this.regGastoMateriaPrima.cantidad;
      }
    }
    this.gastoMateriaPrimaService.agregarGastoMateriaPrima(this.regGastoMateriaPrima).subscribe(
      {
        next: ()=>console.log('GastoMateriaPrima Agregado'),
        error: (err) => console.log(err),
        complete: () => console.info()})

        this.dataSource.data.push(this.regGastoMateriaPrima);
        
        this.regGastoMateriaPrima = {
          id:0,
          cantidad:0,
          costo:0,
          materiaPrima_Id:0,
          producto_Id:0,
        }
        document.getElementById('closeAddModal')?.click();
        this.dataSource.data = this.dataSource.data;
      }


  editarGastoMateriaPrima(){
    this.regGastoMateriaPrimaGet.materiaPrima_Id = Number(this.selectMateriaPrima);
    this.regGastoMateriaPrimaGet.producto_Id = Number(this.selectProducto);
    for(let i = 0; i < this.dataSourceMateriaPrima.length; i++){
      if(this.dataSourceMateriaPrima[i].id == Number(this.selectMateriaPrima)){
        console.log(this.dataSourceMateriaPrima[i].id);
        this.regGastoMateriaPrimaGet.costo = this.dataSourceMateriaPrima[i].costo * this.regGastoMateriaPrimaGet.cantidad;
      }
    }
    this.gastoMateriaPrimaService.editarGastoMateriaPrima(this.regGastoMateriaPrimaGet).subscribe(
      {
        next: ()=>console.log('GastoMateriaPrima Editado'),
        error: (err) => console.log(err),
        complete: () => console.info()})

        const index = this.dataSource.data.findIndex((data: any) => data.id === this.regGastoMateriaPrimaGet.id);
        if(index !== -1){
          this.dataSource.data[index] = this.regGastoMateriaPrimaGet;
        }

        this.regGastoMateriaPrimaGet = {
          id:0,
          cantidad:0,
          costo:0,
          materiaPrima_Id:0,
          producto_Id:0,
        }

        this.dataSource.data = this.dataSource.data;
        document.getElementById('closeEditModal')?.click();
      }

  eliminarGastoMateriaPrima(gastoMateriaPrima: any){
    this.gastoMateriaPrimaService.eliminarGastoMateriaPrima(gastoMateriaPrima.id).subscribe(
      {
        next: ()=>console.log('GastoMateriaPrima Eliminado'),
        error: (err) => console.log(err),
        complete: () => console.info()})

        const index = this.dataSource.data.findIndex((data:any) => data.id === this.regGastoMateriaPrimaGet.id);
        if(index !== -1){
          this.dataSource.data.splice(index,1);
        }

        this.dataSource.data = this.dataSource.data;
        document.getElementById('closeDeleteModal')?.click();
      }
  



}