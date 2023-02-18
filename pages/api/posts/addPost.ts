// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'
import { Session } from '../../../app/types/Session'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const session: Session = await getServerSession(req, res, authOptions)

		if (!session)
			return res
				.status(401)
				.json({ message: 'Пожалуйста, войдите, чтобы опубликовать сообщение' })

		const title: string = req.body.title

		// Get User
		const prismaUser = await prisma.user.findUnique({
			where: { email: session?.user?.email },
		})

		// Check title
		if (title.length > 300)
			return res
				.status(403)
				.json({ message: 'Пожалуйста, напишите более короткий пост' })

		if (!title.length)
			return res
				.status(403)
				.json({ message: 'Пожалуйста, не оставляйте поле пустым' })

		// Create Post
		try {
			const result = await prisma.post.create({
				data: {
					title,
					userId: prismaUser.id,
				},
			})
			res.status(200).json(result)
		} catch (err) {
			res.status(403).json({ err: 'Произошла ошибка при создании поста' })
		}
	}
}
