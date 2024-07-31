import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, createTheme, Divider, FormControl, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AppTitle from '../../components/AppTitle'
import { useCookies } from 'react-cookie'
import { Logger } from '../../api/entities'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isInvalid, setInvalid] = useState(false)
  const navigate = useNavigate()
  const theme = createTheme()
  const [cookies, setCookie] = useCookies(['userId'])

  const handlePseudoChange = (e) => {
    const v = e.target.value
    setUsername(v)
  }

  const handleMotDePasseChange = (e) => {
    const v = e.target.value
    setPassword(v)
  }

  const handleVoirMotDePasseChange = () => {
    setShowPassword((oldVoirMotDePasse) => (!oldVoirMotDePasse))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setInvalid(false)
    const token = await Logger.post({ username, password })
      .then(r => { return r.data })
      .catch(e => { setInvalid(true) })
    if (!!token) {
      setCookie('userId', btoa(token.id), { path: '/' })
      navigate('/acceuil')
    }
  }

  const redirectToRegisterPage = (e) => {
    navigate('/creer')
  }

  const redirectToResetPage = (e) => {
    navigate('/reinitialiser')
  }

  return cookies.userId ? (<Navigate to={'/acceuil'} />) : (
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
      {isInvalid && (
        <Box
          py={1}
          border={'1px solid'}
          borderColor={'error.main'}
          borderRadius={1}
        >
          <Typography
            variant='subtitle2'
            align='center'
            color={'error'}
          >
            Identifiant ou Mot de passe invalide
          </Typography>
        </Box>
      )}
      <Box
        display={'flex'}
        flexDirection={'column'}
        gap={2}
      >
        <FormControl>
          <TextField
            value={username}
            onChange={handlePseudoChange}
            variant='outlined'
            size='small'
            label='Identifiant'
            placeholder='JamesBond'
            error={isInvalid}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleMotDePasseChange}
            variant='outlined'
            size='small'
            label='Mot de passe'
            placeholder={"\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF"}
            error={isInvalid}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge='end'
                    disableFocusRipple
                    disableTouchRipple
                    disabled={!password.length > 0}
                    onClick={handleVoirMotDePasseChange}
                    sx={{
                      borderRadius: '4px'
                    }}
                  >
                    <Visibility sx={{ display: showPassword ? 'none' : 'block' }} />
                    <VisibilityOff sx={{ display: showPassword ? 'block' : 'none' }} />
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
  )
}

export default Login