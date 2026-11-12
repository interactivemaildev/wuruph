import React, { memo } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  FacebookIcon,
} from 'react-share'
import { StyledShare, heightButton } from 'src/styles/app'

interface Props {
  title: string
  isMobile: boolean
}

const ShareButton: React.FunctionComponent<Props> = ({ title, isMobile }: Props) => {
  const URL = React.useMemo(
    () => (typeof window !== 'undefined' ? window.location.href : '#'),
    [title]
  )
  const handleSharing = React.useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator
          .share({ url: URL, title })
          .then(() => console.log('Hooray! Your content was shared to tha world'))
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`)
      }
    } else {
      console.log('Web share is currently not supported on this browser. Please provide a callback')
    }
  }, [URL, title])
  return (
    <StyledShare>
      <Typography>{`Share`}</Typography>
      <WhatsappShareButton url={URL} title={title}>
        <WhatsappIcon size={heightButton} />
      </WhatsappShareButton>
      <TwitterShareButton url={URL} title={title}>
        <TwitterIcon size={heightButton} />
      </TwitterShareButton>
      <FacebookShareButton url={URL} title={title}>
        <FacebookIcon size={heightButton} />
      </FacebookShareButton>
      {isMobile && (
        <Box className="custom-button">
          <button className="img" onClick={handleSharing}>
            <Image
              alt={title}
              src={`/images/icons/share.png`}
              priority={true}
              width={heightButton}
              height={heightButton}
            />
          </button>
        </Box>
      )}
    </StyledShare>
  )
}

ShareButton.defaultProps = {}

export default memo(ShareButton)
