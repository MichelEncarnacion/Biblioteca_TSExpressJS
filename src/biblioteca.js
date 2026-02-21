"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Biblioteca = void 0;
var clases_1 = require("./clases");
var interfaces_1 = require("./interfaces");
//clase Biblioteca
var Biblioteca = /** @class */ (function () {
    //Constructor
    function Biblioteca(nombreBiblioteca) {
        //Asignar el nombre a la Biblioteca 
        this.nombreBiblioteca = nombreBiblioteca;
        //Inicializar los Maps
        this.usuarios = new Map();
        this.libros = new Map();
        this.prestamos = new Map();
        //Inicializar el contador de prestamos
        this.contadorPrestamos = 1;
    }
    //Metodos Gestion de Usuarios
    //registrarUsuario Genera un ID automático, crea la instancia y la guarda en el Map.
    Biblioteca.prototype.registrarUsuario = function (nombre, email, tipo) {
        // 1. Generar nuevo ID basado en el tamaño del Map + 1
        var id = this.usuarios.size + 1;
        // 2. Crear la instancia de Usuario
        var nuevoUsuario = new clases_1.Usuario(id, nombre, email, tipo);
        // 3. Guardar en el Map
        this.usuarios.set(id, nuevoUsuario);
        console.log("Usuario registrado exitosamente: ".concat(nuevoUsuario.nombre, " (ID: ").concat(id, ")"));
        // 4. Devolver el usuario creado
        return nuevoUsuario;
    };
    //Metodo obtenerUsuario
    Biblioteca.prototype.obtenerUsuario = function (id) {
        return this.usuarios.get(id);
    };
    //Metodo Gestion de Libros
    //agregarLibro
    Biblioteca.prototype.agregarLibro = function (ISBN, titulo, autor, categoria, anioPublicacion, copiasDisponibles, copiasTotales, estado) {
        //Parametros para crear el nuevo libro
        var nuevoLibro = new clases_1.Libro(ISBN, titulo, autor, categoria, anioPublicacion, copiasDisponibles, copiasTotales, estado);
        //Agregar el nuevo libro al Map
        this.libros.set(ISBN, nuevoLibro);
        //Mensaje de confirmacion 
        console.log("Libro agregado exitosamente: ".concat(nuevoLibro.titulo, " (ISBN: ").concat(ISBN, ")"));
        return nuevoLibro;
    };
    //obtenerLibro
    Biblioteca.prototype.obtenerLibro = function (ISBN) {
        return this.libros.get(ISBN);
    };
    //buscarLibroPorCategoria
    //convertir el map en un array para poder filtrar
    Biblioteca.prototype.buscarLibroPorCategoria = function (categoria) {
        return Array.from(this.libros.values()).filter(function (libro) { return categoria.includes(libro.categoria); });
    };
    //buscarLibrosPorAutor
    Biblioteca.prototype.buscarLibrosPorAutor = function (autor) {
        // Convertimos la búsqueda a minúsculas y quitamos espacios extra
        var busqueda = autor.toLowerCase().trim();
        return Array.from(this.libros.values()).filter(function (libro) {
            // Verificamos si el nombre del autor contiene el texto buscado
            return libro.autor.toLowerCase().includes(busqueda);
        });
    };
    //Metodos Gestion de Prestamos
    //Metodo realizarPrestamo
    Biblioteca.prototype.realizarPrestamo = function (idUsuario, ISBN) {
        // 1. Buscar el usuario y el libro
        var usuario = this.obtenerUsuario(idUsuario);
        var libro = this.obtenerLibro(ISBN);
        // 2. Validar que ambos existan y que el libro esté disponible
        if (!usuario) {
            console.error("Error: No se encontr\u00F3 ning\u00FAn usuario con ID ".concat(idUsuario, "."));
            return null;
        }
        if (!libro) {
            console.error("Error: No se encontr\u00F3 ning\u00FAn libro con ISBN ".concat(ISBN, "."));
            return null;
        }
        if (!libro.estaDisponible()) {
            console.error("Error: El libro \"".concat(libro.titulo, "\" no tiene copias disponibles."));
            return null;
        }
        // 3. Validar que el usuario pueda realizar el préstamo
        if (!usuario.puedeRealizarPrestamo()) {
            console.error("Error: El usuario \"".concat(usuario.nombre, "\" ha alcanzado su l\u00EDmite de pr\u00E9stamos activos."));
            return null;
        }
        // 4. Realizar el préstamo
        //creamos una nueva instancia de prestamo
        var nuevoPrestamo = new clases_1.Prestamo(this.contadorPrestamos, usuario, libro);
        //guardamos el prestamo en el map
        this.prestamos.set(this.contadorPrestamos, nuevoPrestamo);
        //incrementamos el contador de prestamos
        this.contadorPrestamos++;
        // 5. Actualizar el estado del libro y del usuario
        libro.prestarCopia();
        //incrementamos el contador de prestamos activos del usuario
        usuario.prestamosActivos++;
        console.log("Pr\u00E9stamo realizado exitosamente:");
        console.log("  - Libro: ".concat(libro.titulo));
        console.log("  - Usuario: ".concat(usuario.nombre));
        console.log("  - Fecha de devoluci\u00F3n: ".concat(nuevoPrestamo.fechaDevolucion.toLocaleDateString()));
        return nuevoPrestamo;
    };
    //devolverPrestamo
    Biblioteca.prototype.devolverPrestamo = function (idPrestamo) {
        // 1. Buscar el prestamo
        var prestamo = this.prestamos.get(idPrestamo);
        // 2. Validar que el prestamo exista
        if (!prestamo) {
            console.error("Error: No se encontr\u00F3 ning\u00FAn pr\u00E9stamo con ID ".concat(idPrestamo, "."));
            return;
        }
        if (prestamo.estado === interfaces_1.EstadoPrestamo.Devuelto) {
            console.error("El préstamo ya ha sido devuelto anteriormente.");
            return;
        }
        // 3. Devolver el prestamo
        prestamo.realizarDevolucion();
        // 4. Actualizar el estado del libro y del usuario
        prestamo.libro.devolverCopia();
        prestamo.usuario.prestamosActivos--;
        // 5. Mensaje de confirmacion
        console.log("Pr\u00E9stamo devuelto exitosamente:");
        console.log("  - Libro: ".concat(prestamo.libro.titulo));
        console.log("  - Usuario: ".concat(prestamo.usuario.nombre));
        console.log("  - Fecha de devoluci\u00F3n: ".concat(prestamo.fechaDevolucion.toLocaleDateString()));
        console.log("Devoluci\u00F3n registrada para el pr\u00E9stamo #".concat(idPrestamo, "."));
        //Muestra Multa si existe
        //calculamos la multa
        var multa = prestamo.calcularMulta();
        //si la multa es mayor a 0, la mostramos
        if (multa > 0) {
            console.log("Atenci\u00F3n: Se aplic\u00F3 una multa de $".concat(multa, " por ").concat(prestamo.diasRetraso(), " d\u00EDas de retraso."));
        }
    };
    //Metodo Reportes
    Biblioteca.prototype.generarReporteLibrosMasPrestados = function (limite) {
        var _this = this;
        if (limite === void 0) { limite = 5; }
        //Map para contar cuántas veces se prestó cada libro
        var conteo = new Map();
        //Frecuencia de prestamos 
        Array.from(this.prestamos.values()).forEach(function (prestamo) {
            var tituloLibro = prestamo.libro.titulo;
            var conteoActual = conteo.get(tituloLibro) || 0;
            conteo.set(tituloLibro, conteoActual + 1);
        });
        //ordenar por cantidad de préstamos descendente
        var ordenados = Array.from(conteo.entries())
            .sort(function (a, b) { return b[1] - a[1]; })
            .slice(0, limite);
        //Formatear el reporte
        var reporte = "\n REPORTE: Top ".concat(limite, " Libros M\u00E1s Prestados\n");
        reporte += "==========================================\n";
        if (ordenados.length === 0)
            return reporte + "No hay datos de préstamos aún.\n";
        ordenados.forEach(function (_a, index) {
            var isbn = _a[0], cantidad = _a[1];
            var libro = _this.libros.get(isbn);
            reporte += "".concat(index + 1, ". [").concat(libro.categoria, "] ").concat(libro.titulo, " de ").concat(libro.autor, " - ").concat(cantidad, " pr\u00E9stamos\n");
        });
        return reporte;
    };
    //generarReportePrestamosActivos
    Biblioteca.prototype.generarReportePrestamosActivos = function () {
        //Filtramos los prestamos que esten activos o vencidos
        var activosOVencidos = Array.from(this.prestamos.values()).filter(function (p) {
            return p.estado === interfaces_1.EstadoPrestamo.Activo || p.estado === interfaces_1.EstadoPrestamo.Vencido;
        });
        //Formatear el reporte
        var reporte = "\n REPORTE: Pr\u00E9stamos Activos y Vencidos (".concat(activosOVencidos.length, ")\n");
        reporte += "====================================================\n";
        activosOVencidos.forEach(function (p) { return reporte += p.obtenerInformacion() + '\n'; });
        return reporte;
    };
    //generarReportePrestamosVencidos
    Biblioteca.prototype.generarReportePrestamosVencidos = function () {
        //filtramos prestamos vencidos
        var vencidos = Array.from(this.prestamos.values()).filter(function (p) { return p.estado === interfaces_1.EstadoPrestamo.Vencido; });
        //calculamos la multa total
        //usamos reduce para sumar las multas de cada prestamo vencido
        //reduce funciona para transformar un array en un solo valor
        //el 0 es el valor inicial del acumulador
        var multaTotal = vencidos.reduce(function (total, p) { return total + p.calcularMulta(); }, 0);
        var reporte = "\n REPORTE: Pr\u00E9stamos Vencidos (".concat(vencidos.length, ")\n");
        reporte += "==========================================\n";
        //mostramos los prestamos vencidos
        vencidos.forEach(function (p) { return reporte += p.obtenerInformacion() + '\n'; });
        //mostramos la multa total
        reporte += "\n Total en multas proyectadas: $".concat(multaTotal, "\n");
        return reporte;
    };
    //generarEstadisticasGenerales
    Biblioteca.prototype.generarEstadisticasGenerales = function () {
        var _a, _b;
        //  Total de libros y usuarios base
        var totalLibros = this.libros.size;
        var totalUsuarios = this.usuarios.size;
        var totalPrestamos = this.prestamos.size;
        //  Copias disponibles vs prestadas
        var copiasTotales = 0;
        var copiasDisponibles = 0;
        this.libros.forEach(function (l) {
            copiasTotales += l.copiasTotales;
            copiasDisponibles += l.copiasDisponibles;
        });
        var copiasPrestadas = copiasTotales - copiasDisponibles;
        //  Total de usuarios por tipo
        var usuariosPorTipo = (_a = {},
            _a[interfaces_1.TipoUsuario.Estudiante] = 0,
            _a[interfaces_1.TipoUsuario.Profesor] = 0,
            _a[interfaces_1.TipoUsuario.Administrador] = 0,
            _a);
        this.usuarios.forEach(function (usuario) {
            usuariosPorTipo[usuario.tipo]++;
        });
        //  Total de préstamos por estado
        var prestamosPorEstado = (_b = {},
            _b[interfaces_1.EstadoPrestamo.Activo] = 0,
            _b[interfaces_1.EstadoPrestamo.Devuelto] = 0,
            _b[interfaces_1.EstadoPrestamo.Vencido] = 0,
            _b);
        this.prestamos.forEach(function (prestamo) {
            prestamosPorEstado[prestamo.estado]++;
        });
        //  Tasa de uso y  Promedio de préstamos por usuario
        //Operadores ternarios: Se usan para evitar division por cero si la biblioteca está vacía
        //Ejemplo: (condicion) ? valor_si_true : valor_si_false
        //En este caso, si copiasTotales es mayor a 0, se calcula la tasa de uso, si no, se muestra '0.00'
        var tasaDeUso = copiasTotales > 0 ? ((copiasPrestadas / copiasTotales) * 100).toFixed(2) : '0.00';
        var promedioPrestamos = totalUsuarios > 0 ? (totalPrestamos / totalUsuarios).toFixed(2) : '0.00';
        //  Genera un reporte formateado con secciones y emojis usando template strings
        var reporte = "\n\uD83D\uDCCA ESTAD\u00CDSTICAS GENERALES DE LA BIBLIOTECA \"".concat(this.nombreBiblioteca.toUpperCase(), "\"\n");
        reporte += "========================================================================\n\n";
        // --- Sección 1: Usuarios ---
        reporte += "\uD83D\uDC65 1. USUARIOS (Total: ".concat(totalUsuarios, ")\n");
        reporte += "   \uD83C\uDF93 Estudiantes: ".concat(usuariosPorTipo[interfaces_1.TipoUsuario.Estudiante], "\n");
        reporte += "   \uD83D\uDC68\u200D\uD83C\uDFEB Profesores: ".concat(usuariosPorTipo[interfaces_1.TipoUsuario.Profesor], "\n");
        reporte += "   \uD83D\uDEE0\uFE0F Administradores: ".concat(usuariosPorTipo[interfaces_1.TipoUsuario.Administrador], "\n\n");
        // --- Sección 2: Libros ---
        reporte += "\uD83D\uDCDA 2. INVENTARIO DE LIBROS\n";
        reporte += "   \uD83D\uDCD6 T\u00EDtulos \u00FAnicos en cat\u00E1logo: ".concat(totalLibros, "\n");
        reporte += "   \uD83D\uDCE6 Copias f\u00EDsicas totales: ".concat(copiasTotales, "\n");
        reporte += "   \u2705 Copias disponibles: ".concat(copiasDisponibles, "\n");
        reporte += "   \uD83D\uDCD5 Copias prestadas: ".concat(copiasPrestadas, "\n");
        reporte += "   \uD83D\uDCC8 Tasa de uso del inventario: ".concat(tasaDeUso, "%\n\n");
        // --- Sección 3: Préstamos ---
        reporte += "\uD83D\uDD04 3. PR\u00C9STAMOS (Total Hist\u00F3rico: ".concat(totalPrestamos, ")\n");
        reporte += "   \uD83D\uDFE2 Activos: ".concat(prestamosPorEstado[interfaces_1.EstadoPrestamo.Activo], "\n");
        reporte += "   \u26AA Devueltos: ".concat(prestamosPorEstado[interfaces_1.EstadoPrestamo.Devuelto], "\n");
        reporte += "   \uD83D\uDD34 Vencidos: ".concat(prestamosPorEstado[interfaces_1.EstadoPrestamo.Vencido], "\n");
        reporte += "   \uD83D\uDCC9 Promedio de pr\u00E9stamos por usuario: ".concat(promedioPrestamos, "\n");
        reporte += "========================================================================\n";
        return reporte;
    };
    return Biblioteca;
}());
exports.Biblioteca = Biblioteca;
