import React from 'react'
import Order from './Order/Order'
import OrderInfo from './OrderInfo/OrderInfo'


function BurgerConstructor() {
  return (
    <div style={{padding: '0 var(--x4)'}}>
      <Order />
      <OrderInfo />

    </div>
  )
}

export default BurgerConstructor