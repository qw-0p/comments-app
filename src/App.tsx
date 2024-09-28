import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchComments, setScrollPosition } from './store/reducers/appSlice';
import ItemList from './components/ItemList';
import Navbar from './components/Navbar';



function App() {
  const dispatch = useAppDispatch()
  const comments = useAppSelector(state => state.app.comments)
  const scrollY = useAppSelector(state => state.app.scrollPosition)
  const scrollPosition = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      dispatch(setScrollPosition(scrollPosition.current));

    };
  }, [dispatch, scrollPosition]);

  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, [scrollY]);

  useEffect(() => {
    if (comments.length === 0) {
      dispatch(fetchComments());
    }
  }, [dispatch, comments.length]);
  return (
    <div className='app-container'>
      <Navbar />
      <ItemList comments={comments} />
    </div>
  )
}

export default App
