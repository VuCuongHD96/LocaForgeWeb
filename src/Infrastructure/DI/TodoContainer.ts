import { container } from 'tsyringe';
import { TodoRepositoryToken } from '../../Domain/Todo/TodoRepositoryType';
import { TodoRepositoryMock } from '../Repositories/Todo/TodoRepositoryMock';

container.register(TodoRepositoryToken, {
    useClass: TodoRepositoryMock,
});