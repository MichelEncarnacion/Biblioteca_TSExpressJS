# Library Management System (LMS) — TypeScript & Express 📚

Implementación técnica de un sistema de gestión bibliotecaria basado en Programación Orientada a Objetos (POO). Este proyecto se centra en la eficiencia de búsqueda y la integridad de datos mediante el uso de tipos estrictos y estructuras de datos avanzadas en el entorno **Node.js**.

## 🚀 Características Técnicas

* **Arquitectura de Datos:** Uso de `Map<string, T>` y `Map<number, T>` para garantizar búsquedas, inserciones y eliminaciones con complejidad constante $O(1)$ en memoria.
* **Domain-Driven Logic:** Clases robustas (`Usuario`, `Libro`, `Prestamo`) con encapsulamiento estricto y validaciones mediante *getters/setters*.
* **Type Safety:** Implementación exhaustiva de interfaces y tipos personalizados para asegurar la consistencia de los modelos a través de toda la aplicación.
* **Motor de Vistas Dinámico:** Integración de **Handlebars (HBS)** para el renderizado del lado del servidor (SSR), permitiendo interfaces interactivas.
* **API RESTful:** Endpoints optimizados para el registro de entidades, filtrado avanzado por autor/categoría y generación de estadísticas agregadas.

## 🛠️ Tecnologías Utilizadas

* **Lenguaje:** TypeScript 5.x
* **Framework Web:** Express.js
* **Motor de Plantillas:** Handlebars (HBS)
* **Entorno de Ejecución:** Node.js (con `ts-node` y `nodemon` para desarrollo)

## 📦 Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone <url-del-nuevo-repositorio>
    cd <nombre-de-la-carpeta>
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

## ▶️ Cómo Ejecutar el Proyecto

### **Modo Desarrollo (Recomendado)**
Utiliza `nodemon` y `ts-node` para reiniciar el servidor automáticamente tras cada cambio:
```bash
npm run dev
