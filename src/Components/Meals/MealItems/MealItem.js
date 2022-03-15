import cartcontext from '../../../Store/Cart-context';
import { useContext } from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
const MealItem = props => {
    const cartctx = useContext(cartcontext);
    const price =`$ ${props.price.toFixed(2)}`;
    const addtocartHandler = amount => {
        cartctx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };
    return(<li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.dsc}>{props.dsc}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm id={props.id} onAddToCart={addtocartHandler}/>
        </div>
    </li>
        );
};

export default MealItem;