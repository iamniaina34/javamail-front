import { Box, Typography } from '@mui/material'
import React from 'react'

function AppTitle({ filled = false, disableGutter = false }) {
    return (
        <Box
            bgcolor={filled ? 'primary.main' : ''}
            sx={{
                px: disableGutter ? 0 : 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'center',
                gap: '4px',
                borderRadius: 1.5,
            }}
        >
            <Typography
                variant='h1'
                fontWeight={700}
                color={filled ? 'whitesmoke' : 'primary'}

            >
                {"T"}
            </Typography>
            <Box flex flexDirection='column'>
                <Typography
                    variant='h4'
                    fontWeight={700}
                    color={filled ? 'whitesmoke' : 'primary'}
                >
                    {"iny"}
                </Typography>
                <Typography
                    variant='h4'
                    fontWeight={700}
                    color={filled ? 'whitesmoke' : 'primary'}
                >
                    {"asker"}
                </Typography>
            </Box>
        </Box>
    )
}

export default AppTitle