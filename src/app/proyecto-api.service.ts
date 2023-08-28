import { Injectable } from '@angular/core';
import { AlumnosUtl, Pedido, Proveedor, Usuario, compras } from './interfaces/Home.Interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './interfaces/producto.Interface';
import { fabricacionProducto } from './interfaces/fabricacionProducto.Interface';
import { GastoMateriaPrima } from './interfaces/gastoMateriaPrima.Interface';
import { MateriaPrima } from './interfaces/materiaPrima.Interface';
import { TipoMateriaPrima } from './interfaces/tipoMateriaPrima.Interface';
import { finanzasProductosVenta } from './interfaces/finanzasProductosVenta.Interface';
import { finanzasUsuariosCompra } from './interfaces/finanzasUsuariosCompra.Interface';
import { TablaTotalMateriaPrima, TablaTotalPedidos, TablaTotalProductos, TablaTotalUsuarios, TablaTotalVentas } from './interfaces/TablaTotalUsuarios.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {
 
  constructor(private http:HttpClient) { }
 
// get alumnos():AlumnosUtl[]{
//   return[...this._alumnosUtl]
// }
 
 

public getProductos():Observable<AlumnosUtl[]>{
  return this.http.get<AlumnosUtl[]>('https://192.168.137.1:7241/api/Producto')
}

public   login(correo: string, contrasena: string) {
  const url = `https://192.168.137.1:7241/api/Usuario/login/${encodeURIComponent(correo)}?password=${encodeURIComponent(contrasena)}`;
  return this.http.get<AlumnosUtl[]>(url);
}

agregarPedido(datos:Pedido){
  return this.http.post('https://192.168.137.1:7241/api/Pedido',datos)
}

public getPedidos(id:number){
  return this.http.get('https://192.168.137.1:7241/api/Pedido/'+id)
}

public getAllPedidos():Observable<Pedido[]>{
  return this.http.get<Pedido[]>('https://192.168.137.1:7241/api/Pedido')
}

updatePedido(id: number, nuevoEstatus: number): Observable<any> {
  const body = nuevoEstatus;
  return this.http.put(`https://192.168.137.1:7241/api/Pedido/${id}`, body);
}

public getEnvios():Observable<AlumnosUtl[]>{
  return this.http.get<AlumnosUtl[]>('https://192.168.137.1:7241/api/Envios')
}

updateEnvios(id: number, nuevoEstatus: number): Observable<any> {
  const body = nuevoEstatus;
  return this.http.put(`https://192.168.137.1:7241/api/Envios/${id}`, body);
}

public getCompras():Observable<compras[]>{
  return this.http.get<compras[]>('https://192.168.137.1:7241/api/Compras')
}

public agregarCompra(datos:compras){
  return this.http.post('https://192.168.137.1:7241/api/Compras',datos)
}

public eliminarCompra(id:number){
  return this.http.delete('https://192.168.137.1:7241/api/Compras/'+id)
}

public actualizarCompra(id:number,datos:compras){
  return this.http.put('https://192.168.137.1:7241/api/Compras/'+id,datos)
}

public getCompra(id:number):Observable<compras>{
  return this.http.get<compras>('https://192.168.137.1:7241/api/Compras/'+id)
}
public getCompraConNombres():Observable<any>{
  return this.http.get<any>('https://192.168.137.1:7241/api/Compras/con-nombres')
}
public getNombresProveedores():Observable<any>{
  return this.http.get<any>('https://192.168.137.1:7241/api/Compras/proveedores')
}

public getNombresMateriaPrima():Observable<any>{
  return this.http.get<any>('https://192.168.137.1:7241/api/Compras/materias-primas')
}

public getProveedor():Observable<any>{
  return this.http.get<any>('https://192.168.137.1:7241/api/Proveedor')
}
public getProveedorId(id:number):Observable<any>{
  return this.http.get<any>('https://192.168.137.1:7241/api/Proveedor/'+id)
}
public agregarProveedor(datos:Proveedor){
  return this.http.post('https://192.168.137.1:7241/api/Proveedor/',datos)
}
public actualizarProveedor(id:number,datos:Proveedor){
  return this.http.put('https://192.168.137.1:7241/api/Proveedor/'+id,datos)
}
public eliminarProveedor(id:number){
  return this.http.delete('https://192.168.137.1:7241/api/Proveedor/'+id)
}
public canDelete(id: number): Observable<{ canDelete: boolean; message?: string }> {
  return this.http.get<{ canDelete: boolean; message?: string }>(`https://192.168.137.1:7241/api/Proveedor/${id}/canDelete`);
}
//Productos Peticiones
public getProducto():Observable<Producto[]>{
  return this.http.get<Producto[]>('https://192.168.137.1:7241/api/Producto')
}

public agregarProducto(datos:Producto){
  return this.http.post('https://192.168.137.1:7241/api/Producto',datos)
}

public editarProducto(datos:Producto){
  return this.http.put('https://192.168.137.1:7241/api/Producto/'+datos.id+'',datos)
}

public eliminarProducto(idProducto:number){
  return this.http.delete('https://192.168.137.1:7241/api/Producto/'+idProducto)
}

//fabricacion Producto Peticiones
public getFabricacionProducto():Observable<fabricacionProducto[]>{
  return this.http.get<fabricacionProducto[]>('https://192.168.137.1:7241/api/FabricacionProducto')
}

public agregarFabricacionProducto(datos:fabricacionProducto){
  return this.http.post('https://192.168.137.1:7241/api/FabricacionProducto',datos)
}

public editarFabricacionProducto(datos:fabricacionProducto){
  return this.http.put('https://192.168.137.1:7241/api/FabricacionProducto/'+datos.id+'',datos)
}

public eliminarFabricacionProducto(idFabricacionProducto:number){
  return this.http.delete('https://192.168.137.1:7241/api/FabricacionProducto/'+idFabricacionProducto)
}

//Gasto Materias Primas Peticiones
public getGastoMateriaPrima():Observable<GastoMateriaPrima[]>{
  return this.http.get<GastoMateriaPrima[]>('https://192.168.137.1:7241/api/Gasto_Materia_Prima')
}

public agregarGastoMateriaPrima(datos:GastoMateriaPrima){
  return this.http.post('https://192.168.137.1:7241/api/Gasto_Materia_Prima',datos)
}

public editarGastoMateriaPrima(datos:GastoMateriaPrima){
  return this.http.put('https://192.168.137.1:7241/api/Gasto_Materia_Prima/'+datos.id+'',datos)
}

public eliminarGastoMateriaPrima(idGastoMateria:number){
  return this.http.delete('https://192.168.137.1:7241/api/Gasto_Materia_Prima/'+idGastoMateria)
}
//Materias Primas Peticiones
public getMateriaPrima():Observable<MateriaPrima[]>{
  return this.http.get<MateriaPrima[]>('https://192.168.137.1:7241/api/materiaPrima')
}

public agregarMateriaPrima(datos:MateriaPrima){
  return this.http.post('https://192.168.137.1:7241/api/materiaPrima',datos)
}

public editarMateriaPrima(datos:MateriaPrima){
  console.log("datos edit"+datos)
  return this.http.put('https://192.168.137.1:7241/api/materiaPrima/'+datos.id+'',datos)
}

public eliminarMateriaPrima(idMateria:number){
  return this.http.delete('https://192.168.137.1:7241/api/materiaPrima/'+idMateria)
}

//Tipo Materia Prima Peticiones
public getTipoMateriaPrima():Observable<TipoMateriaPrima[]>{
  return this.http.get<TipoMateriaPrima[]>('https://192.168.137.1:7241/api/TipoMateriaPrima')
}

public agregarTipoMateriaPrima(datos:TipoMateriaPrima){
  return this.http.post('https://192.168.137.1:7241/api/TipoMateriaPrima',datos)
}

public editarTipoMateriaPrima(datos:TipoMateriaPrima){
  return this.http.put('https://192.168.137.1:7241/api/TipoMateriaPrima/'+datos.id+'',datos)
}

public eliminarTipoMateriaPrima(idTipoMateria:number){
  return this.http.delete('https://192.168.137.1:7241/api/TipoMateriaPrima/'+idTipoMateria)
}


agregarNuevoUsuario(datos:Usuario){
  // console.log(datos)
  return this.http.post('https://192.168.137.1:7241/api/Usuario',datos)
}
//verifica si la materia prima esta ligada con ese proveedor
verificarMateriaPrimaProveedor(idMateria: number, idProveedor: number){
  const url = `https://192.168.137.1:7241/api/Compras/verify/${idMateria}/${idProveedor}`;
  return this.http.get(url);
}

//peticiones para finanzas
public getFinanzasProductosVenta(mes:number):Observable<finanzasProductosVenta[]>{
  return this.http.get<finanzasProductosVenta[]>('https://192.168.137.1:7241/api/TotalProductosVentas/'+mes)
}

public getFinanzasUsuariosCompra(mes:number):Observable<finanzasUsuariosCompra[]>{
return this.http.get<finanzasUsuariosCompra[]>('https://192.168.137.1F:7241/api/TotalUsuarioCompras/'+mes)
}

public getFinanzasUsuariosCompraTop3():Observable<finanzasUsuariosCompra[]>{
  return this.http.get<finanzasUsuariosCompra[]>('https://192.168.137.1F:7241/api/TotalUsuarioCompras/Top3')
  }

public getAllTablaTotalUsuarios():Observable<TablaTotalUsuarios[]>{
  return this.http.get<TablaTotalUsuarios[]>('https://192.168.137.1:7241/api/TablaTotalUsuarios')
}

public getTablaTotalUsuariosPorMes(mes: number): Observable<TablaTotalUsuarios[]> {
  const url = `https://192.168.137.1:7241/api/TablaTotalUsuarios/PorMes/${mes}`;
  return this.http.get<TablaTotalUsuarios[]>(url);
}

  public getTablaTotalVentas():Observable<TablaTotalVentas[]>{
    return this.http.get<TablaTotalVentas[]>('https://192.168.137.1:7241/api/TablaTotalVentas')
  }

  public getTablaTotalProductos(mes: number): Observable<TablaTotalProductos[]> {
    const url = `https://192.168.137.1:7241/api/TablaTotalProductos/${mes}`;
    return this.http.get<TablaTotalProductos[]>(url);
  }

  public getAllTablaTotalProductos():Observable<TablaTotalProductos[]>{
    return this.http.get<TablaTotalProductos[]>('https://192.168.137.1:7241/api/TablaTotalProductos')
  }

  public getTablaTotalPedidos():Observable<TablaTotalPedidos[]>{
    return this.http.get<TablaTotalPedidos[]>('https://192.168.137.1:7241/api/TablaTotalPedidos')
  }
  public getTablaTotalMateriaPrima():Observable<TablaTotalMateriaPrima[]>{
    return this.http.get<TablaTotalMateriaPrima[]>('https://192.168.137.1:7241/api/TablaTotalMateriaPrima')
  }
}
