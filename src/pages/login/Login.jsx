import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, createTheme, Divider, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppTitle from '../../components/AppTitle'

function Login() {
  const [pseudo, setPseudo] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [voirMotDePasse, setVoirMotDePasse] = useState(false)
  const navigate = useNavigate()
  const theme = createTheme()

  const handlePseudoChange = (e) => {
    const v = e.target.value
    setPseudo(v)
  }

  const handleMotDePasseChange = (e) => {
    const v = e.target.value
    setMotDePasse(v)
  }

  const handleVoirMotDePasseChange = () => {
    setVoirMotDePasse((oldVoirMotDePasse) => (!oldVoirMotDePasse))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(pseudo, motDePasse)
  }

  const redirectToRegisterPage = (e) => {
    navigate('/creer')
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
          sx={{
            px: '20px',
            display: 'none',
            flexBasis: '64%',
            [theme.breakpoints.up('sm')]: {
              display: 'flex',
              flexDirection: 'column',
              justifyItems: 'start',
            },
          }}
        >
          <AppTitle disableGutter />
          <Typography
            maxWidth='324px'
            variant='body2'
            align='justify'
          >
            Une application sans but exacte. Developpée par des ecervelés, pour les ecervelés, sauf celui qui nous corrigera bien-sûr.
          </Typography>
        </Box>
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
              Se connecter
            </Typography>
          </Box>
          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={2}
          >
            <FormControl>
              <TextField
                value={pseudo}
                onChange={handlePseudoChange}
                variant='outlined'
                size='small'
                label='Identifiant'
                placeholder='JamesBond'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                type={voirMotDePasse ? 'text' : 'password'}
                value={motDePasse}
                onChange={handleMotDePasseChange}
                variant='outlined'
                size='small'
                label='Mot de passe'
                placeholder={"\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge='end'
                        disableFocusRipple
                        disableTouchRipple
                        disabled={!motDePasse.length > 0}
                        onClick={handleVoirMotDePasseChange}
                        sx={{
                          borderRadius: '4px'
                        }}
                      >
                        <Visibility sx={{ display: voirMotDePasse ? 'none' : 'block' }} />
                        <VisibilityOff sx={{ display: voirMotDePasse ? 'block' : 'none' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <Link
              href='/reinitialiser'
              underline='hover'
              align='right'
            >
              <Typography
                variant='body2'
                color={'primary'}
              >
                Mot de passe oublié ?
              </Typography>
            </Link>
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
                Connecter
              </Typography>
            </Button>
            <Divider />
            <Button
              fullWidth
              variant='outlined'
              onClick={(e) => redirectToRegisterPage(e)}
            >
              <Typography
                variant='button'
                fontWeight={700}
              >
                Creer un compte
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default Login