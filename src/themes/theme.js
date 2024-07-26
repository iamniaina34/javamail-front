import { createTheme } from "@mui/material"
export   const defaultTheme = createTheme({
    palette: {
        mode: 'light',
    },
  })

export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#6666ff'
      },
      text: {
        primary: '#cccccc'
      },
      background: {
        default: '#121221',
        paper: '#131322',
      },
    },
  })
