import { useAppDispatch } from '../hooks/hooks'
import { addComment } from '../store/reducers/appSlice'

const Navbar = () => {

	const dispatch = useAppDispatch()
	return (
		<div className='navbar'>
			<button onClick={() => dispatch(addComment())}>+</button>
		</div>
	)
}

export default Navbar