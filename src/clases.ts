import {
    IUsuario,
    ILibro,
    IPrestamo,
    TipoUsuario,
    CategoriaLibro,
    EstadoLibro,
    EstadoPrestamo,
} from "./interfaces";

//Clase Usuario
export class Usuario implements IUsuario {
    //solo lectura id
    readonly id: number;
    //propiedades privadas para nombre y email
    private _nombre: string;
    private _email: string;
    tipo: TipoUsuario;
    //inicializacion Fecha actual y prestamos en 0
    fechaActual: Date = new Date();
    prestamosActivos: number = 0;
    fechaRegistro: Date;
    //constructor
    constructor(id: number, nombre: string, email: string, tipo: TipoUsuario) {
        this.id = id;
        this._nombre = nombre;
        this._email = email;
        this.tipo = tipo;
        this.prestamosActivos = 0;
        this.fechaRegistro = new Date();
    }


    //getters y setter nombre

    get nombre(): string {
        return this._nombre
    }

    set nombre(nuevoNombre: string) {
        if (nuevoNombre.trim().length < 3) {
            throw new Error("El nombre debe tener al menos 3 caracteres")
        }
        this._nombre = nuevoNombre
    }

    //getters y setter email

    get email(): string {
        return this._email
    }

    set email(nuevoEmail: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!regex.test(nuevoEmail)) {
            throw new Error("Email invalido")
        }
        this._email = nuevoEmail
    }

    //metodo para obtener info del usuario

    obtenerInformacion(): string {
        return `ID: ${this.id}, Nombre: ${this.nombre}, Email: ${this.email}, Tipo: ${this.tipo}`
    }
    //metodo puedePrestar

    puedeRealizarPrestamo(): boolean {
        let limitePrestamos: number
        switch (this.tipo) {
            case TipoUsuario.Estudiante:
                limitePrestamos = 3
                break
            case TipoUsuario.Profesor:
                limitePrestamos = 5
                break
            case TipoUsuario.Administrador:
                limitePrestamos = 10
                break
            default:
                limitePrestamos = 0
        }
        return this.prestamosActivos < limitePrestamos
    }

}

//Clase Libro
export class Libro implements ILibro {

    //ISBN readonly
    readonly ISBN: string;

    // propiedades
    public titulo: string;
    public autor: string;
    public categoria: CategoriaLibro;
    public anioPublicacion: number;
    public copiasTotales: number;
    //Inicializacion de estado DISPONIBLE
    public estado: EstadoLibro = EstadoLibro.Disponible;

    //Propiedad Privada copiasDisponibles
    //se usa el _ para indicar que es privada
    private _copiasDisponibles: number;


    //contructor 
    constructor(ISBN: string, titulo: string, autor: string, categoria: CategoriaLibro, anioPublicacion: number, copiasDisponibles: number, copiasTotales: number, estado: EstadoLibro) {
        this.ISBN = ISBN;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.anioPublicacion = anioPublicacion;
        this._copiasDisponibles = copiasDisponibles;
        this.copiasTotales = copiasTotales;
        this.estado = estado;
    }

    //geter copiasDisponibles

    get copiasDisponibles(): number {
        return this._copiasDisponibles
    }

    //metodo estaDisponible

    estaDisponible(): boolean {
        return this._copiasDisponibles > 0 && this.estado === EstadoLibro.Disponible
    }

    //metodo prestarCopia

    prestarCopia(): boolean {
        if (this.estaDisponible()) {
            this._copiasDisponibles--
            if (this._copiasDisponibles === 0) {
                this.estado = EstadoLibro.Prestado
            }
            return true
        }
        return false
    }

    //metodo devolverCopia

    devolverCopia(): boolean {
        if (this._copiasDisponibles < this.copiasTotales) {
            this._copiasDisponibles++
            if (this._copiasDisponibles === this.copiasTotales) {
                this.estado = EstadoLibro.Disponible
            }
            return true
        }
        return false
    }

    //metodo obtener Informacion

    obtenerInformacion(): string {
        return `ISBN: ${this.ISBN}, Titulo: ${this.titulo}, Autor: ${this.autor}, Categoria: ${this.categoria}, Anio Publicacion: ${this.anioPublicacion}, Copias Disponibles: ${this._copiasDisponibles}, Copias Totales: ${this.copiasTotales}, Estado: ${this.estado}`
    }


}

//Clase Prestamo

export class Prestamo implements IPrestamo {
    readonly idPrestamo: number;
    libro: ILibro;
    usuario: IUsuario;
    fechaPrestamo: Date;
    fechaDevolucion: Date;
    fechaRealDevolucion: Date;
    private _estado: EstadoPrestamo;

    //constructor
    constructor(idPrestamo: number, usuario: IUsuario, libro: ILibro, diasPrestamo: number = 14) {
        this.idPrestamo = idPrestamo;
        this.libro = libro;
        this.usuario = usuario;

        //fecha actual
        this.fechaPrestamo = new Date();

        // 2. Calcula fechaDevolucion sumando los días a la fecha actual
        const fechaCalculada = new Date()

        fechaCalculada.setDate(this.fechaPrestamo.getDate() + diasPrestamo)

        this.fechaDevolucion = fechaCalculada

        // 3. Inicializa el estado como ACTIVO
        this._estado = EstadoPrestamo.Activo;

        this.fechaRealDevolucion = new Date();

    }

    //Implementa un getter para estado que llame a un método privado actualizarEstado() antes de retornar

    get estado(): EstadoPrestamo {
        this.actualizarEstado();
        return this._estado;
    }

    //metodo privado actualizarEstado
    private actualizarEstado(): void {
        if (this._estado === EstadoPrestamo.Activo) {
            const fechaActual = new Date()
            if (fechaActual > this.fechaDevolucion) {
                this._estado = EstadoPrestamo.Vencido
            }
        }
    }

    //metodo realizarDevolucion
    realizarDevolucion(): boolean {
        if (this._estado === EstadoPrestamo.Activo) {
            this.fechaRealDevolucion = new Date()
            this._estado = EstadoPrestamo.Devuelto
            return true
        }
        return false
    }

    //metodo diasRetraso
    diasRetraso(): number {
        const fechaComparacion = this.fechaRealDevolucion || new Date();
        if (fechaComparacion <= this.fechaDevolucion) return 0;

        const diffTiempo = Math.abs(fechaComparacion.getTime() - this.fechaDevolucion.getTime());
        return Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));
    }

    //metodo calcularMulta
    calcularMulta(tarifaDiaria: number = 5): number {
        return this.diasRetraso() * tarifaDiaria;
    }

    //metodo obtenerInformacion

    obtenerInformacion(): string {
        const retraso = this.diasRetraso();
        let info = ` Préstamo #${this.idPrestamo} | ${this.usuario.nombre} -> ${this.libro.titulo} | Estado: ${this.estado}`;
        if (retraso > 0 && this.estado !== EstadoPrestamo.Devuelto) {
            info += ` |  Retraso: ${retraso} días | Multa acumulada: $${this.calcularMulta()}`;
        }
        return info;
    }


}