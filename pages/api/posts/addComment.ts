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
			.json({ message: 'Пожалуйста, войдите, чтобы оставить комментарий' })
	}

	//Get User
	const prismaUser = await prisma.user.findUnique({
		where: { email: session.user.email },
	})

	if (req.method === 'POST') {
		const { title, postId } = req.body.data

		if (!title.length) {
			return res.status(401).json({ message: 'Пожалуйста, введите текст' })
		}

		try {
			const result = await prisma.comment.create({
				data: {
					title,
					userId: prismaUser.id,
					postId,
				},
			})
			res.status(200).json(result)
		} catch (err) {
			res.status(403).json({ err: 'Произошла ошибка при создании поста' })
		}
	}
}
