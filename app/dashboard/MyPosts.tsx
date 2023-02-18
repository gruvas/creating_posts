'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import PacmanLoader from 'react-spinners/PacmanLoader'
import { AuthPosts } from '../types/AuthPosts'
import EditPost from './EditPost'

const fetchAuthPosts = async () => {
	const response = await axios.get('/api/posts/authPosts')
	return response.data
}

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthPosts>({
		queryFn: fetchAuthPosts,
		queryKey: ['auth-posts'],
	})

	if (isLoading) {
		return (
			<div className='fixed bg-transparent_gray w-full h-full top-0 left-0'>
				<PacmanLoader
					className='inset-1/4 left-[45%]'
					color='rgba(54, 215, 183, 1)'
				/>
			</div>
		)
	}

	return (
		<div>
			{data?.posts?.map((post) => (
				<EditPost
					id={post.id}
					key={post.id}
					avatar={data.image}
					name={data.name}
					title={post.title}
					comments={post.comments}
				/>
			))}
		</div>
	)
}
