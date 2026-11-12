import React, { memo } from 'react'
import _ from 'lodash'
import { Box, Grid, Typography } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { StyledAdvantages } from 'src/styles/app'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {}

const data = [
  {
    title: 'Worldwide Shipping',
    icon: '/images/icons/worldwide.svg',
  },
  {
    title: '1 Year Product Warranty',
    icon: '/images/icons/warranty.svg',
  },
  {
    title: 'Fast Shipping For You',
    icon: '/images/icons/fast.svg',
  },
  {
    title: 'Flexible & Secure Payment',
    icon: '/images/icons/secure.svg',
  },
]

const Icon = memo(function Arrow({ title, icon }: any) {
  const { downMd } = React.useContext(BreakpointsContext)
  return (
    <Box className="item-icon">
      <ReactSVG
        beforeInjection={(svg) => {
          svg.classList.add(`svg-icon`)
          svg.setAttribute('style', `width: ${downMd ? 65 : 85}px; display: block;`)
        }}
        className="wrapper-svg"
        src={icon}
        wrapper="div"
      />
      <Typography>{title}</Typography>
    </Box>
  )
})

const Advantages: React.FunctionComponent<Props> = () => {
  const { downMd } = React.useContext(BreakpointsContext)
  return (
    <StyledAdvantages>
      <Grid container spacing={downMd ? 0 : 2}>
        {data &&
          data.map((item, i) => (
            <Grid key={i} item xs={6} md={3}>
              <Icon title={item.title} icon={item.icon} />
            </Grid>
          ))}
      </Grid>
    </StyledAdvantages>
  )
}

Advantages.defaultProps = {}

export default memo(Advantages)
