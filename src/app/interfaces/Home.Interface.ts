export interface AlumnosUtl {
    id:number
    nombre:string;
    stock:number;
    ancho:number;
    altura:number;
    total:number;
    largo:number;
    imagen:string

  }

  export interface Pedido {
    cantidad:number
    Totalprecio:number
    estatusPedido:number
    producto_id:number
    user_id:number
    fechaRealizado:Date

  }

  export interface Country {
    id: number;
    name: string;
    flag: string;
    area: number;
    population: number;
  }
  
  export interface Usuario {
    id: number;
    name: string;
    email: string;
    calle: string;
    codigopostal: string;
    estado: string;
    ciudad: string;
    passwordUsuario: string;
    activo: boolean;
    rol_id: number; // Añadiendo la propiedad rol_id
  }
  

export interface compras {
  id:number
  cantidad:number;
  total:number;
  fecha:string;
  materiaPrima_id:number;
  proveedor_id:number;
}

export interface CompraConNombres {
  compra: {
    id: number;
    cantidad: number;
    total: number;
    fecha: string;
    materiaPrima_id: number;
    proveedor_id: number;
  };
  nombreMateriaPrima: string;
  nombreProveedor: string;
}

export interface MateriaPrimaSelect {
  id: number;
  nombre: string;
}

export interface ProveedorSelect {
  id: number;
  nombre: string;
}

export interface Proveedor {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  canDelete?: boolean; // Propiedad opcional
  deleteMessage?: string; // Agrega esta propiedad

}