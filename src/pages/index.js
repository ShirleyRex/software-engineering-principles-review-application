import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, Router } from 'react-router-dom';
import ErrorBoundary from './ErrorPage';
import { postLoader } from './Post';

const Home = lazy(() => import('./Home'));
const Reviews = lazy(() => import('./Reviews'));
const Post = lazy(() => import('./Post'));
const Profile = lazy(() => import('./Profile'));
const Login = lazy(() => import('./Login'));
const Register = lazy(() => import('./Register'));

const router = () =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route path="/">
				<Route errorElement={<ErrorBoundary />}>
					<Route index element={<Home />} />
					<Route path="reviews" element={<Reviews />} />
					<Route path="profile" element={<Profile />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<Register />} />
					<Route path="post/:id" errorElement={<ErrorBoundary />} element={<Post />} loader={postLoader} />
				</Route>
			</Route>
		)
	);

export default router;
