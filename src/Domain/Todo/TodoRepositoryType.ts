import type { TodoItem } from "./TodoItem";
import type { Observable } from "rxjs";

export const TodoRepositoryToken = Symbol("TodoRepositoryType");

export interface TodoRepositoryType {
  getTodoList(): Observable<TodoItem[]>;
}
