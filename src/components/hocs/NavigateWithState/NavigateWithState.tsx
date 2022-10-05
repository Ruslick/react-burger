import React, { FC } from 'react'
import { Navigate, NavigateProps, useLocation } from 'react-router-dom'

const NavigateWithState: FC<NavigateProps> = (props) => {
  const location = useLocation()
  return (
    <Navigate {...props} state={{from: location.pathname}}/>
  )
}

export default NavigateWithState