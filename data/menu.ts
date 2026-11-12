import { Gender, ArticleType } from 'schemas'

export const menuData = [
  {
    title: 'shop',
    submenu: [Gender['MAN'], Gender['WOMAN']],
  },
  {
    title: ArticleType['ABOUT'],
  },
  {
    title: ArticleType['JOURNAL'],
  },
]