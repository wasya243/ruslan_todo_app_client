import React from 'react'

const AddButton = ({
    onAdd,
    text = 'Add item',
    ...props
}) => {
    return (
        <button
            onClick={onAdd}
            {...props}
        >
            {text}
        </button>
    )
}

export default AddButton