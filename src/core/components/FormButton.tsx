import React, { memo } from 'react'
import { Button, Tooltip } from '@mui/material'
import Link from 'next/link'
import { StyledButton } from 'src/styles/form'

interface Props {
  text: string
  variant?: 'contained' | 'outlined'
  marginX?: number
  icon?: React.ReactNode
  onClick?: (text?: string) => any
  href?: string
  shallow?: boolean
  disabled?: boolean
  tooltip?: string
}

interface PropsButton {
  text: string
  variant?: 'contained' | 'outlined'
  marginX?: number
  icon?: React.ReactNode
  onClick?: () => any
  component: any
  disabled?: boolean
  tooltip?: string
}

const ComponentButton = React.memo(function ComponentButton(props: PropsButton) {
  const { text, variant, icon, component, marginX, disabled, tooltip, onClick } = props
  return (
    <Tooltip
      title={tooltip}
      hidden={!!tooltip}
      placement="top"
      PopperProps={{
        disablePortal: true,
      }}
      arrow
    >
      <Button
        disableElevation
        variant={variant || 'contained'}
        color="primary"
        component={component}
        startIcon={icon}
        disabled={disabled}
        onClick={onClick ? onClick : () => null}
        sx={{
          marginX,
        }}
      >
        {text}
      </Button>
    </Tooltip>
  )
})

const FormButton: React.FunctionComponent<Props> = ({
  text,
  variant,
  marginX,
  icon,
  onClick,
  href,
  shallow,
  disabled,
  tooltip,
}: Props) => {
  return (
    <StyledButton>
      {href ? (
        <Link href={href} shallow={shallow} legacyBehavior>
          <a>
            <ComponentButton
              text={text}
              icon={icon}
              component="span"
              marginX={marginX}
              disabled={disabled}
              variant={variant}
            />
          </a>
        </Link>
      ) : (
        <ComponentButton
          text={text}
          icon={icon}
          component="button"
          marginX={marginX}
          disabled={disabled}
          tooltip={tooltip}
          onClick={onClick ? () => onClick(text) : () => null}
          variant={variant}
        />
      )}
    </StyledButton>
  )
}

FormButton.defaultProps = {
  icon: null,
  marginX: 0,
  shallow: false,
  disabled: false,
  tooltip: '',
  variant: 'contained',
}

export default memo(FormButton)
