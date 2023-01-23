import { toast } from 'react-toastify';
import '../notify.css';

const notify = (text, action) => {
	const otherProps = {
		position: 'top-right',
		autoClose: 3000
	};

	if (action === 'success') {
		toast.success(text, {
			className: `text-dark px-4 py-2 bg-[theme('colors.gray_light1')]`,
			...otherProps
		});
	}

	if (action === 'error') {
		toast.error(text, {
			className: 'text-dark error px-4 py-2',
			...otherProps
		});
	}
};

export default notify;
