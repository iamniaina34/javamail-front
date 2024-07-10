import { Box, Button, Container, createTheme, Divider, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Reset() {
  const [email, setEmail] = useState('')
  const theme = createTheme()
  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    const v = e.target.value
    setEmail(v)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email)
  }

  const handleCancel = (e) => {
    navigate(-1)
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        height: '100vh',
        m: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          height: 'fit-content',
          my: 4,
        }
      }}
    >
      <Box
        sx={{
          m: 'auto',
          width: 'fit-content',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 4,
          p: 1,
          [theme.breakpoints.up('lg')]: {
            borderColor: 'InactiveBorder',
            borderRadius: 4,
          },
        }}
      >
        <Box
          component={'form'}
          method='post'
          onSubmit={handleSubmit}
          sx={{
            minWidth: '324px',
            maxWidth: '360px',
            my: 2,
            px: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant='h4'
              noWrap
              fontWeight={600}
              align='center'
              color='primary'
              gutterBottom
            >
              Recupération
            </Typography>
            <Typography
              variant='body2'
              align='justify'
            >
              Veuiller nous fournir votre email afin de pouvoir recuperer votre compte.
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                type='email'
                value={email}
                onChange={handleEmailChange}
                variant='outlined'
                size='small'
                label='Email'
                placeholder='abc@oij.xyz'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <Button
              type='submit'
              variant='contained'
              fullWidth
              disableElevation
            >
              <Typography
                variant='button'
                fontWeight={700}
              >
                Confirmer
              </Typography>
            </Button>
            <Divider />
            <Button
              fullWidth
              variant='outlined'
              onClick={(e) => handleCancel(e)}
            >
              <Typography
                variant='button'
                fontWeight={700}
              >
                Annuler
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Reset