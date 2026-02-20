import { Usuario, Libro, Prestamo } from "./clases.ts";
import {
    IUsuario,
    ILibro,
    IPrestamo,
    TipoUsuario,
    CategoriaLibro,
    EstadoLibro,
    EstadoPrestamo,
} from "./interfaces";



//clase Biblioteca
class Biblioteca {
    //propiedades
    private nombreBiblioteca: string;

    private usuarios: Map<number, Usuario>;
    private libros: Map<string, Libro>;
    private prestamos: Map<number, Prestamo>;
    private contadorPrestamos: number;

    //Constructor
    constructor(nombreBiblioteca: string) {
        //Asignar el nombre a la Biblioteca 
        this.nombreBiblioteca = nombreBiblioteca
        //Inicializar los Maps
        this.usuarios = new Map()
        this.libros = new Map()
        this.prestamos = new Map()
        //Inicializar el contador de prestamos
        this.contadorPrestamos = 1;


    }

    //Metodos Gestion de Usuarios

    //registrarUsuario Genera un ID automático, crea la instancia y la guarda en el Map.

    registrarUsuario(nombre: string, email: string, tipo: TipoUsuario): Usuario {

        // 1. Generar nuevo ID basado en el tamaño del Map + 1
        const id = this.usuarios.size + 1;

        // 2. Crear la instancia de Usuario
        const nuevoUsuario = new Usuario(id, nombre, email, tipo);

        // 3. Guardar en el Map
        this.usuarios.set(id, nuevoUsuario);

        console.log(`Usuario registrado exitosamente: ${nuevoUsuario.nombre} (ID: ${id})`);
        // 4. Devolver el usuario creado
        return nuevoUsuario;
    }




}