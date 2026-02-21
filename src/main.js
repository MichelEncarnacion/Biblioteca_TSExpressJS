"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var biblioteca_1 = require("./biblioteca");
var interfaces_1 = require("./interfaces");
// 1. Instancia y Encabezado
console.log("\n======================================================");
console.log("     SISTEMA DE GESTI\u00D3N BIBLIOTECARIA ");
console.log("======================================================\n");
var miBiblioteca = new biblioteca_1.Biblioteca("Biblioteca Central Universidad TEC");
// 2. Registro de Usuarios (4 usuarios: 2 est., 1 prof., 1 admin.)
console.log("--- REGISTRANDO USUARIOS ---");
miBiblioteca.registrarUsuario("Juan Pérez", "juan.perez@tec.edu.mx", interfaces_1.TipoUsuario.Estudiante);
miBiblioteca.registrarUsuario("María Gómez", "maria.gomez@tec.edu.mx", interfaces_1.TipoUsuario.Estudiante);
miBiblioteca.registrarUsuario("Dr. Alan Turing", "alan.turing@tec.edu.mx", interfaces_1.TipoUsuario.Profesor);
miBiblioteca.registrarUsuario("Admin Root", "admin@tec.edu.mx", interfaces_1.TipoUsuario.Administrador);
// 3. Agregar Libros al Catálogo (5 libros de programación, ISBN reales)
// agregarLibro(ISBN, titulo, autor, categoria, anioPublicacion, copiasDisponibles, copiasTotales, estado)
console.log("\n--- AGREGANDO LIBROS ---");
miBiblioteca.agregarLibro("978-0132350884", "Clean Code", "Robert C. Martin", interfaces_1.CategoriaLibro.Tecnologia, 2008, 5, 5, interfaces_1.EstadoLibro.Disponible);
miBiblioteca.agregarLibro("978-0201616224", "The Pragmatic Programmer", "Andrew Hunt", interfaces_1.CategoriaLibro.Tecnologia, 1999, 4, 4, interfaces_1.EstadoLibro.Disponible);
miBiblioteca.agregarLibro("978-0131103627", "The C Programming Language", "Brian W. Kernighan", interfaces_1.CategoriaLibro.Tecnologia, 1988, 2, 2, interfaces_1.EstadoLibro.Disponible);
miBiblioteca.agregarLibro("978-0134685991", "Effective Java", "Joshua Bloch", interfaces_1.CategoriaLibro.Tecnologia, 2017, 3, 3, interfaces_1.EstadoLibro.Disponible);
miBiblioteca.agregarLibro("978-0135957059", "The Clean Coder", "Robert C. Martin", interfaces_1.CategoriaLibro.Tecnologia, 2011, 2, 2, interfaces_1.EstadoLibro.Disponible);
// 4. Realizar Préstamos (5 préstamos)
// realizarPrestamo(idUsuario, ISBN) — días de préstamo se manejan en la clase Prestamo (14 por defecto para estudiantes)
console.log("\n--- REALIZANDO PRÉSTAMOS ---");
// Usuario 1 (Estudiante) pide Clean Code
miBiblioteca.realizarPrestamo(1, "978-0132350884");
// Usuario 2 (Estudiante) pide The Pragmatic Programmer
miBiblioteca.realizarPrestamo(2, "978-0201616224");
// Usuario 3 (Profesor) pide The C Programming Language
miBiblioteca.realizarPrestamo(3, "978-0131103627");
// Usuario 4 (Admin) pide Effective Java
miBiblioteca.realizarPrestamo(4, "978-0134685991");
// Usuario 1 (Estudiante) pide un segundo libro: The Clean Coder
miBiblioteca.realizarPrestamo(1, "978-0135957059");
// 5. Simular Devolución (al menos 1)
console.log("\n--- SIMULANDO DEVOLUCIONES ---");
// Juan Pérez devuelve Clean Code (Préstamo #1)
miBiblioteca.devolverPrestamo(1);
// 6. Generación de Reportes
console.log("\n--- GENERANDO REPORTES ---");
console.log(miBiblioteca.generarEstadisticasGenerales());
console.log(miBiblioteca.generarReportePrestamosActivos());
console.log(miBiblioteca.generarReporteLibrosMasPrestados(3));
// 7. Búsquedas en el Catálogo
console.log("\n--- BÚSQUEDAS EN EL CATÁLOGO ---");
// buscarLibroPorCategoria espera un array de categorías
console.log(" Búsqueda: Libros de la categoría TECNOLOGÍA");
var librosTecnologia = miBiblioteca.buscarLibroPorCategoria([interfaces_1.CategoriaLibro.Tecnologia]);
librosTecnologia.forEach(function (libro) { return console.log("   - ".concat(libro.titulo, " (").concat(libro.autor, ")")); });
console.log("\n Búsqueda: Libros del autor 'Robert C. Martin'");
var librosRobert = miBiblioteca.buscarLibrosPorAutor("Robert C. Martin");
librosRobert.forEach(function (libro) { return console.log("   - ".concat(libro.titulo, " (ISBN: ").concat(libro.ISBN, ")")); });
console.log("\n======================================================");
console.log(" EJECUCIÓN DEL SISTEMA FINALIZADA CON ÉXITO");
console.log("======================================================\n");
