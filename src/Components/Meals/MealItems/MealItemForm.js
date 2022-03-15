import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';
import { useRef, useState} from 'react';
const MealItemForm = props => {
    const [amountisValid, setamountisValid] = useState(true);
    const AmountinputHandler = useRef();
    const submitHandler = event => {
        event.preventDefault();

        const enteredamount = AmountinputHandler.current.value;

        if(enteredamount.trim().length===0 || +enteredamount<1 || +enteredamount>5){
            setamountisValid(false);
            return;
        }
         props.onAddToCart(+enteredamount);
    };
    
    return(<form className={styles.form} onSubmit={submitHandler}>
        <Input ref={AmountinputHandler} label="Amount" input={{
            id:'amount_'+props.id,
            type:'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button type='submit'>+ Add</button>
        {!amountisValid && <p>Please Enter A Valid Amount!(1-5)</p>}
    </form>);
};

export default MealItemForm;