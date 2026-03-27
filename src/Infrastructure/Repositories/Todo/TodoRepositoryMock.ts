import { TodoItem } from '../../../Domain/Todo/TodoItem';
import type { TodoRepositoryType } from '../../../Domain/Todo/TodoRepositoryType';
import { of, type Observable } from 'rxjs';

export class TodoRepositoryMock implements TodoRepositoryType {
  getTodoList(): Observable<TodoItem[]> {
    return of([
      new TodoItem('1', 'Learn React'),
      new TodoItem('2', 'Learn TypeScript'),
      new TodoItem('3', 'Build a Todo App'),
      TodoItem.create('Write clean architecture base'),
    ]);
  }
}
