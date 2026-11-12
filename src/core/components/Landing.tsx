import React, { memo } from 'react'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'
import StaticImage from 'src/components/StaticImage'
import { StyledLanding, StyledBreadcrumbs } from 'src/styles/app'
import FadeInVisible from 'src/core/animations/FadeInVisible'

interface BreadcrumbsData {
  title: string
  url: string | null
}

interface Props {
  img?: string
  title?: string
  links: BreadcrumbsData[]
  isArticle?: boolean
}

const Landing: React.FunctionComponent<Props> = ({ img, title, links, isArticle }: Props) => {
  return (
    <StyledLanding className={`landing ${isArticle ? 'article' : ''}`}>
      <FadeInVisible>
        <StyledBreadcrumbs>
          {links.map((item, i) => {
            const { title, url } = item
            return (
              <Typography key={i} color={links.length === i + 1 ? '#1565c0' : 'grey.500'}>
                {!!url ? (
                  <Link key={i} href="/">
                    {title}
                  </Link>
                ) : (
                  title
                )}
              </Typography>
            )
          })}
        </StyledBreadcrumbs>
      </FadeInVisible>
      {!!img && (
        <FadeInVisible distance="20%">
          <Box className="image">
            <Typography>{title}</Typography>
            <StaticImage alt="Wuruph" src={`/images/landing/${img}`} fill priority={true} sizes="100%" />
          </Box>
        </FadeInVisible>
      )}
    </StyledLanding>
  )
}

Landing.defaultProps = {
  isArticle: false,
}

export default memo(Landing)
