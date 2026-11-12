import { staticProducts, EXCHANGE_RATE } from 'src/data/static'

export default async function getProduct({ productId }) {
  const product = staticProducts.find((item) => item.id === productId)
  const marketplaces = [
    { title: 'Tokopedia', url: 'https://tokopedia.com/wuruph' },
    { title: 'Shopee', url: 'https://shopee.co.id/wuruph' },
    { title: 'Lazada', url: 'https://lazada.com/wuruph' },
  ]
  const orders = [
    { title: 'Whatsapp', url: 'https://wa.me/628123456789' },
    { title: 'Email', url: 'mailto:hello@wuruph.com' },
  ]
  const files = [`/images/product_images/post_${productId}/${product?.img}`]

  return {
    id: product?.id || 0,
    title: product?.title || '',
    slug: product?.slug || '',
    gender: product?.gender || '',
    goodsType: product?.goodsType || '',
    description: product?.description || '',
    img: `https://wuruph.com/images/product_images/post_${product?.id}/${product?.img}` || '',
    marketplaces,
    orders,
    label: product?.label || '',
    materials: product?.materials || '',
    size: product?.size || '',
    categories: product?.categories || [],
    price: product?.price || 0,
    exchangeRate: EXCHANGE_RATE,
    files,
  }
}
