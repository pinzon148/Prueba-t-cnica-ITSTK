using TodoListApi.Application.DTOs;

namespace TodoListApi.Application.Interfaces;

public interface ITodoService
{
    Task<IEnumerable<TodoResponseDto>> GetAllAsync();
    Task<TodoResponseDto?> GetByIdAsync(int id);
    Task<TodoResponseDto> CreateAsync(CreateTodoDto dto);
    Task<TodoResponseDto?> UpdateAsync(int id, UpdateTodoDto dto);
    Task<bool> DeleteAsync(int id);
}
