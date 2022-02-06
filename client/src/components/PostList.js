import React from 'react'
import Post from './Post'
import { NotYetSharedPost } from './NotYetSharedPost'
import Loading from './Loading'

function PostList({ posts, loading }) {
    if (loading) {
        return <Loading />
    }
    return (
        <>
            {
                posts.length > 0 ?
                    (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-4 px-8 gap-6'>
                            {posts.map(post => <Post key={post._id} post={post} />)}
                        </div>
                    )
                    : <NotYetSharedPost />
            }
        </>
    )
}

export default PostList
