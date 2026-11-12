import { staticVideos } from 'src/data/static'

interface GetVideoArgs {
  videoId: number
}

export default async function getVideo({ videoId }: GetVideoArgs) {
  const video = staticVideos.find((item) => item.id === videoId)
  return {
    id: video?.id || 0,
    title: video?.title || '',
    img: video?.img || '',
    youtube: video?.youtube || '',
  }
}