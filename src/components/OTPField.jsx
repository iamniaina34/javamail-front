import React, { useState, useRef, useEffect } from 'react'
import { TextField, Box } from '@mui/material'

export default function OTPField({ length = 6, error = { value: false, index: 0 }, onChange = () => { } }) {
    const [otp, setOtp] = useState(Array(length).fill(''))
    const inputs = useRef([])

    const handleShift = (i, v = 1) => {
        inputs.current[i + v].focus()
    }

    const handleChange = (e, index) => {
        const { value } = e.target
        const newOtp = [...otp]

        if (/[^0-9]/.test(value)) return
        newOtp[index] = value
        setOtp(newOtp)
        onChange(newOtp.join(''))
        if (value !== '' && index < length - 1) handleShift(index)
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && otp[index] === '') {
            if (index > 0) {
                handleShift(index, -1)
            }
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const paste = e.clipboardData.getData('text')

        if (paste.match(/[^0-9]/) || paste.length !== length) return
        const newOtp = paste.slice(0, length).split('')
        setOtp([...newOtp, ...Array(length - newOtp.length).fill('')])
        onChange(newOtp.join(''))

        const lastFilledIndex = newOtp.length - 1
        inputs.current[lastFilledIndex].focus()
    }

    useEffect(() => inputs.current[0].focus(), [])

    return (
        <Box display='flex' justifyContent='center'>
            {otp.map((digit, index) => (
                <TextField
                    key={index}
                    value={digit}
                    error={error.value && error.index <= index}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: 'center',
                            fontWeight: 700
                        }
                    }}
                    inputRef={(ref) => (inputs.current[index] = ref)}
                    variant='outlined'
                    margin='normal'
                    sx={{ width: '3rem', marginRight: '0.5rem' }}
                />
            ))}
        </Box>
    )
}