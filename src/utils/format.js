const localDate = (timeValue = '', countryCode = '', options = {}) => {
	return new Date(timeValue).toLocaleDateString(countryCode, options);
};

const longTextFormat = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const shortTextFormat = {
	weekday: 'short',
	day: 'numeric',
	month: 'short',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric'
};
const shortFormat = { day: 'numeric', month: 'numeric', year: 'numeric' };
const longFormat = { day: 'numeric', month: 'long', year: 'numeric' };

export const dateFormat = { localDate, longFormat, longTextFormat, shortFormat, shortTextFormat };
