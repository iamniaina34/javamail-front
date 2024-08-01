import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Email, Registerer, User } from '../../api/entities';
import {
  Box, Button, FormControl, TextField, Typography, Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import OTPField from '../../components/OTPField'
import { HttpStatusCode } from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useCookies } from 'react-cookie';

function Register() {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    username: '',
    email: '',
    emailConfirmed: false,
    password: '',
    confirmPassword: '',
  });
  const [users, setUsers] = useState([])
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false)
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false)
  const [usernameHelperText, setUsernameHelperText] = useState('')
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const [emailHelperText, setEmailHelperText] = useState('');
  const emailField = createRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isPinSent, setIsPinSent] = useState(false);
  const [pinCode, setPinCode] = useState('')
  const [pinCodeError, setPinCodeError] = useState({ value: false, index: 0 })
  const [showPassword, setShowPassword] = useState(false)
  const [cookies, setCookie] = useCookies(['userId'])
  const [step, setStep] = useState(1);
  const handleAccountChange = (e) => {
    const p = e.target.id;
    const v = e.target.value;
    setAccount((old) => ({
      ...old,
      [p]: v
    }));
  };

  const handlePinCodeChange = (value = '') => {
    setPinCode(value)
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault();

    if (account.email.length <= 0) {
      setIsEmailValid(false);
      setEmailHelperText("Veuillez remplir ce champ");
      return;
    }

    const email = {
      to: account.email,
      subject: 'Confirmer votre email',
      text: '',
    };

    setIsLoading(true);
    setIsPinSent(false);

    const owningUser = users.filter((user) => (user.email.match(account.email)))
    if (owningUser.length > 0) {
      setIsEmailValid(false);
      setEmailHelperText("Email déjà assigné à un autre utilisateur");
      setIsLoading(false);
    } else {
      setIsEmailValid(true);
      setEmailHelperText("");
      Email.sendPinCode(email)
        .then(r => {
          setIsLoading(false);
          setIsPinSent(true);
        })
        .catch(e => {
          setIsLoading(false);
          console.error(e);
        });
    }
  };

  const handleSubmitPinCode = () => {
    setPinCodeError({ value: false, index: 0 })
    if (pinCode === null || pinCode.length !== 6) {
      setPinCodeError({
        value: true,
        index: pinCode.length
      })
      return
    } else {
      const confirmationPin = {
        from: account.email,
        pinCode: pinCode,
      }
      Email.confirmPinCode(confirmationPin)
        .then(r => {
          if (r.status === HttpStatusCode.Ok) {
            handleCloseDialog()
            setAccount(old => ({
              ...old,
              emailConfirmed: true,
            }))
            setStep(2);
          }
        })
        .catch(e => {
          if (e.response.status === HttpStatusCode.Unauthorized) {
            console.log('Unauthorized')
          } else {
            console.log('Internal server error')
          }
        })
    }
  }

  const handleCloseDialog = () => {
    setIsPinSent(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsUsernameInvalid(false)
    setUsernameHelperText("")
    setIsPasswordInvalid(false)
    setPasswordHelperText("")

    const user = {
      username: account.username,
      email: account.email,
      password: account.confirmPassword,
    }
    const existingUsername = users.filter(existingUser => user.username.match(existingUser.username)).at(0)

    if (existingUsername) {
      setIsUsernameInvalid(true)
      setUsernameHelperText("Identifiant déjà assigné à un autre utilisateur")
    } else if (!user.password.match(account.password)) {
      setIsPasswordInvalid(true)
      setPasswordHelperText("La confirmation ne correspond pas au mot de passe")
    } else {
      Registerer.post(user)
        .then(r => {
          console.log(user)
          setCookie('userId', btoa(r.data.id))
        })
        .then(r => {
          navigate('/')
        })
        .catch(e => console.log(e))
    }
  };

  const goBack = (e) => {
    navigate(-1);
  };

  useEffect(() => {
    User.index()
      .then(r => setUsers(r.data))
      .catch(e => console.log(e))
    emailField.current.focus();
  }, []);

  return (
    <Box
      component={'form'}
      method='post'
      onSubmit={step === 1 ? handleSubmitEmail : handleRegister}
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
          {step === 1 ? 'Creer votre compte' : 'Encore un peu'}
        </Typography>
        <Typography
          variant='body2'
          align='justify'
        >
          {step === 1
            ? "Veuillez nous fournir un email afin de l'assigner à votre nouveau compte"
            : "Veuillez compléter votre profil avec un nom d'utilisateur et un mot de passe"}
        </Typography>
      </Box>
      {step === 1 && (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
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
              placeholder='email@exemple.com'
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
      )}
      {step === 2 && (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
          <FormControl>
            <TextField
              required
              error={isUsernameInvalid}
              helperText={usernameHelperText}
              id='username'
              value={account.username}
              onChange={handleAccountChange}
              variant='outlined'
              size='small'
              label='Identifiant'
            />
          </FormControl>
          <FormControl>
            <TextField
              required
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={account.password}
              onChange={handleAccountChange}
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
                      disabled={!account.password.length > 0}
                      onClick={e => setShowPassword(old => (!old))}
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
          <FormControl>
            <TextField
              required
              id='confirmPassword'
              type='password'
              error={isPasswordInvalid}
              helperText={passwordHelperText}
              value={account.confirmPassword}
              onChange={handleAccountChange}
              variant='outlined'
              size='small'
              label='Confirmer votre mot de passe'
              placeholder={"\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF\u25CF"}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
        </Box>
      )}
      <Box display={'flex'} flexDirection={'row'} gap={2}>
        <Button fullWidth variant='outlined' onClick={(e) => goBack(e)}>
          <Typography variant='button' fontWeight={700}>Annuler</Typography>
        </Button>
        <Button type='submit' variant='contained' fullWidth disableElevation>
          <Typography variant='button' fontWeight={700}>
            {step === 1 ? 'Suivant' : 'S\'inscrire'}
          </Typography>
        </Button>
      </Box>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Dialog
        open={isPinSent}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog();
          }
        }}
      >
        <DialogTitle>
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            Nous avons envoyer un code PIN vers votre email. Veuillez nous fournir ce code sur ce champs
          </DialogContentText>
          <OTPField onChange={handlePinCodeChange} error={pinCodeError} />
        </DialogContent>
        <DialogActions>
          <Button
            disableElevation
            variant='text'
            onClick={handleCloseDialog}
            color="primary"
          >
            <Typography
              fontWeight={600}
              variant='button'
            >
              Annuler
            </Typography>
          </Button>
          <Button
            disabled={pinCode === null || pinCode.length !== 6}
            disableElevation
            variant='contained'
            onClick={handleSubmitPinCode}
            color="primary"
          >
            <Typography
              fontWeight={600}
              variant='button'
            >
              Confirmer
            </Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Register;
