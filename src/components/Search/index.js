import React from 'react'

import './index.scoped.scss'

const Search = ({
    onChange,
    value,
    placeholder = 'Type here',
    ...props
}) => {
    return (
        <input
            className="search"
            placeholder={placeholder}
            value={value}
            onChange={(ev) => onChange(ev.target.value)}
            {...props}

        />
    )
}

export default Search