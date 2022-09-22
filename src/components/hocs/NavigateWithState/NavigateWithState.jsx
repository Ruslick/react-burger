import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function NavigateWithState(props) {
  const location = useLocation()
  return (
    <Navigate {...props} state={{from: location.pathname}}/>
  )
}

export default NavigateWithState