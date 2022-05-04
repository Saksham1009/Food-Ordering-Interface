import React,{useRef, useState} from "react"; 
import styles from './Checkout.module.css';

const Checkout = props => {
    const [formValidity, setformValidity] = useState({
        name:true,
        city:true,
        postal:true,
        street:true
    });
    const nameinput = useRef();
    const streetinput = useRef();
    const postalcodeinput = useRef();
    const cityinput = useRef();
    const isempty = value => {
        return value.trim()==='';
    }
    const hasfivedigits = value => {
        return value.trim().length===5;
    }
    const confirmHandler = event => {
        event.preventDefault();

        const name = nameinput.current.value;
        const street = streetinput.current.value;
        const postalcode = postalcodeinput.current.value;
        const city = cityinput.current.value;

        const nameisValid = !isempty(name);
        const streetisValid = !isempty(street);
        const cityisValid = !isempty(city);
        const postalcodeisValid = hasfivedigits(postalcode);
        setformValidity({
            name:nameisValid,
            street:streetisValid,
            postal:postalcodeisValid,
            city:cityisValid,
        })
        const formisValid = nameisValid && streetisValid && postalcodeisValid && cityisValid;

        if(!formisValid){
            return;
        }

        props.onconfirm({
            name:name,
            street:street,
            postal:postalcode,
            city:city
        })
    };

    return(
    <form className={styles.form} onSubmit={confirmHandler}>
        <div className={`${styles.control} ${formValidity.name ? '':styles.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref={nameinput}/>
            {!formValidity.name && <p>Please enter a Valid Name!</p>}
        </div>
        <div className={`${styles.control} ${formValidity.street ? '':styles.invalid}`}>
            <label htmlFor="street">Street</label>
            <input type='text' id='street' ref={streetinput}/>
            {!formValidity.street && <p>Please enter a Valid street!</p>}
        </div>
        <div className={`${styles.control} ${formValidity.postal ? '':styles.invalid}`}>
            <label htmlFor="postalcode">Postal Code</label>
            <input type='text' id='postalcode' ref={postalcodeinput}/>
            {!formValidity.postal && <p>Please enter a Valid postal code!</p>}
        </div>
        <div className={`${styles.control} ${formValidity.city ? '':styles.invalid}`}>
            <label htmlFor="city">City</label>
            <input type='text' id='city' ref={cityinput}/>
            {!formValidity.city && <p>Please enter a Valid city!</p>}
        </div>
        <div className={styles.actions}>
            <button type="button" onClick={props.oncancel}>Cancel</button>
            <button className={styles.submit}>Confirm</button>
        </div>
    </form>)
}

export default Checkout;