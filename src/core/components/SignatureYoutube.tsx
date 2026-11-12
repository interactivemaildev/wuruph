import React, { memo } from 'react'
import _ from 'lodash'
import { Box, Grid, Typography } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { StyledSignature } from 'src/styles/app'
import Title from 'src/core/components/Title'
import CardProduct from 'src/core/components/CardProduct'
import FormButton from 'src/core/components/FormButton'
import getVideos from 'src/services/videos/queries/getVideos'
import { StyledSkeleton } from 'src/styles/skeleton'
import FadeInVisible from 'src/core/animations/FadeInVisible'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {}

const ITEMS_PER_PAGE = 2

const SignatureYoutube: React.FunctionComponent<Props> = () => {
  const { downMd } = React.useContext(BreakpointsContext)
  const [data, { isLoading }] = useStaticQuery(
    getVideos,
    {
      skip: ITEMS_PER_PAGE * 0,
      take: ITEMS_PER_PAGE,
    }
  )
  return (
    <StyledSignature className="video">
      <Box marginBottom={3}>
        <Title text="Youtube" withButton buttonText="See All" link="/journal" />
      </Box>
      <FadeInVisible distance="20%">
        <Grid container spacing={downMd ? 2 : 3}>
          {isLoading ? (
            [...new Array(2)].map((_v, i) => (
              <Grid key={i} item xs={6}>
                <StyledSkeleton variant="rounded" width="100%" height={downMd ? 200 : 260} />
                <StyledSkeleton className="text" variant="rounded" width="100%" height={18} />
              </Grid>
            ))
          ) : data?.videos?.length ? (
            data.videos.map((item, i) => (
              <Grid key={i} item xs={6}>
                <CardProduct
                  imagePath={`/images/videos`}
                  truncate={60}
                  data={item}
                  isVideo={true}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography align="center" paddingY={8} color="grey.500">
                Coming Soon
              </Typography>
            </Grid>
          )}
        </Grid>
      </FadeInVisible>
      <Box marginTop={4} marginBottom={downMd ? 0 : 4} display="flex" justifyContent="center">
        <FadeInVisible>
          <FormButton text="Subscribe" href="#" />
        </FadeInVisible>
      </Box>
    </StyledSignature>
  )
}

SignatureYoutube.defaultProps = {}

export default memo(SignatureYoutube)
