export default interface components {
  schemas: {
    Category: {
      id?: number
      title?: string
      slug?: string
    }
    Marketplace: {
      title?: string
      url?: string
    }
    Product: {
      id?: number | null
      title?: string | null
      slug?: string | null
      gender?: string | null
      img?: string | null
      price?: number | null
      exchangeRate?: number | null
      goodsType?: string | null
      label?: string | null
    }
    DetailProduct: {
      id?: number | null
      title?: string | null
      slug?: string | null
      gender?: string | null
      img?: string | null
      files?: string[] | null
      price?: number | null
      exchangeRate?: number | null
      goodsType?: string | null
      description?: string | null
      marketplaces?: components['schemas']['Marketplace'][]
      orders?: components['schemas']['Marketplace'][]
      materials: string | null
      size: string | null
      categories: components['schemas']['Category'][]
    }
    Article: {
      id?: number | null
      title?: string | null
      slug?: string | null
      img?: string | null
      type?: string | null
      description?: string | null
    }
    Video: {
      id?: number
      title?: string
      img?: string
      youtube?: string
    }
    Settings: {
      tagline?: string
      location?: string
      whatsapp?: string
    }
    SocialMedia: {
      id?: number
      title?: string
      url?: string
      number?: string
      visibility?: number
    }
    User: {
      id?: number
      name?: string
      email?: string
      password?: string
      role?: string
      createdAt?: string
    }
  }
}

export enum Gender {
  MAN = 'man',
  WOMAN = 'woman',
}

export enum GoodsType {
  GOODS = 'goods',
  OTHERS = 'others',
  CUSTOM = 'custom',
}

export enum Status {
  PENDING = 'pending',
  PUBLISHED = 'published',
}

export enum Label {
  BEST = 'best seller',
  NEW = 'new release',
  OUTSTOCK = 'out of stock',
}

export enum ArticleType {
  JOURNAL = 'journal',
  ABOUT = 'about',
}
