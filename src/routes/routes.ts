import type { BlogUrl, AuthorUrl } from '@/types/routes';

export const baseUrl = import.meta.env.BASE_URL;

export const blogUrl: BlogUrl = {
	base: baseUrl,
	post: (id) => `${baseUrl}post/${id}`,
	pagination: (page) => `${baseUrl}page/${page}`,
};

export const authorUrl: AuthorUrl = {
	profile: (id) => `${baseUrl}author/${id}`,
	pagination: (id, page) => `${baseUrl}author/${id}/page/${page}`,
};

export const policyUrl = `${baseUrl}policy`;
export const cookiesUrl = `${baseUrl}cookies`;
export const creditsUrl = `${baseUrl}credits`;
export const newslettersUrl = `${baseUrl}newsletters`;
