import loaderImg from '../assets/images/loader.gif'

const Loader = () => {
	return (
		<div data-testid="loader" className="loader">
			<img src={loaderImg} alt="Windows 95 loader screen"/>
		</div>
	)
}

export default Loader
