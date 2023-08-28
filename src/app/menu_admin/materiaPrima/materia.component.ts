import { Component,OnInit, ViewChild } from '@angular/core';
import {ProyectoApiService} from '../../proyecto-api.service';
import {MateriaPrima} from '../../interfaces/materiaPrima.Interface';

import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'costo', 'stock', 'tipoMateriaPrima_Id', 'proveedor_Id', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<MateriaPrima>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  selectTipoMateriaPrima:any;
  selectProveedor:any;

  regMateriaPrima:MateriaPrima = {
    id:0,
    nombre:'',
    costo:0,
    stock:0,
    tipoMateriaPrima_Id:0,
    proveedor_Id:0,
  }

  regMateriaPrimaGet:MateriaPrima = {
    id:0,
    nombre:'',
    costo:0,
    stock:0,
    tipoMateriaPrima_Id:0,
    proveedor_Id:0,
  }
  

  dataSourceTipoMateriaPrima:any=[];
  dataSourceProveedor:any=[];
  constructor(public materiaPrimaService:ProyectoApiService,private router:Router){
    this.dataSource = new MatTableDataSource<MateriaPrima>([]);
  }

 
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosMateriaPrima();
  }

  obtenerDatosMateriaPrima(){
    this.materiaPrimaService.getMateriaPrima().subscribe(
      {
        next: response=>{
          const DataMateriaPrima = response;

          const materiaPrima:MateriaPrima[]= DataMateriaPrima.map((DataMateriaPrima: any)=>({
            id:DataMateriaPrima.id,
            nombre:DataMateriaPrima.nombre,
            costo:DataMateriaPrima.costo,
            stock:DataMateriaPrima.stock,
            tipoMateriaPrima_Id:DataMateriaPrima.tipoMateriaPrima_id,
            proveedor_Id:DataMateriaPrima.proveedor_id,
          }));

      this.dataSource.data=materiaPrima;
    },
    error: error=>console.log(error)
  }
    );

    this.materiaPrimaService.getTipoMateriaPrima().subscribe(
      {
        next: response=>{
          const DataTipoMateriaPrima = response;

          const tipoMateriaPrima:any[]= DataTipoMateriaPrima.map((DataTipoMateriaPrima: any)=>({
            id:DataTipoMateriaPrima.id,
            tipo:DataTipoMateriaPrima.tipo,
            unidadMedida:DataTipoMateriaPrima.unidadMedida,
          }));
          this.dataSourceTipoMateriaPrima=tipoMateriaPrima;
          this.selectTipoMateriaPrima=tipoMateriaPrima[0].id;
        },
        error: error=>console.log(error)
      }
    );

    this.materiaPrimaService.getProveedor().subscribe(
      {
        next: response=>{
          const DataProveedor = response;

          const proveedor:any[]= DataProveedor.map((DataProveedor: any)=>({
            id:DataProveedor.id,
            nombre:DataProveedor.nombre,
            direccion:DataProveedor.direccion,
            telefono:DataProveedor.telefono,
            email:DataProveedor.email,
          }));
          this.dataSourceProveedor=proveedor;
          this.selectProveedor=proveedor[0].id;
        },
        error: error=>console.log(error)
      }
    );
  }



  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  MateriaPrimaGet(materia: any){
    //console.log(materia)
    this.selectTipoMateriaPrima=materia.tipoMateriaPrima_Id;
    this.selectProveedor=materia.proveedor_Id;
    this.regMateriaPrimaGet={
      id:materia.id,
      nombre:materia.nombre,
      costo:materia.costo,
      stock:materia.stock,
      tipoMateriaPrima_Id:materia.tipoMateriaPrima_Id,
      proveedor_Id:materia.proveedor_Id,
    }
    //console.log(this.regMateriaPrimaEdit)
  }
  

  agregarMateriaPrima(){
    this.regMateriaPrima.tipoMateriaPrima_Id=Number(this.selectTipoMateriaPrima);
    this.regMateriaPrima.proveedor_Id=Number(this.selectProveedor);
    this.materiaPrimaService.agregarMateriaPrima(this.regMateriaPrima).subscribe(
    {
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})
     // console.log('Materia prima agregada');
      //this.dataSource.push(this.regMateriaPrima); 
      this.dataSource.data.push(this.regMateriaPrima);

      this.regMateriaPrima={
        id:0,
        nombre:'',
        costo:0,
        stock:0,
        tipoMateriaPrima_Id:0,
        proveedor_Id:0,
      }
      this.obtenerDatosMateriaPrima();

      document.getElementById('closeAddModal')?.click();
      this.obtenerDatosMateriaPrima();
      
  }

  editarMateriaPrima(){
    this.regMateriaPrimaGet.tipoMateriaPrima_Id=Number(this.selectTipoMateriaPrima);
    this.regMateriaPrimaGet.proveedor_Id=Number(this.selectProveedor);
    //console.log(this.regMateriaPrimaGet)
    this.materiaPrimaService.editarMateriaPrima(this.regMateriaPrimaGet).subscribe(
    {
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})
     //const index = this.dataSource.findIndex((item:any) => item.id === this.regMateriaPrimaEdit.id);
      const index = this.dataSource.data.findIndex((item:any) => item.id === this.regMateriaPrimaGet.id);
      //console.log(index);
     if (index !== -1) {
        this.dataSource.data[index] = this.regMateriaPrimaGet;
      }
      this.regMateriaPrimaGet={
        id:0,
        nombre:'',
        costo:0,
        stock:0,
        tipoMateriaPrima_Id:0,
        proveedor_Id:0,
      }
      this.dataSource.data = this.dataSource.data;
      document.getElementById('closeEditModal')?.click();
  }

  eliminarMateriaPrima(materia: any){
    //console.log(materia.id)
    this.materiaPrimaService.eliminarMateriaPrima(materia.id).subscribe(
    {
      next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})
      const index = this.dataSource.data.findIndex((item:any) => item.id === materia.id);
      //console.log(index);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
      }

      this.dataSource.data = this.dataSource.data;
      document.getElementById('closeDeleteModal')?.click();
  }


}
