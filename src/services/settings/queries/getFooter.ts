import { staticSettings } from 'src/data/static'
import _ from 'lodash'

export default async function getFooter() {
  return _.filter(staticSettings, (item) =>
    ['tagline', 'location', 'socmed'].includes(item.slug)
  )
}
