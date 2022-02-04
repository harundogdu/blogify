import React from 'react'

function Error({ error }) {
    return (
        <div>
            <h1>Error!</h1>
            <p>{error.message}</p>
        </div>
    )
}

export default Error
