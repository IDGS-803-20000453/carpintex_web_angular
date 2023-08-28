import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { AgregarComponent } from './utl/agregar/agregar.component';
// import { AlumnosComponent } from './utl/alumnos/alumnos.component';
import { EditarComponent } from './utl/editar/editar.component';
import { LoginComponent } from './home/login/login.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { MenuComponent } from './menu_admin/menu.component';
import { ConocenosComponent } from './home/conocenos/conocenos.component';
import { InventarioComponent } from './home/inventario/inventario.component';
import { MateriaComponent } from './menu_admin/materiaPrima/materia.component';
import { AuthGuard } from './Auth/AuthGuard.component';
import { SignupComponent } from './home/signup/signup.component';
import { PedidosComponent } from './home/pedidos/pedidos.component';
import { CarritoComponent } from './home/carrito/carrito.component';
import { PagoComponent } from './home/pago/pago.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnviosComponent } from './menu_admin/envios/envios.component';
import { PedidosAdminComponent } from './menu_admin/pedidos-admin/pedidos-admin.component';
import { ComprasComponent } from './menu_admin/compras/compras.component';
import { ProveedorComponent } from './menu_admin/proveedor/proveedor.component';
import { ProductoComponent } from './menu_admin/producto/producto.component';
import { FabricacionComponent } from './menu_admin/fabricacion/fabricacion.component';
import { GastoMateriaPrimaComponent } from './menu_admin/gasto-materia-prima/gasto-materia-prima.component';
import { TipoMateriaPrimaComponent } from './menu_admin/tipo-materia-prima/tipo-materia-prima.component';
import { FinanzasComponent } from './menu_admin/finanzas/finanzas.component';

const routes: Routes = [
  {path: '',component: InicioComponent, pathMatch:'full'},
  {path:'inicio',component: InicioComponent},
  {path:'conocenos',component: ConocenosComponent},
  { path: 'admin-menu', component: MenuComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:'inventario',component: InventarioComponent},
  {path:'materia',component: MateriaComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'envios',component: EnviosComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path:'pedidosAdmin',component: PedidosAdminComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'producto', component: ProductoComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'fabricacionProducto',component: FabricacionComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'tipoMateriaPrima', component: TipoMateriaPrimaComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  {path: 'gastoMateriaPrima', component: GastoMateriaPrimaComponent,canActivate: [AuthGuard], data: { roles: ['admin'] }},
  // {path: 'verAlumnos',component: AlumnosComponent },
  {path: 'finanzas',component: FinanzasComponent},
  {path: 'Editar/:id',component: EditarComponent },
  {path: 'login',component: LoginComponent },
  {path: 'signup',component: SignupComponent },
  {path: 'pedidos',component: PedidosComponent, canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path: 'carrito',component: CarritoComponent  } ,
  {path: 'pago',component: PagoComponent,canActivate: [AuthGuard], data: { roles: ['user'] } },
  {path:'Compras',component: ComprasComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path:'Proveedor',component: ProveedorComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
  {path: 'unauthorized',component: UnauthorizedComponent},
  {path: 'not-found',component: NotFoundComponent},
  { path: '**', redirectTo: '/not-found' },



];;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
