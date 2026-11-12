import React from 'react'

interface Data {
  update: (id: any) => void
  withRemove?: boolean
  removeEvent?: (id: any) => void
}

export const GlobalContext = React.createContext<Data>({
  update: () => null,
  withRemove: false,
  removeEvent: () => null,
})
