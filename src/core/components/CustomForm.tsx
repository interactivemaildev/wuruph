import React, { memo } from 'react'
import { Snackbar, Alert, Box, Grid, InputLabel, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Reaptcha from 'reaptcha'
import { ReasonPhrases } from 'http-status-codes'
import { StyledFormCustom } from 'src/styles/app'
import FormikTextField from 'src/core/components/FormikTextField'
import FormButton from 'src/core/components/FormButton'
import { FormikContext } from 'src/contexts/formik'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {}

const CustomForm: React.FunctionComponent<Props> = () => {
  const { downMd } = React.useContext(BreakpointsContext)
  const captcha = React.useRef<Reaptcha>(null)
  const [token, setToken] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<'error' | 'success'>('error')
  const onVerify = React.useCallback((recaptchaResponse: string) => {
    setToken(recaptchaResponse)
  }, [])
  const validate = (values: any) => {
    const errors: any = {}
    if (!values.email) errors.email = 'Required'
    if (!values.name) errors.name = 'Required'
    if (!values.address) errors.address = 'Required'
    if (!values.phone) errors.phone = 'Required'
    if (!values.product) errors.product = 'Required'
    return errors
  }
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      address: '',
      phone: '',
      product: '',
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true)
      if (!token) {
        setStatus('error')
        setLoading(false)
        return
      }

      const controller = new AbortController()
      try {
        const response = await fetch(`/api/mailer`, {
          method: 'POST',
          body: JSON.stringify({ ...values, token }),
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
        })
        const v = await response.json()
        if (v.message === 'OK') {
          resetForm()
          setToken('')
          setStatus('success')
          await captcha?.current?.reset()
        }
      } catch (err: any) {
        console.log('Getting Error', err)
        setStatus('error')
      }
      setOpen(true)
      setLoading(false)
    },
  })
  return (
    <StyledFormCustom height="100%">
      {status === 'error' ? (
        <FormikContext.Provider
          value={{
            formik,
          }}
        >
          <Box marginY={3}>
            <Grid container columnSpacing={downMd ? 2 : 4} rowSpacing={1}>
              {['Email', 'Name', 'Address', 'Phone'].map((item, i) => (
                <Grid key={i} item xs={6}>
                  <InputLabel>
                    {item} <span>*</span>
                  </InputLabel>
                  <FormikTextField label={item} />
                </Grid>
              ))}
              <Grid item xs={12}>
                <InputLabel>
                  The product you want <span>*</span>
                </InputLabel>
                <FormikTextField multiline rows={downMd ? 4 : 8} label="Product" />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center" marginTop={2}>
            <Box marginBottom={4}>
              <Reaptcha
                ref={captcha}
                sitekey="6LfcYvEkAAAAAH17IknTaiSHHmVKRJCqtYW77Uez"
                onVerify={onVerify}
              />
            </Box>
            <FormButton
              onClick={() => formik.handleSubmit()}
              disabled={loading}
              text="Send Email"
            />
          </Box>
        </FormikContext.Provider>
      ) : (
        <Box height="100%" display="flex" alignItems="center" paddingY={8} justifyContent="center">
          <Typography textAlign="center">Your message has been successfully sent.</Typography>
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setOpen(false)}
      >
        <Alert severity={status ? status : 'error'} variant="filled">
          {status == 'success' ? 'Thank You.' : 'Sorry,something went wrong.'}
        </Alert>
      </Snackbar>
    </StyledFormCustom>
  )
}

CustomForm.defaultProps = {}

export default memo(CustomForm)
