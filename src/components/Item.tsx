import React, { useEffect, useRef, useState } from 'react'
import { CommentType } from '../types'
import './style.scss'
import { useAppDispatch, useSaveCommentAndScroll } from '../hooks/hooks'
import { changeComment, deleteComment, setScrollPosition } from '../store/reducers/appSlice';


const Item: React.FC<CommentType> = ({ body, id, fullName }) => {
	const [value, setValue] = useState(body)
	const dispatch = useAppDispatch()
	const valueRef = useRef(value);

	valueRef.current = value;


	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	useSaveCommentAndScroll(id, value, changeComment, setScrollPosition);



	function handleOnChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		setValue(event.target.value)
	}
	const handleChangeComment = () => {
		dispatch(changeComment({ id, body: value }))
	}


	const handleDelete = () => {
		dispatch(deleteComment(id))
	}

	return (
		<div className='item' role='item'>
			<div className='item__controls'>
				<p data-testid="item-title">{fullName}</p>
				<button onClick={handleDelete} data-testid="item-delete" className='item__btn'>&#9747;</button>
			</div>
			<textarea data-gramm="false" data-testid="item-text" value={value} className='item__input' onChange={handleOnChange} />
			<button onClick={handleChangeComment} data-testid="item-accept" className='item__btn item__accept-btn'>Ok</button>
		</div>
	)
}

export default Item
