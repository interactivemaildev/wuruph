import React, { memo } from 'react'
import { Button } from '@mui/material'
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/router'
import { StyledFilterGender } from 'src/styles/filter'
import { Gender } from 'schemas'

interface Props {}

const FilterGender: React.FunctionComponent<Props> = () => {
  const router = useRouter()
  const { type, gender } = router.query
  const menuFilter = React.useMemo(() => {
    let array: string[] = []
    Object.keys(Gender).map((item) => {
      array.push(Gender[item])
    })
    array.push('all')
    return array
  }, [])
  const handleFilter = React.useCallback(async (gender: string, query: any) => {
    await router.push({
      pathname: router.pathname,
      query: { ...query, page: 0, gender },
    })
  }, [])
  return (
    <StyledFilterGender>
      {menuFilter.map((item, i) => (
        <Button
          key={i}
          variant="contained"
          disableElevation
          className={gender === item ? 'active' : ''}
          onClick={() => handleFilter(item, router.query)}
        >
          <ReactSVG
            beforeInjection={(svg) => {
              svg.classList.add('svg-icon')
              svg.setAttribute('style', `width: 27px; display: block;`)
            }}
            className="wrapper-svg"
            src={`/images/icons/${item}.svg`}
            wrapper="div"
          />
          <span>{item}</span>
        </Button>
      ))}
    </StyledFilterGender>
  )
}

FilterGender.defaultProps = {}

export default memo(FilterGender)
