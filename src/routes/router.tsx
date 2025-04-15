import {
	authorUrl,
	baseUrl,
	blogUrl,
	cookiesUrl,
	creditsUrl,
	newslettersUrl,
	policyUrl,
} from '@/routes/routes';
import { createBrowserRouter } from 'react-router';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('@/pages/HomePage'));
const Root = lazy(() => import('@/pages/Root'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const PostPage = lazy(() => import('@/pages/PostPage'));
const AuthorPage = lazy(() => import('@/pages/AuthorPage'));
const PolicyPage = lazy(() => import('@/pages/PolicyPage'));
const CookiesPage = lazy(() => import('@/pages/CookiesPage'));
const CreditsPage = lazy(() => import('@/pages/CreditsPage'));
const NewslettersPage = lazy(() => import('@/pages/NewslettersPage'));

const router = createBrowserRouter([
	{
		path: baseUrl,
		element: (
			<Suspense>
				<Root />
			</Suspense>
		),
		errorElement: <ErrorPage />,
		children: [
			{
				path: blogUrl.base,
				element: (
					<Suspense>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: blogUrl.pagination(':pagination'),
				element: (
					<Suspense>
						<HomePage />
					</Suspense>
				),
			},
			{
				path: blogUrl.post(':id'),
				element: (
					<Suspense>
						<PostPage />
					</Suspense>
				),
			},
			{
				path: authorUrl.profile(':id'),
				element: (
					<Suspense>
						<AuthorPage />
					</Suspense>
				),
			},
			{
				path: authorUrl.pagination(':id', ':pagination'),
				element: (
					<Suspense>
						<AuthorPage />
					</Suspense>
				),
			},
			{
				path: policyUrl,
				element: (
					<Suspense>
						<PolicyPage />
					</Suspense>
				),
			},
			{
				path: cookiesUrl,
				element: (
					<Suspense>
						<CookiesPage />
					</Suspense>
				),
			},
			{
				path: creditsUrl,
				element: (
					<Suspense>
						<CreditsPage />
					</Suspense>
				),
			},
			{
				path: newslettersUrl,
				element: (
					<Suspense>
						<NewslettersPage />
					</Suspense>
				),
			},
		],
	},
]);

export default router;
