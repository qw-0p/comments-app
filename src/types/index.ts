export interface FetchDataType {
	id: number
	body: string
	postId: number
	likes: number | null
	user: {
		id: number
		username: string
		fullName: string
	}
}

export type CommentType = Pick<FetchDataType, 'id' | 'body'> & {
	fullName?: string
	username?: string
}

export type AppState = {
	comments: CommentType[]
	loading: boolean
	error: string | null
	scrollPosition: number
}
