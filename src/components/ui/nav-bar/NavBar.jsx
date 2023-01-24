import React, { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../../application/firebase/firebaseConfig';
import { logout } from '../../../application/redux/user/slice';
import PropTypes from 'prop-types';
import { navLinkData } from '../../../data/navLinkData';
import { User } from '../../../assets';
import './navbar.css';

const NavBar = ({ user }) => {
	const linkContainerRef = useRef(null);
	const linksList = useRef(null);

	const dispatch = useDispatch();

	const showNavLinks = () => {
		const containerHeight = linkContainerRef.current.getBoundingClientRect().height;
		const listHeight = linksList.current.getBoundingClientRect().height;

		if (containerHeight === 0) {
			linkContainerRef.current.style.height = listHeight + 'px';
		} else {
			linkContainerRef.current.style.height = 0 + 'px';
		}
	};

	const handleLogout = () => {
		dispatch(logout());
		signOut(auth);
	};

	return (
		<nav className="sticky top-0 bg-gray-100 p-4 shadow-md">
			<div className="nav-content container grid max-w-2xl items-center gap-x-8">
				<div className="nav-brand flex items-center">
					<button className="mr-4 md:hidden" onClick={showNavLinks}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" width="19" height="15" viewBox="0 0 19 15">
							<path fill="#000" d="M0 0h19v2.5H0V0Zm0 6.25h19v2.5H0v-2.5Zm0 6.25h19V15H0v-2.5Z" />
						</svg>
					</button>
					<Link to='/'>
						<img src={ require('../../../images/logo-sep-project.jpg') } alt="Brand logo" />
					</Link>
				</div>
				<div className="links-container" ref={linkContainerRef}>
					<ul className="flex items-center" ref={linksList}>
						{navLinkData.map((link) => {
							if (link.name === 'reviews' && !user?.isAdmin) {
								return null;
							}
							return (
								<li key={link.path} className="mt-4 capitalize md:mt-0 md:mr-4">
									<NavLink
										to={link.path}
										className={({ isActive }) => (isActive ? 'font-bold text-primary' : 'font-bold text-gray-300')}
									>
										{link.name}
									</NavLink>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="flex items-center">
					{user.username && (
						<Link className="mr-4 flex" to="/profile">
							<User />
						</Link>
					)}
					{!user.username ? (
						<Link className="font-bold text-gray-300" to="/login">
							Login
						</Link>
					) : (
						<button className="font-bold text-gray-300 shadow-none" onClick={handleLogout}>
							Logout
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

NavBar.propTypes = {
	user: PropTypes.object
};

NavBar.defaultProps = {
	user: {}
};

export default NavBar;
