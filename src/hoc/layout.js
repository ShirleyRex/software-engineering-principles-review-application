import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../application/firebase/firebaseConfig';
import { fetchUserDetails } from '../application/redux/user/slice';
import { Footer, NavBar } from '../components/ui';
import { userInfo } from '../application/redux/user/selector';

function LayoutWithExtras(props) {
	const [user, loading, error] = useAuthState(auth);

	const C = props.component;

	useEffect(() => {
		if (loading) return;

		if (user) {
			props.fetchUser(user);
		}
	}, [user, loading]);

	return (
		<>
			<NavBar user={props.user} />
			<C {...props} />
			<Footer />
		</>
	);
}

LayoutWithExtras.propTypes = {
	component: PropTypes.any,
	user: PropTypes.object,
	fetchUser: PropTypes.func
};

export function layoutWithNav(component) {
	function RenderComponent(props) {
		return <LayoutWithExtras component={component} {...props} />;
	}

	const mapStateToProps = (state) => ({ user: userInfo(state) });
	const mapDispatchToProps = (dispatch) => ({ fetchUser: (user) => dispatch(fetchUserDetails(user)) });

	return connect(mapStateToProps, mapDispatchToProps)(RenderComponent);
}
