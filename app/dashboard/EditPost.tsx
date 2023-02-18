'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Toggle from './Toggle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

type EditProps = {
	id: string
	avatar: string
	name: string
	title: string
	comments?: {
		id: string
		postId: string
		userId: string
	}[]
}

export default function EditPost({
	avatar,
	name,
	title,
	comments,
	id,
}: EditProps) {
	// Toggle
	const [toggle, setToggle] = useState(false)
	const [hidden, setHidden] = useState(false)
	let deleteToastID: string
	const queryClient = useQueryClient()

	const { mutate } = useMutation(
		async (id: string) =>
			await axios.delete('/api/posts/deletePost', { data: id }),
		{
			onError: (error) => {
				toast.error('Ошибка удаления поста')
			},
			onSuccess: (data) => {
				setHidden(true)
				queryClient.invalidateQueries(['getAuthPosts'])
				toast.success('Пост был удален', { id: deleteToastID })
			},
		}
	)

	const deletePost = () => {
		deleteToastID = toast.loading('Удаление вашего поста', {
			id: deleteToastID,
		})
		mutate(id)
	}

	return (
		<>
			<motion.div
				animate={{ opacity: 1, scale: 1 }}
				initial={{ opacity: 0, scale: 0.8 }}
				transition={{ ease: 'easeOut' }}
				className={`bg-white my-8 p-8 rounded-lg ${hidden ? 'hidden' : ''}`}
			>
				<div className='flex items-center gap-2'>
					<Image
						width={32}
						height={32}
						src={avatar}
						alt='avatar'
					/>
					<h3 className='font-bold text-gray-700'>{name}</h3>
				</div>
				<div className='my-8 '>
					<p className='break-all'>{title}</p>
				</div>
				<div className='flex items-center gap-4 '>
					<p className=' text-sm font-bold text-gray-700'>
						{comments?.length} Комментарии
					</p>
					<button
						onClick={(e) => {
							setToggle(true)
						}}
						className='text-sm font-bold text-red-500'
					>
						Удалить
					</button>
				</div>
				{toggle && (
					<Toggle
						deletePost={deletePost}
						setToggle={setToggle}
					/>
				)}
			</motion.div>
		</>
	)
}