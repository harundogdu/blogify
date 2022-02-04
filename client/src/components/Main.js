import React from 'react';
import PostList from './PostList';
import { useGetAllPostsQuery } from 'services/postsApi';
import { Loading, Error } from 'components/export';

const Main = () => {
    const { data, isFetching, error } = useGetAllPostsQuery();

    if (isFetching) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className='min-w-full flex flex-1 h-full'>
            <PostList posts={data} loading={isFetching} />
        </div>
    );
};

export default Main;