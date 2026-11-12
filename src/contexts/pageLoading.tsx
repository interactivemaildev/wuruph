import React from 'react'

interface Data {
  pageLoading: boolean
}

export const PageLoadingContext = React.createContext<Data>({
  pageLoading: false,
})
