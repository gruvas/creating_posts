export type CommentsType = {
	comments: {
		createdAt?: string
		id: string
		postId: string
		title: string
		userId: string
		user: {
			email: string
			id: string
			image: string
			name: string
		}
	}
}

export type PostType = {
	id: string
	title?: string
	updatedAt?: string
	user?: {
		email: string
		id: string
		image: string
		name: string
	}
	comments: CommentsType[]
	avatar?: string
	name?: string
	postTitle?: string
}
