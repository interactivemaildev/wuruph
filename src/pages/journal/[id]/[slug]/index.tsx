import getArticle from 'src/services/articles/queries/getArticle'
import { staticArticles } from 'src/data/static'
export { default } from 'src/pages/about/[id]/[slug]/index'

export const getStaticPaths = async () => {
  const journalArticles = staticArticles.filter((a) => a.type === 'journal')
  const paths = journalArticles.map((a) => ({
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
