import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsFromDB } from 'features/posts/postsSlice';
import PostList from './PostList';

const Main = () => {
    const dispatch = useDispatch();
    const { posts, error } = useSelector(state => state.posts);
    console.error(error);

    React.useEffect(() => {
        dispatch(getAllPostsFromDB());
    }, [dispatch]);

    return (
        <div className='min-w-full flex flex-1 h-full'>
            <PostList posts={posts} />
        </div>
    );
};

export default Main;