import React from 'react'
import type { NextPage } from 'next'
import _ from 'lodash'
import { Box, Divider, Typography } from '@mui/material'
import Layout from 'src/core/components/Layout'
import Landing from 'src/core/components/Landing'
import ArticleReleated from 'src/core/components/ArticleReleated'
import useRecently from 'src/hooks/useRecently'
import { StyledArticle } from 'src/styles/article'
import getArticle from 'src/services/articles/queries/getArticle'
import { staticArticles } from 'src/data/static'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import SeoGlobal from 'src/core/components/seo/global'
import ShareButton from 'src/core/components/Share'
import schema from 'schemas'

interface Props {
  initial: schema['schemas']['Article']
  landing: string
  isMobile: boolean
}

const AboutDetail: NextPage<Props> = ({ initial, landing, isMobile }: Props) => {
  console.log('initial', initial)
  const { recentlyData, isLoadingRecently } = useRecently()
  const links = React.useMemo(() => {
    return [
      {
        title: _.capitalize(initial.type || ''),
        url: null,
      },
    ]
  }, [])
  return (
    <React.Fragment>
      <SeoGlobal
        data={{
          title: initial?.title || '',
          img: initial?.img || '',
        }}
      />
      <Layout paddingY={0}>
        <Landing links={links} img={landing} title={_.capitalize(initial.type || '')} />
      </Layout>
      <Layout paddingY={0}>
        <StyledArticle>
          <Typography className="detail-title">{initial.title}</Typography>
          <div className="text" dangerouslySetInnerHTML={{ __html: initial.description || '' }} />
          <Box marginBottom={4}>
            <ShareButton title={initial.title || ''} isMobile={isMobile} />
          </Box>
        </StyledArticle>
      </Layout>
      <Divider />
      <Layout paddingY={0}>
        <ArticleReleated type={initial.type || 'about'} />
      </Layout>
      {!!recentlyData?.length && !isLoadingRecently && (
        <>
          <Divider />
          <Layout paddingY={0}>
            <RecentlyViewed data={recentlyData} />
          </Layout>
        </>
      )}
    </React.Fragment>
  )
}

export const getStaticPaths = async () => {
  const aboutArticles = staticArticles.filter((a) => a.type === 'about')
  const paths = aboutArticles.map((a) => ({
    params: { id: String(a.id), slug: a.slug || '' },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params }: any) => {
  const articleId = parseInt(params?.id as string)
  const data = await getArticle({ articleId })
  return {
    props: {
      initial: data,
      landing: '',
      isMobile: false,
    },
    revalidate: 60,
  }
}

export default AboutDetail
