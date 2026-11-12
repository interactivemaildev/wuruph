import React, { memo } from 'react'
import { FormikContext } from 'src/contexts/formik'
import { StyledTextField } from 'src/styles/form'
import _ from 'lodash'

interface Props {
  id?: string
  label: string
  fieldType?: string
  multiline?: boolean
  rows?: number
  disabled?: boolean
  startAdornment?: React.ReactElement | null
  endAdornment?: React.ReactElement | null
  isNumber?: boolean
  onKeyDown?: (e: any) => void
}

export function currencyConvert(value: string) {
  const number = value.replace(/\D+/g, '')
  const currency = new Intl.NumberFormat('id-ID').format(parseInt(number))
  const isNan = _.isNaN(parseInt(currency.replace(/\./g, '')))
  return !isNan ? currency : 0
}

const FormikTextField: React.FunctionComponent<Props> = ({
  id,
  label,
  fieldType,
  multiline,
  rows,
  disabled,
  startAdornment,
  endAdornment,
  isNumber,
  onKeyDown,
}: Props) => {
  const { formik } = React.useContext(FormikContext)
  const lowercaseLabel = _.snakeCase(label)
  return (
    <StyledTextField
      id={id ? id : lowercaseLabel}
      // placeholder={label}
      hiddenLabel
      fullWidth
      multiline={multiline}
      minRows={rows}
      autoComplete="off"
      size="small"
      disabled={disabled}
      error={formik.errors[id ? id : lowercaseLabel] ? true : false}
      value={formik.values[id ? id : lowercaseLabel]}
      helperText={
        formik.errors[id ? id : lowercaseLabel] ? formik.errors[id ? id : lowercaseLabel] : ''
      }
      onChange={
        isNumber
          ? (event: React.ChangeEvent<HTMLInputElement>) => {
              event.preventDefault()
              const value = event.target.value
              formik.setFieldValue(id, currencyConvert(value))
            }
          : formik.handleChange
      }
      onKeyDown={onKeyDown ? onKeyDown : () => null}
      type={fieldType}
      variant="outlined"
      InputProps={{
        startAdornment,
        endAdornment,
      }}
      sx={{
        marginBottom: 2,
      }}
    />
  )
}

FormikTextField.defaultProps = {
  fieldType: 'text',
  multiline: false,
  rows: 4,
  disabled: false,
  startAdornment: null,
  endAdornment: null,
  isNumber: false,
}

export default memo(FormikTextField)
