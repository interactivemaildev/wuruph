import React from 'react'
import Image from 'next/image'
import { Box } from '@mui/material'

interface Props {
  src: string
  alt?: string
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  width?: number
  height?: number
  onClick?: () => void
}

/**
 * Image wrapper untuk static demo.
 * Jika image tidak ditemukan (404), render div kosong berwarna abu-abu
 * sebagai penggantinya.
 */
const StaticImage: React.FC<Props> = ({
  src,
  alt = 'Wuruph',
  className,
  priority = false,
  fill = false,
  sizes,
  width,
  height,
  onClick,
  ...rest
}) => {
  const [error, setError] = React.useState(false)

  if (error) {
    return (
      <Box
        className={className}
        sx={{
          bgcolor: '#e0e0e0',
          width: width || '100%',
          minHeight: height || 200,
          height: fill ? '100%' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      fill={fill}
      sizes={sizes}
      width={width}
      height={height}
      onClick={onClick}
      onError={() => setError(true)}
      {...rest}
    />
  )
}

export default StaticImage
