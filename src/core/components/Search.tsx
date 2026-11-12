import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { StyledBoxSearch } from 'src/styles/search'
import FormTextField from 'src/core/components/FormTextField'
import { PageLoadingContext } from 'src/contexts/pageLoading'

interface Props {
  className?: string
}

const Search: React.FunctionComponent<Props> = ({ className }: Props) => {
  const router = useRouter()
  const { pageLoading } = React.useContext(PageLoadingContext)
  const handleSearch = React.useCallback(async (e: any) => {
    const value = e.target.value
    const key = e.key
    if (key === 'Enter' && value) {
      const validate_value = value ? (value as string).replace(/[^0-9a-z]/gi, ' ') : ''
      await router.push(
        `/search/?q=${validate_value}&page=0`,
        `/search/?q=${validate_value}&page=0`
      )
    }
  }, [])
  return (
    <StyledBoxSearch className={className}>
      <FormTextField
        placeholder="Search For Product"
        disabled={pageLoading}
        onKeyDown={handleSearch}
      />
    </StyledBoxSearch>
  )
}

Search.defaultProps = {
  className: '',
}

export default memo(Search)
