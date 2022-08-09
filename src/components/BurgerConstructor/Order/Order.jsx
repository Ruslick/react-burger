import React from 'react'
import styles from './Order.module.css'
import OrderIngridient from './OrderIngridient/OrderIngridient'
import data from '../../../utils/data'




function Order() {

  
  return (
    <section className={`${styles.order} scroll`} style={{height: window.innerHeight/2}}>
      {data.map((ingridient, index, array) => {
        const {name, price, image, _id} = ingridient
        // return  ? 
        //  ?
        if (index === 0) {
          return <OrderIngridient
            key={_id}
            text={name}
            price={price}
            thumbnail={image}
            type={'top'}
          />
        } else if (index === array.length - 1) {
          return <OrderIngridient 
            key={_id}
            text={name}
            price={price}
            thumbnail={image}
            type={'bottom'}
          />
        } else {
          return <OrderIngridient 
            key={_id}
            text={name}
            price={price}
            thumbnail={image}
            isLocked={true}
          />
        }
        
        
      })}
    </section>
  )
}

export default Order

