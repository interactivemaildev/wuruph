import React, { memo } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { useNProgress } from '@tanem/react-nprogress'

const Progress: React.FC<{ isAnimating: boolean }> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 99999,
        opacity: isFinished ? 0 : 1,
        pointerEvents: 'none',
        transition: `opacity ${animationDuration}ms linear 0.3s`,
      }}
    >
      <LinearProgress
        value={progress * 100}
        variant="determinate"
        sx={{
          transitionDuration: `${animationDuration}ms`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#000',
          },
        }}
      />
    </Box>
  )
}

export default memo(Progress)
