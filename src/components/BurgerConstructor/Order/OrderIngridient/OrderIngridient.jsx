import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from 'react'
import styles from './OrderIngridient.module.css'
import PropTypes from 'prop-types';



function OrderIngridient({text, price, thumbnail, isLocked, type}) {
  return (
		<div className={styles.constructorElement}>
			{!isLocked ? (
				<div className={styles.iconWrapper}>
					<DragIcon type="primary" />
				</div>
			) : (
				<div className={styles.iconWrapper}></div>
			)}
			<ConstructorElement
				type={type}
				isLocked={isLocked}
				text={text}
				price={price}
				thumbnail={thumbnail} 
			/>
		</div>
	);
}

// Проверка типов ингридиета
OrderIngridient.propTypes = {
  text: PropTypes.string,
  thumbnail: PropTypes.string,
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  price: PropTypes.number,
}

export default OrderIngridient