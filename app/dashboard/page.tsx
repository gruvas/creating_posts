import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import { Session } from '../types/Session'
import MyPosts from './MyPosts'

export default async function Dashboard() {
	const session: Session = await getServerSession(authOptions)

	if (!session) {
		redirect('/api/auth/signin')
	}

	return (
		<main>
			<h1 className='text-2xl font-bold'>
				С возвращением {session?.user?.name}
			</h1>

			<MyPosts />
		</main>
	)
}
