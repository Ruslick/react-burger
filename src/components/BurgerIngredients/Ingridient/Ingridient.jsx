import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './Ingridient.module.css'
import PropTypes from 'prop-types';


function Ingridient({data, count, ...props}) {

  return (
    
    <li className={styles.item}>
      <div className={styles.counter}>
        {count ? <Counter count={count} size="default" /> : null}
      </div>
      <img src={data.image} alt={data.name} className={styles.image}/>
      <div className={styles.price}>
        <p className='text text_type_digits-default'>{data.price + '\u00A0'}</p>
        <CurrencyIcon />
      </div>
      

      <p className='text text_type_main-small'>{data.name}</p>

    </li>
  )
}


// проверка типов ингридиента
Ingridient.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    bun: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  })
}

export default Ingridient