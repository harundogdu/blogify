import React from 'react'
import Post from './Post'

function PostList({ posts }) {
    return (
        <div className='grid grid-cols-4 py-4 px-8 gap-6'>
            {
                posts.map(post => (
                    <Post key={post._id} post={post} />
                ))
            }
        </div>
    )
}

export default PostList
