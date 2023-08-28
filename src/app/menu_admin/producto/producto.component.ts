import { Component,OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.Interface';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'imagen', 'medidas', 'total', 'stock', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  regProducto:Producto = {
    id:0,
    nombre:'',
    descripcion:'',
    stock:0,
    altura:0,
    ancho:0,
    largo:0,
    imagen:'',
    total:0,
    estatus:1,
  }

  regProductoEdit:Producto = {
    id:0,
    nombre:'',
    descripcion:'',
    stock:0,
    altura:0,
    ancho:0,
    largo:0,
    imagen:'',
    total:0,
    estatus:0,
  }


  constructor(public productoService:ProyectoApiService,private router:Router){
    this.dataSource = new MatTableDataSource<Producto>([]);
  }

  imagePreview: string | ArrayBuffer | null = null;

  handleImageChange(event: Event) {
      const target = event.target as HTMLInputElement;
      const file: File | null = (target.files as FileList)[0];

      if (file) {
          const reader = new FileReader();
          reader.onload = () => {
              this.imagePreview = reader.result;
              //this.regProducto.imagen = reader.result as string; // Assign Base64 to your producto model
           // console.log(this.imagePreview);
            };
          reader.readAsDataURL(file);
      }
  }
  
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosProducto();
}

  obtenerDatosProducto(){
    this.productoService.getProducto().subscribe(
      {
        next: response=>{
          const DataProducto = response;

          const producto:Producto[]= DataProducto.map((DataProducto: any)=>({
            id:DataProducto.id,
            nombre:DataProducto.nombre,
            descripcion:DataProducto.descripcion,
            stock:DataProducto.stock,
            altura:DataProducto.altura,
            ancho:DataProducto.ancho,
            largo:DataProducto.largo,
            imagen:DataProducto.imagen,
            total:DataProducto.total,
            estatus:DataProducto.estatus,
          }));

      this.dataSource.data=producto;
    },
    error: error=>console.log(error)
  }
    );
}

 applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

 limpiarDatos(){
  this.regProducto={
    id:0,
    nombre:'',
    descripcion:'',
    stock:0,
    altura:0,
    ancho:0,
    largo:0,
    imagen:'',
    total:0,
    estatus:1,
  }
  this.imagePreview = null;
 }

  editProductoGet(producto: any){
    //console.log(producto)
    this.regProductoEdit={
      id:producto.id,
      nombre:producto.nombre,
      descripcion:producto.descripcion,
      stock:producto.stock,
      altura:producto.altura,
      ancho:producto.ancho,
      largo:producto.largo,
      imagen:producto.imagen,
      total:producto.total,
      estatus:producto.estatus,
    }
    //console.log(this.regProductoEdit)
  }

  agregarProducto(){
    this.regProducto.imagen = this.imagePreview as string;
    this.productoService.agregarProducto(this.regProducto).subscribe(
      {
        next:()=>console.log(),
        error:(e)=> console.error(e),
        complete:()=>console.info()})
        this.dataSource.data.push(this.regProducto);

        this.regProducto={
          id:0,
          nombre:'',
          descripcion:'',
          stock:0,
          altura:0,
          ancho:0,
          largo:0,
          imagen:'',
          total:0,
          estatus:1,
        }
        this.imagePreview = null;
        this.router.navigate(['producto']);
        document.getElementById('closeAddModal')?.click();
  }

  editarProducto(){
    if(this.imagePreview != null){
    this.regProductoEdit.imagen = this.imagePreview as string;
    }
    this.productoService.editarProducto(this.regProductoEdit).subscribe(
      {
        next:()=>console.log(),
      error:(e)=> console.error(e),
      complete:()=>console.info()})

      const index = this.dataSource.data.findIndex((e:any)=>e.id==this.regProductoEdit.id);
      if (index !== -1) {
        console.log(this.regProductoEdit);
        this.dataSource.data[index] = this.regProductoEdit;
      }
      this.regProductoEdit={
        id:0,
        nombre:'',
        descripcion:'',
        stock:0,
        altura:0,
        ancho:0,
        largo:0,
        imagen:'',
        total:0,
        estatus:0,
      }
      this.imagePreview = null;
      this.dataSource.data = this.dataSource.data;
      document.getElementById('closeEditModal')?.click();
  }

  eliminarProducto(producto: any){
    this.productoService.eliminarProducto(producto.id).subscribe(
      {
        next:()=>console.log(),
        error:(e)=> console.error(e),
        complete:()=>console.info()})
        const index = this.dataSource.data.findIndex((e:any)=>e.id==producto.id);
        if (index !== -1) {
          this.dataSource.data.splice(index, 1);
        }
        this.dataSource.data = this.dataSource.data;
        document.getElementById('closeDeleteModal')?.click();
  }


  
}
