import React, { memo } from 'react'
import _ from 'lodash'
import { Box, Grid } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { StyledInner } from 'src/styles/app'
import Title from 'src/core/components/Title'
import CardArticle from 'src/core/components/CardArticle'
import getArticles from 'src/services/articles/queries/getArticles'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {
  type: string
}

const ITEMS_PER_PAGE = 3

const ArticleReleated: React.FunctionComponent<Props> = ({ type }: Props) => {
  const { downMd } = React.useContext(BreakpointsContext)
  const [data] = useStaticQuery(
    getArticles,
    {
      where: { type },
      skip: ITEMS_PER_PAGE * 0,
      take: ITEMS_PER_PAGE,
    }
  )
  return (
    <StyledInner paddingY={downMd ? 4 : 8}>
      <Box marginBottom={3}>
        <Title text="Read Releated" />
      </Box>
      <Grid container spacing={3}>
        {!!data &&
          data.articles.map((item, i) => (
            <Grid key={i} item sm={4}>
              <CardArticle truncateDesc={130} data={item} />
            </Grid>
          ))}
      </Grid>
    </StyledInner>
  )
}

ArticleReleated.defaultProps = {}

export default memo(ArticleReleated)
