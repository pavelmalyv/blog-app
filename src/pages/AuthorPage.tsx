import type { Posts } from '@/types/posts';

import Heading from '@components/UI/heading/Heading';
import User from '@components/user/User';
import Section from '@components/UI/section/Section';
import PostsList from '@components/postsList/PostsList';
import Pagination from '@components/UI/pagination/Pagination';
import VisuallyHiddenLoader from '@components/visuallyHiddenLoader/VisuallyHiddenLoader';
import ErrorBoundaryDisplay from '@components/errorBoundaryDisplay/ErrorBoundaryDisplay';

import { useParams } from 'react-router';
import { useGetUserByIdQuery } from '@/api/usersSlice';
import { requiredParamOrThrow } from '@/utils/error';
import { authorUrl } from '@/routes/routes';
import { useValidatePaginationParam } from '@hooks/useValidatePaginationParam';
import { useGetPostByIdUserQuery } from '@/api/postsSlice';
import { useValidatePaginationTotal } from '@hooks/useValidatePaginationTotal';
import { getSkip } from '@/utils/pagination';
import { useFetchingQuery } from '@hooks/useFetchingQuery';
import { useTitle } from '@hooks/useTitle';

import { ERROR_MESSAGES } from '@/constants/error';
import { MESSAGES } from '@/constants/messages';

const LIMIT_POSTS = 6;

const AuthorPage = () => {
	const params = useParams<{ id?: string; pagination?: string }>();
	const authorId = requiredParamOrThrow(params.id);
	const [paginationParam, isValidPaginationParam] = useValidatePaginationParam(
		params.pagination,
		authorUrl.profile(authorId),
	);

	const { data: user, isError, error } = useGetUserByIdQuery(authorId);

	let totalPosts: number | undefined;
	const skipPosts = getSkip(paginationParam, LIMIT_POSTS);
	let posts: Posts | null[] = Array(LIMIT_POSTS).fill(null);

	const title = user ? `${user.firstName} ${user.firstName}` : undefined;
	useTitle(title);

	const {
		data: dataPosts,
		isError: isErrorPosts,
		isFetching: isFetchingAuthor,
	} = useGetPostByIdUserQuery(
		{ id: authorId, limit: LIMIT_POSTS, skip: skipPosts },
		{ skip: !isValidPaginationParam },
	);

	if (dataPosts) {
		posts = dataPosts.posts;
		totalPosts = dataPosts.total;
	}

	const paginationPage = useValidatePaginationTotal({
		limit: LIMIT_POSTS,
		total: totalPosts,
		currentPage: paginationParam,
		paginationUrlCallback: (page) => authorUrl.pagination(authorId, page),
	});

	const { isFetching: isFetchingPagination } = useFetchingQuery(paginationPage, isFetchingAuthor);

	return (
		<>
			<ErrorBoundaryDisplay
				isError={isError}
				error={error}
				isThrowNotFound={true}
				errorMessage={ERROR_MESSAGES.authorLoad}
			>
				<Heading title={user ? `${user.firstName} ${user.lastName}` : null} />
				<User user={user ?? null} isAboveTheFold={true} />
			</ErrorBoundaryDisplay>

			<Section title="All articles by the author">
				<VisuallyHiddenLoader
					isFetching={isFetchingPagination}
					hiddenMessage={MESSAGES.authorPostsLoading}
				>
					<ErrorBoundaryDisplay isError={isErrorPosts} errorMessage={ERROR_MESSAGES.authorPostLoad}>
						<PostsList isFetching={isFetchingPagination}>
							<PostsList.Posts posts={posts} isCurrentPageAuthor={true} />
						</PostsList>

						{totalPosts && paginationPage ? (
							<Pagination
								limit={LIMIT_POSTS}
								total={totalPosts}
								currentPage={paginationPage}
								urlBase={authorUrl.profile(authorId)}
								isLoading={isFetchingPagination}
								urlCallback={(page) => authorUrl.pagination(authorId, page)}
							/>
						) : null}
					</ErrorBoundaryDisplay>
				</VisuallyHiddenLoader>
			</Section>
		</>
	);
};

export default AuthorPage;
