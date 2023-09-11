import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsUserCaseUseCaseRequest {
  userId: string
}

interface GetUserMetricsUserCaseUseCaseResponse {
  checkInsCounter: number
}

export class GetUserMetricsUserCaseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUserCaseUseCaseRequest): Promise<GetUserMetricsUserCaseUseCaseResponse> {
    const checkInsCounter = await this.checkInsRepository.countByUserId(userId)

    return { checkInsCounter }
  }
}
