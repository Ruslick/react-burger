import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import styles from "./OrderIngridient.module.css";
import PropTypes from "prop-types";
import { ingridientShape } from "../../../utils/types";
import { useDispatch } from "react-redux";
import {
	backupOrderIngridients,
	clearReserveOrderIngridients,
	makeReserveOrderIngridients,
	removeOrderIngridient,
} from "../../../services/slices/orderSlice";
import { useDrag, useDrop } from "react-dnd";

function OrderIngridient({
	ingridient,
	isLocked = false,
	type,
	moveCard,
	index,
}) {
	const dispatch = useDispatch();
	const { name, price, image } = ingridient;

	const postfixName =
		type === "top"
			? `${name} (верх)`
			: type === "bottom"
			? `${name} (низ)`
			: name;

	const handleClose = () => {
		dispatch(removeOrderIngridient(ingridient));
	};
	const ingridientRef = useRef(null);

	const [{ handlerId }, drop] = useDrop({
		accept: "orderIngridient",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ingridientRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ingridientRef.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}
			moveCard(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});
	const [{ isDragging }, drag] = useDrag({
		type: "orderIngridient",
		item: () => ({ id: ingridient._number, index }),
		canDrag() {
			dispatch(makeReserveOrderIngridients());
			return true;
		},
		end(_, monitor) {
			if (!monitor.getDropResult()) {
				dispatch(backupOrderIngridients());
			}
			dispatch(clearReserveOrderIngridients());
		},

		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0.5 : 1;
	if (ingridient.type !== "bun") drag(drop(ingridientRef));
	const preventDefault = (e) => e.preventDefault();

	return (
		ingridient && (
			<>
				<div
					className={styles.constructorElement}
					style={{ opacity }}
					onDrop={preventDefault}
					ref={ingridientRef}
					data-handler-id={handlerId}
				>
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
						text={postfixName}
						price={price}
						thumbnail={image}
						handleClose={handleClose}
					/>
				</div>
			</>
		)
	);
}

OrderIngridient.propTypes = {
	ingridient: PropTypes.shape(ingridientShape),
	type: PropTypes.string,
	isLocked: PropTypes.bool,
};

export default OrderIngridient;
