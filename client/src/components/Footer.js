import React from 'react'

function Footer() {
    return (
        <div className='flex justify-center items-center p-6 text-xs md:text-sm flex-shrink-0 bg-white'>
            created by Harun Doğdu | All Rights Reserved © {new Date().getFullYear()}
        </div>
    )
}

export default Footer
