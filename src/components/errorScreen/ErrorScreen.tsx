import cl from './ErrorScreen.module.scss';
import Button from '../UI/Buttons/button/Button';

import { useId } from 'react';
import { baseUrl } from '@/routes/routes';

interface ErrorProps {
	title: string;
	description: string;
	isLink?: boolean;
}

const ErrorScreen = ({ title, description, isLink = true }: ErrorProps) => {
	const titleId = useId();

	return (
		<section className={cl.error} aria-labelledby={titleId}>
			<div className="container">
				<div className={cl.body}>
					<h1 id={titleId} className={cl.title}>
						{title}
					</h1>
					<div className={cl.description}>{description}</div>

					{isLink && <Button to={baseUrl}>Home</Button>}
				</div>
			</div>
		</section>
	);
};

export default ErrorScreen;
