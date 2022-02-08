import React from 'react'
import { CustomTable, Loading, Error } from 'components'
import { useGetAllPostsQuery } from 'services/postsApi'

function Operations() {
    const { data, isFetching, error } = useGetAllPostsQuery();

    if (isFetching) {
        return <Loading />
    }

    if (error) {
        return <Error />
    }

    return (
        <div className='flex-1 px-8'>
            <h1 className='text-3xl font-bold mb-4 text-center'>Operations in Post List</h1>
            <CustomTable data={data} isLoading={isFetching} />
        </div>
    )
}

export default Operations
