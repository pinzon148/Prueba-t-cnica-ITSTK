using Microsoft.EntityFrameworkCore;
using TodoListApi.Domain.Entities;

namespace TodoListApi.Infrastructure.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TodoItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(40);
            entity.Property(e => e.Description).HasMaxLength(200);
            entity.Property(e => e.MaxCompletionDate).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
        });
    }
}
