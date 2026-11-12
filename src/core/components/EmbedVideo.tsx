import React, { memo } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { StyledVideo } from 'src/styles/article'
import { BreakpointsContext } from 'src/contexts/breakpoints'

interface Props {
  embedLink?: string
}

function youtubeParser(url: string) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7]?.length == 11 ? match[7] : ''
}

const EmbedVideo: React.FunctionComponent<Props> = ({ embedLink }: Props) => {
  const { downSm, downMd } = React.useContext(BreakpointsContext)
  const opts: YouTubeProps['opts'] = {
    height: downMd ? (downSm ? '230' : '380') : '480',
    width: '100%',
  }
  return (
    <>
      {!!embedLink && (
        <StyledVideo>
          <YouTube className="iframe" videoId={youtubeParser(embedLink)} opts={opts} />
        </StyledVideo>
      )}
    </>
  )
}

EmbedVideo.defaultProps = {
  embedLink: '',
}

export default memo(EmbedVideo)
