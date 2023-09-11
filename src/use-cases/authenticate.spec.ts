import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    usersRepository.create({
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
})
