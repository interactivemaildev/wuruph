import React, { memo } from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { StyledFilterCategories } from 'src/styles/filter'
import getCategories from 'src/services/categories/queries/getCategories'
import Title from 'src/core/components/Title'
import { StyledSkeleton } from 'src/styles/skeleton'

interface Props {}

const FilterCategories: React.FunctionComponent<Props> = () => {
  const router = useRouter()
  const { categories } = router.query
  const categoriesArray = React.useMemo(
    () => (categories ? (categories as string).split('+') : []),
    [categories]
  )
  const [data, { isLoading }] = useStaticQuery(getCategories, undefined)
  const handleChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, query: any, categories: any) => {
      let array = _.cloneDeep(categories)
      if (event.target.checked) {
        array.push(event.target.name)
      } else {
        _.remove(array, (item) => item === event.target.name)
      }
      const uniq = _.uniq(array)
      const params = uniq.join('+')

      await router.push({
        pathname: router.pathname,
        query: { ...query, page: 0, categories: params },
      })
    },
    []
  )
  return (
    <StyledFilterCategories>
      <Title text="Categories" distance="0" />
      <FormGroup>
        {isLoading
          ? [...new Array(6)].map((_v, i) => (
              <StyledSkeleton
                key={i}
                className="text-categories"
                variant="rounded"
                width="100%"
                height={16}
              />
            ))
          : data?.map((item, i) => {
              const checked = _.includes(categoriesArray, item.slug)
              return (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(e) => handleChange(e, router.query, categoriesArray)}
                      name={item.slug}
                    />
                  }
                  label={item.title}
                />
              )
            })}
      </FormGroup>
    </StyledFilterCategories>
  )
}

FilterCategories.defaultProps = {}

export default memo(FilterCategories)
