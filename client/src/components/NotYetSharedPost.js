import React from 'react';
import NotYetSharedPostImage from 'assets/svg/not-found-blog.svg';

export function NotYetSharedPost() {
    return (
        <div className='flex-1 flex flex-col items-center justify-center'>
            <div className='w-80'>
                <img className='w-full h-full object-contain' src={NotYetSharedPostImage} alt="Not Found Post" />
            </div>
            <p className='text-xl font-semibold mt-4'>No post has been shared yet.</p>
        </div>
    );
}
