import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu_admin/menu.component';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './utl/editar/editar.component';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { AlumnoFilterPipe } from './utl/alumnos-filter.pipe';
import { LoginComponent } from './home/login/login.component';
import { InicioComponent } from './home/inicio/inicio.component';
import { ConocenosComponent } from './home/conocenos/conocenos.component';
import { InventarioComponent } from './home/inventario/inventario.component';
import { MateriaComponent } from './menu_admin/materiaPrima/materia.component';
import { SignupComponent } from './home/signup/signup.component';
import { PedidosComponent } from './home/pedidos/pedidos.component';
import { CarritoComponent } from './home/carrito/carrito.component';
import { PagoComponent } from './home/pago/pago.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EnviosComponent } from './menu_admin/envios/envios.component';
import { PedidosAdminComponent } from './menu_admin/pedidos-admin/pedidos-admin.component';
import { ComprasComponent } from './menu_admin/compras/compras.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ProveedorComponent } from './menu_admin/proveedor/proveedor.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductoComponent } from './menu_admin/producto/producto.component';
import { FabricacionComponent } from './menu_admin/fabricacion/fabricacion.component';
import { GastoMateriaPrimaComponent } from './menu_admin/gasto-materia-prima/gasto-materia-prima.component';
import { TipoMateriaPrima } from './interfaces/tipoMateriaPrima.Interface';
import { TipoMateriaPrimaComponent } from './menu_admin/tipo-materia-prima/tipo-materia-prima.component';
import { FinanzasComponent } from './menu_admin/finanzas/finanzas.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    AppComponent,
    TipoMateriaPrimaComponent,
    MenuComponent,
    AlumnoFilterPipe,
    HomeComponent,
    GastoMateriaPrimaComponent,
    EditarComponent,
    LoginComponent,
    InicioComponent,
    ConocenosComponent,
    InventarioComponent,
    MateriaComponent,
    SignupComponent,
    PedidosComponent,
    CarritoComponent,
    PagoComponent,
    UnauthorizedComponent,
    NotFoundComponent,
    EnviosComponent,
    PedidosAdminComponent,
    ProveedorComponent,
    ComprasComponent,
    ProductoComponent,
    FabricacionComponent,
    FinanzasComponent
  ],
  imports: [
    // NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
