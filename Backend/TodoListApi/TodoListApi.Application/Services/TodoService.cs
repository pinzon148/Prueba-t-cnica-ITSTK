using TodoListApi.Application.DTOs;
using TodoListApi.Application.Interfaces;
using TodoListApi.Domain.Entities;
using TodoListApi.Domain.Interfaces;
using Microsoft.Extensions.Logging;

namespace TodoListApi.Application.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;
    private readonly ILogger<TodoService> _logger;

    public TodoService(ITodoRepository repository, ILogger<TodoService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    public async Task<IEnumerable<TodoResponseDto>> GetAllAsync()
    {
        _logger.LogInformation("Obteniendo todas las tareas.");
        var items = await _repository.GetAllAsync();
        return items.Select(MapToResponse);
    }

    public async Task<TodoResponseDto?> GetByIdAsync(int id)
    {
        _logger.LogInformation("Buscando tarea con Id {Id}.", id);
        var item = await _repository.GetByIdAsync(id);
        return item is null ? null : MapToResponse(item);
    }

    public async Task<TodoResponseDto> CreateAsync(CreateTodoDto dto)
    {
        if (dto.MaxCompletionDate.Date < DateTime.Today)
            throw new ArgumentException("La fecha máxima de completado debe ser mayor o igual a hoy.");

        var entity = new TodoItem
        {
            Title = dto.Title,
            Description = dto.Description,
            MaxCompletionDate = dto.MaxCompletionDate,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow
        };

        _logger.LogInformation("Creando nueva tarea: {Title}.", dto.Title);
        var created = await _repository.CreateAsync(entity);
        return MapToResponse(created);
    }

    public async Task<TodoResponseDto?> UpdateAsync(int id, UpdateTodoDto dto)
    {
        if (dto.MaxCompletionDate.Date < DateTime.Today)
            throw new ArgumentException("La fecha máxima de completado debe ser mayor o igual a hoy.");

        var entity = new TodoItem
        {
            Title = dto.Title,
            Description = dto.Description,
            MaxCompletionDate = dto.MaxCompletionDate,
            IsCompleted = dto.IsCompleted
        };

        _logger.LogInformation("Actualizando tarea con Id {Id}.", id);
        var updated = await _repository.UpdateAsync(id, entity);
        return updated is null ? null : MapToResponse(updated);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        _logger.LogInformation("Eliminando tarea con Id {Id}.", id);
        return await _repository.DeleteAsync(id);
    }

    private static TodoResponseDto MapToResponse(TodoItem item) => new()
    {
        Id = item.Id,
        Title = item.Title,
        Description = item.Description,
        MaxCompletionDate = item.MaxCompletionDate,
        IsCompleted = item.IsCompleted,
        CreatedAt = item.CreatedAt
    };
}
