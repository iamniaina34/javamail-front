import { Subject, Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, Container, createTheme, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Email } from '../../api/entities'

function Register() {
  const theme = createTheme()
  const navigate = useNavigate()
  const [account, setAccount] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [emailHelperText, setEmailHelperText] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const emailField = createRef()
  const toogleShowPassword = (e) => {
    setShowPassword(old => (!old))
  }

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
    if (account.email.length <= 0) {
      setIsEmailValid(false)
      setEmailHelperText("Veuillez remplir ce champs")
      return
    } else {
      const email = {
        to: account.email,
        subject: 'Confirmer votre email',
        text: '',
      }
      Email.sendPinCode(email)
    }
  }

  const goBack = (e) => {
    navigate(-1)
  }

  useEffect(() => {
    emailField.current.focus()
  }, [])

  return (
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
            inputRef={emailField}
            type='email'
            value={account.email}
            onChange={handleAccountChange}
            variant='outlined'
            size='small'
            label='Email'
            placeholder='abc@oij.xyz'
            error={!isEmailValid}
            helperText={!isEmailValid && emailHelperText}
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
  )
}

export default Register