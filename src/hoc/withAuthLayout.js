import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchUserDetails } from '../application/redux/user/slice';
import { authenticated, userInfo } from '../application/redux/user/selector';
import { NavBar, Footer } from '../components/ui';
import { auth } from '../application/firebase/firebaseConfig';

function AuthLayout(props) {
	const navigate = useNavigate();
	const [user, loading, error] = useAuthState(auth);

	const C = props.component;

	useEffect(() => {
		if (loading) return;

		if (!user) {
			navigate('/login');
		}

		if (user) props.fetchUser(user);
	}, [loading, user]);

	useEffect(() => {
		let timerId = 0;
		timerId = setTimeout(() => {
			if (!props.isAuthenticated) {
				navigate('/');
			}
		}, 4000);

		return () => clearTimeout(timerId);
	}, [props.isAuthenticated]);

	if (!props.isAuthenticated) {
		return <></>;
	}

	return (
		<>
			<NavBar user={props.user} />
			<C {...props} />
			<Footer />
		</>
	);
}

export function withAuthLayout(component) {
	function RenderComponent(props) {
		return <AuthLayout component={component} {...props} />;
	}

	const mapStateToProps = (state) => ({ isAuthenticated: authenticated(state), user: userInfo(state) });
	const mapDispatchToProps = (dispatch) => ({ fetchUser: (user) => dispatch(fetchUserDetails(user)) });

	return connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
}

function AdminAuthLayout(props) {
	const navigate = useNavigate();
	const [user, loading, error] = useAuthState(auth);

	const C = props.component;

	useEffect(() => {
		if (loading) return;

		if (!user) navigate('/login');

		if (user) {
			props.fetchUser(user);
		}
	}, [user, loading]);

	useEffect(() => {
		let timerId = 0;

		timerId = setTimeout(() => {
			if (!props.isAuthenticated && !props.user?.isAdmin) {
				navigate('/');
			}
		}, 4000);

		return () => clearTimeout(timerId);
	}, [props.isAuthenticated]);

	if (!props.isAuthenticated && !props.user?.isAdmin) {
		return <></>;
	}

	return (
		<>
			<NavBar user={props.user} />
			<C {...props} />
			<Footer />
		</>
	);
}

export function withAdminAuthLayout(component) {
	function RenderComponent(props) {
		return <AdminAuthLayout component={component} {...props} />;
	}

	const mapStateToProps = (state) => ({ isAuthenticated: authenticated(state), user: userInfo(state) });
	const mapDispatchToProps = (dispatch) => ({ fetchUser: (user) => dispatch(fetchUserDetails(user)) });

	return connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
}

AuthLayout.propTypes = {
	component: PropTypes.any,
	isAuthenticated: PropTypes.bool,
	fetchUser: PropTypes.func,
	user: PropTypes.object
};

AdminAuthLayout.propTypes = {
	component: PropTypes.any,
	isAuthenticated: PropTypes.bool,
	fetchUser: PropTypes.func,
	user: PropTypes.object
};
