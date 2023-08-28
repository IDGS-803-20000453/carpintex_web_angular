import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { Proveedor } from 'src/app/interfaces/Home.Interface';



@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  displayedColumns: string[] = ['nombre','email', 'direccion', 'telefono', 'acciones'];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  dataSource: MatTableDataSource<Proveedor>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  regProveedor: Proveedor = {
    id: 0,
    nombre: '',
    direccion: '',
    telefono: '',
    email: '',
  }

  regProveedorForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]), // Asegura un número de 10 dígitos
    email: new FormControl('', [Validators.required, Validators.email]), // Asegura el formato correcto del correo electrónico
  });
  
  
  
  selectedItemEdit: any;
  selectedItemDelete: any;
  selectedProveedorId: number = 0;

  constructor(public proveedorService: ProyectoApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<Proveedor>([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.obtenerDatosProveedores();
  }

  obtenerDatosProveedores() {
    this.proveedorService.getProveedor().subscribe(response => {
      const dataProveedores = response as Proveedor[];
      const observables = dataProveedores.map(proveedor => 
        this.canDeleteProveedor(proveedor.id).pipe(
          tap(response => {
            proveedor.canDelete = response.canDelete;
            proveedor.deleteMessage = response.message; // Asegúrate de que esto esté aquí
          })
        )
      );
      forkJoin(observables).subscribe(() => {
        this.dataSource.data = dataProveedores;
      });
    });
  }
  
  
  
  
  

  canDeleteProveedor(id: number): Observable<{ canDelete: boolean; message?: string }> {
    return this.proveedorService.canDelete(id);
  }
  
  
  
  

  getErrorMessage(controlName: string) {
    const control = this.regProveedorForm.get(controlName);
    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (control?.hasError('minlength')) return 'El campo debe tener al menos X caracteres';
    if (control?.hasError('maxlength')) return 'El campo debe tener como máximo X caracteres';
    if (controlName === 'telefono' && control?.hasError('pattern')) return 'Debe ser un número de 10 dígitos';
    if (controlName === 'email' && control?.hasError('email')) return 'Debe tener el formato correcto (ejemplo@dominio.com)';
    return '';
  }
  
  
  

  openEditModal(proveedor: any) {
    this.selectedItemEdit = proveedor;
    this.selectedProveedorId = proveedor.id;
    this.proveedorService.getProveedorId(this.selectedProveedorId).subscribe({
      next: response => {
        this.regProveedor = response;
      },
      error: error => console.log(error)
    });

  }

  openDeleteModal(proveedor: any) {
    this.selectedItemDelete = proveedor;
    this.selectedProveedorId = proveedor.id;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    this.dataSource.filterPredicate = (data: Proveedor, filter: string) => {
      // Comprobamos las columnas en displayedColumns
      for (const column of this.displayedColumns) {
        const value = (data as any)[column]; // Usamos la aserción 'as any' para evitar el error
  
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
  
  

  agregarProveedor() {
    this.proveedorService.agregarProveedor(this.regProveedor).subscribe(
      {
        next: () => {
          this.obtenerDatosProveedores();
          document.getElementById('closeAddModal')?.click();
        },
        error: error => console.log(error)
      }
    );
  }

  editarProveedor() {
    this.proveedorService.actualizarProveedor(this.regProveedor.id, this.regProveedor).subscribe(
      {
        next: () => {
          this.obtenerDatosProveedores();
          document.getElementById('closeEditModal')?.click();
          this.limpiarProveedor(); // Llama al método aquí para limpiar el formulario después de una edición exitosa
        },
        error: error => console.log(error)
      }
    );
  }
  
  @ViewChild('f') formulario!: NgForm;

  limpiarProveedor() {
    this.regProveedor = {
      id: 0,
      nombre: '',
      direccion: '',
      telefono: '',
      email: '',
    };
  
    setTimeout(() => {
      this.formulario.resetForm(); // Esto restablecerá el formulario, incluyendo las validaciones
    }, 500); // Espera 500ms para que el modal se cierre antes de restablecer el formulario
  }
  
  
  
  
  

  eliminarProveedor() {
    console.log('Proveedor a eliminar:', this.selectedProveedorId);
    this.proveedorService.eliminarProveedor(this.selectedProveedorId).subscribe(
      {
        next: () => {
          this.obtenerDatosProveedores();
          document.getElementById('closeDeleteModal')?.click();
          this.obtenerDatosProveedores();

        },
        error: error => console.log(error)
      }
    );
  }
}
