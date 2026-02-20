//enums
export enum TipoUsuario {
    Estudiante,
    Profesor,
    Administrador
}

export enum CategoriaLibro {
    Ciencia,
    Ficcion,
    Historia,
    Literatura,
    Tecnologia,
    Arte
}

export enum EstadoLibro {
    Disponible,
    Prestado,
    Reservado,
    Mantenimiento
}

export enum EstadoPrestamo {
    Activo,
    Devuelto,
    Vencido
}

//interfaces
export interface IUsuario {
    id: number;
    nombre: string;
    email: string;
    tipo: TipoUsuario;
    fechaRegistro: Date;
    prestamosActivos: number;
}

export interface ILibro {
    ISBN: string;
    titulo: string;
    autor: string;
    categoria: CategoriaLibro;
    anioPublicacion: number;
    copiasDisponibles: number;
    copiasTotales: number;
    estado: EstadoLibro;

}

export interface IPrestamo {
    idPrestamo: number;
    libro: ILibro;
    usuario: IUsuario;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    fechaRealDevolucion: Date;
    estado: EstadoPrestamo;
}

/*
Opcional (Implementacion Futura)
export interface IReserva{
    idReserva: number;
    libro: ILibro;
    usuario: IUsuario;
    fechaReserva: Date;
    estado: EstadoPrestamo;
}
*/
