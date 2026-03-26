📝 TodoList - Prueba Técnica



Aplicación full-stack para gestión de tareas (TodoList) con backend en .NET 8 (Clean Architecture) y frontend en Angular 17.

🏗️ Estructura
TodoListApi/        → API .NET 8 (Clean Architecture)
todo-frontend/      → Angular 17

Backend organizado en:

API: Endpoints y configuración
Application: Lógica de negocio
Domain: Entidades
Infrastructure: Persistencia (EF Core)
⚙️ Ejecución rápida
🔹 Backend
cd TodoListApi/TodoListApi.API

dotnet run
API: http://localhost:5000
Swagger: http://localhost:5000/swagger

✔ La base de datos se crea automáticamente (LocalDB)

🔹 Frontend
cd todo-frontend
npm install
ng serve

App: http://localhost:4200
📡 Endpoints

Método	Ruta	Acción
GET	/api/todos	Listar tareas
GET	/api/todos/{id}	Obtener por ID
POST	/api/todos	Crear
PUT	/api/todos/{id}	Actualizar
DELETE	/api/todos/{id}	Eliminar


✅ Validaciones
Title: obligatorio, máx. 40 caracteres
Description: opcional, máx. 200 caracteres
MaxCompletionDate: ≥ fecha actual
404 si el recurso no existe

🛠️ Stack
.NET 8 / ASP.NET Core
Entity Framework Core
SQL Server LocalDB

Angular 17
Swagger