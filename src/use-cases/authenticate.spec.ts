import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
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
    expect(() =>
      sut.execute({
        email: 'teste@gmail.com',
        password: '15s6f89w',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
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
