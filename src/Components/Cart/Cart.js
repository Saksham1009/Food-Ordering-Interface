import { useContext } from 'react';
import cartcontext from '../../Store/Cart-context';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
const Cart = props => {
    const cartctx = useContext(cartcontext);
    const AddItemInCartHandler = item => {
        cartctx.addItem({...item, amount:1});
    };
    const RemoveItemFromCart = id => {
        cartctx.removeItem(id);
    };
    const cartitems =  <ul className={styles['cart-items']}>{cartctx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={AddItemInCartHandler.bind(null, item)} onRemove={RemoveItemFromCart.bind(null, item.id)}/>)}</ul>;
    return <Modal closecart={props.closecart}>
        {cartitems}
        <div className={styles.total}>
            <span>Total Amount</span>
            <span> {`$${cartctx.totalAmount.toFixed(2)}`}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.closecart}>Close</button>
            {cartctx.items.length>0 && <button className={styles.button}>Order</button>}
        </div>
        <div></div>
    </Modal>
};
export default Cart;