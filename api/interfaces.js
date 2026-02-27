"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoPrestamo = exports.EstadoLibro = exports.CategoriaLibro = exports.TipoUsuario = void 0;
//enums
var TipoUsuario;
(function (TipoUsuario) {
    TipoUsuario[TipoUsuario["Estudiante"] = 0] = "Estudiante";
    TipoUsuario[TipoUsuario["Profesor"] = 1] = "Profesor";
    TipoUsuario[TipoUsuario["Administrador"] = 2] = "Administrador";
})(TipoUsuario || (exports.TipoUsuario = TipoUsuario = {}));
var CategoriaLibro;
(function (CategoriaLibro) {
    CategoriaLibro[CategoriaLibro["Ciencia"] = 0] = "Ciencia";
    CategoriaLibro[CategoriaLibro["Ficcion"] = 1] = "Ficcion";
    CategoriaLibro[CategoriaLibro["Historia"] = 2] = "Historia";
    CategoriaLibro[CategoriaLibro["Literatura"] = 3] = "Literatura";
    CategoriaLibro[CategoriaLibro["Tecnologia"] = 4] = "Tecnologia";
    CategoriaLibro[CategoriaLibro["Arte"] = 5] = "Arte";
})(CategoriaLibro || (exports.CategoriaLibro = CategoriaLibro = {}));
var EstadoLibro;
(function (EstadoLibro) {
    EstadoLibro[EstadoLibro["Disponible"] = 0] = "Disponible";
    EstadoLibro[EstadoLibro["Prestado"] = 1] = "Prestado";
    EstadoLibro[EstadoLibro["Reservado"] = 2] = "Reservado";
    EstadoLibro[EstadoLibro["Mantenimiento"] = 3] = "Mantenimiento";
})(EstadoLibro || (exports.EstadoLibro = EstadoLibro = {}));
var EstadoPrestamo;
(function (EstadoPrestamo) {
    EstadoPrestamo[EstadoPrestamo["Activo"] = 0] = "Activo";
    EstadoPrestamo[EstadoPrestamo["Devuelto"] = 1] = "Devuelto";
    EstadoPrestamo[EstadoPrestamo["Vencido"] = 2] = "Vencido";
})(EstadoPrestamo || (exports.EstadoPrestamo = EstadoPrestamo = {}));
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
