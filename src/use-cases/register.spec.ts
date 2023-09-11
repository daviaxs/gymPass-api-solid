import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-email-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '15s6f89w',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '15s6f89w',
    })

    const isPasswordCorrectlyHashed = await compare(
      '15s6f89w',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'teste',
      email,
      password: '15s6f89w',
    })

    await expect(() =>
      sut.execute({
        name: 'teste',
        email,
        password: '15s6f89w',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
