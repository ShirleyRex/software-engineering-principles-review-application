import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
// import { useState, useEffect } from 'react';

import router from './pages';
import './styles/App.css';

// const URL = `https://www.yelp.com/developers/v3/manage_app?saved_changes=True`;

function App() {

	// const [location, setLocation] = useState(0)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const result = await fetch(URL)
	// 		result.json().then(json => {
	// 			setLocation();
	// 		})
	// 	}
	// 	fetchData();
	// }, []);

	return (
		<Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading</div>}>
			<RouterProvider router={router()} />
		</Suspense>
	);
}

export default App;
