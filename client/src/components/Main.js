import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsFromDB } from 'features/posts/postsSlice';
import PostList from './PostList';

const Main = () => {
    const dispatch = useDispatch();
    const { posts , isLoading } = useSelector(state => state.posts);

    React.useEffect(() => {
        dispatch(getAllPostsFromDB());
    }, [dispatch]);

    return (
        <div className='min-w-full flex flex-1 h-full'>
            <PostList posts={posts} loading={isLoading} />
        </div>
    );
};

export default Main;