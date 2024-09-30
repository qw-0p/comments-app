import React from 'react'
import Item from './Item'
import { CommentType } from '../types'


interface ItemListProps {
	comments: CommentType[];
}

const ItemList: React.FC<ItemListProps> = ({ comments }) => {
	return (
		<div className="item-list" data-testid="item-list">
			{
				comments.map((item) => (
					<Item
						data-testid="item"
						key={item.id}
						{...item}
					/>
				))
			}
		</div>
	)
}

export default ItemList