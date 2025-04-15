import type { Post } from '@/types/posts';

import classNames from 'classnames';
import cl from './Article.module.scss';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';
import Tags from '@components/UI/tags/Tags';
import Text from '@components/UI/text/Text';
import Author from '@components/author/Author';

import { useId } from 'react';
import { getDisplayDate } from '@/utils/date';

interface ArticleProps {
	post: Post | null;
	labelledby?: boolean;
	isAboveTheFold?: boolean;
}

const Article = ({ post, labelledby = true, isAboveTheFold = false }: ArticleProps) => {
	const articleId = useId();

	return (
		<article className={cl.article} aria-labelledby={labelledby ? articleId : undefined}>
			<div className={classNames('date', cl.about)}>
				<div className={cl.date}>
					{post ? getDisplayDate(post.createdAt, { weekday: true }) : <Skeleton width="12em" />}
				</div>
				<div className={cl.author}>
					{post && <div className={cl['author-label']}>Author:</div>}
					<Author id={post?.userId ?? null} isUnderline={true} />
				</div>
			</div>
			<h1 id={articleId} className={classNames('h1', cl.title)}>
				{post ? post.title : <Skeleton />}
			</h1>
			<div className={cl.image}>
				{post ? (
					<picture className={cl['image-wrapper']}>
						<source srcSet={post.image.webp} type="image/webp" />
						<img
							className={cl['image-img']}
							src={post.image.src}
							width={post.image.width}
							height={post.image.height}
							alt={post.image.alt}
							loading={isAboveTheFold ? 'eager' : 'lazy'}
						/>
					</picture>
				) : (
					<Skeleton height={500} borderRadius={6} />
				)}
			</div>
			<div className={classNames('text', cl.body)}>
				<Text>
					{post ? (
						parse(post.body)
					) : (
						<Text.Skeleton>
							<Skeleton count={3} />
							<Skeleton height={400} borderRadius={6} />
							<Skeleton count={4} />
							<Skeleton count={3} />
							<Skeleton height={400} borderRadius={6} />
							<Skeleton count={4} />
						</Text.Skeleton>
					)}
				</Text>
			</div>
			<div className={cl.tags}>{post && <Tags tags={post.tags} />}</div>
		</article>
	);
};

export default Article;
