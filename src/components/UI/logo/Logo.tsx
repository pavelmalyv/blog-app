import cl from './Logo.module.scss';
import { Link } from 'react-router';
import { baseUrl } from '@/routes/routes';

const Logo = () => {
	return (
		<Link to={baseUrl} className={cl.logo}>
			Blog
		</Link>
	);
};

export default Logo;
