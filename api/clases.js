"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Revista = exports.Prestamo = exports.Libro = exports.Material = exports.Usuario = void 0;
var interfaces_1 = require("./interfaces");
//Clase Usuario
var Usuario = /** @class */ (function () {
    //constructor
    function Usuario(id, nombre, email, tipo) {
        //inicializacion Fecha actual y prestamos en 0
        this.fechaActual = new Date();
        this.prestamosActivos = 0;
        this.id = id;
        this._nombre = nombre;
        this._email = email;
        this.tipo = tipo;
        this.prestamosActivos = 0;
        this.fechaRegistro = new Date();
    }
    Object.defineProperty(Usuario.prototype, "nombre", {
        //getters y setter nombre
        get: function () {
            return this._nombre;
        },
        set: function (nuevoNombre) {
            if (nuevoNombre.trim().length < 3) {
                throw new Error("El nombre debe tener al menos 3 caracteres");
            }
            this._nombre = nuevoNombre;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "email", {
        //getters y setter email
        get: function () {
            return this._email;
        },
        set: function (nuevoEmail) {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(nuevoEmail)) {
                throw new Error("Email invalido");
            }
            this._email = nuevoEmail;
        },
        enumerable: false,
        configurable: true
    });
    //metodo para obtener info del usuario
    Usuario.prototype.obtenerInformacion = function () {
        return "ID: ".concat(this.id, ", Nombre: ").concat(this.nombre, ", Email: ").concat(this.email, ", Tipo: ").concat(this.tipo);
    };
    //metodo puedePrestar
    Usuario.prototype.puedeRealizarPrestamo = function () {
        var limitePrestamos;
        switch (this.tipo) {
            case interfaces_1.TipoUsuario.Estudiante:
                limitePrestamos = 3;
                break;
            case interfaces_1.TipoUsuario.Profesor:
                limitePrestamos = 5;
                break;
            case interfaces_1.TipoUsuario.Administrador:
                limitePrestamos = 10;
                break;
            default:
                limitePrestamos = 0;
        }
        return this.prestamosActivos < limitePrestamos;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
//Clase Material
var Material = /** @class */ (function () {
    function Material(titulo, autor, anioPublicacion, copiasDisponibles, copiasTotales, estado) {
        //  Arreglo para la fila de espera
        this.colaReservas = [];
        this.titulo = titulo;
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
        this._copiasDisponibles = copiasDisponibles;
        this.copiasTotales = copiasTotales;
        this.estado = estado;
    }
    Object.defineProperty(Material.prototype, "copiasDisponibles", {
        get: function () {
            return this._copiasDisponibles;
        },
        enumerable: false,
        configurable: true
    });
    Material.prototype.estaDisponible = function () {
        return this._copiasDisponibles > 0 && this.estado === interfaces_1.EstadoLibro.Disponible;
    };
    Material.prototype.prestarCopia = function () {
        if (this.estaDisponible()) {
            this._copiasDisponibles--;
            if (this._copiasDisponibles === 0) {
                this.estado = interfaces_1.EstadoLibro.Prestado;
            }
            return true;
        }
        return false;
    };
    Material.prototype.devolverCopia = function () {
        if (this._copiasDisponibles < this.copiasTotales) {
            this._copiasDisponibles++;
            if (this._copiasDisponibles === this.copiasTotales) {
                this.estado = interfaces_1.EstadoLibro.Disponible;
            }
            return true;
        }
        return false;
    };
    // Métodos para manejar la fila de espera
    Material.prototype.agregarReserva = function (usuarioId) {
        if (!this.colaReservas.includes(usuarioId)) {
            this.colaReservas.push(usuarioId);
        }
        else {
            throw new Error("El usuario ya tiene una reserva activa para este material.");
        }
    };
    Material.prototype.obtenerSiguienteReserva = function () {
        return this.colaReservas.shift(); // Saca y retorna el primer usuario de la fila
    };
    return Material;
}());
exports.Material = Material;
//Clase Libro
var Libro = /** @class */ (function (_super) {
    __extends(Libro, _super);
    function Libro(ISBN, titulo, autor, categoria, anioPublicacion, copiasDisponibles, copiasTotales, estado) {
        // super() envía los datos comunes a la clase padre (Material)
        var _this = _super.call(this, titulo, autor, anioPublicacion, copiasDisponibles, copiasTotales, estado) || this;
        // Asignamos solo lo que es exclusivo de un Libro
        _this.ISBN = ISBN;
        _this.categoria = categoria;
        return _this;
    }
    Libro.prototype.obtenerInformacion = function () {
        return "ISBN: ".concat(this.ISBN, ", Titulo: ").concat(this.titulo, ", Autor: ").concat(this.autor, ", Categoria: ").concat(this.categoria, ", Anio Publicacion: ").concat(this.anioPublicacion, ", Copias Disponibles: ").concat(this._copiasDisponibles, ", Copias Totales: ").concat(this.copiasTotales, ", Estado: ").concat(this.estado);
    };
    return Libro;
}(Material));
exports.Libro = Libro;
//Clase Prestamo
var Prestamo = /** @class */ (function () {
    //constructor
    function Prestamo(idPrestamo, usuario, libro, diasPrestamo) {
        if (diasPrestamo === void 0) { diasPrestamo = 14; }
        this.idPrestamo = idPrestamo;
        this.libro = libro;
        this.usuario = usuario;
        //fecha actual
        this.fechaPrestamo = new Date();
        // 2. Calcula fechaDevolucion sumando los días a la fecha actual
        var fechaCalculada = new Date();
        fechaCalculada.setDate(this.fechaPrestamo.getDate() + diasPrestamo);
        this.fechaDevolucion = fechaCalculada;
        // 3. Inicializa el estado como ACTIVO
        this._estado = interfaces_1.EstadoPrestamo.Activo;
        this.fechaRealDevolucion = new Date();
    }
    Object.defineProperty(Prestamo.prototype, "estado", {
        //Implementa un getter para estado que llame a un método privado actualizarEstado() antes de retornar
        get: function () {
            this.actualizarEstado();
            return this._estado;
        },
        enumerable: false,
        configurable: true
    });
    //metodo privado actualizarEstado
    Prestamo.prototype.actualizarEstado = function () {
        if (this._estado === interfaces_1.EstadoPrestamo.Activo) {
            var fechaActual = new Date();
            if (fechaActual > this.fechaDevolucion) {
                this._estado = interfaces_1.EstadoPrestamo.Vencido;
            }
        }
    };
    //metodo realizarDevolucion
    Prestamo.prototype.realizarDevolucion = function () {
        if (this._estado === interfaces_1.EstadoPrestamo.Activo) {
            this.fechaRealDevolucion = new Date();
            this._estado = interfaces_1.EstadoPrestamo.Devuelto;
            return true;
        }
        return false;
    };
    //metodo diasRetraso
    Prestamo.prototype.diasRetraso = function () {
        var fechaComparacion = this.fechaRealDevolucion || new Date();
        if (fechaComparacion <= this.fechaDevolucion)
            return 0;
        var diffTiempo = Math.abs(fechaComparacion.getTime() - this.fechaDevolucion.getTime());
        return Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    };
    //metodo calcularMulta
    Prestamo.prototype.calcularMulta = function (tarifaDiaria) {
        if (tarifaDiaria === void 0) { tarifaDiaria = 5; }
        return this.diasRetraso() * tarifaDiaria;
    };
    //metodo obtenerInformacion
    Prestamo.prototype.obtenerInformacion = function () {
        var retraso = this.diasRetraso();
        var info = " Pr\u00E9stamo #".concat(this.idPrestamo, " | ").concat(this.usuario.nombre, " -> ").concat(this.libro.titulo, " | Estado: ").concat(this.estado);
        if (retraso > 0 && this.estado !== interfaces_1.EstadoPrestamo.Devuelto) {
            info += " |  Retraso: ".concat(retraso, " d\u00EDas | Multa acumulada: $").concat(this.calcularMulta());
        }
        return info;
    };
    return Prestamo;
}());
exports.Prestamo = Prestamo;
//Clase Revista
var Revista = /** @class */ (function (_super) {
    __extends(Revista, _super);
    function Revista(ISSN, titulo, autor, numeroEdicion, anioPublicacion, copiasDisponibles, copiasTotales, estado) {
        var _this = _super.call(this, titulo, autor, anioPublicacion, copiasDisponibles, copiasTotales, estado) || this;
        _this.ISSN = ISSN;
        _this.numeroEdicion = numeroEdicion;
        return _this;
    }
    Revista.prototype.obtenerInformacion = function () {
        return "ISSN: ".concat(this.ISSN, ", Titulo: ").concat(this.titulo, ", Autor: ").concat(this.autor, ", Edici\u00F3n: ").concat(this.numeroEdicion, ", Anio Publicacion: ").concat(this.anioPublicacion, ", Copias Disponibles: ").concat(this._copiasDisponibles, ", Copias Totales: ").concat(this.copiasTotales, ", Estado: ").concat(this.estado);
    };
    return Revista;
}(Material));
exports.Revista = Revista;
