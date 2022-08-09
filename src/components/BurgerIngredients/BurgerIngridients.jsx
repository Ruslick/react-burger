import React from 'react'
import Tabs from '../ui/Tabs/Tabs'
import styles from './BurgerIngridients.module.css'
import IngridientsList from './IngridientsList/IngridientsList'


function BurgerIngridients({ingridients, ...props}) {
  return (
    <section>
      <div className={styles.wrapper}>
        <p className="text text_type_main-large">
          Соберите бургер
        </p>
        
      </div>
      <Tabs/>
      <ul className={`${styles.list} scroll`} style={{height: (window.innerHeight/2)}}>
        <IngridientsList ingridients={ingridients} type='bun'>Булки</IngridientsList>
        <IngridientsList ingridients={ingridients} type='sauce'>Cоусы</IngridientsList>
        <IngridientsList ingridients={ingridients} type='main'>Начинки</IngridientsList>
      </ul>


      
    </section>
  )
}


export default BurgerIngridients