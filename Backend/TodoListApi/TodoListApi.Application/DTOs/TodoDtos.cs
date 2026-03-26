using System.ComponentModel.DataAnnotations;

namespace TodoListApi.Application.DTOs;

public class CreateTodoDto
{
    [Required(ErrorMessage = "El título es obligatorio.")]
    [MaxLength(40, ErrorMessage = "El título no puede superar los 40 caracteres.")]
    public string Title { get; set; } = string.Empty;

    [MaxLength(200, ErrorMessage = "La descripción no puede superar los 200 caracteres.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "La fecha máxima de completado es obligatoria.")]
    public DateTime MaxCompletionDate { get; set; }
}

public class UpdateTodoDto
{
    [Required(ErrorMessage = "El título es obligatorio.")]
    [MaxLength(40, ErrorMessage = "El título no puede superar los 40 caracteres.")]
    public string Title { get; set; } = string.Empty;

    [MaxLength(200, ErrorMessage = "La descripción no puede superar los 200 caracteres.")]
    public string? Description { get; set; }

    [Required(ErrorMessage = "La fecha máxima de completado es obligatoria.")]
    public DateTime MaxCompletionDate { get; set; }

    public bool IsCompleted { get; set; }
}

public class TodoResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime MaxCompletionDate { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
}
