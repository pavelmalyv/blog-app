import PopularPosts from '@components/popularPosts/PopularPosts';
import AllPosts from '@components/allPosts/AllPosts';
import Heading from '@components/UI/heading/Heading';

import { useTitle } from '@hooks/useTitle';

const HomePage = () => {
	useTitle('Home');

	return (
		<>
			<Heading title="The blog" />
			<PopularPosts isAboveTheFold={true} />
			<AllPosts />
		</>
	);
};

export default HomePage;
