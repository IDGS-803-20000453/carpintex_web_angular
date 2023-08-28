import { Component,OnInit} from '@angular/core';
import {ProyectoApiService} from '../../proyecto-api.service';
import { finanzasProductosVenta } from 'src/app/interfaces/finanzasProductosVenta.Interface';
import { finanzasUsuariosCompra} from 'src/app/interfaces/finanzasUsuariosCompra.Interface';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Producto } from 'src/app/interfaces/producto.Interface';
import { MateriaPrima } from 'src/app/interfaces/materiaPrima.Interface';
import { TablaTotalProductos, TablaTotalUsuarios, TablaTotalVentas } from 'src/app/interfaces/TablaTotalUsuarios.interface';
import { scaleOrdinal } from 'd3-scale';
import { ColorHelper } from '@swimlane/ngx-charts';



@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrls: ['./finanzas.component.css']
})
export class FinanzasComponent implements OnInit{
  

  regVEntaProducto:finanzasProductosVenta = {
    id:0,
    idProducto:0,
    nombreProducto:'',
    cantidadTotal:0,
    mes:0,
    anio:0,
  }

  view: any[] = [700, 400]; // Tamaño de la gráfica
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  colorScheme2: any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  

  ventasProductosData: any[] = [];
  topClientesData: any[] = [];


  ventasData: any[] = [
    {
      "name": "Producto 1",
      "value": 12
    },
    {
      "name": "Producto 2",
      "value": 19
    },
    // más datos
  ];
  //selected de meses
  selectedMes:number=0;

  OptionsMeses: any[] = [
    {value: 5, viewValue: 'Mayo'},
    {value: 6, viewValue: 'Junio'},
    {value: 7, viewValue: 'Julio'},
    {value: 8, viewValue: 'Agosto'},
  ];

  dataSourceProducto:any=[];
  dataSourceMateriaPrima:any=[];
  dataSourceProductoVenta:finanzasProductosVenta[]=[];
  dataSourceUsuariosCompra:finanzasUsuariosCompra[]=[];

  constructor(public finanzasService:ProyectoApiService,private router:Router) {}

  ngOnInit(): void {
    this.obtenerDatos()
    this.obtenerVentasTotales(); // Añadir esta línea
    this.obtenerVentasProductos(); // Llamada a la nueva función
    this.obtenerTopClientes() 
  }
  obtenerVentasProductos() {

    //if de que si el mes es mayor a 0 entonces se hace la peticion
    if(this.selectedMes>0){

      this.finanzasService.getTablaTotalProductos(this.selectedMes).subscribe({
        next: (response: TablaTotalProductos[]) => {
          // Convertir a número antes de comparar
          const mesSeleccionado = Number(this.selectedMes);
          
          // Filtrar la respuesta por el mes seleccionado
          const filteredResponse = response.filter(p => p.mes === mesSeleccionado);
          
          this.ventasProductosData = filteredResponse.map(p => ({
            name: p.nombre,
            value: p.cantidadTotal * p.precioTotal
          }));
        },
        error: err => console.error(err),
      });
    }

    else if (this.selectedMes == 0) {
      this.finanzasService.getAllTablaTotalProductos().subscribe({
        next: (response: TablaTotalProductos[]) => {
          this.ventasProductosData = response.map(p => ({
            name: p.nombre,
            value: p.cantidadTotal * p.precioTotal
          }));
        },
        error: err => console.error(err),
      });
    }
    

    
  }
  
  
  

  obtenerTopClientes() {

    //if de que si selecciono el mes 0 entonces se hace la peticion
    if(this.selectedMes==0){
      this.finanzasService.getAllTablaTotalUsuarios().subscribe({
        next: (response: TablaTotalUsuarios[]) => {
          const clientesAgrupados: { [nombre: string]: { totalPrecio: number, numeroCompras: number } } = {};
    
          response.forEach(cliente => {
            if (!clientesAgrupados[cliente.nombre]) {
              clientesAgrupados[cliente.nombre] = { totalPrecio: 0, numeroCompras: 0 };
            }
            clientesAgrupados[cliente.nombre].totalPrecio += cliente.totalPrecio;
            clientesAgrupados[cliente.nombre].numeroCompras += cliente.numeroCompras;
          });
    
          const topClientes = Object.entries(clientesAgrupados)
            .map(([nombre, { totalPrecio, numeroCompras }]) => ({ nombre, totalPrecio, numeroCompras }))
            .sort((a, b) => b.totalPrecio - a.totalPrecio)
            .slice(0, 3);
    
          this.topClientesData = topClientes.map(c => ({
            name: `${c.nombre} (${c.numeroCompras} compras)`, // Aquí puedes formatear el nombre como prefieras
            value: c.totalPrecio 
          }));
        },
        error: err => console.error(err),
      });

      //if de que si el mes es mayor a 0 entonces se hace la peticion de ese mes con getTablaTotalUsuariosPorMes
    
    }else if(this.selectedMes > 0) {
      this.finanzasService.getTablaTotalUsuariosPorMes(this.selectedMes).subscribe({
        next: (response: TablaTotalUsuarios[]) => {
          // Convertir a número antes de comparar
          const mesSeleccionado = Number(this.selectedMes);
    
          // Filtrar la respuesta por el mes seleccionado
          const filteredResponse = response.filter(u => u.mes === mesSeleccionado);
          
          const clientesAgrupados: { [nombre: string]: { totalPrecio: number, numeroCompras: number } } = {};
    
          filteredResponse.forEach(cliente => {
            if (!clientesAgrupados[cliente.nombre]) {
              clientesAgrupados[cliente.nombre] = { totalPrecio: 0, numeroCompras: 0 };
            }
            clientesAgrupados[cliente.nombre].totalPrecio += cliente.totalPrecio;
            clientesAgrupados[cliente.nombre].numeroCompras += cliente.numeroCompras;
          });
    
          const topClientes = Object.entries(clientesAgrupados)
            .map(([nombre, { totalPrecio, numeroCompras }]) => ({ nombre, totalPrecio, numeroCompras }))
            .sort((a, b) => b.totalPrecio - a.totalPrecio)
            .slice(0, 3);
    
          this.topClientesData = topClientes.map(c => ({
            name: `${c.nombre} (${c.numeroCompras} compras)`,
            value: c.totalPrecio
          }));
        },
        error: err => console.error(err),
      });
    }
    
}
  
  
  

obtenerVentasTotales() {
  this.finanzasService.getTablaTotalVentas().subscribe({
    next: (response: TablaTotalVentas[]) => {
      // Si selectedMes es 0, procesar la respuesta completa
      if (this.selectedMes == 0) {
        this.ventasData = response.map(v => {
          const nombreMes = this.OptionsMeses.find(option => option.value === v.mes)?.viewValue || `Mes ${v.mes}`;
          return {
            name: nombreMes,
            value: v.numeroVentas // Usando el campo correcto desde tu interfaz
          };
        });
      }
      // Si selectedMes es mayor a 0, filtrar la respuesta por el mes seleccionado
      else if (this.selectedMes > 0) {
        const mesSeleccionado = Number(this.selectedMes);
        const filteredResponse = response.filter(v => v.mes === mesSeleccionado);
        this.ventasData = filteredResponse.map(v => {
          const nombreMes = this.OptionsMeses.find(option => option.value === v.mes)?.viewValue || `Mes ${v.mes}`;
          return {
            name: nombreMes,
            value: v.numeroVentas // Usando el campo correcto desde tu interfaz
          };
        });
      }
    },
    error: err => console.error(err),
  });
}

  
  
  
  
 
  

  obtenerDatos(){
    this.finanzasService.getFinanzasProductosVenta(this.selectedMes).subscribe(
      {
        next: response =>{
          const DataProductoVenta = response;
          
          const ventasProducto:finanzasProductosVenta[] = DataProductoVenta.map(
            (productoVenta: any) => ({
              id: productoVenta.id,
              idProducto: productoVenta.idProducto,
              nombreProducto: productoVenta.nombre,
              cantidadTotal: productoVenta.cantidadTotal,
              mes: productoVenta.mes,
              anio: productoVenta.anio,
            }));
            this.dataSourceProductoVenta = ventasProducto;
        },
        error: err => console.error(err),
      }
    );
    this.finanzasService.getFinanzasUsuariosCompra(this.selectedMes).subscribe(
      {
        next: response =>{
          const DataUsuariosCompra = response;
          
          const usuariosCompra:finanzasUsuariosCompra[] = DataUsuariosCompra.map(
            (usuarioCompra: any) => ({
              id: usuarioCompra.id,
              idUsuario: usuarioCompra.idUsuario,
              nombreUsuario: usuarioCompra.nombreUsuario,
              cantidadTotal: usuarioCompra.cantidadTotal,
              totalPrecio: usuarioCompra.totalPrecio,
              mes: usuarioCompra.mes,
              anio: usuarioCompra.anio,
            }));
            this.dataSourceUsuariosCompra = usuariosCompra;
        },
        error: err => console.error(err),
      }
    );
    this.finanzasService.getProductos().subscribe(
      {
        next: response =>{
          const DataProductos = response;

          const productos:any[] = DataProductos.map(
            (producto: any) => ({
              id: producto.id,
              nombre: producto.nombre,
              stock: producto.stock,
              total: producto.total,
            }));
            this.dataSourceProducto = productos;
        },
        error: err => console.error(err),
      }
    );
    this.finanzasService.getMateriaPrima().subscribe(
      {
        next: response =>{
          const DataMateriaPrima = response;

          const materiaPrima:any[] = DataMateriaPrima.map(
            (materiaPrima: any) => ({
              id: materiaPrima.id,
              nombre: materiaPrima.nombre,
              stock: materiaPrima.stock,
            }));
            this.dataSourceMateriaPrima = materiaPrima;
        },
        error: err => console.error(err),
      }
    );

    
    

    //this.crearGraficoBarras();
   // this.crearGraficoBarras();
  }



  

  handleChangedMes() {
    console.log("Mes seleccionado:", this.selectedMes); // Depuración
    this.obtenerDatos();
    this.obtenerVentasProductos();
    this.obtenerVentasTotales();
    this.obtenerTopClientes();
    console.log("Datos actualizados para el mes:", this.selectedMes); // Depuración
  }
  
  

  
  

  

}
