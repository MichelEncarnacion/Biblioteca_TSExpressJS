import * as fs from 'fs';
import { Usuario, Libro, Prestamo } from "./clases";
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
export class Biblioteca {
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

    //Metodo obtenerUsuario
    obtenerUsuario(id: number): Usuario | undefined {
        return this.usuarios.get(id);
    }

    //Metodo Gestion de Libros

    //agregarLibro
    agregarLibro(ISBN: string, titulo: string, autor: string, categoria: CategoriaLibro, anioPublicacion: number, copiasDisponibles: number, copiasTotales: number, estado: EstadoLibro): Libro {
        //Parametros para crear el nuevo libro
        const nuevoLibro = new Libro(ISBN, titulo, autor, categoria, anioPublicacion, copiasDisponibles, copiasTotales, estado);

        //Agregar el nuevo libro al Map
        this.libros.set(ISBN, nuevoLibro);
        //Mensaje de confirmacion 
        console.log(`Libro agregado exitosamente: ${nuevoLibro.titulo} (ISBN: ${ISBN})`);
        return nuevoLibro;
    }

    //obtenerLibro
    obtenerLibro(ISBN: string): Libro | undefined {
        return this.libros.get(ISBN);
    }

    //Metodo para reservar un libro
    reservarLibro(idUsuario: number, ISBN: string): void {
        const usuario = this.obtenerUsuario(idUsuario);
        const libro = this.obtenerLibro(ISBN);

        if (!usuario) {
            console.error(`Error: No se encontró ningún usuario con ID ${idUsuario}.`);
            return;
        }
        if (!libro) {
            console.error(`Error: No se encontró ningún libro con ISBN ${ISBN}.`);
            return;
        }

        if (libro.estaDisponible()) {
            console.log(`ℹ El libro "${libro.titulo}" tiene copias disponibles. Puedes realizar el préstamo directamente.`);
            return;
        }

        try {
            libro.agregarReserva(idUsuario);
            console.log(` Usuario "${usuario.nombre}" agregado a la lista de reservas de "${libro.titulo}". (Turno en fila: ${libro.colaReservas.length})`);
        } catch (error: any) {
            console.error(` Error de reserva: ${error.message}`);
        }
    }


    //buscarLibroPorCategoria
    //convertir el map en un array para poder filtrar
    buscarLibroPorCategoria(categoria: CategoriaLibro[]): Libro[] {

        return Array.from(this.libros.values()).filter(libro => categoria.includes(libro.categoria));
    }

    //buscarLibrosPorAutor
    buscarLibrosPorAutor(autor: string): Libro[] {
        // Convertimos la búsqueda a minúsculas y quitamos espacios extra
        const busqueda = autor.toLowerCase().trim();

        return Array.from(this.libros.values()).filter(libro =>
            // Verificamos si el nombre del autor contiene el texto buscado
            libro.autor.toLowerCase().includes(busqueda)
        );
    }


    //Metodos Gestion de Prestamos

    //Metodo realizarPrestamo
    realizarPrestamo(idUsuario: number, ISBN: string): Prestamo | null {
        // 1. Buscar el usuario y el libro
        const usuario = this.obtenerUsuario(idUsuario);
        const libro = this.obtenerLibro(ISBN);

        // 2. Validar que ambos existan y que el libro esté disponible
        if (!usuario) {
            console.error(`Error: No se encontró ningún usuario con ID ${idUsuario}.`);
            return null;
        }

        if (!libro) {
            console.error(`Error: No se encontró ningún libro con ISBN ${ISBN}.`);
            return null;
        }

        if (!libro.estaDisponible()) {
            console.error(`Error: El libro "${libro.titulo}" no tiene copias disponibles.`);
            return null;
        }

        // 3. Validar que el usuario pueda realizar el préstamo
        if (!usuario.puedeRealizarPrestamo()) {
            console.error(`Error: El usuario "${usuario.nombre}" ha alcanzado su límite de préstamos activos.`);
            return null;
        }

        // 4. Realizar el préstamo
        //creamos una nueva instancia de prestamo

        const nuevoPrestamo = new Prestamo(this.contadorPrestamos, usuario, libro);
        //guardamos el prestamo en el map
        this.prestamos.set(this.contadorPrestamos, nuevoPrestamo);
        //incrementamos el contador de prestamos
        this.contadorPrestamos++;


        // 5. Actualizar el estado del libro y del usuario
        libro.prestarCopia();
        //incrementamos el contador de prestamos activos del usuario
        usuario.prestamosActivos++;

        console.log(`Préstamo realizado exitosamente:`);
        console.log(`  - Libro: ${libro.titulo}`);
        console.log(`  - Usuario: ${usuario.nombre}`);
        console.log(`  - Fecha de devolución: ${nuevoPrestamo.fechaDevolucion.toLocaleDateString()}`);

        return nuevoPrestamo;
    }

    //devolverPrestamo

    devolverPrestamo(idPrestamo: number): void {
        // 1. Buscar el prestamo
        const prestamo = this.prestamos.get(idPrestamo);
        // 2. Validar que el prestamo exista
        if (!prestamo) {
            console.error(`Error: No se encontró ningún préstamo con ID ${idPrestamo}.`);
            return;
        }

        if (prestamo.estado === EstadoPrestamo.Devuelto) {
            console.error("El préstamo ya ha sido devuelto anteriormente.");
            return;
        }

        // 3. Devolver el prestamo
        prestamo.realizarDevolucion();
        // 4. Actualizar el estado del libro y del usuario
        (prestamo.libro as Libro).devolverCopia();
        prestamo.usuario.prestamosActivos--;

        // 5. Mensaje de confirmacion
        console.log(`Préstamo devuelto exitosamente:`);
        console.log(`  - Libro: ${prestamo.libro.titulo}`);
        console.log(`  - Usuario: ${prestamo.usuario.nombre}`);
        console.log(`  - Fecha de devolución: ${prestamo.fechaDevolucion.toLocaleDateString()}`);
        console.log(`Devolución registrada para el préstamo #${idPrestamo}.`);

        //Muestra Multa si existe
        //calculamos la multa
        const multa = prestamo.calcularMulta();
        //si la multa es mayor a 0, la mostramos
        if (multa > 0) {
            console.log(`Atención: Se aplicó una multa de $${multa} por ${prestamo.diasRetraso()} días de retraso.`);
        }
        //  Procesar fila de reservas al devolver ---
        const libroDevuelto = prestamo.libro as Libro;
        const siguienteUsuarioId = libroDevuelto.obtenerSiguienteReserva();

        if (siguienteUsuarioId) {
            const siguienteUsuario = this.obtenerUsuario(siguienteUsuarioId);
            console.log(`\n ¡ATENCIÓN! El libro "${libroDevuelto.titulo}" estaba reservado.`);
            console.log(`   Asignando préstamo automáticamente a ${siguienteUsuario?.nombre}...`);

            // Reutilizamos el método realizarPrestamo para dárselo al que esperaba
            this.realizarPrestamo(siguienteUsuarioId, libroDevuelto.ISBN);
        }
    }

    //Metodo Reportes

    generarReporteLibrosMasPrestados(limite: number = 5): string {
        // Map para contar cuántas veces se prestó cada libro (usaremos el ISBN como llave)
        const conteo = new Map<string, number>();

        // Frecuencia de prestamos 
        Array.from(this.prestamos.values()).forEach(prestamo => {
            const isbnLibro = prestamo.libro.ISBN; // 
            const conteoActual = conteo.get(isbnLibro) || 0;
            conteo.set(isbnLibro, conteoActual + 1); // 
        });

        // ordenar por cantidad de préstamos descendente
        const ordenados = Array.from(conteo.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, limite);

        // Formatear el reporte
        let reporte = `\n REPORTE: Top ${limite} Libros Más Prestados\n`;
        reporte += `==========================================\n`;

        if (ordenados.length === 0) return reporte + "No hay datos de préstamos aún.\n";

        ordenados.forEach(([isbn, cantidad], index) => {
            const libro = this.libros.get(isbn)!;
            reporte += `${index + 1}. [${libro.categoria}] ${libro.titulo} de ${libro.autor} - ${cantidad} préstamos\n`;
        });

        return reporte;
    }

    //generarReportePrestamosActivos

    generarReportePrestamosActivos(): string {
        //Filtramos los prestamos que esten activos o vencidos
        const activosOVencidos = Array.from(this.prestamos.values()).filter(p =>
            p.estado === EstadoPrestamo.Activo || p.estado === EstadoPrestamo.Vencido
        );
        //Formatear el reporte
        let reporte = `\n REPORTE: Préstamos Activos y Vencidos (${activosOVencidos.length})\n`;
        reporte += `====================================================\n`;
        activosOVencidos.forEach(p => reporte += p.obtenerInformacion() + '\n');
        return reporte;
    }

    //generarReportePrestamosVencidos

    generarReportePrestamosVencidos(): string {
        //filtramos prestamos vencidos
        const vencidos = Array.from(this.prestamos.values()).filter(p => p.estado === EstadoPrestamo.Vencido);
        //calculamos la multa total
        //usamos reduce para sumar las multas de cada prestamo vencido
        //reduce funciona para transformar un array en un solo valor
        //el 0 es el valor inicial del acumulador
        const multaTotal = vencidos.reduce((total, p) => total + p.calcularMulta(), 0);

        let reporte = `\n REPORTE: Préstamos Vencidos (${vencidos.length})\n`;
        reporte += `==========================================\n`;
        //mostramos los prestamos vencidos
        vencidos.forEach(p => reporte += p.obtenerInformacion() + '\n');
        //mostramos la multa total
        reporte += `\n Total en multas proyectadas: $${multaTotal}\n`;
        return reporte;
    }

    //generarEstadisticasGenerales
    generarEstadisticasGenerales(): string {
        //  Total de libros y usuarios base
        const totalLibros = this.libros.size;
        const totalUsuarios = this.usuarios.size;
        const totalPrestamos = this.prestamos.size;

        //  Copias disponibles vs prestadas
        let copiasTotales = 0;
        let copiasDisponibles = 0;
        this.libros.forEach(l => {
            copiasTotales += l.copiasTotales;
            copiasDisponibles += l.copiasDisponibles;
        });
        const copiasPrestadas = copiasTotales - copiasDisponibles;

        //  Total de usuarios por tipo
        const usuariosPorTipo = {
            [TipoUsuario.Estudiante]: 0,
            [TipoUsuario.Profesor]: 0,
            [TipoUsuario.Administrador]: 0
        };
        this.usuarios.forEach(usuario => {
            usuariosPorTipo[usuario.tipo]++;
        });

        //  Total de préstamos por estado
        const prestamosPorEstado = {
            [EstadoPrestamo.Activo]: 0,
            [EstadoPrestamo.Devuelto]: 0,
            [EstadoPrestamo.Vencido]: 0
        };
        this.prestamos.forEach(prestamo => {
            prestamosPorEstado[prestamo.estado]++;
        });

        //  Tasa de uso y  Promedio de préstamos por usuario
        //Operadores ternarios: Se usan para evitar division por cero si la biblioteca está vacía
        //Ejemplo: (condicion) ? valor_si_true : valor_si_false
        //En este caso, si copiasTotales es mayor a 0, se calcula la tasa de uso, si no, se muestra '0.00'
        const tasaDeUso = copiasTotales > 0 ? ((copiasPrestadas / copiasTotales) * 100).toFixed(2) : '0.00';
        const promedioPrestamos = totalUsuarios > 0 ? (totalPrestamos / totalUsuarios).toFixed(2) : '0.00';

        //  Genera un reporte formateado con secciones y emojis usando template strings
        let reporte = `\n📊 ESTADÍSTICAS GENERALES DE LA BIBLIOTECA "${this.nombreBiblioteca.toUpperCase()}"\n`;
        reporte += `========================================================================\n\n`;

        // --- Sección 1: Usuarios ---
        reporte += `👥 1. USUARIOS (Total: ${totalUsuarios})\n`;
        reporte += `   🎓 Estudiantes: ${usuariosPorTipo[TipoUsuario.Estudiante]}\n`;
        reporte += `   👨‍🏫 Profesores: ${usuariosPorTipo[TipoUsuario.Profesor]}\n`;
        reporte += `   🛠️ Administradores: ${usuariosPorTipo[TipoUsuario.Administrador]}\n\n`;

        // --- Sección 2: Libros ---
        reporte += `📚 2. INVENTARIO DE LIBROS\n`;
        reporte += `   📖 Títulos únicos en catálogo: ${totalLibros}\n`;
        reporte += `   📦 Copias físicas totales: ${copiasTotales}\n`;
        reporte += `   ✅ Copias disponibles: ${copiasDisponibles}\n`;
        reporte += `   📕 Copias prestadas: ${copiasPrestadas}\n`;
        reporte += `   📈 Tasa de uso del inventario: ${tasaDeUso}%\n\n`;

        // --- Sección 3: Préstamos ---
        reporte += `🔄 3. PRÉSTAMOS (Total Histórico: ${totalPrestamos})\n`;
        reporte += `   🟢 Activos: ${prestamosPorEstado[EstadoPrestamo.Activo]}\n`;
        reporte += `   ⚪ Devueltos: ${prestamosPorEstado[EstadoPrestamo.Devuelto]}\n`;
        reporte += `   🔴 Vencidos: ${prestamosPorEstado[EstadoPrestamo.Vencido]}\n`;
        reporte += `   📉 Promedio de préstamos por usuario: ${promedioPrestamos}\n`;

        reporte += `========================================================================\n`;

        return reporte;
    }

    //  Persistencia de Datos 

    guardarDatos(): void {
        try {
            const datos = {
                usuarios: Array.from(this.usuarios.entries()),
                libros: Array.from(this.libros.entries()),
                prestamos: Array.from(this.prestamos.entries()),
                contadorPrestamos: this.contadorPrestamos
            };

            // 1. Definimos la ruta de la carpeta y del archivo
            const carpetaBd = './bd';
            const rutaArchivo = `${carpetaBd}/biblioteca_datos.json`;

            // 2. Verificamos si la carpeta "bd" existe. Si no, la creamos.
            if (!fs.existsSync(carpetaBd)) {
                fs.mkdirSync(carpetaBd);
            }

            // 3. Escribimos el archivo dentro de la carpeta
            fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), 'utf-8');
            console.log(`\n ÉXITO: Los datos se han guardado en '${rutaArchivo}'`);
        } catch (error) {
            console.error(" Error al guardar los datos:", error);
        }
    }

    cargarDatos(): void {
        try {
            const rutaArchivo = './bd/biblioteca_datos.json';

            // Verificamos si el archivo existe en la nueva ruta
            if (fs.existsSync(rutaArchivo)) {
                const archivo = fs.readFileSync(rutaArchivo, 'utf-8');
                const datos = JSON.parse(archivo);

                this.usuarios.clear();
                this.libros.clear();
                this.prestamos.clear();

                datos.usuarios.forEach(([id, u]: [number, any]) => {
                    const usuario = new Usuario(u.id, u._nombre, u._email, u.tipo);
                    usuario.prestamosActivos = u.prestamosActivos;
                    usuario.fechaRegistro = new Date(u.fechaRegistro);
                    this.usuarios.set(id, usuario);
                });

                datos.libros.forEach(([isbn, l]: [string, any]) => {
                    const libro = new Libro(l.ISBN, l.titulo, l.autor, l.categoria, l.anioPublicacion, l._copiasDisponibles, l.copiasTotales, l.estado);
                    libro.colaReservas = l.colaReservas || [];
                    this.libros.set(isbn, libro);
                });

                datos.prestamos.forEach(([id, p]: [number, any]) => {
                    const usuario = this.usuarios.get(p.usuario.id)!;
                    const libro = this.libros.get(p.libro.ISBN)!;
                    const prestamo = new Prestamo(p.idPrestamo, usuario, libro);
                    prestamo.fechaPrestamo = new Date(p.fechaPrestamo);
                    prestamo.fechaDevolucion = new Date(p.fechaDevolucion);
                    prestamo.fechaRealDevolucion = new Date(p.fechaRealDevolucion);
                    (prestamo as any)._estado = p._estado;
                    this.prestamos.set(id, prestamo);
                });

                this.contadorPrestamos = datos.contadorPrestamos;
                console.log(` ÉXITO: Datos cargados correctamente desde '${rutaArchivo}'\n`);
            } else {
                console.log(" No se encontró base de datos previa. Iniciando sistema en blanco.\n");
            }
        } catch (error) {
            console.error(" Error al cargar los datos:", error);
        }
    }

}