export interface TablaTotalUsuarios {
    id: number;
    nombre: string;
    numeroCompras: number;
    totalPrecio: number;
    mes: number;
    anio: number;
}

export interface TablaTotalVentas{
    mes: number;
    anio: number;
    numeroVentas: number;
}

export interface TablaTotalProductos{
    id: number;
    nombre: string;
    cantidadTotal: number;
    precioTotal: number;
    mes: number;
    anio: number;
}

export interface TablaTotalPedidos{
    id: number;
    cantidadTotal: number;
    totalPrecio: number;
    mes: number;
    anio: number;
}

export interface TablaTotalMateriaPrima{
    id: number;
    nombre: string;
    cantidadTotal: number;
    costoTotal: number;
    mes: number;
    anio: number;
}