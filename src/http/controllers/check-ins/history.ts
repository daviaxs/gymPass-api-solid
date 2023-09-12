import { makeFetchCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-check-ins-history-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = checkInHistoryQuerySchema.parse(req.query)

  const fetchCheckInsHistoryUseCase = makeFetchCheckInsHistoryUseCase()

  const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  })

  return res.status(201).send({
    checkIns,
  })
}
