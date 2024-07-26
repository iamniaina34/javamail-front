import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import '../../css/minimalPulse.css';
import { useCookies } from 'react-cookie';

const generatePulses = (count) => {
    return Array.from({ length: count }, (_, index) => {
        const size = Math.random() * 50 + 20;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 5;

        return (
            <div
                key={index}
                className="pulse"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `${left}vw`,
                    top: `${top}vh`,
                    animationDelay: `${delay}s`,
                }}
            />
        );
    });
};

function Home() {

    const [cookies, setCookie, removeCookie] = useCookies(['usernameCookie'])

    const handleLogout = () => {
        const username = atob(cookies.usernameCookie)

        if (!!username) {
            removeCookie('usernameCookie')
        }
    }

    return (
        <Box
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
        >
            <Typography
                variant='button'
                fontWeight={700}
                letterSpacing={8}
                fontSize={32}
            >
                {`Bonjour, ${atob(cookies.usernameCookie)}!`}
            </Typography>
            <Button
                variant='text'
                disableElevation
                onClick={handleLogout}
            >
                <Typography
                    variant='button'
                    fontWeight={700}
                    letterSpacing={4}
                    fontSize={16}
                >
                    {`Se déconnecter ?`}
                </Typography>
            </Button>
        </Box>
    );
}

export default Home;
