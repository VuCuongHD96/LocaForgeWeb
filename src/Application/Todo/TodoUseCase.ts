import { container } from "tsyringe";
import {
  TodoRepositoryToken,
  type TodoRepositoryType,
} from "../../Domain/Todo/TodoRepositoryType";
import "../../Infrastructure/DI/TodoContainer";

export type TodoUseCaseType = TodoRepositoryType;

export class TodoUseCase implements TodoUseCaseType {
  todoRepository = container.resolve<TodoRepositoryType>(TodoRepositoryToken);

  getTodoList() {
    return this.todoRepository.getTodoList();
  }
}
