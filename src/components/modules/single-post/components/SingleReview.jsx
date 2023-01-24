import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from '../../../../utils/format';
import { Button } from '../../../ui';
import { updateDocArr } from '../../../../application/firebase/services';
import { generateId } from '../../../../utils/generate';
import { NotifyContainer, notify } from '../../../lib/notify';

const SingleReview = ({ id, name, rating, timestamp, comments, replies }) => {
	const [reply, setReply] = useState('');
	const [threads, setThreads] = useState([]);

	let replyRefContainer = useRef(null);
	let replyFormRef = useRef(null);

	useEffect(() => {
		setThreads([...replies]);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (reply === '') {
			notify('You can not submit an empty reply', 'error');
			return;
		}

		const data = { text: reply, id: generateId(), timestamp: String(Date.now()) };

		const response = await updateDocArr({ collection: 'reviews', data, docId: id });

		if (response.success) {
			setThreads((prevVal) => [...prevVal, data]);
			replyRefContainer.style.height = 0;
			setReply('');
		}
	};

	const showReplyForm = () => {
		const containerHeight = replyRefContainer.getBoundingClientRect().height;
		const formHeight = replyFormRef.getBoundingClientRect().height;

		let replyContainers = document.querySelectorAll('.reply-container');
		replyContainers = [...replyContainers];

		if (containerHeight === 0) {
			replyContainers.forEach((container) => {
				container.style.height = 0;
			});

			replyRefContainer.style.height = formHeight + 'px';
		} else {
			replyRefContainer.style.height = 0;
		}
	};

	return (
		<article className="mb-8">
			<hgroup className="mb-1">
				<h4 className="mb-1 text-base font-medium capitalize leading-lh-small">{name}</h4>
				<p className="flex items-center">
					<span className="mr-2 flex gap-x-1 py-2">
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
					</span>
					<span>
						(
						{dateFormat.localDate(
							!Object.keys(timestamp)?.length ? timestamp : timestamp?.toDate(),
							'GBR',
							dateFormat.shortFormat
						)}
						)
					</span>
				</p>
			</hgroup>
			<p className="text-base leading-lh-large">{comments}</p>
			<button onClick={showReplyForm} className="mt-4 border-none text-primary shadow-none">
				Reply
			</button>
			<section
				ref={(el) => (replyRefContainer = el)}
				className="reply-container h-0 overflow-hidden transition-[height] duration-300"
			>
				<form ref={(el) => (replyFormRef = el)} onSubmit={handleSubmit} className="py-4">
					<div className="mb-3.5">
						<label className="sr-only" htmlFor="">
							Reply input
						</label>
						<input
							type="text"
							value={reply}
							onChange={(e) => {
								setReply(e.target.value);
							}}
							className="w-1/2 rounded border p-2"
						/>
					</div>
					<button type="submit" className="reply-form-btn rounded p-2">
						Submit
					</button>
				</form>
			</section>
			{threads.length ? (
				<section className="replies-thread py-4 pl-8">
					{threads.map((reply, indx) => {
						return (
							<article key={reply.id || indx} className="flex flex-wrap items-center gap-4">
								<p className="text-base leading-lh-large text-secondary">{reply.text}</p>
								<p className="text-base-sm leading-lh-large text-gray-300">
									({dateFormat.localDate(+reply.timestamp, 'GBR', dateFormat.shortTextFormat)})
								</p>
							</article>
						);
					})}
				</section>
			) : (
				''
			)}
			<NotifyContainer />
		</article>
	);
};

SingleReview.propTypes = {
	id: PropTypes.string,
	name: PropTypes.string,
	comments: PropTypes.string,
	replies: PropTypes.array,
	timestamp: PropTypes.object,
	rating: PropTypes.number
};

SingleReview.defaultProps = {
	replies: []
};

export default SingleReview;
