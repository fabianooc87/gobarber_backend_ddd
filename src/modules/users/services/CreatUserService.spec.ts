import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeAppointmentsRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeAppointmentsRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '12456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '12456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jhondoe@example.com',
        password: '12456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
