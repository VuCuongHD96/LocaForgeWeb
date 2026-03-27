import { Subject, type Observable, switchMap } from "rxjs";
import type { TodoItem } from "../../Domain/Todo/TodoItem";
import {
  TodoUseCase,
  type TodoUseCaseType,
} from "../../Application/Todo/TodoUseCase";


export class TodoViewModel {
  useCase: TodoUseCaseType = new TodoUseCase();

  static Input = class {
    loadTrigger = new Subject<void>();
  };

  static Output = class {
    todoListObservable: Observable<TodoItem[]>;

    constructor(todoListObservable: Observable<TodoItem[]>) {
      this.todoListObservable = todoListObservable;
    }
  };

  transform(
    input: InstanceType<typeof TodoViewModel.Input>,
  ): InstanceType<typeof TodoViewModel.Output> {
    const todoListObservable = input.loadTrigger.pipe(
      switchMap(() => this.useCase.getTodoList()),
    );

    return new TodoViewModel.Output(todoListObservable);
  }
}
