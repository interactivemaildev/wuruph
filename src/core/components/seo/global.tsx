import React, { memo } from 'react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

interface Data {
  title?: string
  img?: string
  siteName?: string
}

interface Props {
  data?: Data
}

const SeoGlobal: React.FunctionComponent<Props> = ({ data }: Props) => {
  const router = useRouter()
  const { asPath } = router
  return (
    <NextSeo
      title={data?.title || 'We Take Pride In Leather'}
      description="Handcrafted in Surabaya, Leather Goods for Pride and Quality"
      canonical={`https://wuruph.com${asPath}`}
      openGraph={{
        url: `https://wuruph.com${asPath}`,
        title: data?.title || 'We Take Pride In Leather',
        description: 'Handcrafted in Surabaya, Leather Goods for Pride and Quality',
        type: 'website',
        images: [
          {
            url: data?.img || 'https://wuruph.com/images/logo/wuruph.jpg',
            secureUrl: data?.img || 'https://wuruph.com/images/logo/wuruph.jpg',
            width: 320,
            height: 220,
            alt: 'Wuruph',
            type: 'image/jpg',
          },
        ],
        site_name: data?.siteName || 'Wuruph',
      }}
      twitter={{
        handle: '@',
        site: '@',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          property: 'keywords',
          content:
            'profesional leather, leather, handcrafted surabaya, surabaya, handcrafted, wuruph, leather goods, 100% handcrafted, custom orders leather handcrafted, mass production leather handcrafted, handmade, wuruph leather, kerajinan kulit',
        },
      ]}
    />
  )
}

SeoGlobal.defaultProps = {}

export default memo(SeoGlobal)
