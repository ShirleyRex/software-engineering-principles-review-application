import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../ui';

const AllReviews = ({ list, view }) => {
	return (
		<section className="p-2 pt-4 md:p-6">
			{list.map((review) => {
				const { id, location, rating, comments } = review;
				return (
					<article
						key={id}
						className="md:grid-rows-0 mt-4 grid auto-rows-auto grid-cols-2 items-center justify-between gap-y-4 rounded-md border p-4 md:grid-cols-4"
					>
						<p className="text-base font-medium capitalize">{location.name}</p>
						<div className="flex gap-x-2 text-white">
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
											fill={`${index + 1 <= rating ? '#ff7d1a' : '#ffffff'}`}
											stroke={`${index + 1 <= rating ? '#ff7d1a' : '#222633'}`}
											d="m12 1.62 2.22 6.83.11.34h7.54l-5.8 4.22-.3.22.11.34 2.22 6.83-5.8-4.22-.3-.21-.3.2-5.8 4.23 2.22-6.83.1-.34-.29-.22-5.8-4.22h7.54l.11-.34L12 1.62Z"
										/>
									</svg>
								);
							})}
						</div>
						<p>{comments}</p>
						<div className="justify-self-end">
							<button type="button" className="inline-flex items-center border shadow-sm" onClick={() => view(id)}>
								<span className="px-4">View</span>
								<span className="border-l">&#9207;</span>
							</button>
						</div>
					</article>
				);
			})}
		</section>
	);
};

AllReviews.propTypes = {
	list: PropTypes.array,
	view: PropTypes.func
};

AllReviews.defaultProps = {
	list: []
};

export default AllReviews;
