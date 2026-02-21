import { Biblioteca } from './biblioteca';
import { TipoUsuario, CategoriaLibro, EstadoLibro } from './interfaces';
import * as readline from 'readline';

// --- Códigos de Colores para la Consola ---
const colores = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    verde: "\x1b[32m",
    amarillo: "\x1b[33m",
    rojo: "\x1b[31m",
    magenta: "\x1b[35m",
    negrita: "\x1b[1m"
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para hacer preguntas
function preguntar(texto: string): Promise<string> {
    return new Promise((resolve) => rl.question(`${colores.amarillo}${texto}${colores.reset}`, resolve));
}


async function pausar() {
    await preguntar(`\nPresiona ${colores.negrita}ENTER${colores.reset} para continuar...`);
}

const miBiblioteca = new Biblioteca("Biblioteca Central Universidad TEC");

async function iniciarSistema() {
    // Cargar datos 
    miBiblioteca.cargarDatos();
    await pausar();

    let salir = false;

    while (!salir) {
        console.clear();

        console.log(`${colores.cyan}${colores.negrita}======================================================${colores.reset}`);
        console.log(`${colores.verde}${colores.negrita}      🎓 SISTEMA DE GESTIÓN BIBLIOTECARIA 🎓${colores.reset}`);
        console.log(`${colores.cyan}${colores.negrita}======================================================${colores.reset}\n`);

        // Menú categorizado y ordenado
        console.log(`  ${colores.negrita}👥 USUARIOS${colores.reset}`);
        console.log(`    1. Registrar nuevo usuario`);
        console.log(`  ${colores.negrita}📚 CATÁLOGO${colores.reset}`);
        console.log(`    2. Agregar nuevo libro`);
        console.log(`  ${colores.negrita}🔄 PRÉSTAMOS${colores.reset}`);
        console.log(`    3. Realizar préstamo`);
        console.log(`    4. Devolver préstamo`);
        console.log(`  ${colores.negrita}📊 REPORTES${colores.reset}`);
        console.log(`    5. Ver Estadísticas Generales`);
        console.log(`    6. Ver Top 3 Libros Más Prestados`);
        console.log(`  ${colores.negrita}⚙️  SISTEMA${colores.reset}`);
        console.log(`    7. Cargar datos de prueba (Mock Data)`);
        console.log(`${colores.rojo}    0. Guardar y Salir${colores.reset}\n`);

        const opcion = await preguntar("👉 Seleccione una opción: ");
        console.log("");

        switch (opcion) {
            case '1':
                console.log(`${colores.cyan}--- NUEVO USUARIO ---${colores.reset}`);
                const nombre = await preguntar("Nombre del usuario: ");
                const email = await preguntar("Email: ");
                console.log("Tipos: 0=Estudiante, 1=Profesor, 2=Administrador");
                const tipoStr = await preguntar("Seleccione el tipo (0, 1 o 2): ");
                miBiblioteca.registrarUsuario(nombre, email, parseInt(tipoStr));
                await pausar();
                break;

            case '2':
                console.log(`${colores.cyan}--- NUEVO LIBRO ---${colores.reset}`);
                const isbn = await preguntar("ISBN: ");
                const titulo = await preguntar("Título: ");
                const autor = await preguntar("Autor: ");
                console.log("Categorías: 0=Ciencia, 1=Ficcion, 2=Historia, 3=Literatura, 4=Tecnologia, 5=Arte");
                const catStr = await preguntar("Categoría (0-5): ");
                const anioStr = await preguntar("Año de publicación: ");
                const copiasStr = await preguntar("Número de copias: ");
                miBiblioteca.agregarLibro(isbn, titulo, autor, parseInt(catStr), parseInt(anioStr), parseInt(copiasStr), parseInt(copiasStr), EstadoLibro.Disponible);
                await pausar();
                break;

            case '3':
                console.log(`${colores.cyan}--- REALIZAR PRÉSTAMO ---${colores.reset}`);
                const idUsuarioStr = await preguntar("ID del Usuario: ");
                const isbnPrestamo = await preguntar("ISBN del Libro: ");
                miBiblioteca.realizarPrestamo(parseInt(idUsuarioStr), isbnPrestamo);
                await pausar();
                break;

            case '4':
                console.log(`${colores.cyan}--- DEVOLVER PRÉSTAMO ---${colores.reset}`);
                const idPrestamoStr = await preguntar("ID del Préstamo a devolver: ");
                miBiblioteca.devolverPrestamo(parseInt(idPrestamoStr));
                await pausar();
                break;

            case '5':
                console.log(`${colores.cyan}--- ESTADÍSTICAS GENERALES ---${colores.reset}`);
                console.log(miBiblioteca.generarEstadisticasGenerales());
                await pausar();
                break;

            case '6':
                console.log(`${colores.cyan}--- TOP 3 LIBROS MÁS PRESTADOS ---${colores.reset}`);
                console.log(miBiblioteca.generarReporteLibrosMasPrestados(3));
                await pausar();
                break;

            case '7':
                console.log(`${colores.cyan}--- CARGANDO MOCK DATA ---${colores.reset}`);
                miBiblioteca.registrarUsuario("Juan Pérez", "juan@tec.mx", TipoUsuario.Estudiante);
                miBiblioteca.registrarUsuario("Dr. Alan Turing", "alan@tec.mx", TipoUsuario.Profesor);
                miBiblioteca.agregarLibro("978-0132350884", "Clean Code", "Robert C. Martin", CategoriaLibro.Tecnologia, 2008, 5, 5, EstadoLibro.Disponible);
                miBiblioteca.agregarLibro("978-0131103627", "The C Prog. Language", "Brian Kernighan", CategoriaLibro.Tecnologia, 1988, 2, 2, EstadoLibro.Disponible);
                console.log(`\n${colores.verde}¡Datos de prueba cargados con éxito!${colores.reset}`);
                await pausar();
                break;

            case '0':
                console.clear();
                console.log(`\n${colores.cyan}Guardando datos en la base de datos...${colores.reset}`);
                miBiblioteca.guardarDatos();
                console.log(`\n${colores.verde}¡Gracias por usar el sistema! Hasta luego. 👋${colores.reset}\n`);
                salir = true;
                break;

            default:
                console.log(`${colores.rojo}❌ Opción no válida. Intente de nuevo.${colores.reset}`);
                await pausar();
        }
    }

    rl.close();
}

iniciarSistema();