import React, { memo } from 'react'
import { Box, Divider } from '@mui/material'
import { StyledFilter } from 'src/styles/filter'
import FilterGender from 'src/core/components/FilterGender'
import FilterCategories from 'src/core/components/FilterCategories'

interface Props {
  withGenderFilter?: boolean
  withCategoriesFilter?: boolean
}

const Filter: React.FunctionComponent<Props> = ({
  withGenderFilter,
  withCategoriesFilter,
}: Props) => {
  return (
    <StyledFilter>
      {withGenderFilter && (
        <>
          <FilterGender />
          {withCategoriesFilter && <Divider />}
        </>
      )}
      {withCategoriesFilter && (
        <Box paddingTop={withGenderFilter ? 4 : 0}>
          <FilterCategories />
        </Box>
      )}
    </StyledFilter>
  )
}

Filter.defaultProps = {
  withGenderFilter: false,
  withCategoriesFilter: false,
}

export default memo(Filter)
