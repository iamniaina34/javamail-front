import { Box, Button, Container, createTheme, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const theme = createTheme()
  const navigate = useNavigate()
  const [account, setAccount] = useState({
    pseudo: '',
    email: '',
    motDePasse: ''
  })
  const [isEmailValid, setIsEmailValid] = useState(true)

  const handleAccountChange = (e) => {
    const p = e.target.id
    const v = e.target.value
    setAccount((old) => ({
      ...old,
      [p]: v
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(account)
  }

  const goBack = (e) => {
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
        [theme.breakpoints.down('md')]: {
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
            >
              Creer votre compte
            </Typography>
            <Typography
              variant='body2'
              align='justify'
            >
              Veuillez nous fournir un email afin de l'assigner à votre nouveau compte
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <FormControl>
              <TextField
                id='email'
                type='email'
                value={account.email}
                onChange={handleAccountChange}
                variant='outlined'
                size='small'
                label='Email'
                placeholder='abc@oij.xyz'
                error={!isEmailValid}
                helperText={!isEmailValid && 'Cet email est déjà assigné à un autre compte'}
                FormHelperTextProps={{
                  sx: {
                    mx: 0
                  }
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'row'}
            gap={2}
          >
            <Button
              fullWidth
              variant='outlined'
              onClick={(e) => goBack(e)}
            >
              <Typography
                variant='button'
                fontWeight={700}
              >
                Annuler
              </Typography>
            </Button>
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
                Suivant
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Register