import React, { useState } from 'react';
import { postService } from 'services/postService';
import PostList from './PostList';

const Main = () => {
    const [posts, setPosts] = useState([]);

    React.useEffect(() => {
        const getPosts = async () => {
            const response = await postService('/posts');
            setPosts(response);
        }
        getPosts();
    }, []);
    return (
        <div className='min-w-full flex-1'>
            <PostList posts={posts} />
        </div>
    );
};

export default Main;