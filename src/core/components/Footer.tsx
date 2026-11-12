import React, { memo } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import _ from 'lodash'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import Layout from 'src/core/components/Layout'
import Title from 'src/core/components/Title'
import { StyledFooter } from 'src/styles/footer'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import getFooter from 'src/services/settings/queries/getFooter'
import getMarketplaces from 'src/services/settings/queries/getMarketplaces'
import { subMenuShop } from 'src/core/components/Header'
import { convertText } from 'src/core/components/Signature'
import FormButton from 'src/core/components/FormButton'
import { StyledSkeleton } from 'src/styles/skeleton'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { GoodsType } from 'schemas'

interface Props {}

const Footer: React.FunctionComponent<Props> = () => {
  const { downMd } = React.useContext(BreakpointsContext)
  const [data, { isLoading: footerLoading }] = useStaticQuery(getFooter, undefined)
  const [marketplaces, { isLoading: mpLoading }] = useStaticQuery(getMarketplaces, undefined)
  const tagline = React.useMemo(() => _.find(data, { slug: 'tagline' })?.value1, [data])
  const location = React.useMemo(() => _.find(data, { slug: 'location' })?.value1, [data])
  const socmed = React.useMemo(() => _.filter(data, { slug: 'socmed' }), [data])
  return (
    <StyledFooter>
      <Layout paddingY={0}>
        <Grid container spacing={3} flexWrap={downMd ? 'wrap' : `nowrap`} justifyContent="center">
          <Grid item xs={12} sm={downMd ? 5 : 2.5}>
            <Box marginBottom={2}>
              <Title text="Never Miss a Beat" size="small" />
            </Box>
            {!footerLoading && (
              <FadeInVisible distance="20%">
                <Typography className="text" maxWidth={downMd ? '100%' : 160}>
                  {tagline}
                </Typography>
              </FadeInVisible>
            )}
          </Grid>
          <Grid item xs={12} sm={downMd ? 5 : 2.5}>
            <Box marginBottom={2}>
              <Title text="Location" size="small" />
            </Box>
            <FadeInVisible distance="20%">
              {!footerLoading && <Typography className="text">{location}</Typography>}
            </FadeInVisible>
          </Grid>
          <Grid item xs={6} sm={2.5}>
            <Box marginBottom={2}>
              <Title text="Shop" size="small" />
            </Box>
            {subMenuShop.map((item, i) => (
              <FadeInVisible key={i}>
                <Typography className="text">
                  <Link href={item === GoodsType['CUSTOM'] ? `/custom` : `/shop/${item}`}>
                    {convertText(item)}
                  </Link>
                </Typography>
              </FadeInVisible>
            ))}
          </Grid>
          <Grid item xs={6} sm={2.5}>
            <Box marginBottom={2}>
              <Title text="Social Media" size="small" />
            </Box>
            {footerLoading
              ? [...new Array(3)].map((_v, i) => (
                  <StyledSkeleton
                    key={i}
                    className="text-footer"
                    variant="rounded"
                    width="90%"
                    height={16}
                  />
                ))
              : socmed.length &&
                socmed.map((item, i) => (
                  <FadeInVisible key={i}>
                    <Typography className="text">
                      <Link href={item.value2 || '#'} target="_blank">
                        {convertText(item.value1 || '')}
                      </Link>
                    </Typography>
                  </FadeInVisible>
                ))}
          </Grid>
          <Grid item xs={8} sm={2.5}>
            <Box marginBottom={2}>
              <Title text="Available On" size="small" />
            </Box>
            {mpLoading
              ? [...new Array(3)].map((_v, i) => (
                  <StyledSkeleton
                    key={i}
                    className="text-footer"
                    variant="rounded"
                    width="90%"
                    height={16}
                  />
                ))
              : marketplaces?.length &&
                marketplaces.map((item, i) => (
                  <FadeInVisible key={i} distance="20%">
                    <FormButton text={item.title} href={item.defaultUrl} />
                  </FadeInVisible>
                ))}
          </Grid>
        </Grid>
      </Layout>
      <Typography className="copy">
        {`Copyright ${new Date().getFullYear()} - Wuruph - All Rights Reserved`}
        <br />
        {`Powered By BSWR`}
      </Typography>
    </StyledFooter>
  )
}

Footer.defaultProps = {}

export default memo(Footer)
