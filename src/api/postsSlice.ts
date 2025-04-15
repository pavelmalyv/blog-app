import type { Post, PostsResponse } from '@/types/posts';
import type { SortOrder } from '@/types/api';

import { postSchema, postsResponseSchema } from '@/schemas/postsSchemas';
import { apiSlice } from '@/api/apiSlice';

interface GetPostsParams {
	limit?: number;
	skip?: number;
	sortBy?: string;
	order?: SortOrder;
	search?: string;
}

interface GetPostByIdUserParams {
	id: string;
	limit?: number;
	skip?: number;
}

const postsSlice = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getPosts: build.query<PostsResponse, GetPostsParams>({
			query: ({ limit = 30, skip = 0, sortBy, order, search }) => {
				const url = search ? '/posts/search' : '/posts';

				return {
					url,
					params: {
						limit,
						skip,
						sortBy,
						order,
						q: search,
					},
				};
			},
			transformResponse: async (response: unknown) => {
				// преобразование ответа сервера
				const result = addAdditionalFieldsPosts(response);

				return await postsResponseSchema.validate(result);
			},
		}),
		getPostById: build.query<Post, string>({
			query: (id) => `/posts/${id}`,
			transformResponse: async (response: unknown) => {
				// преобразование ответа сервера
				const result = addAdditionalFieldsPost(response);

				return await postSchema.validate(result);
			},
		}),
		getPostByIdUser: build.query<PostsResponse, GetPostByIdUserParams>({
			query: ({ id, limit = 30, skip = 0 }) => ({
				url: `/users/${id}/posts`,
				params: {
					limit,
					skip,
				},
			}),
			transformResponse: async (response: unknown) => {
				// преобразование ответа сервера
				const result = addAdditionalFieldsPosts(response);

				return await postsResponseSchema.validate(result);
			},
		}),
	}),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useGetPostByIdUserQuery } = postsSlice;

// адаптация публичного api под проект
function addAdditionalFieldsPosts(response: unknown) {
	if (
		typeof response === 'object' &&
		response !== null &&
		'posts' in response &&
		'total' in response &&
		Array.isArray(response.posts)
	) {
		response.posts = response.posts.map((post) => {
			return addAdditionalFieldsPost(post);
		});
	}

	return response;
}

function addAdditionalFieldsPost(post: unknown) {
	const colors = ['00605E', '006992', '5D5D5D'];

	if (
		typeof post == 'object' &&
		post !== null &&
		'id' in post &&
		typeof post.id === 'number' &&
		'body' in post
	) {
		//createdAt
		const date = new Date('2023-10-01');
		date.setDate(date.getDate() + post.id * 2);
		const createdAt = date.toISOString();

		//thumbnail
		const colorMain = colors[post.id % colors.length];

		const thumbnail = {
			src: `https://dummyjson.com/image/960x600/${colorMain}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=jpg`,
			webp: `https://dummyjson.com/image/960x600/${colorMain}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=webp`,
			width: 960,
			height: 600,
			alt: `Blog #${post.id}`,
		};

		//image
		const image = {
			src: `https://dummyjson.com/image/1600x1000/${colorMain}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=jpg`,
			webp: `https://dummyjson.com/image/1600x1000/${colorMain}/ffffff?text=Blog+%23${post.id}&fontFamily=poppins&type=webp`,
			width: 1600,
			height: 1000,
			alt: `Blog #${post.id}`,
		};

		//excerpt
		const excerpt = post.body;

		//body
		const otherColors = colors.filter((color) => color !== colorMain);
		const imageBodyPrimary = `
			<picture>
				<source srcset="https://dummyjson.com/image/1600x876/${otherColors[0]}/ffffff?text=Blog&fontFamily=poppins&type=webp" type="image/webp" />
				<img
					src="https://dummyjson.com/image/1600x876/${otherColors[0]}/ffffff?text=Blog&fontFamily=poppins&type=jpg"
					width="1600"
					height="876"
					alt="Blog"
					loading="lazy"
				/>
			</picture>`;
		const imageBodySecondary = `
			<figure>
				<picture>
					<source srcset="https://dummyjson.com/image/1600x876/${otherColors[1]}/ffffff?text=Blog&fontFamily=poppins&type=webp" type="image/webp" />
					<img
						src="https://dummyjson.com/image/1600x876/${otherColors[1]}/ffffff?text=Blog&fontFamily=poppins&type=jpg"
						width="1600"
						height="876"
						alt="Blog"
						loading="lazy"
					/>
				</picture>
				<figcaption>Definition: A grid is made up of columns, gutters, and margins that provide a structure for the layout of elements on a page.</figcaption>
			</figure>`;

		let body = `<p>${post.body}</p>`;
		body +=
			'<p>A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the layout more visually appealing and easier to navigate.</p>';
		body += imageBodyPrimary;
		body +=
			'<p>There are three common grid types used in websites and interfaces: column grid, modular grid, and hierarchical grid.</p>';
		body +=
			'<p>Column grid involves dividing a page into vertical columns. UI elements and content are then aligned to these columns.</p>';
		body +=
			'<p>Modular grid extends the column grid further by adding rows to it. This intersection of columns and rows make up modules to which elements and content are aligned. Modular grids are great for ecommerce and listing pages, as rows are repeatable to accommodate browsing.</p>';
		body +=
			'<p>Hierarchical grid: Content is organized by importance using columns, rows, and modules. The most important elements and pieces of content take up the biggest pieces of the grid.</p>';

		body += '<h2>Breaking Down the Grid</h2>';

		body += '<h3>Benefits of the Grid</h3>';

		body += '<p>Using a grid benefits both end users and the designers alike:</p>';

		body += `
			<ul>
				<li>Designers can quickly put together well-aligned interfaces.</li>
				<li>Users can easily scan predictable grid-based interfaces.</li>
				<li>A good grid is easy to adapt to various screen sizes and orientations. In fact, grid layouts are an essential component of <a href="https://www.nngroup.com/articles/responsive-web-design-definition/" target="_blank">responsive web design</a>. Responsive design uses breakpoints to determine the screen size threshold at which the layout should change. For example, a desktop screen may have 12 grid columns, which may be stacked on mobile so that the resulting layout has only 4 columns.</li>
			</ul>`;

		body += imageBodySecondary;

		body +=
			'<p>Even more importantly, the grid is not a throw-away concept. It is used by both designers and developers alike. Be sure to communicate with your developers the grid structure used when creating the design, so they can implement it accordingly.</p>';

		body += '<h3>Choosing and Setting Up Your Grid</h3>';

		body +=
			'<p>How you use and set up a grid is fundamental to creating well thought out layouts and experiences for your user.</p>';

		body +=
			'<p><strong>Choose the right grid for your needs.</strong> Take time to think through what type of grid ­— column, modular, or hierarchical — best suits your needs. A hierarchical grid may be the best fit if one item on your page will always be more important than the surrounding elements. For example, hierarchical grids are great for online news platforms. If the content you need to display is highly variable, consider using a basic column or modular grid, as these provide lots of flexibility when designing. For example, elements and content can span across multiple columns or modules or just one to fit design needs.</p>';
		body +=
			'<p><strong>Spend time setting up your grid.</strong> Once you have figured out what type of grid will work well for your needs, start setting it up. Determine the number of columns and the margin and gutter sizes relative to your screen sizes. You will most likely want to prepare for mobile, tablet, and desktop screens. A 12-column grid at laptop or desktop size is generally flexible enough for most design needs. The number of columns will decrease as your device size decreases. Wireframing tools like Sketch and Figma have quick and easy ways to set up and edit your grid, even after you have started designing.</p>';

		return {
			...post,
			createdAt,
			thumbnail,
			image,
			excerpt,
			body,
		};
	}

	return post;
}
//
