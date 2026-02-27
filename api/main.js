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
// --- Códigos de Colores para la Consola ---
var colores = {
    reset: "\x1b[0m",
    cyan: "\x1b[36m",
    verde: "\x1b[32m",
    amarillo: "\x1b[33m",
    rojo: "\x1b[31m",
    magenta: "\x1b[35m",
    negrita: "\x1b[1m"
};
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Función para hacer preguntas
function preguntar(texto) {
    return new Promise(function (resolve) { return rl.question("".concat(colores.amarillo).concat(texto).concat(colores.reset), resolve); });
}
// NUEVA FUNCIÓN: Pausar antes de volver al menú
function pausar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, preguntar("\nPresiona ".concat(colores.negrita, "ENTER").concat(colores.reset, " para continuar..."))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var miBiblioteca = new biblioteca_1.Biblioteca("Biblioteca Central Universidad TEC");
function iniciarSistema() {
    return __awaiter(this, void 0, void 0, function () {
        var salir, opcion, _a, nombre, email, tipoStr, isbn, titulo, autor, catStr, anioStr, copiasStr, idUsuarioStr, isbnPrestamo, idPrestamoStr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    // Cargar datos silenciosamente
                    miBiblioteca.cargarDatos();
                    return [4 /*yield*/, pausar()];
                case 1:
                    _b.sent();
                    salir = false;
                    _b.label = 2;
                case 2:
                    if (!!salir) return [3 /*break*/, 34];
                    console.clear(); // 🧹 Limpia la pantalla en cada iteración
                    console.log("".concat(colores.cyan).concat(colores.negrita, "======================================================").concat(colores.reset));
                    console.log("".concat(colores.verde).concat(colores.negrita, "      \uD83C\uDF93 SISTEMA DE GESTI\u00D3N BIBLIOTECARIA \uD83C\uDF93").concat(colores.reset));
                    console.log("".concat(colores.cyan).concat(colores.negrita, "======================================================").concat(colores.reset, "\n"));
                    // Menú categorizado y ordenado
                    console.log("  ".concat(colores.negrita, "\uD83D\uDC65 USUARIOS").concat(colores.reset));
                    console.log("    1. Registrar nuevo usuario");
                    console.log("  ".concat(colores.negrita, "\uD83D\uDCDA CAT\u00C1LOGO").concat(colores.reset));
                    console.log("    2. Agregar nuevo libro");
                    console.log("  ".concat(colores.negrita, "\uD83D\uDD04 PR\u00C9STAMOS").concat(colores.reset));
                    console.log("    3. Realizar pr\u00E9stamo");
                    console.log("    4. Devolver pr\u00E9stamo");
                    console.log("  ".concat(colores.negrita, "\uD83D\uDCCA REPORTES").concat(colores.reset));
                    console.log("    5. Ver Estad\u00EDsticas Generales");
                    console.log("    6. Ver Top 3 Libros M\u00E1s Prestados");
                    console.log("  ".concat(colores.negrita, "\u2699\uFE0F  SISTEMA").concat(colores.reset));
                    console.log("    7. Cargar datos de prueba (Mock Data)");
                    console.log("".concat(colores.rojo, "    0. Guardar y Salir").concat(colores.reset, "\n"));
                    return [4 /*yield*/, preguntar("👉 Seleccione una opción: ")];
                case 3:
                    opcion = _b.sent();
                    console.log(""); // Espacio visual extra
                    _a = opcion;
                    switch (_a) {
                        case '1': return [3 /*break*/, 4];
                        case '2': return [3 /*break*/, 9];
                        case '3': return [3 /*break*/, 17];
                        case '4': return [3 /*break*/, 21];
                        case '5': return [3 /*break*/, 24];
                        case '6': return [3 /*break*/, 26];
                        case '7': return [3 /*break*/, 28];
                        case '0': return [3 /*break*/, 30];
                    }
                    return [3 /*break*/, 31];
                case 4:
                    console.log("".concat(colores.cyan, "--- NUEVO USUARIO ---").concat(colores.reset));
                    return [4 /*yield*/, preguntar("Nombre del usuario: ")];
                case 5:
                    nombre = _b.sent();
                    return [4 /*yield*/, preguntar("Email: ")];
                case 6:
                    email = _b.sent();
                    console.log("Tipos: 0=Estudiante, 1=Profesor, 2=Administrador");
                    return [4 /*yield*/, preguntar("Seleccione el tipo (0, 1 o 2): ")];
                case 7:
                    tipoStr = _b.sent();
                    miBiblioteca.registrarUsuario(nombre, email, parseInt(tipoStr));
                    return [4 /*yield*/, pausar()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 9:
                    console.log("".concat(colores.cyan, "--- NUEVO LIBRO ---").concat(colores.reset));
                    return [4 /*yield*/, preguntar("ISBN: ")];
                case 10:
                    isbn = _b.sent();
                    return [4 /*yield*/, preguntar("Título: ")];
                case 11:
                    titulo = _b.sent();
                    return [4 /*yield*/, preguntar("Autor: ")];
                case 12:
                    autor = _b.sent();
                    console.log("Categorías: 0=Ciencia, 1=Ficcion, 2=Historia, 3=Literatura, 4=Tecnologia, 5=Arte");
                    return [4 /*yield*/, preguntar("Categoría (0-5): ")];
                case 13:
                    catStr = _b.sent();
                    return [4 /*yield*/, preguntar("Año de publicación: ")];
                case 14:
                    anioStr = _b.sent();
                    return [4 /*yield*/, preguntar("Número de copias: ")];
                case 15:
                    copiasStr = _b.sent();
                    miBiblioteca.agregarLibro(isbn, titulo, autor, parseInt(catStr), parseInt(anioStr), parseInt(copiasStr), parseInt(copiasStr), interfaces_1.EstadoLibro.Disponible);
                    return [4 /*yield*/, pausar()];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 17:
                    console.log("".concat(colores.cyan, "--- REALIZAR PR\u00C9STAMO ---").concat(colores.reset));
                    return [4 /*yield*/, preguntar("ID del Usuario: ")];
                case 18:
                    idUsuarioStr = _b.sent();
                    return [4 /*yield*/, preguntar("ISBN del Libro: ")];
                case 19:
                    isbnPrestamo = _b.sent();
                    miBiblioteca.realizarPrestamo(parseInt(idUsuarioStr), isbnPrestamo);
                    return [4 /*yield*/, pausar()];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 21:
                    console.log("".concat(colores.cyan, "--- DEVOLVER PR\u00C9STAMO ---").concat(colores.reset));
                    return [4 /*yield*/, preguntar("ID del Préstamo a devolver: ")];
                case 22:
                    idPrestamoStr = _b.sent();
                    miBiblioteca.devolverPrestamo(parseInt(idPrestamoStr));
                    return [4 /*yield*/, pausar()];
                case 23:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 24:
                    console.log("".concat(colores.cyan, "--- ESTAD\u00CDSTICAS GENERALES ---").concat(colores.reset));
                    console.log(miBiblioteca.generarEstadisticasGenerales());
                    return [4 /*yield*/, pausar()];
                case 25:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 26:
                    console.log("".concat(colores.cyan, "--- TOP 3 LIBROS M\u00C1S PRESTADOS ---").concat(colores.reset));
                    console.log(miBiblioteca.generarReporteLibrosMasPrestados(3));
                    return [4 /*yield*/, pausar()];
                case 27:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 28:
                    console.log("".concat(colores.cyan, "--- CARGANDO MOCK DATA ---").concat(colores.reset));
                    miBiblioteca.registrarUsuario("Juan Pérez", "juan@tec.mx", interfaces_1.TipoUsuario.Estudiante);
                    miBiblioteca.registrarUsuario("Dr. Alan Turing", "alan@tec.mx", interfaces_1.TipoUsuario.Profesor);
                    miBiblioteca.agregarLibro("978-0132350884", "Clean Code", "Robert C. Martin", interfaces_1.CategoriaLibro.Tecnologia, 2008, 5, 5, interfaces_1.EstadoLibro.Disponible);
                    miBiblioteca.agregarLibro("978-0131103627", "The C Prog. Language", "Brian Kernighan", interfaces_1.CategoriaLibro.Tecnologia, 1988, 2, 2, interfaces_1.EstadoLibro.Disponible);
                    console.log("\n".concat(colores.verde, "\u00A1Datos de prueba cargados con \u00E9xito!").concat(colores.reset));
                    return [4 /*yield*/, pausar()];
                case 29:
                    _b.sent();
                    return [3 /*break*/, 33];
                case 30:
                    console.clear();
                    console.log("\n".concat(colores.cyan, "Guardando datos en la base de datos...").concat(colores.reset));
                    miBiblioteca.guardarDatos();
                    console.log("\n".concat(colores.verde, "\u00A1Gracias por usar el sistema! Hasta luego. \uD83D\uDC4B").concat(colores.reset, "\n"));
                    salir = true;
                    return [3 /*break*/, 33];
                case 31:
                    console.log("".concat(colores.rojo, "\u274C Opci\u00F3n no v\u00E1lida. Intente de nuevo.").concat(colores.reset));
                    return [4 /*yield*/, pausar()];
                case 32:
                    _b.sent();
                    _b.label = 33;
                case 33: return [3 /*break*/, 2];
                case 34:
                    rl.close();
                    return [2 /*return*/];
            }
        });
    });
}
iniciarSistema();
