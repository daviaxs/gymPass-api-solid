import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: await hash('15s6f89w', 6),
    })

    const { user } = await sut.execute({
      email: 'teste@gmail.com',
      password: '15s6f89w',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'teste@gmail.com',
        password: '15s6f89w',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: await hash('12346', 6),
    })

    expect(() =>
      sut.execute({
        email: 'teste@gmail.com',
        password: '15s6f89w',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
