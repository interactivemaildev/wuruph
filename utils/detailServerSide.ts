import { NextPageContext } from 'next'
import { getCookie, setCookie } from 'cookies-next'
import _ from 'lodash'
import MobileDetect from "mobile-detect";
import getProduct from 'src/services/products/queries/getProduct'
import schema from 'schemas'

export const detailServerSide = async (context: NextPageContext) => {
  const { query, req, res } = context
  const md = new MobileDetect(req?.headers["user-agent"] as string);

  const { id } = query
  const recently_cookies = getCookie('recently', { req, res })
  const recently = recently_cookies ? (recently_cookies as string).split(',') : []
  if (recently.length === 4) recently.shift()
  if (id) recently.push(id as string)
  const update_recently = _.reverse(_.uniq(_.reverse([...recently])));
  console.log('recently', update_recently)
  setCookie('recently', update_recently.join(','), { req, res, maxAge: 604800 })
  const data: schema['schemas']['DetailProduct'] = await getProduct({ productId: parseInt(id as string) })

  return {
    props: {
      initial: data,
      isMobile: Boolean(md.mobile()),
    },
  }
}
