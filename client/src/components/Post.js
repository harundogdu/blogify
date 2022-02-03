import React from 'react'
import moment from 'moment'
import DefaultImage from 'assets/images/default.jpg'

function Post({ post }) {
    return (
        <div className='shadow p-4 bg-white rounded-lg hover:bg-black hover:text-white transition-colors hover:cursor-pointer group h-[485px] flex flex-col'>
            <div className='w-full h-64'>
                <img
                    className='w-full h-full object-cover'
                    src={post.image || DefaultImage}
                    alt="Post" />
            </div>
            <div className='py-2 space-y-2  flex-1'>
                <div className='flex justify-between '>
                    <h3 className='text-xl font-semibold'>{post.title.substring(0, 55)}</h3>
                    <p className='text-sm text-white bg-black group-hover:text-black group-hover:bg-gray-50 px-2 p-1 font-semibold rounded h-full'>#{post.tag}</p>
                </div>

                <p className='flex-1 text-sm text-gray-600 group-hover:text-white'>{post.content.substring(0, 255)}</p>
            </div>
            <div className='flex items-center justify-between'>
                <p className='font-bold'>Harun Doğdu</p>
                <p className='text-xs text-gray-400 group-hover:text-white'>
                    {moment(post.date).fromNow()}
                </p>
            </div>
        </div>
    )
}

export default Post
