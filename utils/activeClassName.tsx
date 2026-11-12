import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const fixedAsPath = React.useMemo(() => {
    const parts = asPath.split('/')
    const newPath = parts[2] ? parts[2].split('?')[0] : ''
    return `/${newPath}`
  }, [asPath])

  const propsHref = React.useMemo(() => {
    const parts = props.href.split('/')
    return `/${parts[2] ? parts[2] : ''}`
  }, [props.href])

  const className =
    fixedAsPath === propsHref || fixedAsPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link href={''} {...props} passHref legacyBehavior>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}

ActiveLink.propTypes = {
  activeClassName: PropTypes.string.isRequired,
}

export default ActiveLink
