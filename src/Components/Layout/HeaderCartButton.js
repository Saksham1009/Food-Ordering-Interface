import CartIcon from "../Cart/CartIcon";
import cartcontext from "../../Store/Cart-context";
import styles from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = props => {
    const cartctx = useContext(cartcontext);
    const [buttonishighlighted, setbuttonishighlighted] = useState(false);
    const btnclasses = `${styles.button} ${buttonishighlighted ? styles.bump: ''}`;
    const {items} = cartctx;
    useEffect(()=>{
        if(items.length ===0) return;
        setbuttonishighlighted(true);
        
        const timer = setTimeout(()=>{
            setbuttonishighlighted(false);
        },300);

        return ()=>{
            clearTimeout(timer);
        }
    },[items]);

    const numberofCartItems = cartctx.items.reduce((curr, item) => {
        return curr+item.amount;
    },0);
    return <button className={btnclasses} onClick={props.opencart}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={styles.badge}>
            {numberofCartItems}
        </span>
    </button>
};

export default HeaderCartButton;