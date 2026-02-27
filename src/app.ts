import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import hbs from 'hbs';
import { Biblioteca } from '../api/biblioteca';
import { TipoUsuario, EstadoLibro, EstadoPrestamo } from '../api/interfaces';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const miBiblioteca = new Biblioteca("Biblioteca Central");

// IMPORTANTE: Cargar los datos desde el JSON persistente cuando inicie el servidor
miBiblioteca.cargarDatos();

// 1. Configurar el motor de vistas
app.set('view engine', 'hbs');

// 2. Definir la ruta de las vistas (asegúrate de que la carpeta 'views' exista)
app.set('views', path.join(__dirname, '../views'));
hbs.registerPartials(path.join(__dirname, '../views/partials'));

// Registrar un helper 'eq' para comparaciones en HBS
hbs.registerHelper('eq', function (a, b) {
    return a === b;
});

// Middleware para procesar JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos (CSS, Imágenes)
app.use(express.static(path.join(__dirname, '../public')));

// --- Rutas

// Ruta /

app.get('/', (req: Request, res: Response) => {
    // IMPORTANTE: Convertimos el Map de libros a un Array para que HBS pueda leerlo
    const listaLibros = Array.from(miBiblioteca['libros'].values());

    res.render('index', {
        nombreBiblioteca: "Biblioteca Central", // property was private, hardcoded for ease without mutating the model
        libros: listaLibros
    });
});





// 1. Obtener estadísticas
app.get('/stats', (req: Request, res: Response) => {
    //  Total de libros y usuarios base
    const totalLibros = miBiblioteca['libros'].size;
    const totalUsuarios = miBiblioteca['usuarios'].size;
    const totalPrestamos = miBiblioteca['prestamos'].size;

    //  Copias disponibles vs prestadas
    let copiasTotales = 0;
    let copiasDisponibles = 0;
    miBiblioteca['libros'].forEach(l => {
        copiasTotales += l.copiasTotales;
        copiasDisponibles += l.copiasDisponibles;
    });
    const copiasPrestadas = copiasTotales - copiasDisponibles;

    //  Total de usuarios por tipo
    const usuariosPorTipo = {
        0: 0, // Estudiantes
        1: 0, // Profesores
        2: 0  // Administradores
    };
    miBiblioteca['usuarios'].forEach(usuario => {
        usuariosPorTipo[usuario.tipo]++;
    });

    //  Total de préstamos por estado
    const prestamosPorEstado = {
        0: 0, // Activos
        1: 0, // Devueltos
        2: 0  // Vencidos
    };
    miBiblioteca['prestamos'].forEach(prestamo => {
        prestamosPorEstado[prestamo.estado]++;
    });

    const tasaDeUso = copiasTotales > 0 ? ((copiasPrestadas / copiasTotales) * 100).toFixed(2) : '0.00';
    const promedioPrestamos = totalUsuarios > 0 ? (totalPrestamos / totalUsuarios).toFixed(2) : '0.00';

    res.render('stats', {
        title: "Estadísticas",
        nombreBiblioteca: "Biblioteca Central",
        totalUsuarios,
        totalLibros,
        totalPrestamos,
        copiasDisponibles,
        copiasPrestadas,
        copiasTotales,
        tasaDeUso,
        promedioPrestamos,
        usuariosPorTipo,
        prestamosPorEstado
    });
});

// 2. Registrar un usuario (UI Version)
app.post('/usuarios', (req: Request, res: Response) => {
    try {
        const { nombre, email, tipo } = req.body;
        // Llamamos a tu método que ya tiene la lógica de IDs
        miBiblioteca.registrarUsuario(nombre, email, parseInt(tipo) as TipoUsuario);
        // Redirigir de vuelta a Préstamos con éxito
        res.redirect('/prestamos?mensaje=Usuario creado con éxito');
    } catch (error: any) {
        res.redirect(`/prestamos?error=${encodeURIComponent(error.message)}`);
    }
});

// --- Rutas de Préstamos (UI)
app.get('/prestamos', (req: Request, res: Response) => {
    // Collect data for the forms
    const usuarios = Array.from(miBiblioteca['usuarios'].values());
    const librosDisponibles = Array.from(miBiblioteca['libros'].values()).filter(l => l.estaDisponible());

    // Solo mostramos préstamos activos en la tabla
    const prestamosActivos = Array.from(miBiblioteca['prestamos'].values()).filter(p => p.estado === EstadoPrestamo.Activo || p.estado === EstadoPrestamo.Vencido);

    res.render('prestamos', {
        title: "Gestión",
        usuarios,
        librosDisponibles,
        prestamos: prestamosActivos,
        mensaje: req.query.mensaje,
        error: req.query.error
    });
});

app.post('/prestamos/realizar', (req: Request, res: Response) => {
    try {
        const { idUsuario, ISBN } = req.body;
        const prestamo = miBiblioteca.realizarPrestamo(parseInt(idUsuario), ISBN);

        if (prestamo) {
            res.redirect('/prestamos?mensaje=Préstamo registrado exitosamente.');
        } else {
            res.redirect('/prestamos?error=No se pudo realizar el préstamo. Verifica límites o disponibilidad.');
        }
    } catch (error: any) {
        res.redirect(`/prestamos?error=${encodeURIComponent(error.message)}`);
    }
});

app.post('/prestamos/devolver', (req: Request, res: Response) => {
    try {
        const { idPrestamo } = req.body;
        miBiblioteca.devolverPrestamo(parseInt(idPrestamo));
        res.redirect('/prestamos?mensaje=Libro devuelto a la biblioteca.');
    } catch (error: any) {
        res.redirect(`/prestamos?error=${encodeURIComponent(error.message)}`);
    }
});

// 3. Buscar libros por autor (Query Params)
app.get('/libros/buscar', (req: Request, res: Response) => {
    const autor = req.query.autor as string;
    if (!autor) {
        return res.status(400).json({ error: "Falta el parámetro 'autor'" });
    }
    const resultados = miBiblioteca.buscarLibrosPorAutor(autor);
    res.json(resultados);
});

// --- Rutas del Panel de Administración
app.get('/admin', (req: Request, res: Response) => {
    res.render('admin', {
        title: "Panel de Administración",
        mensaje: req.query.mensaje,
        error: req.query.error
    });
});

app.post('/admin/libros', (req: Request, res: Response) => {
    try {
        const { ISBN, titulo, autor, categoria, anioPublicacion, copiasTotales } = req.body;

        // Agregar el libro a la RAM
        miBiblioteca.agregarLibro(
            ISBN,
            titulo,
            autor,
            parseInt(categoria),
            parseInt(anioPublicacion),
            parseInt(copiasTotales), // copiasDisponibles
            parseInt(copiasTotales), // copiasTotales
            EstadoLibro.Disponible
        );

        // Guardar físicamente el cambio en el JSON
        miBiblioteca.guardarDatos();

        res.redirect('/admin?mensaje=Libro agregado exitosamente al inventario y base de datos.');
    } catch (error: any) {
        res.redirect(`/admin?error=${encodeURIComponent(error.message)}`);
    }
});

app.listen(port, () => {
    console.log(`🚀 Biblioteca API corriendo en http://localhost:${port}`);
});