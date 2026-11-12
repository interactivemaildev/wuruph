import _ from 'lodash'
import { staticProducts, EXCHANGE_RATE } from 'src/data/static'

export default async function getProducts({ where, orderBy, skip = 0, take = 30 }) {
  let filtered = [...staticProducts]

  if (where?.search) {
    const q = (where.search as string).toLowerCase()
    filtered = filtered.filter((item) => (item.title || '').toLowerCase().includes(q))
  }

  if (where?.goodsType) {
    filtered = filtered.filter((item) => item.goodsType === where.goodsType)
  }

  if (where?.gender) {
    filtered = filtered.filter(
      (item) => item.gender === where.gender || item.gender === null
    )
  }

  if (where?.categories?.length) {
    const cats = where.categories
    filtered = filtered.filter((item) =>
      (item.categories || []).some((cat) => cats.includes(cat.slug))
    )
  }

  const count = filtered.length
  const products = filtered.slice(skip, skip + take).map((item) => ({
    ...item,
    exchangeRate: EXCHANGE_RATE,
  }))

  return {
    products,
    pageCount: Math.ceil(count / take),
    from: skip + 1,
    to: Math.min(skip + take, count),
    count,
  }
}
