import { staticVideos } from 'src/data/static'

export default async function getVideos({ skip = 0, take = 30 }) {
  const count = staticVideos.length
  const videos = staticVideos.slice(skip, skip + take)
  return {
    videos,
    pageCount: Math.ceil(count / take),
    from: skip + 1,
    to: Math.min(skip + take, count),
    count,
  }
}
