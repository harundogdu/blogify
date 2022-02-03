import React from 'react'

function Footer() {
    return (
        <div className='flex justify-center items-center p-4 text-sm shadow-inner flex-shrink-0'>
            created by Harun Doğdu | All Rights Reserved © {new Date().getFullYear()}
        </div>
    )
}

export default Footer
