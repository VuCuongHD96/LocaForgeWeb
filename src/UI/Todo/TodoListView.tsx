import type { TodoItem } from "../../Domain/Todo/TodoItem";

type TodoListViewProps = {
  todoList: TodoItem[];
};

export default function TodoListView({ todoList }: TodoListViewProps) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <li key={todo.id}>
          <strong>{todo.id}</strong> - {todo.name}
        </li>
      ))}
    </ul>
  );
}