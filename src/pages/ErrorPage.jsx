import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex min-h-[100vh] items-center justify-center">
				<h2 className="text-lg font-bold text-gray-200">
					{error.status === 404
						? "This page doesn't exist!"
						: error.status === 401
						? `You aren't authorized to see this page`
						: error.status === 503
						? 'It seems the server is down'
						: error.statusText || error.message}
				</h2>
			</div>
		);
	}
	return (
		<div className="flex min-h-[100vh] items-center justify-center">
			<p className="text-lg font-bold text-gray-200">Something went wrong</p>
		</div>
	);
};

export default ErrorBoundary;
