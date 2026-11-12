import { staticArticles } from 'src/data/static'

export default async function getArticles({ where, skip = 0, take = 30 }) {
  if (!where) return null
  const filtered = staticArticles.filter((item) => item.type === where.type)
  const count = filtered.length
  const articles = filtered.slice(skip, skip + take)
  return {
    articles,
    pageCount: Math.ceil(count / take),
    from: skip + 1,
    to: Math.min(skip + take, count),
    count,
  }
}
