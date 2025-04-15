import type { Post } from '@/types/posts';

import classNames from 'classnames';
import cl from './PostCard.module.scss';
import Skeleton from 'react-loading-skeleton';
import Tags from '@components/UI/tags/Tags';
import Icon from '@components/UI/icon/Icon';
import Author from '@components/author/Author';

import { Link } from 'react-router';
import { truncate } from 'lodash';
import { useId } from 'react';
import { getDisplayDate } from '@/utils/date';
import { blogUrl } from '@/routes/routes';

interface PostCardProps {
	post: Post | null;
	isCurrentPageAuthor?: boolean;
	isImageEager?: boolean;
	styleCard?: 'small' | 'small-horizontal' | 'dynamic-height' | 'large';
}

const PostCard = ({
	post,
	isCurrentPageAuthor,
	isImageEager = false,
	styleCard = 'small',
}: PostCardProps) => {
	const titleId = useId();

	return (
		<article
			className={classNames(cl.card, cl[`card-${styleCard}`])}
			aria-labelledby={post ? titleId : undefined}
		>
			<div className={cl.image}>
				{post ? (
					<picture>
						<source srcSet={post.thumbnail.webp} type="image/webp" />
						<img
							className={cl['image-img']}
							src={post.thumbnail.src}
							width={post.thumbnail.width}
							height={post.thumbnail.height}
							alt={post.thumbnail.alt}
							loading={isImageEager ? 'eager' : 'lazy'}
						/>
					</picture>
				) : (
					<Skeleton width="100%" height="100%" borderRadius={6} />
				)}
			</div>

			<div className={cl.body}>
				<div className={classNames('date', cl.about)}>
					<Author id={post?.userId ?? null} isCurrentPageAuthor={isCurrentPageAuthor} />

					{post ? (
						<span className={cl['about-date']}>• {getDisplayDate(post.createdAt)}</span>
					) : (
						<Skeleton width="6em" />
					)}
				</div>
				<div
					className={classNames(cl.title, {
						h3: styleCard != 'small-horizontal',
						h4: styleCard === 'small-horizontal',
					})}
				>
					{post ? (
						<Link className={cl['title-link']} to={blogUrl.post(post.id)}>
							<h3 id={titleId} className={cl['title-text']}>
								{post.title}
							</h3>
							<span className={cl['title-icon']} aria-hidden="true">
								<Icon>arrow_outward</Icon>
							</span>
						</Link>
					) : (
						<Skeleton />
					)}
				</div>
				<div className={cl.description}>
					{post ? (
						<>
							{truncate(post.excerpt, {
								length: styleCard === 'large' ? 370 : 90,
								separator: /,? +/,
							})}
						</>
					) : (
						<Skeleton count={2} />
					)}
				</div>
				<div className={cl.tags}>
					<Tags tags={post ? post.tags : null} />
				</div>
			</div>
		</article>
	);
};

export default PostCard;
