import type { Posts } from '@/types/posts';

import cl from './PopularPosts.module.scss';
import PostCard from '@components/postCard/PostCard';
import Section from '@components/UI/section/Section';
import MessageInfo from '@/components/UI/messageInfo/MessageInfo';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { useGetPostsQuery } from '@/api/postsSlice';
import { MESSAGES } from '@/constants/messages';
import { ERROR_MESSAGES } from '@/constants/error';

interface PopularPosts {
	isAboveTheFold?: boolean;
}
const PopularPosts = ({ isAboveTheFold }: PopularPosts) => {
	let posts: Posts | null[] = Array(4).fill(null);
	let total: number | undefined;

	const { data, isLoading, isError } = useGetPostsQuery({
		limit: 4,
		skip: 0,
		sortBy: 'views',
		order: 'desc',
	});

	if (!isLoading && data) {
		posts = data.posts;
		total = data.total;
	}

	const stylesPostCard = [
		'dynamic-height',
		'small-horizontal',
		'small-horizontal',
		'large',
	] as const;

	return (
		<Section title="Popular blog posts">
			<VisuallyHiddenLoader isFetching={isLoading} hiddenMessage={MESSAGES.postsLoading}>
				<ErrorBoundaryDisplay isError={isError} errorMessage={ERROR_MESSAGES.postsLoad}>
					{total === 0 ? (
						<MessageInfo message={MESSAGES.postsEmpty} />
					) : (
						<ul className={cl.list}>
							{posts.map((post, i) => {
								const key = post ? post.id : i;

								return (
									<li className={cl.item} key={key}>
										<PostCard
											post={post}
											styleCard={stylesPostCard[i]}
											isImageEager={isAboveTheFold && i == 0}
										/>
									</li>
								);
							})}
						</ul>
					)}
				</ErrorBoundaryDisplay>
			</VisuallyHiddenLoader>
		</Section>
	);
};

export default PopularPosts;
