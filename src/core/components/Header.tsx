import React, { memo } from 'react'
import {
  Box,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Grow,
  Typography,
  IconButton,
} from '@mui/material'
import Link from 'next/link'
import { ReactSVG } from 'react-svg'
import { useRouter } from 'next/router'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { StyledAppBarHeader, StyledBoxHeader, StyledPaper } from 'src/styles/header'
import Layout from 'src/core/components/Layout'
import Search from 'src/core/components/Search'
import { convertText } from 'src/core/components/Signature'
import { menuData } from 'data/menu'
import { BreakpointsContext } from 'src/contexts/breakpoints'
import { Gender } from 'schemas'

interface Props {}

export const subMenuShop = [Gender['MAN'], Gender['WOMAN'], 'others', 'custom']
export const arrayGender = [Gender['MAN'], Gender['WOMAN']]

export const SubMenu = memo(function SubMenu({ handleClose }: any) {
  return (
    <>
      {subMenuShop.map((item, i) => {
        return (
          <Link
            key={i}
            href={item === 'custom' ? '/custom' : `/shop/${item}`}
            legacyBehavior
            passHref
          >
            <MenuItem onClick={handleClose} component="a">
              {convertText(item)}
            </MenuItem>
          </Link>
        )
      })}
    </>
  )
})

const Header: React.FunctionComponent<Props> = () => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null)
  const router = useRouter()
  const { downMd, downSm } = React.useContext(BreakpointsContext)
  const [show, setShow] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const handleShowHide = React.useCallback(() => {
    setShow(!show)
  }, [show])
  const currentUrl = React.useMemo(() => {
    const slash = router.asPath.split('/')
    const qMark = slash[1]?.split('?')
    const parent = qMark ? qMark[0] : ''
    if (parent === 'video') return 'journal'
    if (parent === 'custom') return 'shop'
    return parent
  }, [router])
  const handleToggle = React.useCallback(() => {
    setOpen(!open)
  }, [open])
  const handleClose = React.useCallback(
    (event: Event | React.SyntheticEvent) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return
      setOpen(false)
    },
    [anchorRef]
  )

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  const logo = React.useMemo(() => {
    return (
      <Link href="/" className="logo">
        <ReactSVG
          beforeInjection={(svg) => {
            svg.classList.add('svg-icon')
            svg.setAttribute('style', `width: auto; height: ${downMd ? 50 : 68}px; display: block;`)
          }}
          className="wrapper-logo-svg"
          src={`/images/logo/wuruph-logo.svg`}
          wrapper="div"
        />
      </Link>
    )
  }, [downMd])
  return (
    <React.Fragment>
      <StyledAppBarHeader elevation={0}>
        <StyledBoxHeader>
          <Layout paddingY={0}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              {logo}
              <Box className={`menu ${show ? 'show' : ''}`}>
                {downMd && (
                  <Box className="header-mobile">
                    {logo}
                    <IconButton onClick={handleShowHide}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                )}
                {menuData.map((item, i) => {
                  const isShop = i !== 0
                  if (isShop) {
                    return (
                      <Link
                        key={i}
                        href={`/${item.title}`}
                        className={currentUrl === item.title ? 'selected' : ''}
                        onClick={handleShowHide}
                      >
                        {item.title}
                      </Link>
                    )
                  } else {
                    return (
                      <React.Fragment key={i}>
                        <Typography
                          ref={anchorRef}
                          className={currentUrl === item.title ? 'selected' : ''}
                          onClick={downMd ? () => null : handleToggle}
                        >
                          {item.title}
                          {!!item.submenu && <ExpandMoreIcon />}
                        </Typography>
                        {!!item.submenu && downMd && (
                          <Box className="submenu">
                            <SubMenu handleClose={handleShowHide} />
                          </Box>
                        )}
                      </React.Fragment>
                    )
                  }
                })}
              </Box>
              <Box display="flex" alignItems="center">
                <Search />
                {!downSm && downMd && (
                  <IconButton onClick={handleShowHide}>
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Layout>
          <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: 'left top' }}>
                <StyledPaper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList onKeyDown={handleListKeyDown} component="div">
                      <SubMenu handleClose={handleClose} />
                    </MenuList>
                  </ClickAwayListener>
                </StyledPaper>
              </Grow>
            )}
          </Popper>
        </StyledBoxHeader>
      </StyledAppBarHeader>
    </React.Fragment>
  )
}

Header.defaultProps = {}

export default memo(Header)
