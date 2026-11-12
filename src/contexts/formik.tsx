import React from 'react'

interface Data {
  formik: any
}

export const FormikContext = React.createContext<Data>({
  formik: null,
})
