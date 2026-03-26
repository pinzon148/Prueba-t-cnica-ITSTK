# 📝 TodoList - Prueba Técnica

![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet)
![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular)
![EF Core](https://img.shields.io/badge/EF_Core-8.0-512BD4?style=for-the-badge&logo=dotnet)
![SQL Server](https://img.shields.io/badge/SQL_Server-LocalDB-CC2927?style=for-the-badge&logo=microsoftsqlserver)

Proyecto full-stack interactivo de gestión de tareas (TodoList). Cuenta con una **API REST construida en .NET 8** siguiendo los principios de Clean Architecture y una **aplicación cliente desarrollada en Angular 17**.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos partes principales:

```text
/
├── TodoListApi/               ← Backend (API REST en .NET 8)
│   ├── TodoListApi.API/           # Controladores, Swagger y configuración de la aplicación
│   ├── TodoListApi.Application/   # Lógica de negocio, Servicios y DTOs
│   ├── TodoListApi.Domain/        # Entidades del dominio e interfaces (contratos)
│   └── TodoListApi.Infrastructure/# Acceso a datos (EF Core) e implementaciones
│
└── todo-frontend/             ← Frontend (SPA en Angular 17)
    └── src/                       # Componentes, servicios, modelos y estilos
```

El backend utiliza el patrón **Clean Architecture** para asegurar que el núcleo de la aplicación (Dominio) sea independiente de la interfaz de usuario, bases de datos y frameworks externos.

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- **[.NET 8 SDK](https://dotnet.microsoft.com/download)**
- **[Node.js 18+](https://nodejs.org/)** y **npm**
- **[Angular CLI](https://angular.io/cli)** (Instalación global: `npm install -g @angular/cli`)
- Editor recomendado: **Visual Studio 2022** o **Visual Studio Code**
- **SQL Server LocalDB** (Normalmente se incluye al instalar la carga de trabajo de .NET en Visual Studio)

---

## ⚙️ Configuración y Ejecución del Backend (.NET 8)

### 1. Base de datos
El proyecto está configurado para usar **SQL Server LocalDB** para facilitar el desarrollo sin necesidad de instalar un motor de base de datos completo.
La cadena de conexión se encuentra en el archivo `TodoListApi/TodoListApi.API/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=TodoListDb;Trusted_Connection=True;"
}
```
*💡 Nota: Al ejecutar la API por primera vez, la base de datos se creará de forma automática y se le aplicarán las migraciones de Entity Framework Core desde el `Program.cs`.*

### 2. Ejecutar la API
Abre una terminal en la carpeta principal del proyecto y ejecuta los siguientes comandos:
```bash
cd TodoListApi/TodoListApi.API
dotnet restore
dotnet run
```

La API estará disponible en: `http://localhost:5000`  
Puedes explorar los endpoints interactivamente utilizando **Swagger UI** en: **`http://localhost:5000/swagger`**

### 📡 Endpoints Principales

| HTTP Verbo | Ruta | Descripción |
|------------|------|-------------|
| `GET`      | `/api/todos` | Obtiene la lista de todas las tareas |
| `GET`      | `/api/todos/{id}` | Obtiene los detalles de una tarea específica por su ID |
| `POST`     | `/api/todos` | Crea una nueva tarea en el sistema |
| `PUT`      | `/api/todos/{id}` | Actualiza la información de una tarea existente |
| `DELETE`   | `/api/todos/{id}` | Elimina permanentemente una tarea |

---

## 💻 Configuración y Ejecución del Frontend (Angular 17)

Abre una **nueva terminal** (manteniendo el backend en ejecución en la otra), desplázate a la carpeta del frontend y ejecuta:

```bash
cd todo-frontend
npm install
ng serve
```

La aplicación web estará levantada y lista para usarse en: **`http://localhost:4200`**

---

## ✅ Reglas de Negocio y Validaciones Integradas

El proyecto implementa las siguientes validaciones establecidas en la prueba técnica:

* **Título (`Title`):** Campo obligatorio. Longitud máxima permitida de 40 caracteres.
* **Descripción (`Description`):** Campo opcional. Longitud máxima permitida de 200 caracteres.
* **Fecha de Finalización (`MaxCompletionDate`):** Campo obligatorio. La fecha proporcionada debe ser obligatoriamente mayor o igual a la fecha actual del sistema.
* **Manejo de Errores (Not Found):** Si se intenta actualizar (`PUT`) o eliminar (`DELETE`) una tarea pasando un ID que no existe en la base de datos, la API retornará controladamente un código de estado `HTTP 404 Not Found`.

---

## 🛠️ Tecnologías y Herramientas Destacadas

* **Backend:** .NET 8, ASP.NET Core Web API, C# 12
* **Persistencia:** Entity Framework Core 8, Microsoft SQL Server LocalDB
* **Arquitectura Patronal:** Clean Architecture, Dependency Injection (DI)
* **Frontend:** Angular 17, TypeScript, HTML5/CSS3
* **Documentación:** Swagger (Swashbuckle)
