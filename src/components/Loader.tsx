import loaderImg from '../assets/images/loader.gif'

const Loader = () => {
	return (
		<div data-testid="loader" className="loader">
			<img src={loaderImg} />
		</div>
	)
}

export default Loader