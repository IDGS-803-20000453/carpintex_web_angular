import { Component, OnInit,ViewChild } from '@angular/core';
import { TipoMateriaPrima } from 'src/app/interfaces/tipoMateriaPrima.Interface';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tipo-materia-prima',
  templateUrl: './tipo-materia-prima.component.html',
  styleUrls: ['./tipo-materia-prima.component.css']
})
export class TipoMateriaPrimaComponent {
 
  displayedColumns: string[] = ['tipo', 'Unidad Medida', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<TipoMateriaPrima>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  regTipoMateriaPrima:TipoMateriaPrima = {
    id:0,
    tipo:'',
    unidadMedida:''
  }

  regTipoMateriaPrimaGet:TipoMateriaPrima = {
    id:0,
    tipo:'',
    unidadMedida:''
  }

  constructor(public tipoMateriaPrimaService:ProyectoApiService,private router:Router){
    this.dataSource = new MatTableDataSource<TipoMateriaPrima>([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosTipoMateriaPrima();
  }

  obtenerDatosTipoMateriaPrima(){
    this.tipoMateriaPrimaService.getTipoMateriaPrima().subscribe(
      {
        next: response => {
          const DataTipoMateriaPrima = response;
          
          const tipoMateriaPrima:TipoMateriaPrima[] = DataTipoMateriaPrima.map((DataTipoMateriaPrima: any) => ({
            id: DataTipoMateriaPrima.id,
            tipo: DataTipoMateriaPrima.tipo,
            unidadMedida: DataTipoMateriaPrima.unidadMedida
          }));

          this.dataSource.data = tipoMateriaPrima;
        },
        error: error=>console.log(error)
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
  }

  tipoMateriaPrimaGet(tipoMateriaPrima: any){
    this.regTipoMateriaPrimaGet = {
      id:tipoMateriaPrima.id,
      tipo:tipoMateriaPrima.tipo,
      unidadMedida:tipoMateriaPrima.unidadMedida
    }
  }

  agregarTipoMateriaPrima(){
    this.tipoMateriaPrimaService.agregarTipoMateriaPrima(this.regTipoMateriaPrima).subscribe(
      {
        next:() => console.log(),
        error: (e) => console.log(e),
        complete:() => console.info()})
        this.dataSource.data.push(this.regTipoMateriaPrima);

        this,this.regTipoMateriaPrima = {
          id:0,
          tipo:'',
          unidadMedida:''
        }

        document.getElementById('closeAddModal')?.click();
        this.obtenerDatosTipoMateriaPrima();


  }



  editarTipoMateriaPrima(){
    this.tipoMateriaPrimaService.editarTipoMateriaPrima(this.regTipoMateriaPrimaGet).subscribe(
      {
        next:() => console.log(),
        error: (e) => console.log(e),
        complete:() => console.info()})
        
        const index = this.dataSource.data.findIndex((e : any) => e.id === this.regTipoMateriaPrimaGet.id);
        if (index != -1) {
          console.log(this.regTipoMateriaPrimaGet)
          this.dataSource.data[index] = this.regTipoMateriaPrimaGet;
        }

        this.regTipoMateriaPrimaGet = {
          id:0,
          tipo:'',
          unidadMedida:''
        }
        this.dataSource.data = this.dataSource.data;
        document.getElementById('closeEditModal')?.click();
  }

  eliminarTipoMateriaPrima(tipoMateriaPrima: any){
    this.tipoMateriaPrimaService.eliminarTipoMateriaPrima(tipoMateriaPrima.id).subscribe(
      {
        next:() => console.log(),
        error: (e) => console.log(e),
        complete:() => console.info()})
        const index = this.dataSource.data.findIndex((e : any) => e.id === tipoMateriaPrima.id);
        if (index != -1) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource.data = this.dataSource.data;
        document.getElementById('closeDeleteModal')?.click();
  }
    


}
