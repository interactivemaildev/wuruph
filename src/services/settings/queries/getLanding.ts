import { staticLanding } from 'src/data/static'

export default async function getLanding({ slug }) {
  return staticLanding[slug] || ''
}
