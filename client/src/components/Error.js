import React from 'react'
import NoDataSvg from 'assets/svg/error.svg'

function Error({ error }) {
    return (
        <div className='flex-1 flex justify-center items-center flex-col'>
            <img className='w-96' src={NoDataSvg} alt="No Data!" />
            <h1 className='text-4xl mt-6'>Error!</h1>
            <p className='text-sm text-gray-500'>{error.message || 'Something went wrong!'}</p>
        </div>
    )
}

export default Error
