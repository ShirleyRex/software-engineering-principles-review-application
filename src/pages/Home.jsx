import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllPost } from '../components/modules';
import { fetchAllLocations } from '../application/redux/location/slice/allLocationSlice';
//import { AllLocationsContainer } from '../containers';
import { SearchInput } from '../components/ui';
import { layoutWithNav } from '../hoc/layout';

import '../styles/home.css';
import { getAverRatings } from '../application/redux/reviews/selectors';
import { allLocationsSelector, loading } from '../application/redux/location/selectors';

const Home = () => {
	const [locations, setLocations] = useState([]);
	const averRatings = useSelector((state) => getAverRatings(state));
	const loadingLocations = useSelector((state) => loading(state));
	const posts = useSelector((state) => allLocationsSelector(state));

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAllLocations());
	}, []);

	useEffect(() => {
		setLocations(posts);
	}, [posts]);

	const onSearch = (value) => {
		const newLocations = posts.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
		setLocations(newLocations);
	};

	return (
		<main className="main-content mt-10 min-h-[85vh]">
			<div className="landing-content container px-4 md:px-10">
				<section>
					<SearchInput onsearch={onSearch} />
					<h2 className="text-base leading-lh-large">Rating</h2>
					<div className="mt-2 flex items-center">
						{new Array(5).fill(false).map((_, index) => {
							return (
								<svg
									key={index + 1}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									width="24"
									height="24"
									viewBox="0 0 24 22"
								>
									<path
										fill={`${index + 1 <= averRatings ? '#ff7d1a' : '#ffffff'}`}
										stroke={`${index + 1 <= averRatings ? '#ff7d1a' : '#222633'}`}
										d="m12 1.62 2.22 6.83.11.34h7.54l-5.8 4.22-.3.22.11.34 2.22 6.83-5.8-4.22-.3-.21-.3.2-5.8 4.23 2.22-6.83.1-.34-.29-.22-5.8-4.22h7.54l.11-.34L12 1.62Z"
									/>
								</svg>
							);
						})}
					</div>
				</section>
				<AllPost loading={loadingLocations} posts={locations} />
			</div>
		</main>
	);
};

export default layoutWithNav(Home);
