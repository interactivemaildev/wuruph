import React, { memo } from 'react'
import { Typography } from '@mui/material'
import { StyledTitle } from 'src/styles/app'
import FormButton from 'src/core/components/FormButton'
import FadeInVisible from 'src/core/animations/FadeInVisible'

interface Props {
  text: string
  withButton?: boolean
  buttonText?: string
  size?: 'small' | 'large'
  link?: string
  distance?: string
}

const Title: React.FunctionComponent<Props> = ({
  text,
  withButton,
  buttonText,
  size,
  link,
  distance,
}: Props) => {
  return (
    <FadeInVisible distance={distance || '100%'}>
      <StyledTitle className="title-component">
        <Typography className={size}>{text}</Typography>
        {withButton && link && <FormButton text={buttonText || 'Shop Now'} href={link} />}
      </StyledTitle>
    </FadeInVisible>
  )
}

Title.defaultProps = {
  withButton: false,
  buttonText: 'Shop Now',
  size: 'large',
}

export default memo(Title)
