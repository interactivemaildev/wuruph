import React from 'react'
import { Box, Snackbar, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const SnackbarContext = React.createContext({
  showSnackbar: (text: string): any => ({
    text,
  }),
})

interface Props {
  children: React.ReactNode
}

const SnackbarProvider: React.FunctionComponent<Props> = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const handleClose = React.useCallback((_event: any, reason: any) => {
    if (reason == 'clickaway') {
      return
    }
    setOpen(false)
  }, [])
  const showSnackbar = React.useCallback((text: string) => {
    setOpen(true)
    setText(text)
  }, [])
  const action = (
    <React.Fragment>
      <IconButton size="small" color="inherit" onClick={() => setOpen(false)}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      <Box minHeight="100vh">{children}</Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        message={text}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />
    </SnackbarContext.Provider>
  )
}

export default React.memo(SnackbarProvider)
