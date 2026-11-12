import getProduct from 'src/services/products/queries/getProduct'
import { staticProducts } from 'src/data/static'
import { GoodsType } from 'schemas'
export { default } from 'src/pages/shop/[type]/[id]/[slug]/index'

export const getStaticPaths = async () => {
  const customProducts = staticProducts.filter((p) => p.goodsType === GoodsType.CUSTOM)
  const paths = customProducts.map((p) => ({
    params: { id: String(p.id), slug: p.slug || '' },
  }))
  return { paths, fallback: 'blocking' }
}

export const getStaticProps = async ({ params }: any) => {
  const productId = parseInt(params?.id as string)
  const initial = await getProduct({ productId })
  return {
    props: { initial, isMobile: false },
    revalidate: 60,
  }
}
