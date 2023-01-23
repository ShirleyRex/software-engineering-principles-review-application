import React from 'react';
import { imgs } from '../../../../assets';

const LocationImage = () => {
	return (
		<section className="hidden items-center justify-center px-4 md:flex">
			<figure className="flex items-center justify-center">
				<img src={imgs.pinLocationImg} className="w-1/2" alt="Graphical illustration of a location" />
			</figure>
		</section>
	);
};

export default LocationImage;
