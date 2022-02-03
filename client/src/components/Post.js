import React from 'react'

function Post({ post }) {
    return (
        <div className='shadow p-4 bg-white rounded'>
            {post.title}
        </div>
    )
}

export default Post
