import React, {useRef} from 'react'

const DateSelector = ({
    value,
    minValue,
    maxValue,
    onChange
}) => {
    const inputRef = useRef()

    return (
        <input
            ref={inputRef}
            type="date"
            value={value}
            min={minValue}
            max={maxValue}
            onChange={(event) => onChange(event.target.value)}
        />
    )
}

export default DateSelector