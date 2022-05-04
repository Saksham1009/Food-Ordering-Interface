import React, { useContext, useState } from 'react';
import cartcontext from '../../Store/Cart-context';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import Modal from '../UI/Modal';
import Checkout from './Checkout';
const Cart = props => {
    const [showform, setshowform] = useState(false);
    const [issubmiting,setissumbmitting] = useState(false);
    const [didsubmit,setdidsubmit] = useState(false);
    const cartctx = useContext(cartcontext);
    const AddItemInCartHandler = item => {
        cartctx.addItem({...item, amount:1});
    };
    const RemoveItemFromCart = id => {
        cartctx.removeItem(id);
    };
    const openform = props => {
        setshowform(true);
    }
    const submitdatahandler = async(val) => {
        setissumbmitting(true);
        await fetch("https://foodapp-a4954-default-rtdb.firebaseio.com/orders.json",{
            method:'POST',
            body:JSON.stringify({
                user:val,
                orderedItems:cartctx.items
            })
        });
        setissumbmitting(false);
        setdidsubmit(true);
        cartctx.clearCart();
    };
    const cartitems =  <ul className={styles['cart-items']}>{cartctx.items.map(item => <CartItem key={item.id} name={item.name} amount={item.amount} price={item.price} onAdd={AddItemInCartHandler.bind(null, item)} onRemove={RemoveItemFromCart.bind(null, item.id)}/>)}</ul>;
    const cartmodalcontent = <React.Fragment>{cartitems}
    <div className={styles.total}>
        <span>Total Amount</span>
        <span> {`$${cartctx.totalAmount.toFixed(2)}`}</span>
    </div>
    {showform && <Checkout onconfirm={submitdatahandler} oncancel={props.closecart}/>}
    {!showform && <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.closecart}>Close</button>
        {cartctx.items.length>0 && <button className={styles.button} onClick={openform}>Order</button>}
    </div>}
    <div></div>
    </React.Fragment>;
    const issubmittingcontent = <p>Sending order data...</p>
    const orderdatasent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={styles.actions}>
            <button className={styles.button} onClick={props.closecart}>Close</button>
        </div>
    </React.Fragment>
    return <Modal closecart={props.closecart}>
        {!issubmiting && !didsubmit && cartmodalcontent}
        {issubmiting && issubmittingcontent}
        {!issubmiting && didsubmit && orderdatasent}
    </Modal>
};
export default Cart;