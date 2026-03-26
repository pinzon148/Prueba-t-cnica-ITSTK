export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  maxCompletionDate: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  maxCompletionDate: string;
}

export interface UpdateTodoDto {
  title: string;
  description?: string;
  maxCompletionDate: string;
  isCompleted: boolean;
}
