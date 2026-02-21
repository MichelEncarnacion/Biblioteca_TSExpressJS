import { Biblioteca } from './biblioteca';
import { TipoUsuario, CategoriaLibro, EstadoLibro } from './interfaces';
import * as readline from 'readline';

// Configuración de Readline para leer la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function preguntar(texto: string): Promise<string> {
    return new Promise((resolve) => rl.question(texto, resolve));
}

const miBiblioteca = new Biblioteca("Biblioteca Central Universidad TEC");

async function iniciarSistema() {
    console.log(`\n======================================================`);
    console.log(`      SISTEMA DE GESTIÓN BIBLIOTECARIA `);
    console.log(`======================================================\n`);

    // 1. Cargar datos previos
    miBiblioteca.cargarDatos();

    let salir = false;

    while (!salir) {
        console.log(`\n================== MENÚ PRINCIPAL ==================`);
        console.log(`1. 👤 Registrar nuevo usuario`);
        console.log(`2. 📚 Agregar nuevo libro`);
        console.log(`3. 🔄 Realizar préstamo`);
        console.log(`4. 📥 Devolver préstamo`);
        console.log(`5. 📊 Ver Estadísticas Generales`);
        console.log(`6. 🏆 Ver Top 3 Libros Más Prestados`);
        console.log(`7. 🧪 Cargar datos de prueba (Mock Data)`);
        console.log(`0. 💾 Guardar y Salir`);
        console.log(`====================================================`);

        const opcion = await preguntar("👉 Seleccione una opción: ");

        switch (opcion) {
            case '1':
                const nombre = await preguntar("Nombre del usuario: ");
                const email = await preguntar("Email: ");
                console.log("Tipos: 0=Estudiante, 1=Profesor, 2=Administrador");
                const tipoStr = await preguntar("Seleccione el tipo (0, 1 o 2): ");
                miBiblioteca.registrarUsuario(nombre, email, parseInt(tipoStr));
                break;

            case '2':
                const isbn = await preguntar("ISBN: ");
                const titulo = await preguntar("Título: ");
                const autor = await preguntar("Autor: ");
                console.log("Categorías: 0=Ciencia, 1=Ficcion, 2=Historia, 3=Literatura, 4=Tecnologia, 5=Arte");
                const catStr = await preguntar("Categoría (0-5): ");
                const anioStr = await preguntar("Año de publicación: ");
                const copiasStr = await preguntar("Número de copias: ");
                miBiblioteca.agregarLibro(isbn, titulo, autor, parseInt(catStr), parseInt(anioStr), parseInt(copiasStr), parseInt(copiasStr), EstadoLibro.Disponible);
                break;

            case '3':
                const idUsuarioStr = await preguntar("ID del Usuario: ");
                const isbnPrestamo = await preguntar("ISBN del Libro: ");
                miBiblioteca.realizarPrestamo(parseInt(idUsuarioStr), isbnPrestamo);
                break;

            case '4':
                const idPrestamoStr = await preguntar("ID del Préstamo a devolver: ");
                miBiblioteca.devolverPrestamo(parseInt(idPrestamoStr));
                break;

            case '5':
                console.log(miBiblioteca.generarEstadisticasGenerales());
                break;

            case '6':
                console.log(miBiblioteca.generarReporteLibrosMasPrestados(3));
                break;

            case '7':
                console.log("Cargando datos de prueba...");
                miBiblioteca.registrarUsuario("Juan Pérez", "juan@tec.mx", TipoUsuario.Estudiante);
                miBiblioteca.registrarUsuario("Dr. Alan Turing", "alan@tec.mx", TipoUsuario.Profesor);
                miBiblioteca.agregarLibro("978-0132350884", "Clean Code", "Robert C. Martin", CategoriaLibro.Tecnologia, 2008, 5, 5, EstadoLibro.Disponible);
                miBiblioteca.agregarLibro("978-0131103627", "The C Prog. Language", "Brian Kernighan", CategoriaLibro.Tecnologia, 1988, 2, 2, EstadoLibro.Disponible);
                console.log("¡Datos de prueba cargados con éxito!");
                break;

            case '0':
                console.log("\nGuardando datos en la base de datos...");
                miBiblioteca.guardarDatos();
                console.log("¡Gracias por usar el sistema! Hasta luego. 👋\n");
                salir = true;
                break;

            default:
                console.log("❌ Opción no válida. Intente de nuevo.");
        }
    }

    rl.close();
}

// Arrancar el programa
iniciarSistema();