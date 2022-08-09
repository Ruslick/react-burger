import React from 'react'
import styles from './Order.module.css'
import OrderIngridient from './OrderIngridient/OrderIngridient'
import data from '../../../utils/data.js'




function Order(selectedBun) {
  
  // позже она будет передаваться инеаче
  // выбраная булочка
  const {name, price, image, _id} = data[0]

  return (

		<section
			className={styles.wrapper}
			style={{ height: window.innerHeight / 2 }}
		>
			<OrderIngridient
				text={`${name} (верх)`}
				price={price}
				thumbnail={image}
				type={"top"}
				isLocked={true}
			/>
			<div className={`${styles.list} scroll`}>
				{data.map((ingridient, index, array) => {
					const { name, price, image, _id } = ingridient;
					return (
						<OrderIngridient
							key={_id}
							text={name}
							price={price}
							thumbnail={image}
						/>
					);
				})}
			</div>
			<OrderIngridient
				text={`${name} (низ)`}
				price={price}
				thumbnail={image}
				type={"bottom"}
				isLocked={true}
			/>
		</section>
	);
}

export default Order

