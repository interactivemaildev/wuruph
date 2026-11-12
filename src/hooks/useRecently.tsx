import { getCookie } from 'cookies-next'
import { useStaticQuery } from 'src/hooks/useStaticQuery'
import getRecently from 'src/services/products/queries/getRecently'

const useRecently = () => {
  const recently = getCookie('recently')
  const [data, { isLoading }] = useStaticQuery(
    getRecently,
    {
      productIds: recently as string,
    }
  )
  return { recentlyData: data, isLoadingRecently: isLoading }
}

export default useRecently
