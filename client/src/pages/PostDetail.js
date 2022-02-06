import { Error, Loading } from 'components';
import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from 'services/postsApi';
import DefaultImage from 'assets/images/default.jpg';
import moment from 'moment';
import { AiOutlineTag, AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';

function PostDetail() {
    let { slug } = useParams();
    const { data, error, isFetching } = useGetPostQuery(slug);

    if (isFetching) {
        return <Loading />;
    }

    if (error) {
        return <Error error={error} />;
    }

    return (
        <div className='flex-1 flex px-8 flex-col'>
            <div className='w-full h-[400px] rounded'>
                <img
                    className='w-full h-full object-cover rounded'
                    src={data?.image || DefaultImage}
                    alt={data?.title} />
            </div>
            <div className='grid grid-cols-7 gap-4 my-4'>
                <div className="col-span-6">
                    <h1 className='text-4xl font-semibold'>{data?.title}</h1>
                    <p className='text-xl text-gray-600 my-4 text-justify'>{data?.content}</p>
                </div>
                <div className='flex flex-col space-y-2 my-4'>
                    <div className='flex flex-col space-y-8'>
                        <div className='flex items-center justify-between'>
                            <AiOutlineUser className='text-gray-600' />
                            <p className='font-bold' title='Post Author'>Harun Doğdu</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <AiOutlineTag className='text-gray-600' />
                            <p
                                title='Post Category'
                                className='text-sm text-white bg-black px-2 p-1 font-semibold rounded  w-fit'>#{data?.tag}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <BiTimeFive className='text-gray-600' />
                            <p
                                title='Post Date'
                                className='text-xs text-gray-400 group-hover:text-white'>
                                {moment(data?.date).fromNow()}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostDetail
