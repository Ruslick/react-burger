import React from 'react'
import styles from './IngridientsList.module.css'
import Ingridient from '../Ingridient/Ingridient'



function IngridientsList({ingridients, type, children, ...props}) {

  return (
    <li className={styles.section}>
      <p className="text text_type_main-medium">{children}</p>
      <ul className={styles.list}>
        {ingridients

        // распределение ингридинтов по типу (булки в булках, начинки в начинках)
        .filter(ingridient => ingridient.type === type? true : false)
        
        .map(ingridient => (
          <Ingridient 
            key={ingridient._id} 
            data={ingridient} 
            count={1}
          />))
        }
      </ul>
    </li>
  )
}

export default IngridientsList