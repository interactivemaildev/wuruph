import React, { memo } from 'react'
import Image from 'next/image'
import {
  Grow,
  Paper,
  Popper,
  Box,
  ClickAwayListener,
  MenuList,
  MenuItem,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { StyledBottomNav } from 'src/styles/bottomNav'
import { menuData } from 'data/menu'
import { SubMenu } from 'src/core/components/Header'

interface Props {}

const IconMenu = React.memo(function IconMenu({ icon }: any) {
  return (
    <Box className="icon">
      <Image
        src={`/images/icons/${icon}.png`}
        className="selected"
        alt="Wuruph"
        priority
        fill
        sizes="100%"
      />
      <Image
        src={`/images/icons/${icon}_grey.png`}
        className="grey"
        alt="Wuruph"
        priority
        fill
        sizes="100%"
      />
    </Box>
  )
})

const BottomNav: React.FunctionComponent<Props> = () => {
  const router = useRouter()
  const { asPath } = router
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const handleToggle = React.useCallback(() => {
    setOpen(!open)
  }, [open])
  const handleClose = React.useCallback(
    (event: Event | React.SyntheticEvent) => {
      if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
        return
      }

      setOpen(false)
    },
    [anchorRef]
  )
  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }
  const value = React.useMemo(() => {
    const parts = asPath.split('/')
    const newPath = parts[1] ? parts[1] : ''
    if (!newPath) return 0
    if (newPath === 'custom') return 1
    const index = _.findIndex(menuData, (item) => item.title === newPath)
    return index + 1
  }, [router])
  return (
    <StyledBottomNav>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_event, newValue) => {
          if (newValue !== 1) {
            router.push(`/${newValue ? menuData[newValue - 1]?.title : ''}`)
          }
        }}
      >
        <BottomNavigationAction label={`Home`} icon={<IconMenu icon="home" />} />
        {menuData.map((v, i) => (
          <BottomNavigationAction
            ref={i === 0 ? anchorRef : null}
            key={i}
            label={v.title}
            icon={<IconMenu icon={v.title} />}
            onClick={i === 0 ? handleToggle : () => null}
          />
        ))}
      </BottomNavigation>
      <Popper open={open} anchorEl={anchorRef.current} placement="top" transition disablePortal>
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'center bottom',
            }}
          >
            <Paper elevation={0} className="popper">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <SubMenu handleClose={handleClose} />
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </StyledBottomNav>
  )
}

export default memo(BottomNav)
