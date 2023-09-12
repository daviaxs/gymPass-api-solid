import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUseProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUseProfileUseCase(usersRepository)

  return useCase
}
