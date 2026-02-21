# Sistema de Gestión de Biblioteca Digital 📚

Este proyecto es una implementación robusta en **TypeScript** diseñada para gestionar una biblioteca digital, aplicando principios avanzados de Programación Orientada a Objetos (POO) y tipado estático.

## 🎯 Objetivos del Proyecto

- **Fundamentos de TypeScript:** Uso de tipos de datos, interfaces y clases.
- **Arquitectura:** Aplicación de conceptos de POO (Herencia, Encapsulamiento, Polimorfismo).
- **Sintaxis Avanzada:** Implementación de funcionalidades modernas de TypeScript para un sistema funcional.

## 🚀 Tecnologías Utilizadas

- **Lenguaje:** TypeScript
- **Entorno:** Node.js
- **Configuración:** `tsconfig.json` personalizado para generación de tipos y transpilación.

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio:**

    ```bash
    git clone <url-del-repositorio>
    cd <nombre-de-la-carpeta>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ▶️ Cómo Ejecutar el Programa

### Opción 1 — Compilar y ejecutar (recomendado)

Compila todos los archivos TypeScript de `src/` a `dist/` usando la configuración de `tsconfig.json`:

```bash
tsc
```

Luego ejecuta el programa compilado con Node.js:

```bash
node dist/main.js
```

### Opción 2 — Compilar un archivo específico

Si sólo quieres compilar `main.ts` de forma directa (sin usar `tsconfig.json`):

```bash
tsc src/main.ts --strict
```

Esto genera `main.js` junto a los demás archivos fuera de `dist/`. Se recomienda la Opción 1 para mantener la estructura del proyecto.

## 📂 Estructura del Proyecto

```
Libreria/
├── src/
│   ├── interfaces.ts   # Enums e interfaces (IUsuario, ILibro, IPrestamo)
│   ├── clases.ts       # Clases concretas (Usuario, Libro, Prestamo)
│   ├── biblioteca.ts   # Clase Biblioteca (lógica de negocio y reportes)
│   └── main.ts         # Punto de entrada — demo del sistema
├── dist/               # Código JavaScript compilado (generado tras tsc)
├── tsconfig.json       # Configuración del compilador de TypeScript
└── package.json        # Definición de dependencias
```

## 📝 Licencia

Este proyecto es de uso educativo y privado.
