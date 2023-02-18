'use client'

import AddComment from '@/app/components/AddComment'
import Post from '@/app/components/Post'
import { PostType } from '@/app/types/Post'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import Image from 'next/image'
import PacmanLoader from 'react-spinners/PacmanLoader'

type URL = {
	params: {
		slug: string
	}
}

const fetchDetails = async (slug: string) => {
	const response = await axios.get(`/api/posts/${slug}`)
	return response.data
}

export default function PostDetail(url: URL) {
	const { data, isLoading } = useQuery({
		queryKey: ['details-post'],
		queryFn: () => fetchDetails(url.params.slug),
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
			<Post
				comments={data.comments}
				key={data.id}
				id={data.id}
				name={data.user.name}
				avatar={data.user.image}
				postTitle={data.title}
			/>
			<AddComment id={data?.id} />
			{data?.comments?.map((comment) => (
				<motion.div
					animate={{ opacity: 1, scale: 1 }}
					initial={{ opacity: 0, scale: 0.8 }}
					transition={{ ease: 'easeOut' }}
					className='my-6 bg-white p-8 rounded-md'
					key={comment.id}
				>
					<div className='flex items-center gap-2'>
						<Image
							width={24}
							height={24}
							src={comment.user?.image}
							alt='avatar'
						/>
						<h3 className='font-bold'>{comment?.user?.name}</h3>
						<h2 className='text-sm'>{comment.createdAt}</h2>
					</div>
					<div className='py-4'>{comment.title}</div>
				</motion.div>
			))}
		</div>
	)
}
