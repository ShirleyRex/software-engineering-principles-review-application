import { createContext, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllReviews } from '../application/redux/reviews/slice';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
	//const [posts, setPost] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllReviews());
	}, []);

	//const addReview = (review) => {};

	return <AppContext.Provider value>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
	children: PropTypes.element
};

export default () => useContext(AppContext);
