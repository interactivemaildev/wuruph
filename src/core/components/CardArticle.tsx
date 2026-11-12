import React, { memo } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import _ from 'lodash'
import { StyledCardProduct } from 'src/styles/product'
import schema from 'schemas'

interface Props {
  data: schema['schemas']['Article']
  truncate?: number
  truncateDesc?: number
  isHorizontal?: boolean
}

const CardArticle: React.FunctionComponent<Props> = ({
  data,
  truncate,
  truncateDesc,
  isHorizontal,
}: Props) => {
  console.log('data', data)
  return (
    <StyledCardProduct className={isHorizontal ? 'horizontal' : ''}>
      <Link href={`/${data.type}/${data.id}/${data.slug}`} legacyBehavior passHref>
        <Button
          className="img"
          component="a"
          sx={{
            paddingTop: isHorizontal ? '30%' : '65%',
          }}
        >
          <Image
            src={`/images/article_images/post_${data.id}/${data.img}`}
            priority
            alt="Wuruph"
            fill
            sizes="100%"
          />
        </Button>
      </Link>
      <Box className="box-content justify-start">
        <Typography className="title">
          <Link href={`/${data.type}/${data.id}/${data.slug}`}>
            {_.truncate(data.title || '', { length: truncate })}
          </Link>
        </Typography>
        <Typography className="desc">
          <Link href={`/${data.type}/${data.id}/${data.slug}`}>
            {_.truncate(data.description || '', { length: truncateDesc })}
          </Link>
        </Typography>
      </Box>
    </StyledCardProduct>
  )
}

CardArticle.defaultProps = {
  truncate: 56,
  truncateDesc: 130,
  isHorizontal: false,
}

export default memo(CardArticle)
