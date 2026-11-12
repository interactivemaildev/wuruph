import { useState, useEffect, useRef } from 'react'

/**
 * Pengganti useQuery / usePaginatedQuery dari Blitz RPC untuk build static.
 * Memanggil fungsi query secara langsung dan mengelola loading state.
 */
export function useStaticQuery<TData, TParams = undefined>(
  queryFn: (params: TParams) => Promise<TData>,
  params: TParams,
  _options?: { suspense?: boolean }
) {
  const [data, setData] = useState<TData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // `params` is usually an inline object literal, so it is a new reference on
  // every render. Serialising it keeps the effect from re-running (and
  // re-rendering) forever.
  const paramsKey = JSON.stringify(params ?? null)
  const queryFnRef = useRef(queryFn)
  queryFnRef.current = queryFn

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    queryFnRef
      .current(params)
      .then((result) => {
        if (!cancelled) setData(result)
      })
      .catch((e) => {
        console.error('Static query error:', e)
        if (!cancelled) setData(null as unknown as TData)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  return [data, { isLoading }] as const
}
