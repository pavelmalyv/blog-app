import type { LinkProps } from 'react-router';

import cl from './Logo.module.scss';
import { Link } from 'react-router';
import { baseUrl } from '@/routes/routes';
import classNames from 'classnames';

const Logo = ({ className, ...props }: Omit<LinkProps, 'to'>) => {
	return (
		<Link to={baseUrl} className={classNames(cl.logo, className)} {...props}>
			Blog
		</Link>
	);
};

export default Logo;
