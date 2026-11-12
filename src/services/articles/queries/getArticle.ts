import { staticArticles } from 'src/data/static'

export default async function getArticle({ articleId }) {
  const article = staticArticles.find((item) => item.id === articleId)
  return {
    id: article?.id || 0,
    title: article?.title || '',
    slug: article?.slug || '',
    img: `https://wuruph.com/images/article_images/post_${article?.id}/${article?.img}` || '',
    type: article?.type || '',
    description: article?.description || '',
  }
}