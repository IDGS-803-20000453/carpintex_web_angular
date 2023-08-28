import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { compras, CompraConNombres, MateriaPrimaSelect, ProveedorSelect } from 'src/app/interfaces/Home.Interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

declare var Toastify: any;
declare var Swal: any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  displayedColumns: string[] = ['cantidad', 'total', 'fecha', 'nombreMateriaPrima', 'nombreProveedor', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<CompraConNombres>;
  dataSourceRegCompras: MatTableDataSource<compras>;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  regCompras: compras = {
    id: 0,
    cantidad: 0,
    total: 0,
    fecha: '', // Asegúrate de que esta propiedad tenga el formato correcto de fecha (Ejemplo: '2023-08-13')
    materiaPrima_id: 0,
    proveedor_id: 0,
  }

  regCompraConNombres: CompraConNombres = {
    compra: {
      id: 0,
      cantidad: 0,
      total: 0,
      fecha: '',
      materiaPrima_id: 0,
      proveedor_id: 0,
    },
    nombreMateriaPrima: '',
    nombreProveedor: '',
  }

  selectedItemEdit: any;
  selectedItemDelete: any;
  selectedCompraId: number = 0;
  proveedores: any[] = [];
materiasPrimas: any[] = [];
materiasPrimasSelect: MateriaPrimaSelect[] = [];
proveedoresSelect: ProveedorSelect[] = [];



  constructor(public comprasService: ProyectoApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<CompraConNombres>([]);
    this.dataSourceRegCompras = new MatTableDataSource<compras>([]); // Inicializa el nuevo dataSource

  }

  //constructor para compras
  

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosCompras();
    this.comprasService.getNombresProveedores().subscribe(data => {
      console.log("Proveedor individual:", data[0]); // Inspecciona el primer proveedor
      this.proveedoresSelect = data;
    });
    this.comprasService.getNombresMateriaPrima().subscribe(data => {
      console.log("Materia prima individual:", data[0]); // Inspecciona la primera materia prima
      this.materiasPrimasSelect = data;
    });
}
formatDate(input: string): string {
  const [year, month, day] = input.split('-');
  return `${day}/${month}/${year}`;
}

  

  obtenerDatosCompras() {
    this.comprasService.getCompraConNombres().subscribe(
      {
        next: response => {
          const dataCompras = response as CompraConNombres[]; // Cambia a la interfaz correcta
          this.dataSource.data = dataCompras;
        },
        error: error => console.log(error)
      }
    );
  }

  openEditModal(item: any) {
    console.log('Item seleccionado:', item);
    this.selectedItemEdit = item;
    this.selectedCompraId = item.compra.id; // Aquí es donde has cambiado
    this.comprasService.getCompra(this.selectedCompraId).subscribe({
        next: response => {
            console.log('Respuesta del servidor:', response);
            
            this.regCompras = response;
            this.regCompras.fecha = response.fecha.split('T')[0];
        this.regCompras.cantidad = response.cantidad;
        this.regCompras.total = response.total;
            this.obtenerDatosCompras();
        },
        error: error => console.log(error)
    });
}

  
  
openDeleteModal(compra: any) {
  this.selectedCompraId = compra.compra.id;
  console.log('Compra seleccionada:', this.selectedCompraId);
}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    const compraData = data.compra; // Extraemos los datos de la compra

    // Comprobamos las columnas en displayedColumns
    for (const column of this.displayedColumns) {
      let value;
      if (column in compraData) {
        value = compraData[column]; // Usamos compraData si la columna está dentro de 'compra'
      } else {
        value = data[column]; // De lo contrario, usamos data directamente
      }

      if (value && value.toString().toLowerCase().includes(filter)) {
        return true;
      }
    }

    return false; // Devuelve falso si ninguna columna coincide con el filtro
  };

  this.dataSource.filter = filterValue;

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}




  agregarCompra() {
    console.log('Datos a enviar:', this.regCompras);
    this.comprasService.verificarMateriaPrimaProveedor(this.regCompras.materiaPrima_id,this.regCompras.proveedor_id).subscribe(
      {
        next:(response:any)=>{
          if(response){
            this.regCompras.total=this.regCompras.cantidad*response.costo

            Swal.fire({
              title: 'Quieres realizar la compra?',
              text: "El total de compra es de: $ "+this.regCompras.total,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Aceptar'
            }).then((result: any) => {
              if (result.isConfirmed) {
                this.comprasService.agregarCompra(this.regCompras).subscribe(
                  {
                    next: response => {
                      this.obtenerDatosCompras();
                      document.getElementById('closeAddModal')?.click();
                    },
                    error: error => console.log('Error en la solicitud:', error)
                  }
                );
              }
            })
          }
        },
        error: error => {Toastify({
          text: error.error.mensaje,
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
          backgroundColor: "red",
        }).showToast()
      }
    }
    )
  


  }
  @ViewChild('f') formulario!: NgForm;
  limpiarCompra() {
    setTimeout(() => {
      this.regCompraConNombres = {
        compra: {
          id: 0,
          cantidad: 0,
          total: 0,
          fecha: '',
          materiaPrima_id: 0,
          proveedor_id: 0,
        },
        nombreMateriaPrima: '',
        nombreProveedor: '',
      };
      this.regCompras = {
        id: 0,
        cantidad: 0,
        total: 0,
        fecha: '',
        materiaPrima_id: 0,
        proveedor_id: 0,
      };
      this.formulario.resetForm(); // Esto restablecerá el formulario, incluyendo las validaciones
    }, 500); // Espera 500ms para que el modal se cierre antes de restablecer el formulario
  }
  


  editarCompra() {
    this.comprasService.actualizarCompra(this.regCompras.id, this.regCompras).subscribe(
      {
        next: () => {
          console.log('Compra actualizada correctamente');
          this.obtenerDatosCompras();
          //ponerle el data-dismiss al modal para que se cierre
          document.getElementById('closeEditModal')?.click();
          

        },
        error: error => console.log(error),
        complete: () => console.info('Compra actualizada')
      }
    );
    const index = this.dataSourceRegCompras.data.findIndex((item: any) => item.id === this.regCompras.id);
    console.log(index);
    if (index !== -1) {
      this.dataSourceRegCompras .data[index] = this.regCompras;
    }
  
    this.regCompras = {
      id: 0,
      cantidad: 0,
      total: 0,
      fecha: '',
      materiaPrima_id: 0,
      proveedor_id: 0,
    };
    this.dataSourceRegCompras.data = [...this.dataSourceRegCompras.data];
  }
  

eliminarCompra(){
  console.log(this.selectedCompraId)
  this.comprasService.eliminarCompra(this.selectedCompraId).subscribe(
{
  next:()=>{
    console.log('Compra eliminada correctamente');
    this.obtenerDatosCompras();
    document.getElementById('closeDeleteModal')?.click();
  },
  error: error => console.log(error),
  complete:()=>console.info('Compra eliminada')})
  const index = this.dataSource.data.findIndex((item:any)=>item.id===this.selectedCompraId);
  console.log(index);
  if(index!=-1){
    this.dataSource.data.splice(index,1);
  }
  this.dataSource.data=[...this.dataSource.data];
}
}