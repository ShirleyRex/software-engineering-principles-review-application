import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../../ui';

const AllPost = ({ posts, loading }) => {
	return (
		<section className="mb-6 grid gap-y-6">
			{loading === 'idle' ? (
				<p>Loading</p>
			) : (
				<>
					{posts.map((post) => {
						const { id, title, image, details, reviews, address } = post;

						const averPostRating = reviews.reduce((acc, curr) => {
							const rating = JSON.parse(curr).rating;
							return acc + Number(rating);
						}, 0);

						return (
							<Post
								key={id}
								id={id}
								ratings={Math.round(averPostRating / reviews.length || 0)}
								title={title}
								details={details}
								img={image}
								address={address}
							/>
						);
					})}
				</>
			)}
		</section>
	);
};

AllPost.propTypes = {
	posts: PropTypes.array,
	fetchAll: PropTypes.func,
	loading: PropTypes.string
};

export default AllPost;
