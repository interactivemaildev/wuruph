import React, { memo } from 'react'
import { StyledTextField } from 'src/styles/form'

interface Props {
  placeholder: string
  disabled?: boolean
  iconStart?: React.ReactElement
  iconEnd?: React.ReactElement
  onKeyDown?: (e: any) => void
}

const FormTextField: React.FunctionComponent<Props> = ({
  placeholder,
  disabled,
  onKeyDown,
}: Props) => {
  return (
    <StyledTextField
      id="textfield"
      hiddenLabel
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={onKeyDown ? onKeyDown : () => null}
      autoComplete="off"
      variant="outlined"
    />
  )
}

FormTextField.defaultProps = {
  disabled: false,
}

export default memo(FormTextField)
