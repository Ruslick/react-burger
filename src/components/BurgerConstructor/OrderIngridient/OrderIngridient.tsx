import React, { FC, SyntheticEvent, useRef } from "react";
import { useDispatch } from "react-redux";

import styles from "./OrderIngridient.module.css";

import {
	backupOrderIngridients,
	clearReserveOrderIngridients,
	makeReserveOrderIngridients,
	removeOrderIngridient,
} from "../../../services/slices/orderSlice";

import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import { IOrderIngridient } from "../../../utils/types/index";

const OrderIngridient: FC<IOrderIngridient> = ({
	ingridient,
	isLocked = false,
	position,
	moveCard,
	index,
}) => {
	const dispatch = useDispatch();
	const { name, price, image } = ingridient;

	const postfixName =
		position === "top"
			? `${name} (верх)`
			: position === "bottom"
			? `${name} (низ)`
			: name;

	const handleClose = () => {
		dispatch(removeOrderIngridient(ingridient));
	};
	const ingridientRef = useRef<any>(null);
	const [{ handlerId }, drop] = useDrop<{ index: number }, any, any>({
		accept: "orderIngridient",
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: { index: number }, monitor: DropTargetMonitor) {
			console.warn(item);
			if (!ingridientRef.current) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;
			if (!hoverIndex) return;
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect =
				ingridientRef.current?.getBoundingClientRect &&
				ingridientRef.current?.getBoundingClientRect();
			if (!hoverBoundingRect) return;
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return;
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
			dispatch(makeReserveOrderIngridients(null));
			return true;
		},
		end(_, monitor) {
			if (!monitor.getDropResult()) {
				dispatch(backupOrderIngridients(null));
			}
			dispatch(clearReserveOrderIngridients(null));
		},

		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0.5 : 1;
	if (ingridient.type !== "bun") drag(drop(ingridientRef));
	const preventDefault = (e: SyntheticEvent) => e.preventDefault();
	console.log(handlerId)

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
						type={position}
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
};

export default OrderIngridient;
