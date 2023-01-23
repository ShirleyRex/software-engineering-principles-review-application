import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { imgs } from '../../../assets';

const Post = ({ id, title, ratings = 0, img, details, address }) => {
	return (
		<article className="rounded-md border p-4 md:p-6">
			<div>
				<Link to={`/post/${id}`}>
					<h3 className="mb-4 text-lg font-bold capitalize leading-lh-small text-secondary">{title}</h3>
				</Link>
				<div className="w-[100px]">
					<img src={img || imgs.placeholder} className="img-fluid" alt={`Graphical representation of ${title}`} />
				</div>
				<div className="flex gap-x-2 py-4">
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
									fill={`${index + 1 <= ratings ? '#ff7d1a' : '#ffffff'}`}
									stroke={`${index + 1 <= ratings ? '#ff7d1a' : '#222633'}`}
									d="m12 1.62 2.22 6.83.11.34h7.54l-5.8 4.22-.3.22.11.34 2.22 6.83-5.8-4.22-.3-.21-.3.2-5.8 4.23 2.22-6.83.1-.34-.29-.22-5.8-4.22h7.54l.11-.34L12 1.62Z"
								/>
							</svg>
						);
					})}
				</div>
			</div>
			<div>
				<p className="text-base-md text-secondary">{details}</p>
			</div>
		</article>
	);
};

Post.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	ratings: PropTypes.number,
	img: PropTypes.string,
	details: PropTypes.string,
	address: PropTypes.string
};

export default Post;
