import prisma from '../../../prisma/client'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { Session } from '@/app/types/Session'

export default async function handler(req, res) {
	const session: Session = await unstable_getServerSession(
		req,
		res,
		authOptions
	)

	if (!session) {
		return res
			.status(401)
			.json({ message: 'Пожалуйста, войдите, чтобы создать пост' })
	}

	if (req.method === 'GET') {
		try {
			const data = await prisma.user.findUnique({
				where: {
					email: session.user.email,
				},
				include: {
					posts: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							comments: true,
						},
					},
				},
			})

			return res.status(200).json(data)
		} catch (err) {
			res.status(403).json({ err: 'Произошла ошибка при создании поста' })
		}
	}
}
