"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var biblioteca_1 = require("./biblioteca");
var interfaces_1 = require("./interfaces");
var readline = require("readline");
// Configuración de Readline para leer la consola
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function preguntar(texto) {
    return new Promise(function (resolve) { return rl.question(texto, resolve); });
}
var miBiblioteca = new biblioteca_1.Biblioteca("Biblioteca Central Universidad TEC");
function iniciarSistema() {
    return __awaiter(this, void 0, void 0, function () {
        var salir, opcion, _a, nombre, email, tipoStr, isbn, titulo, autor, catStr, anioStr, copiasStr, idUsuarioStr, isbnPrestamo, idPrestamoStr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\n======================================================");
                    console.log("      SISTEMA DE GESTI\u00D3N BIBLIOTECARIA ");
                    console.log("======================================================\n");
                    // 1. Cargar datos previos
                    miBiblioteca.cargarDatos();
                    salir = false;
                    _b.label = 1;
                case 1:
                    if (!!salir) return [3 /*break*/, 25];
                    console.log("\n================== MEN\u00DA PRINCIPAL ==================");
                    console.log("1. \uD83D\uDC64 Registrar nuevo usuario");
                    console.log("2. \uD83D\uDCDA Agregar nuevo libro");
                    console.log("3. \uD83D\uDD04 Realizar pr\u00E9stamo");
                    console.log("4. \uD83D\uDCE5 Devolver pr\u00E9stamo");
                    console.log("5. \uD83D\uDCCA Ver Estad\u00EDsticas Generales");
                    console.log("6. \uD83C\uDFC6 Ver Top 3 Libros M\u00E1s Prestados");
                    console.log("7. \uD83E\uDDEA Cargar datos de prueba (Mock Data)");
                    console.log("0. \uD83D\uDCBE Guardar y Salir");
                    console.log("====================================================");
                    return [4 /*yield*/, preguntar("👉 Seleccione una opción: ")];
                case 2:
                    opcion = _b.sent();
                    _a = opcion;
                    switch (_a) {
                        case '1': return [3 /*break*/, 3];
                        case '2': return [3 /*break*/, 7];
                        case '3': return [3 /*break*/, 14];
                        case '4': return [3 /*break*/, 17];
                        case '5': return [3 /*break*/, 19];
                        case '6': return [3 /*break*/, 20];
                        case '7': return [3 /*break*/, 21];
                        case '0': return [3 /*break*/, 22];
                    }
                    return [3 /*break*/, 23];
                case 3: return [4 /*yield*/, preguntar("Nombre del usuario: ")];
                case 4:
                    nombre = _b.sent();
                    return [4 /*yield*/, preguntar("Email: ")];
                case 5:
                    email = _b.sent();
                    console.log("Tipos: 0=Estudiante, 1=Profesor, 2=Administrador");
                    return [4 /*yield*/, preguntar("Seleccione el tipo (0, 1 o 2): ")];
                case 6:
                    tipoStr = _b.sent();
                    miBiblioteca.registrarUsuario(nombre, email, parseInt(tipoStr));
                    return [3 /*break*/, 24];
                case 7: return [4 /*yield*/, preguntar("ISBN: ")];
                case 8:
                    isbn = _b.sent();
                    return [4 /*yield*/, preguntar("Título: ")];
                case 9:
                    titulo = _b.sent();
                    return [4 /*yield*/, preguntar("Autor: ")];
                case 10:
                    autor = _b.sent();
                    console.log("Categorías: 0=Ciencia, 1=Ficcion, 2=Historia, 3=Literatura, 4=Tecnologia, 5=Arte");
                    return [4 /*yield*/, preguntar("Categoría (0-5): ")];
                case 11:
                    catStr = _b.sent();
                    return [4 /*yield*/, preguntar("Año de publicación: ")];
                case 12:
                    anioStr = _b.sent();
                    return [4 /*yield*/, preguntar("Número de copias: ")];
                case 13:
                    copiasStr = _b.sent();
                    miBiblioteca.agregarLibro(isbn, titulo, autor, parseInt(catStr), parseInt(anioStr), parseInt(copiasStr), parseInt(copiasStr), interfaces_1.EstadoLibro.Disponible);
                    return [3 /*break*/, 24];
                case 14: return [4 /*yield*/, preguntar("ID del Usuario: ")];
                case 15:
                    idUsuarioStr = _b.sent();
                    return [4 /*yield*/, preguntar("ISBN del Libro: ")];
                case 16:
                    isbnPrestamo = _b.sent();
                    miBiblioteca.realizarPrestamo(parseInt(idUsuarioStr), isbnPrestamo);
                    return [3 /*break*/, 24];
                case 17: return [4 /*yield*/, preguntar("ID del Préstamo a devolver: ")];
                case 18:
                    idPrestamoStr = _b.sent();
                    miBiblioteca.devolverPrestamo(parseInt(idPrestamoStr));
                    return [3 /*break*/, 24];
                case 19:
                    console.log(miBiblioteca.generarEstadisticasGenerales());
                    return [3 /*break*/, 24];
                case 20:
                    console.log(miBiblioteca.generarReporteLibrosMasPrestados(3));
                    return [3 /*break*/, 24];
                case 21:
                    console.log("Cargando datos de prueba...");
                    miBiblioteca.registrarUsuario("Juan Pérez", "juan@tec.mx", interfaces_1.TipoUsuario.Estudiante);
                    miBiblioteca.registrarUsuario("Dr. Alan Turing", "alan@tec.mx", interfaces_1.TipoUsuario.Profesor);
                    miBiblioteca.agregarLibro("978-0132350884", "Clean Code", "Robert C. Martin", interfaces_1.CategoriaLibro.Tecnologia, 2008, 5, 5, interfaces_1.EstadoLibro.Disponible);
                    miBiblioteca.agregarLibro("978-0131103627", "The C Prog. Language", "Brian Kernighan", interfaces_1.CategoriaLibro.Tecnologia, 1988, 2, 2, interfaces_1.EstadoLibro.Disponible);
                    console.log("¡Datos de prueba cargados con éxito!");
                    return [3 /*break*/, 24];
                case 22:
                    console.log("\nGuardando datos en la base de datos...");
                    miBiblioteca.guardarDatos();
                    console.log("¡Gracias por usar el sistema! Hasta luego. 👋\n");
                    salir = true;
                    return [3 /*break*/, 24];
                case 23:
                    console.log("❌ Opción no válida. Intente de nuevo.");
                    _b.label = 24;
                case 24: return [3 /*break*/, 1];
                case 25:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
// Arrancar el programa
iniciarSistema();
