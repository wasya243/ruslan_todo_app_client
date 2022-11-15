import React from 'react'

const RemoveButton = ({
    ...props
}) => {
    return (
        <button
            {...props}
        >
            X
        </button>
    )
}

export default RemoveButton