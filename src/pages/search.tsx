import React from 'react'
import type { NextPage } from 'next'
import _ from 'lodash'
import { Divider } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { useRouter } from 'next/router'
import Layout from 'src/core/components/Layout'
import Recommendation from 'src/core/components/Recommendation'
import getProducts from 'src/services/products/queries/getProducts'
import ShopMain from 'src/core/components/ShopMain'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import useRecently from 'src/hooks/useRecently'
import { arrayGender } from 'src/core/components/Header'
import SeoGlobal from 'src/core/components/seo/global'
import { staticLanding } from 'src/data/static'

interface Props {
  landing: string
}

const ITEMS_PER_PAGE = 9

const Search: NextPage<Props> = ({ landing }: Props) => {
  const router = useRouter()
  const { recentlyData, isLoadingRecently } = useRecently()
  const { q, gender, categories } = router.query
  const page = Number(router.query.page) || 0
  const categoriesArray = React.useMemo(
    () => (categories ? (categories as string).split('+') : []),
    [categories]
  )
  const addParams = React.useMemo(() => {
    let params = {}
    if (_.includes(arrayGender, gender as string)) {
      params['gender'] = _.upperCase(gender as string)
    }
    if (q) {
      params['search'] = q as string
    }
    return params
  }, [gender, q])
  const [data, { isLoading }] = useStaticQuery(
    getProducts,
    {
      where: categoriesArray?.length
        ? { categories: categoriesArray, ...addParams }
        : { ...addParams },
      orderBy: null,
      skip: ITEMS_PER_PAGE * page,
      take: ITEMS_PER_PAGE,
    }
  )
  const links = React.useMemo(() => {
    return [
      {
        title: 'Shop',
        url: null,
      },
      {
        title: 'Search',
        url: null,
      },
    ]
  }, [])
  const handlePagination = React.useCallback(async (page: number, query: any) => {
    let queryParams = { ...router.query, page }
    if (query.categories) {
      queryParams['categories'] = query.categories
    }
    await router.push({
      pathname: router.pathname,
      query: queryParams,
    })
  }, [])
  return (
    <React.Fragment>
      <SeoGlobal />
      <ShopMain
        loading={isLoading}
        data={data?.products || []}
        count={data?.count || 0}
        handlePagination={handlePagination}
        itemPerPage={ITEMS_PER_PAGE}
        landingImg={landing}
        links={links}
        landingTitle={`Search`}
        page={page}
        withGenderFilter
        withCategoriesFilter
      />
      <Divider />
      <Layout paddingY={0}>
        <Recommendation />
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

export const getStaticProps = async () => {
  const landing = staticLanding['others']
  return {
    props: { landing },
    revalidate: 60,
  }
}

export default Search
