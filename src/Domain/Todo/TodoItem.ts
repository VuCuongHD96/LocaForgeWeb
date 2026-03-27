import { v4 as uuidv4 } from 'uuid';

export class TodoItem {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static create(name: string): TodoItem {
    return new TodoItem(uuidv4(), name);
  }
}
