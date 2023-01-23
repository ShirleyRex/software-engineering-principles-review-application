import React from 'react';
import PropTypes from 'prop-types';
import { withAuthLayout } from '../hoc/withAuthLayout';
import { imgs } from '../assets';
import '../styles/profile.css';

const Profile = ({ user }) => {
	return (
		<>
			<header className="bg-secondary p-4">
				<section className="avatar-container container flex h-[20vh] items-center justify-center md:h-[30vh]">
					<h1 className="text-2xl font-bold leading-lh-small text-primary">Profile</h1>
				</section>
			</header>
			<main className="container mt-10 flex min-h-[42vh] flex-col gap-x-36 gap-y-8 px-4 md:flex-row md:px-8">
				<section className="avatar-container flex flex-col gap-y-4">
					<div>
						<img src={imgs.dummyAvatar} alt={`${user.username} avatar`} />
					</div>
					<p className="text-base-md font-medium capitalize leading-lh-large text-primary md:mt-4 md:text-center">
						{user.username}
					</p>
				</section>
				<section className="w-full">
					<div className="profile-detail py-4">
						<strong className="text-base-xl font-bold text-gray-300">Email:</strong>{' '}
						<strong className="text-base font-medium text-secondary">{user.email || ''}</strong>
					</div>
					<div className="profile-detail py-4">
						<strong className="text-base-xl font-bold text-gray-300">Timezone:</strong>{' '}
						<strong className="text-base font-medium text-secondary">
							{Intl.DateTimeFormat().resolvedOptions().timeZone || ''}
						</strong>
					</div>
				</section>
			</main>
		</>
	);
};

Profile.propTypes = {
	user: PropTypes.object
};

export default withAuthLayout(Profile);
