import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { useEffect, useRef } from 'react'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSaveCommentAndScroll = (
	id: number,
	value: string,
	saveCommentAction: CallableFunction,
	saveScrollPositionAction?: CallableFunction,
) => {
	const dispatch = useDispatch()
	const valueRef = useRef(value)
	useEffect(() => {
		valueRef.current = value
	}, [value])

	useEffect(() => {
		const handleBeforeUnload = () => {
			dispatch(saveCommentAction({ id, body: valueRef.current }))
			if (saveScrollPositionAction) {
				const scrollPosition = window.scrollY
				dispatch(saveScrollPositionAction(scrollPosition))
			}
		}

		window.addEventListener('beforeunload', handleBeforeUnload)
		return () => {
			dispatch(saveCommentAction({ id, body: valueRef.current }))
			if (saveScrollPositionAction) {
				const scrollPosition = window.scrollY
				dispatch(saveScrollPositionAction(scrollPosition))
			}
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [dispatch, id, saveCommentAction, saveScrollPositionAction])
}
