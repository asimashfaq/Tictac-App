import React from 'react'
import { useScreenWidth } from './useScreenWidth'

export const withHooksHOC = (Component: any) => {
  return (props: any) => {
    const screenWidth = useScreenWidth()

    return <Component width={screenWidth} {...props} />
  }
}
