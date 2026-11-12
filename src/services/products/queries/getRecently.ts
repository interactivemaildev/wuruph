import _ from 'lodash'
import { staticProducts, EXCHANGE_RATE } from 'src/data/static'

interface Props {
  productIds: string
}

export default async function getRecently({ productIds }: Props) {
  if (!productIds) return []
  const recently = String(productIds)
    .split(',')
    .filter((id) => id !== '')
  const products = staticProducts.filter((item) => recently.includes(item.id.toString()))
  const items = products.sort((a, b) => {
    return recently.indexOf(a.id.toString()) - recently.indexOf(b.id.toString())
  })
  return items.map((item) => ({ ...item, exchangeRate: EXCHANGE_RATE }))
}