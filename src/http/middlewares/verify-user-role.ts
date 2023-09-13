import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return (req: FastifyRequest, res: FastifyReply) => {
    const { role } = req.user

    if (role !== roleToVerify) {
      return res.status(401).send({ message: 'Unauthorizied' })
    }
  }
}
