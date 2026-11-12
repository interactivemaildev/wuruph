import React from 'react'
import type { NextPage } from 'next'
import _ from 'lodash'
import { Divider } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import { useRouter } from 'next/router'
import Layout from 'src/core/components/Layout'
import Recommendation from 'src/core/components/Recommendation'
import getProducts from 'src/services/products/queries/getProducts'
import { convertText } from 'src/core/components/Signature'
import ShopMain from 'src/core/components/ShopMain'
import RecentlyViewed from 'src/core/components/RecentlyViewed'
import useRecently from 'src/hooks/useRecently'
import { arrayGender, subMenuShop } from 'src/core/components/Header'
import { Gender, GoodsType } from 'schemas'
import SeoGlobal from 'src/core/components/seo/global'
import { staticLanding } from 'src/data/static'

interface Props {
  landing: string
}

const ITEMS_PER_PAGE = 9

const Shop: NextPage<Props> = ({ landing }: Props) => {
  const router = useRouter()
  const { recentlyData, isLoadingRecently } = useRecently()
  const { type, categories } = router.query
  const page = Number(router.query.page) || 0
  const categoriesArray = React.useMemo(
    () => (categories && _.includes(arrayGender, type) ? (categories as string).split('+') : []),
    [categories, type, arrayGender]
  )
  const addParams = React.useMemo(() => {
    if (_.includes(arrayGender, type)) {
      return { gender: _.upperCase(type as string), goodsType: GoodsType['GOODS'] }
    }
    let params = { goodsType: GoodsType['OTHERS'] }
    if (_.includes(arrayGender, router.query.gender)) {
      params['gender'] = _.upperCase(router.query.gender as string)
    }
    return type ? params : null
  }, [type, router.query.gender])
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
        title: convertText(type as string),
        url: null,
      },
    ]
  }, [type])
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
      <SeoGlobal
        data={{
          siteName: type as string,
          title: `Wuruph | ${_.capitalize(type as string) || ''}${
            categoriesArray?.length ? ` - ${_.capitalize(categoriesArray.join(', '))}` : ''
          }`,
        }}
      />
      <ShopMain
        loading={isLoading}
        data={data?.products || []}
        count={data?.count || 0}
        handlePagination={handlePagination}
        itemPerPage={ITEMS_PER_PAGE}
        landingImg={landing}
        links={links}
        landingTitle={convertText(type as string)}
        page={page}
        withGenderFilter={type === GoodsType['OTHERS']}
        withCategoriesFilter={_.includes(arrayGender, type)}
      />
      {_.includes(arrayGender, type) ? (
        <>
          <Divider />
          <Layout paddingY={0}>
            <Recommendation
              type={subMenuShop[2]}
              title={convertText(subMenuShop[2] || '')}
              withButton
            />
          </Layout>
        </>
      ) : (
        <>
          <Divider />
          <Layout paddingY={0}>
            <Recommendation type={Gender['MAN']} title={_.capitalize(Gender['MAN'])} withButton />
          </Layout>
          <Divider />
          <Layout paddingY={0}>
            <Recommendation
              type={Gender['WOMAN']}
              title={_.capitalize(Gender['WOMAN'])}
              withButton
            />
          </Layout>
        </>
      )}
      <Divider />
      <Layout paddingY={0}>
        <Recommendation type={type as string} />
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
  const paths = subMenuShop.map((type) => ({ params: { type } }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params }: any) => {
  const type = params?.type as string
  const landing = staticLanding[type] || ''
  return {
    props: { landing },
    revalidate: 60,
  }
}

export default Shop
