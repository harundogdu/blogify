import React from 'react'
import SyncLoader from "react-spinners/SyncLoader";

function Loading() {
    return (
        <div className='flex-1 flex justify-center items-center'>
            <SyncLoader color={'#D53F8C'} loading={true} />
        </div>
    )
}

export default Loading
