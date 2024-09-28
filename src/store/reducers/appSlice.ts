import type { AppState, CommentType, FetchDataType } from '../../types'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

const initialState: AppState = {
	comments: [],
	loading: false,
	error: null,
	scrollPosition: 0,
}

export const fetchComments = createAsyncThunk<
	CommentType[],
	undefined,
	{ rejectValue: string }
>(`app/fetchComments`, async function (_, { rejectWithValue }) {
	const response = await fetch(`https://dummyjson.com/comments`)

	if (!response.ok) {
		return rejectWithValue('Server Error!')
	}

	const data = await response.json()

	const newData = data.comments.map((item: FetchDataType) => {
		return {
			id: item.id,
			body: item.body,
			username: item.user.username,
			fullName: item.user.fullName,
		}
	})

	return newData
})

const famousFullNames = [
	'Albert Einstein',
	'Isaac Newton',
	'Marie Curie',
	'Nikola Tesla',
	'Thomas Edison',
	'Leonardo da Vinci',
	'Stephen Hawking',
	'Michael Jackson',
	'Elvis Presley',
	'Freddie Mercury',
	'Theodore Roosevelt',
	'Winston Churchill',
	'Nelson Mandela',
	'Mahatma Gandhi',
	'Martin Luther King Jr.',
	'Barack Obama',
	'Oprah Winfrey',
	'J.K. Rowling',
	'William Shakespeare',
	'Jane Austen',
]

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		deleteComment(state, action: PayloadAction<number>) {
			state.comments = state.comments.filter(i => i.id !== action.payload)
		},
		addComment(state) {
			state.comments.unshift({
				body: '',
				id: new Date().getTime(),
				fullName:
					famousFullNames[Math.floor(Math.random() * famousFullNames.length)],
			})
		},
		changeComment(state, action: PayloadAction<CommentType>) {
			const comment = state.comments.find(i => i.id === action.payload.id)
			if (comment) comment.body = action.payload.body
		},
		setScrollPosition(state, action: PayloadAction<number>) {
			state.scrollPosition = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchComments.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchComments.fulfilled, (state, action) => {
				state.comments = action.payload
				state.loading = false
			})
	},
})

export const { deleteComment, addComment, changeComment, setScrollPosition } =
	appSlice.actions

export default appSlice.reducer
