'use client'

import axios from 'axios'
import AddPost from './components/AddPost'
import { useQuery } from '@tanstack/react-query'
import Post from './components/Post'
import { PostType } from './types/Post'
import PacmanLoader from 'react-spinners/PacmanLoader'

// Fetch all post
const allPosts = async () => {
	const response = await axios.get('/api/posts/getPosts')
	return response.data
}

export default function Home() {
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryFn: allPosts,
		queryKey: ['posts'],
	})

	if (error) return error
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
		<main>
			<AddPost />
			{data?.map((post: PostType) => (
				<Post
					comments={post.comments}
					key={post.id}
					id={post.id}
					name={post.user.name}
					avatar={post.user.image}
					postTitle={post.title}
				/>
			))}
		</main>
	)
}
