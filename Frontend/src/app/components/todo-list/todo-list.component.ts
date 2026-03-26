import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { AlertService } from '../../services/alert.service';
import { TodoItem, CreateTodoDto, UpdateTodoDto } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  loading = true;
  saving = false;

  showModal = false;
  editingTodo: TodoItem | null = null;

  formTitle = '';
  formDescription = '';
  formMaxDate = '';

  get todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  get pendingCount(): number {
    return this.todos.filter(t => !t.isCompleted).length;
  }

  get completedCount(): number {
    return this.todos.filter(t => t.isCompleted).length;
  }

  get titleCharsLeft(): number {
    return 40 - (this.formTitle?.length ?? 0);
  }

  get descCharsLeft(): number {
    return 200 - (this.formDescription?.length ?? 0);
  }

  constructor(
    private todoService: TodoService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.loading = false;
      },
      error: () => {
        this.alert.error('No se pudieron cargar las tareas.');
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.editingTodo = null;
    this.formTitle = '';
    this.formDescription = '';
    this.formMaxDate = '';
    this.showModal = true;
  }

  openEditModal(todo: TodoItem): void {
    this.editingTodo = todo;
    this.formTitle = todo.title;
    this.formDescription = todo.description ?? '';
    this.formMaxDate = todo.maxCompletionDate.split('T')[0];
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingTodo = null;
  }

  submitForm(): void {
    if (!this.formTitle.trim()) {
      this.alert.error('El título es obligatorio.');
      return;
    }
    if (!this.formMaxDate) {
      this.alert.error('La fecha máxima es obligatoria.');
      return;
    }

    this.saving = true;

    if (this.editingTodo) {
      const dto: UpdateTodoDto = {
        title: this.formTitle.trim(),
        description: this.formDescription.trim() || undefined,
        maxCompletionDate: this.formMaxDate,
        isCompleted: this.editingTodo.isCompleted
      };
      this.todoService.update(this.editingTodo.id, dto).subscribe({
        next: () => {
          this.alert.success('Tarea actualizada correctamente.');
          this.saving = false;
          this.closeModal();
          this.loadTodos();
        },
        error: (err) => {
          this.alert.error(err.error?.message ?? 'Error al actualizar la tarea.');
          this.saving = false;
        }
      });
    } else {
      const dto: CreateTodoDto = {
        title: this.formTitle.trim(),
        description: this.formDescription.trim() || undefined,
        maxCompletionDate: this.formMaxDate
      };
      this.todoService.create(dto).subscribe({
        next: () => {
          this.alert.success('Tarea creada correctamente.');
          this.saving = false;
          this.closeModal();
          this.loadTodos();
        },
        error: (err) => {
          this.alert.error(err.error?.message ?? 'Error al crear la tarea.');
          this.saving = false;
        }
      });
    }
  }

  toggleCompleted(todo: TodoItem): void {
    const dto: UpdateTodoDto = {
      title: todo.title,
      description: todo.description,
      maxCompletionDate: todo.maxCompletionDate.split('T')[0],
      isCompleted: !todo.isCompleted
    };
    this.todoService.update(todo.id, dto).subscribe({
      next: () => {
        const msg = !todo.isCompleted ? '¡Tarea completada! ✓' : 'Tarea marcada como pendiente.';
        this.alert.success(msg);
        this.loadTodos();
      },
      error: () => this.alert.error('Error al actualizar el estado.')
    });
  }

  async deleteTodo(todo: TodoItem): Promise<void> {
    const confirmed = await this.alert.confirm(
      '¿Eliminar tarea?',
      `Se eliminará "${todo.title}" de forma permanente.`
    );
    if (!confirmed) return;

    this.todoService.delete(todo.id).subscribe({
      next: () => {
        this.alert.success('Tarea eliminada.');
        this.loadTodos();
      },
      error: () => this.alert.error('Error al eliminar la tarea.')
    });
  }

  isOverdue(todo: TodoItem): boolean {
    if (todo.isCompleted) return false;
    return new Date(todo.maxCompletionDate) < new Date();
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  }
}
