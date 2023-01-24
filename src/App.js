import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import router from './pages';
import './styles/App.css';

function App() {
	return (
		<Suspense fallback={<div className="flex h-screen w-full items-center justify-center">Loading</div>}>
			<RouterProvider router={router()} />
		</Suspense>
	);
}

export default App;
