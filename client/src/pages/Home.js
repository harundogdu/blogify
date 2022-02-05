import Error from 'components/Error';
import Loading from 'components/Loading';
import PostList from 'components/PostList';
import React from 'react'
import { useGetAllPostsQuery } from 'services/postsApi';
import { ToastEmit, Toast } from 'utils/flashMessages';

function Home({ isAddPost }) {
    const { data, isFetching, error } = useGetAllPostsQuery();

    if (isFetching) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    if (isAddPost) {
        ToastEmit('success', 'Post added successfully!');
    }

    return (
        <div className='min-w-full flex flex-1 h-full'>
            {isAddPost && <Toast />}
            <PostList posts={data} loading={isFetching} />
        </div>
    );
}

export default Home
