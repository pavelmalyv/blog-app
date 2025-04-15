import Article from '@components/article/Article';
import Sidebar from '@components/sidebar/Sidebar';
import RecentPosts from '@components/recentPosts/RecentPosts';
import Newsletters from '@components/newsletters/Newsletters';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { requiredParamOrThrow } from '@/utils/error';
import { useParams } from 'react-router';
import { useGetPostByIdQuery } from '@/api/postsSlice';
import { useTitle } from '@hooks/useTitle';
import { ERROR_MESSAGES } from '@/constants/error';
import { MESSAGES } from '@/constants/messages';

const PostPage = () => {
	const params = useParams<{ id?: string }>();
	const postId = requiredParamOrThrow(params.id);

	const { data, isLoading, isError, error } = useGetPostByIdQuery(postId);
	useTitle(data?.title);

	return (
		<Sidebar reverse={true}>
			<Sidebar.Main>
				<VisuallyHiddenLoader isFetching={isLoading} hiddenMessage={MESSAGES.postLoading}>
					<ErrorBoundaryDisplay
						isError={isError}
						error={error}
						isThrowNotFound={true}
						errorMessage={ERROR_MESSAGES.postLoad}
					>
						<Article post={data ?? null} isAboveTheFold={true} />
					</ErrorBoundaryDisplay>
				</VisuallyHiddenLoader>

				<Newsletters container={false} />
			</Sidebar.Main>

			<Sidebar.Aside title="Recent blog posts">
				<RecentPosts limit={5} excludeId={postId} direction="vertical" />
			</Sidebar.Aside>
		</Sidebar>
	);
};

export default PostPage;
