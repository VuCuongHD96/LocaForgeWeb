import { useObservableState } from "observable-hooks";
import { useEffect, useRef } from "react";
import { TodoViewModel } from "../Todo/TodoViewModel";
import TodoListView from "./TodoListView";

export function TodoScreen() {

  const viewModel = useRef(new TodoViewModel()).current;
  const input = useRef(new TodoViewModel.Input()).current;
  const output = useRef(viewModel.transform(input)).current;
  const todoList = useObservableState(output.todoListObservable, []);

  useEffect(() => {
    input.loadTrigger.next();
  }, []);

  return (
    <div>
      <p>Start todo list</p>
      <TodoListView todoList={todoList} />
      <p>End todo list</p>
    </div>
  );
}
