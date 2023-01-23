import React, { lazy, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getSinglePost } from '../application/firebase/services';
import { ReviewsList } from '../components/modules';
import { Button } from '../components/ui';
import ReviewForm from '../components/modules/single-post/components/ReviewForm';
import { Modal } from '../components/common';
import { imgs } from '../assets';
import { layoutWithNav } from '../hoc/layout';
import { addReview } from '../application/redux/reviews/slice';

import '../styles/post.css';

export async function postLoader({ params }) {
	return await getSinglePost(params);
}

export async function addReviews({ request }) {}

const Post = () => {
	const [show, setShow] = useState(false);
	const [rating, setRating] = useState(0);

	const { post, reviews } = useLoaderData();

	useEffect(() => {
		const averPostRating = post.reviews.reduce((acc, curr) => {
			const rating = JSON.parse(curr).rating;

			return acc + Number(rating);
		}, 0);

		setRating(Math.round(averPostRating / post.reviews.length || 0));
	}, [post.reviews.length]);

	const openModal = () => setShow(true);

	const closeModal = () => setShow(false);

	const updateList = (data) => {
		reviews.push(data);
		post.reviews.push(JSON.stringify({ id: data.location.id, rating: data.rating }));
	};

	return (
		<main className="main-content mt-10 min-h-[85vh]">
			<section className="container px-4 md:px-10">
				<section>
					<h2 className="mb-4 text-base-md font-bold capitalize">{post.title}</h2>
					<div className="w-[100px]">
						<img
							src={post?.image || imgs.placeholder}
							className="img-fluid mb-2"
							alt={`Graphical representation of ${post.title}`}
						/>
					</div>
					<div className="mb-4 flex items-center gap-x-1">
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
					<Button text="write reviews" onclick={openModal} />
				</section>
				<section>
					<p className="mb-4 text-base-md leading-lh-large">{post.details}</p>
					<ReviewsList list={reviews} />
				</section>
			</section>
			{show && (
				<Modal show={show} title="review" modalBg="white" maxWidth={600} closeModal={closeModal}>
					<ReviewForm
						locationId={post.id}
						close={closeModal}
						addReview={addReview}
						locationName={post.title}
						update={updateList}
					/>
				</Modal>
			)}
		</main>
	);
};

export default layoutWithNav(Post);
